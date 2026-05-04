import { NextResponse } from "next/server";

const STEAM_API_KEY = "70249DB5515E4F9ED1B5A83E9F9208ED";
const STEAM_ID = "76561198837901854"; // ID actualizada de TnMorty

export async function GET() {
  try {
    // 1. Obtener información del perfil
    const playerResponse = await fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}`
    );
    const playerData = await playerResponse.json();
    const player = playerData.response.players[0];

    // 2. Obtener juegos recientemente jugados
    const recentGamesResponse = await fetch(
      `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`
    );
    const recentGamesData = await recentGamesResponse.json();
    const recentGames = recentGamesData.response.games || [];

    // 3. Obtener estadísticas de nivel
    const levelResponse = await fetch(
      `http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}`
    );
    const levelData = await levelResponse.json();
    const level = levelData.response.player_level;

    return NextResponse.json({
      player: {
        personaname: player.personaname,
        avatarfull: player.avatarfull,
        gameextrainfo: player.gameextrainfo,
        gameid: player.gameid,
        personastate: player.personastate, // 0: Offline, 1: Online, 3: Away...
      },
      recentGames,
      level,
    });
  } catch (error) {
    console.error("Steam API Error:", error);
    return NextResponse.json({ error: "Failed to fetch Steam data" }, { status: 500 });
  }
}
