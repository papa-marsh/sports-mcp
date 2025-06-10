import { Tool } from '@modelcontextprotocol/sdk/types.js';


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
