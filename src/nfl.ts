import { BalldontlieAPI } from '@balldontlie/sdk';

export async function getNFLTeamIds(args: {}) {
	return {
		'1': 'New England Patriots',
		'3': 'Buffalo Bills',
		'4': 'New York Jets',
		'5': 'Miami Dolphins',
		'6': 'Baltimore Ravens',
		'7': 'Pittsburgh Steelers',
		'8': 'Cleveland Browns',
		'9': 'Cincinnati Bengals',
		'10': 'Houston Texans',
		'11': 'Tennessee Titans',
		'12': 'Indianapolis Colts',
		'13': 'Jacksonville Jaguars',
		'14': 'Kansas City Chiefs',
		'15': 'Denver Broncos',
		'16': 'Las Vegas Raiders',
		'17': 'Los Angeles Chargers',
		'18': 'Philadelphia Eagles',
		'19': 'Dallas Cowboys',
		'20': 'New York Giants',
		'21': 'Washington Commanders',
		'22': 'Green Bay Packers',
		'23': 'Minnesota Vikings',
		'24': 'Chicago Bears',
		'25': 'Detroit Lions',
		'26': 'New Orleans Saints',
		'27': 'Atlanta Falcons',
		'28': 'Tampa Bay Buccaneers',
		'29': 'Carolina Panthers',
		'30': 'San Francisco 49ers',
		'31': 'Seattle Seahawks',
		'32': 'Los Angeles Rams',
		'33': 'Arizona Cardinals',
	};
}

export async function getNFLTeams(args: { apiKey: string; division?: "NORTH" | "EAST" | "SOUTH" | "WEST"; conference?: "AFC" | "NFC" }) {
	const api = new BalldontlieAPI({ apiKey: args.apiKey });
	const params: any = {};
	if (args.division) params.division = args.division;
	if (args.conference) params.conference = args.conference;

	try {
		const response = await api.nfl.getTeams(params);
		return response;
	} catch (error) {
		throw new Error(`Failed to fetch NFL teams: ${error}`);
	}
}

export async function getNFLPlayers(args: { apiKey: string; cursor?: string; search?: string; teamIds?: number[]; playerIds?: number[] }) {
	const api = new BalldontlieAPI({ apiKey: args.apiKey });

	const params: any = {};
	if (args.cursor) params.cursor = args.cursor;
	if (args.search) params.search = args.search;
	if (args.teamIds) params.team_ids = args.teamIds;
	if (args.playerIds) params.player_ids = args.playerIds;
	params.per_page = 100;

	try {
		const response = await api.nfl.getPlayers(params);
		return response;
	} catch (error) {
		throw new Error(`Failed to fetch NFL players: ${error}`);
	}
}

export async function getNFLGames(args: {
	apiKey: string;
	cursor?: number;
	dates?: string[];
	seasons?: number[];
	team_ids?: number[];
	postseason?: boolean;
    weeks?: number[];
}) {
	const api = new BalldontlieAPI({ apiKey: args.apiKey });

	const params: any = {};
	if (args.cursor) params.cursor = args.cursor;
	if (args.dates) params.dates = args.dates;
	if (args.seasons) params.seasons = args.seasons;
	if (args.team_ids) params.team_ids = args.team_ids;
	if (args.postseason !== undefined) params.postseason = args.postseason;
	if (args.weeks) params.weeks = args.weeks;
	params.per_page = 100;

	try {
		const response = await api.nfl.getGames(params);
		return response;
	} catch (error) {
		throw new Error(`Failed to fetch NFL games: ${error}`);
	}
}
