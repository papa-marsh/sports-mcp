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
		const globalHeaders = {
			'content-type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		};

		// Handle GET requests  
		if (request.method === 'GET') {
				console.log('Handling GET request');
			if (request.headers.get('accept')?.includes('text/event-stream')) {
				return new Response(JSON.stringify({
					error: 'SSE not supported',
					message: 'Server-Sent Events are not supported. Please use HTTP POST requests instead.',
					supportedMethods: ['POST'],
					endpoint: request.url
				}), {
					status: 501,
					headers: globalHeaders,
				})
			}
			return new Response('Sports MCP Server - Send POST requests for MCP protocol', {
				status: 200,
				headers: globalHeaders,
			});
		}

		// Handle MCP requests
		if (request.method === 'POST') {
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
					return new Response('', {
						status: 204, // No Content - notification acknowledged
						headers: globalHeaders,
					});
				} else if (method === 'tools/list') {
					console.log("Listing tools");
					result = { tools: TOOLS };
				} else if (method === 'tools/call') {
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
								headers: globalHeaders,
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
								headers: globalHeaders,
							}
						);
					}
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
					headers: globalHeaders,
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
						headers: globalHeaders,
					}
				);
			}
		}

		return new Response('Sports MCP Server', {
			status: 200,
			headers: globalHeaders,
		});
	},
};
