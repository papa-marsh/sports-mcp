import { BalldontlieAPI } from '@balldontlie/sdk';

export async function getMLBTeamIds(args: {}) {
	return {
		'1': 'Arizona Diamondbacks',
		'2': 'Atlanta Braves',
		'3': 'Baltimore Orioles',
		'4': 'Boston Red Sox',
		'5': 'Chicago Cubs',
		'6': 'Chicago White Sox',
		'7': 'Cincinnati Reds',
		'8': 'Cleveland Guardians',
		'9': 'Colorado Rockies',
		'10': 'Detroit Tigers',
		'11': 'Houston Astros',
		'12': 'Kansas City Royals',
		'13': 'Los Angeles Angels',
		'14': 'Los Angeles Dodgers',
		'15': 'Miami Marlins',
		'16': 'Milwaukee Brewers',
		'17': 'Minnesota Twins',
		'18': 'New York Mets',
		'19': 'New York Yankees',
		'20': 'Oakland Athletics',
		'21': 'Philadelphia Phillies',
		'22': 'Pittsburgh Pirates',
		'23': 'San Diego Padres',
		'24': 'San Francisco Giants',
		'25': 'Seattle Mariners',
		'26': 'St. Louis Cardinals',
		'27': 'Tampa Bay Rays',
		'28': 'Texas Rangers',
		'29': 'Toronto Blue Jays',
		'30': 'Washington Nationals',
	};
}

export async function getMLBTeams(args: { apiKey: string; division?: "East" | "Central" | "West"; league?: "American" | "National" }) {
	const api = new BalldontlieAPI({ apiKey: args.apiKey });
	const params: any = {};
	if (args.division) params.division = args.division;
	if (args.league) params.league = args.league;

	try {
		const response = await api.mlb.getTeams(params);
		return response;
	} catch (error) {
		throw new Error(`Failed to fetch MLB teams: ${error}`);
	}
}

export async function getMLBPlayers(args: { apiKey: string; cursor?: string; search?: string; teamIds?: number[]; playerIds?: number[] }) {
	const api = new BalldontlieAPI({ apiKey: args.apiKey });

	const params: any = {};
	if (args.cursor) params.cursor = args.cursor;
	if (args.search) params.search = args.search;
	if (args.teamIds) params.team_ids = args.teamIds;
	if (args.playerIds) params.player_ids = args.playerIds;
	params.per_page = 100;

	try {
		const response = await api.mlb.getPlayers(params);
		return response;
	} catch (error) {
		throw new Error(`Failed to fetch MLB players: ${error}`);
	}
}

export async function getMLBGames(args: {
	apiKey: string;
	cursor?: number;
	dates?: string[];
	seasons?: number[];
	team_ids?: number[];
	postseason?: boolean;
}) {
	const api = new BalldontlieAPI({ apiKey: args.apiKey });

	const params: any = {};
	if (args.cursor) params.cursor = args.cursor;
	if (args.dates) params.dates = args.dates;
	if (args.seasons) params.seasons = args.seasons;
	if (args.team_ids) params.team_ids = args.team_ids;
	if (args.postseason !== undefined) params.postseason = args.postseason;
	params.per_page = 100;

	try {
		const response = await api.mlb.getGames(params);
		return response;
	} catch (error) {
		throw new Error(`Failed to fetch MLB games: ${error}`);
	}
}
