import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { getMLBTeamIds, getMLBGames, getMLBPlayers, getMLBTeams } from './mlb';
import { getNFLTeamIds, getNFLGames, getNFLPlayers, getNFLTeams } from './nfl';
import { getNBATeamIds, getNBAGames, getNBAPlayers, getNBATeams } from './nba';

export interface Env {
	BALLDONTLIE_API_KEY: string;
	AUTH_TOKEN: string;
}

export const TOOLS: Tool[] = [
	{
		name: 'get_current_date_time',
		description: 'Returns the current date and time as context for up-to-date lookups.',
		inputSchema: {
			type: 'object',
			properties: {},
			required: [],
		},
	},
	{
		name: 'get_mlb_team_ids',
		description: 'Returns a map of IDs for all MLB teams.',
		inputSchema: {
			type: 'object',
			properties: {},
			required: [],
		},
	},
	{
		name: 'get_mlb_teams',
		description: 'Get MLB teams. Optionally filter by division and/or league.',
		inputSchema: {
			type: 'object',
			properties: {
				division: {
					type: 'string',
					description: 'Filter teams by division ("East", "West", or "Central")',
				},
				league: {
					type: 'string',
					description: 'Filter teams by league ("American" or "National")',
				},
			},
			required: [],
		},
	},
	{
		name: 'get_mlb_players',
		description: 'Get MLB players. Search by name, team, or get active players.',
		inputSchema: {
			type: 'object',
			properties: {
				cursor: {
					type: 'string',
					description: 'Pagination cursor, if needed',
				},
				search: {
					type: 'string',
					description:
						'Returns players whose first or last name matches this value. For example, ?search=shohei will return players that have "shohei" in their first or last name.',
				},
				teamIds: {
					type: 'array',
					items: { type: 'number' },
					description: 'Returns players that belong to these team ids. This should be an array of numbers.',
				},
				playerIds: {
					type: 'array',
					items: { type: 'number' },
					description: 'Returns players that match these ids. This should be an array of numbers.',
				},
			},
			required: [],
		},
	},
	{
		name: 'get_mlb_games',
		description: 'Get MLB games. Filter by dates, seasons, teams, or postseason games.',
		inputSchema: {
			type: 'object',
			properties: {
				cursor: {
					type: 'number',
					description: 'Pagination cursor, if needed',
				},
				dates: {
					type: 'array',
					items: { type: 'string' },
					description: 'Filter games by dates (YYYY-MM-DD format). This should be an array of strings.',
				},
				seasons: {
					type: 'array',
					items: { type: 'number' },
					description: 'Filter games by seasons (year)',
				},
				team_ids: {
					type: 'array',
					items: { type: 'number' },
					description: 'Filter games by team IDs',
				},
				postseason: {
					type: 'boolean',
					description:
						'Returns only playoff games when set to true. Returns regular season games when set to false. Returns both when not specified',
				},
			},
			required: [],
		},
	},
	{
		name: 'get_nfl_team_ids',
		description: 'Returns a map of IDs for all NFL teams.',
		inputSchema: {
			type: 'object',
			properties: {},
			required: [],
		},
	},
	{
		name: 'get_nfl_teams',
		description: 'Get NFL teams. Optionally filter by division and/or conference.',
		inputSchema: {
			type: 'object',
			properties: {
				division: {
					type: 'string',
					description: 'Filter teams by division ("NORTH", "EAST", "SOUTH", or "WEST")',
				},
				conference: {
					type: 'string',
					description: 'Filter teams by conference ("AFC" or "NFC")',
				},
			},
			required: [],
		},
	},
	{
		name: 'get_nfl_players',
		description: 'Get NFL players. Search by name, team, or get active players.',
		inputSchema: {
			type: 'object',
			properties: {
				cursor: {
					type: 'string',
					description: 'Pagination cursor, if needed',
				},
				search: {
					type: 'string',
					description:
						'Returns players whose first or last name matches this value. For example, ?search=lamar will return players that have "lamar" in their first or last name.',
				},
				teamIds: {
					type: 'array',
					items: { type: 'number' },
					description: 'Returns players that belong to these team ids. This should be an array of numbers.',
				},
				playerIds: {
					type: 'array',
					items: { type: 'number' },
					description: 'Returns players that match these ids. This should be an array of numbers.',
				},
			},
			required: [],
		},
	},
	{
		name: 'get_nfl_games',
		description: 'Get NFL games. Filter by dates, seasons, teams, or postseason games.',
		inputSchema: {
			type: 'object',
			properties: {
				cursor: {
					type: 'number',
					description: 'Pagination cursor, if needed',
				},
				dates: {
					type: 'array',
					items: { type: 'string' },
					description: 'Filter games by dates (YYYY-MM-DD format). This should be an array of strings.',
				},
				seasons: {
					type: 'array',
					items: { type: 'number' },
					description:
						'Filter games by seasons (year). Note that this refers to the year in which the season started (eg. `2024` refers to the 2024-2025 season)',
				},
				team_ids: {
					type: 'array',
					items: { type: 'number' },
					description: 'Filter games by team IDs',
				},
				postseason: {
					type: 'boolean',
					description:
						'Returns only playoff games when set to true. Returns regular season games when set to false. Returns both when not specified',
				},
				weeks: {
					type: 'array',
					items: { type: 'number' },
					description: 'Returns games that occurred in these weeks. This should be an array of numbers',
				},
			},
			required: [],
		},
	},
	{
		name: 'get_nba_team_ids',
		description: 'Returns a map of IDs for all NBA teams.',
		inputSchema: {
			type: 'object',
			properties: {},
			required: [],
		},
	},
	{
		name: 'get_nba_teams',
		description: 'Get NBA teams. Optionally filter by division and/or conference.',
		inputSchema: {
			type: 'object',
			properties: {
				division: {
					type: 'string',
					description: 'Filter teams by division ("Atlantic", "Pacific", "Central", "Southeast", "Southwest", "Northwest")',
				},
				conference: {
					type: 'string',
					description: 'Filter teams by conference ("East" or "West")',
				},
			},
			required: [],
		},
	},
	{
		name: 'get_nba_players',
		description: 'Get NBA players. Search by name, team, or get active players.',
		inputSchema: {
			type: 'object',
			properties: {
				cursor: {
					type: 'string',
					description: 'Pagination cursor, if needed',
				},
				search: {
					type: 'string',
					description:
						'Returns players whose first or last name matches this value. For example, ?search=davis will return players that have "davis" in their first or last name.',
				},
				teamIds: {
					type: 'array',
					items: { type: 'number' },
					description: 'Returns players that belong to these team ids. This should be an array of numbers.',
				},
				playerIds: {
					type: 'array',
					items: { type: 'number' },
					description: 'Returns players that match these ids. This should be an array of numbers.',
				},
			},
			required: [],
		},
	},
	{
		name: 'get_nba_games',
		description: 'Get NBA games. Filter by dates, seasons, teams, or postseason games.',
		inputSchema: {
			type: 'object',
			properties: {
				cursor: {
					type: 'number',
					description: 'Pagination cursor, if needed',
				},
				dates: {
					type: 'array',
					items: { type: 'string' },
					description: 'Filter games by dates (YYYY-MM-DD format). This should be an array of strings.',
				},
				seasons: {
					type: 'array',
					items: { type: 'number' },
					description:
						'Filter games by seasons (year). Note that this refers to the year in which the season started (eg. `2024` refers to the 2024-2025 season)',
				},
				team_ids: {
					type: 'array',
					items: { type: 'number' },
					description: 'Filter games by team IDs',
				},
				postseason: {
					type: 'boolean',
					description:
						'Returns only playoff games when set to true. Returns regular season games when set to false. Returns both when not specified',
				},
			},
			required: [],
		},
	},
];

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);

		// CORS headers for browser compatibility
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		};

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

		// Handle MCP requests
		if (request.method === 'POST' && url.pathname === '/mcp') {
			try {
				const message = (await request.json()) as any;
				const { method, params, id } = message;

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
					result = { tools: TOOLS };
				} else if (method === 'tools/call') {
					const { name, arguments: args } = params;
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
