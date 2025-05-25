import { BalldontlieAPI } from "@balldontlie/sdk";

export async function getMLBTeams(args: { apiKey: string; division?: string; league?: string }) {
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

export async function getMLBPlayers(args: {
  apiKey: string;
  cursor?: string;
  search?: string;
  teamIds?: number[];
  playerIds?: number[];
}) {
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

