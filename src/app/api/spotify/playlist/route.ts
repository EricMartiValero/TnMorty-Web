import { NextResponse } from "next/server";

function base64(s: string) {
  return Buffer.from(s).toString("base64");
}

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${base64(`${clientId}:${clientSecret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const json = (await res.json()) as { access_token?: string };
  return json.access_token ?? null;
}

export async function GET() {
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ error: "No token" }, { status: 500 });

  const playlistId = "2iuE2kHOzx5JgCmwBBcwzn";
  const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Spotify playlist error" }, { status: 500 });
  }

  const json = await res.json();
  console.log("Spotify API Response items count:", json.items?.length);

  const tracks = json.items
    .map((item: any) => {
      const track = item.track;
      if (!track) return null;
      return {
        id: track.id,
        name: track.name,
        artist: track.artists?.map((a: any) => a.name).join(", "),
        album: track.album?.name,
        image: track.album?.images?.[0]?.url,
        preview_url: track.preview_url,
        uri: track.uri
      };
    })
    .filter((t: any) => t !== null); // Permitir todas las canciones, incluso sin preview para que la lista no esté vacía

  console.log("Processed tracks count:", tracks.length);
  return NextResponse.json(tracks);
}
