import { TOOLS } from './toolSchema';
import { getMLBTeamIds, getMLBGames, getMLBPlayers, getMLBTeams } from './mlb';
import { getNFLTeamIds, getNFLGames, getNFLPlayers, getNFLTeams } from './nfl';
import { getNBATeamIds, getNBAGames, getNBAPlayers, getNBATeams } from './nba';

export interface Env {
	BALLDONTLIE_API_KEY: string;
	AUTH_TOKEN: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		console.log(`Request received for ${url.pathname} (Method: ${request.method})`);

		// CORS headers for browser compatibility
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		};

		// Handle preflight requests
		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: corsHeaders });
		}

		// Handle health checks
		if (url.pathname === '/health') {
			return new Response('OK', {
				status: 200,
				headers: corsHeaders,
			});
		}

		const authHeader = request.headers.get('Authorization');
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return new Response(
				JSON.stringify({
					jsonrpc: '2.0',
					id: null,
					error: {
						code: -32001,
						message: 'Authorization header required',
					},
				}),
				{
					status: 401,
					headers: {
						'content-type': 'application/json',
						...corsHeaders,
					},
				}
			);
		}

		const token = authHeader.slice(7); // Remove 'Bearer ' prefix
		if (token !== env.AUTH_TOKEN) {
			return new Response(
				JSON.stringify({
					jsonrpc: '2.0',
					id: null,
					error: {
						code: -32001,
						message: 'Invalid authentication token',
					},
				}),
				{
					status: 401,
					headers: {
						'content-type': 'application/json',
						...corsHeaders,
					},
				}
			);
		}

		// Handle MCP requests
		if (request.method === 'POST' && url.pathname === '/mcp') {
			try {
				const message = (await request.json()) as any;
				const { method, params, id } = message;
				console.log(`Handling POST with method "${method}"`, params);

				let result;

				if (method === 'initialize') {
					result = {
						protocolVersion: '2024-11-05',
						capabilities: {
							tools: {},
						},
						serverInfo: {
							name: 'sports-mcp',
							version: '1.0.0',
						},
					};
				} else if (method === 'notifications/initialized') {
					// Handle the initialized notification - this is sent after the initialize handshake
					// For notifications, we don't return a result, just acknowledge receipt
					return new Response('', {
						status: 204, // No Content - notification acknowledged
						headers: corsHeaders,
					});
				} else if (method === 'tools/list') {
					console.log("Listing tools");
					result = { tools: TOOLS };
				} else if (method === 'tools/call') {
					const { name, arguments: args } = params;
					console.log(`Tool called: "${name}"`, args);
					args.apiKey = env.BALLDONTLIE_API_KEY;
					let resultJson;

					switch (name) {
						case 'get_current_date_time':
							resultJson = { 'Current Date & Time': new Date().toLocaleString('sv-SE', { timeZone: 'America/New_York' }) };
							break;
						case 'get_mlb_team_ids':
							resultJson = await getMLBTeamIds(args);
							break;
						case 'get_mlb_teams':
							resultJson = await getMLBTeams(args);
							break;
						case 'get_mlb_players':
							resultJson = await getMLBPlayers(args);
							break;
						case 'get_mlb_games':
							resultJson = await getMLBGames(args);
							break;
						case 'get_nfl_team_ids':
							resultJson = await getNFLTeamIds(args);
							break;
						case 'get_nfl_teams':
							resultJson = await getNFLTeams(args);
							break;
						case 'get_nfl_players':
							resultJson = await getNFLPlayers(args);
							break;
						case 'get_nfl_games':
							resultJson = await getNFLGames(args);
							break;
						case 'get_nba_team_ids':
							resultJson = await getNBATeamIds(args);
							break;
						case 'get_nba_teams':
							resultJson = await getNBATeams(args);
							break;
						case 'get_nba_players':
							resultJson = await getNBAPlayers(args);
							break;
						case 'get_nba_games':
							resultJson = await getNBAGames(args);
							break;
						default:
							throw new Error(`Unknown tool: ${name}`);
					}
					result = { content: [{ type: 'text', text: JSON.stringify(resultJson) }] };
				} else {
					throw new Error(`Unknown method: ${method}`);
				}

				const responseJson = JSON.stringify({
					jsonrpc: '2.0',
					id,
					result,
				});
				return new Response(responseJson, {
					status: 200,
					headers: {
						'content-type': 'application/json',
						...corsHeaders,
					},
				});
			} catch (error) {
				console.error(error)
				return new Response(
					JSON.stringify({
						jsonrpc: '2.0',
						id: null,
						error: {
							code: -32000,
							message: `Error processing request: ${error}`,
						},
					}),
					{
						status: 500,
						headers: {
							'content-type': 'application/json',
							...corsHeaders,
						},
					}
				);
			}
		}

		// Handle SSE endpoint for Server-Sent Events transport
		if (request.method === 'GET' && url.pathname === '/mcp') {
			// Return SSE-compatible response
			return new Response('', {
				status: 200,
				headers: {
					'Content-Type': 'text/event-stream',
					'Cache-Control': 'no-cache',
					Connection: 'keep-alive',
					...corsHeaders,
				},
			});
		}

		// Root endpoint - return server info
		if (url.pathname === '/') {
			return new Response(
				JSON.stringify({
					name: 'sports-mcp',
					version: '1.0.0',
					capabilities: ['tools'],
					endpoints: {
						mcp: '/mcp',
						health: '/health',
					},
				}),
				{
					status: 200,
					headers: {
						'content-type': 'application/json',
						...corsHeaders,
					},
				}
			);
		}

		return new Response('Sports MCP Server - Send POST requests to /mcp endpoint', {
			status: 200,
			headers: {
				'content-type': 'text/plain',
				...corsHeaders,
			},
		});
	},
};
