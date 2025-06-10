import { BalldontlieAPI } from '@balldontlie/sdk';

export async function getNBATeamIds(args: {}) {
	return {
		'1': 'Atlanta Hawks',
		'2': 'Boston Celtics',
		'3': 'Brooklyn Nets',
		'4': 'Charlotte Hornets',
		'5': 'Chicago Bulls',
		'6': 'Cleveland Cavaliers',
		'7': 'Dallas Mavericks',
		'8': 'Denver Nuggets',
		'9': 'Detroit Pistons',
		'10': 'Golden State Warriors',
		'11': 'Houston Rockets',
		'12': 'Indiana Pacers',
		'13': 'LA Clippers',
		'14': 'Los Angeles Lakers',
		'15': 'Memphis Grizzlies',
		'16': 'Miami Heat',
		'17': 'Milwaukee Bucks',
		'18': 'Minnesota Timberwolves',
		'19': 'New Orleans Pelicans',
		'20': 'New York Knicks',
		'21': 'Oklahoma City Thunder',
		'22': 'Orlando Magic',
		'23': 'Philadelphia 76ers',
		'24': 'Phoenix Suns',
		'25': 'Portland Trail Blazers',
		'26': 'Sacramento Kings',
		'27': 'San Antonio Spurs',
		'28': 'Toronto Raptors',
		'29': 'Utah Jazz',
		'30': 'Washington Wizards',
	};
}

export async function getNBATeams(args: {
	apiKey: string;
	division?: 'Atlantic' | 'Pacific' | 'Central' | 'Southeast' | 'Southwest' | 'Northwest';
	conference?: 'East' | 'West';
}) {
	const api = new BalldontlieAPI({ apiKey: args.apiKey });
	const params: any = {};
	if (args.division) params.division = args.division;
	if (args.conference) params.conference = args.conference;

	try {
		const response = await api.nba.getTeams(params);
		return response;
	} catch (error) {
		throw new Error(`Failed to fetch NBA teams: ${error}`);
	}
}

export async function getNBAPlayers(args: { apiKey: string; cursor?: string; search?: string; teamIds?: number[]; playerIds?: number[] }) {
	const api = new BalldontlieAPI({ apiKey: args.apiKey });

	const params: any = {};
	if (args.cursor) params.cursor = args.cursor;
	if (args.search) params.search = args.search;
	if (args.teamIds) params.team_ids = args.teamIds;
	if (args.playerIds) params.player_ids = args.playerIds;
	params.per_page = 100;

	try {
		const response = await api.nba.getPlayers(params);
		return response;
	} catch (error) {
		throw new Error(`Failed to fetch NBA players: ${error}`);
	}
}

export async function getNBAGames(args: {
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
		const response = await api.nba.getGames(params);
		return response;
	} catch (error) {
		throw new Error(`Failed to fetch NBA games: ${error}`);
	}
}
