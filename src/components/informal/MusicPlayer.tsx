"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { GlassCard } from "./GlassCard";

type Track = { title: string; src: string };

const DEFAULT_TRACKS: Track[] = [
  { title: "Demo Track 01", src: "/music/track-01.mp3" },
  { title: "Demo Track 02", src: "/music/track-02.mp3" },
  { title: "Demo Track 03", src: "/music/track-03.mp3" },
];

function formatTime(s: number) {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export function MusicPlayer({ tracks = DEFAULT_TRACKS }: { tracks?: Track[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [idx, setIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const track = useMemo(() => tracks[Math.min(idx, tracks.length - 1)], [idx, tracks]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
  }, [volume]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onLoaded = () => setDuration(a.duration || 0);
    const onTime = () => setCurrent(a.currentTime || 0);
    const onEnd = () => {
      setIsPlaying(false);
      setIdx((i) => (i + 1) % tracks.length);
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    return () => {
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
    };
  }, [tracks.length]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.src = track?.src ?? "";
    a.load();
    if (isPlaying) a.play().catch(() => setIsPlaying(false));
    setCurrent(0);
  }, [track?.src]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      try {
        await a.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      a.pause();
      setIsPlaying(false);
    }
  };

  const seek = (v: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = v;
    setCurrent(v);
  };

  const prev = () => setIdx((i) => (i - 1 + tracks.length) % tracks.length);
  const next = () => setIdx((i) => (i + 1) % tracks.length);

  return (
    <GlassCard
      title="Music Player"
      subtitle="Local · progreso · volumen · playlist"
      right={<Volume2 className="h-4 w-4 text-white/70" aria-hidden="true" />}
      className="md:col-span-8"
    >
      <audio ref={audioRef} preload="none" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white">{track?.title ?? "Sin pista"}</div>
            <div className="mt-1 text-xs text-white/55">
              {formatTime(current)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white/80 hover:bg-white/[0.08]"
              aria-label="Anterior"
            >
              <SkipBack className="h-4 w-4" />
            </button>
            <button
              onClick={toggle}
              className="rounded-xl border border-fuchsia-300/25 bg-fuchsia-300/10 p-2 text-white hover:bg-fuchsia-300/15"
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              onClick={next}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white/80 hover:bg-white/[0.08]"
              aria-label="Siguiente"
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={Math.max(0, duration)}
            value={Math.min(current, duration || 0)}
            step={0.1}
            onChange={(e) => seek(Number(e.target.value))}
            className="w-full accent-cyan-300"
            aria-label="Progreso"
          />

          <div className="flex items-center gap-3">
            <span className="text-xs text-white/55">Vol</span>
            <input
              type="range"
              min={0}
              max={1}
              value={volume}
              step={0.01}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-40 accent-fuchsia-300"
              aria-label="Volumen"
            />
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          {tracks.map((t, i) => (
            <button
              key={t.src}
              onClick={() => setIdx(i)}
              className={[
                "rounded-xl border px-3 py-2 text-left text-sm transition-colors",
                i === idx
                  ? "border-cyan-300/25 bg-cyan-300/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.06]",
              ].join(" ")}
            >
              {t.title}
            </button>
          ))}
        </div>

        <p className="text-xs text-white/45">
          Coloca tus MP3 en `public/music/` y renombra/ajusta la lista en `MusicPlayer.tsx`.
        </p>
      </div>
    </GlassCard>
  );
}

