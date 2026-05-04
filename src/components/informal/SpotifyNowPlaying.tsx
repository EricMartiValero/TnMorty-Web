"use client";

import { useEffect, useState } from "react";
import { Music2 } from "lucide-react";
import { GlassCard } from "./GlassCard";

type NowPlaying =
  | { ok: true; isPlaying: boolean; title?: string; artist?: string; album?: string; url?: string }
  | { ok: false; message: string };

export function SpotifyNowPlaying() {
  const [data, setData] = useState<NowPlaying>({ ok: false, message: "Cargando…" });

  useEffect(() => {
    let t = 0;
    const tick = async () => {
      try {
        const res = await fetch("/api/spotify/now-playing", { cache: "no-store" });
        if (res.status === 204) {
          setData({ ok: false, message: "Spotify no configurado (ENV) o no hay reproducción." });
          return;
        }
        const json = (await res.json()) as NowPlaying;
        setData(json);
      } catch {
        setData({ ok: false, message: "No se pudo obtener Spotify." });
      }
    };

    tick();
    t = window.setInterval(tick, 15000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <GlassCard
      title="Spotify (Live)"
      subtitle="Now Playing (opcional, via API)"
      right={<Music2 className="h-4 w-4 text-white/70" aria-hidden="true" />}
    >
      {data.ok ? (
        <div className="space-y-1">
          <div className="text-sm font-semibold text-white">{data.title ?? "—"}</div>
          <div className="text-xs text-white/65">{data.artist ?? "—"}</div>
          <div className="mt-2 text-xs text-white/55">{data.isPlaying ? "Reproduciendo" : "Pausado"}</div>
          {data.url ? (
            <a className="mt-2 inline-block text-xs text-cyan-200/80 hover:text-cyan-200" href={data.url} target="_blank" rel="noreferrer">
              Abrir en Spotify
            </a>
          ) : null}
        </div>
      ) : (
        <p className="text-sm text-white/70">{data.message}</p>
      )}
    </GlassCard>
  );
}

