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
  if (!token) return new NextResponse(null, { status: 204 });

  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (res.status === 204) return new NextResponse(null, { status: 204 });
  if (!res.ok) {
    return NextResponse.json({ ok: false, message: "Spotify error" }, { status: 200 });
  }

  const json = (await res.json()) as any;
  const item = json?.item;
  const artists = Array.isArray(item?.artists) ? item.artists.map((a: any) => a?.name).filter(Boolean) : [];

  return NextResponse.json({
    ok: true,
    isPlaying: Boolean(json?.is_playing),
    title: item?.name ?? undefined,
    artist: artists.join(", ") || undefined,
    album: item?.album?.name ?? undefined,
    url: item?.external_urls?.spotify ?? undefined,
  });
}

