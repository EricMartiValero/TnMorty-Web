"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ListMusic, Music } from "lucide-react";

interface Track {
  id: string;
  name: string;
  artist: string;
  image: string;
  preview_url: string;
}

export function AudioPlayer() {
  console.log("AudioPlayer Mounting");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentIndex, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showList, setShowList] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("/api/spotify/playlist")
      .then(res => {
        if (!res.ok) throw new Error("API Error");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Aleatorio inicial
          const shuffled = [...data].sort(() => Math.random() - 0.5);
          setTracks(shuffled);
        } else {
          console.warn("No tracks with previews found in playlist");
        }
      })
      .catch(err => console.error("Error fetching playlist:", err));
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const currentTrack = tracks[currentIndex];

  const handlePlayPause = () => {
    if (!audioRef.current || !currentTrack?.preview_url) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => {
        console.error("Play error:", e);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const selectTrack = (idx: number) => {
    setCurrentIdx(idx);
    setIsPlaying(true);
    setShowList(false);
  };

  useEffect(() => {
    if (currentTrack && audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentIndex, currentTrack]);

  if (tracks.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto mt-4 flex flex-col gap-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl p-6 text-center shadow-2xl">
          <Music className="h-6 w-6 text-white/10 mx-auto mb-2 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Cargando Favoritos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8 flex flex-col gap-4">
      <audio
        ref={audioRef}
        src={currentTrack?.preview_url}
        onEnded={handleNext}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Player Card */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl p-4 shadow-2xl">
        <div className="flex items-center gap-4">
          {/* Album Art */}
          <div className="relative h-16 w-16 flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentTrack?.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                src={currentTrack?.image}
                className="h-full w-full rounded-2xl object-cover shadow-lg border border-white/5"
              />
            </AnimatePresence>
            {isPlaying && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-[#0a0a0a]">
                <Music className="h-2 w-2 text-white animate-pulse" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-0.5">Favoritos del momento</span>
            <h4 className="text-sm font-black text-white truncate leading-tight">{currentTrack?.name}</h4>
            <span className="text-xs font-bold text-white/40 truncate">{currentTrack?.artist}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button onClick={handlePrev} className="p-2 text-white/40 hover:text-white transition-colors">
              <SkipBack className="h-4 w-4 fill-current" />
            </button>
            <button 
              onClick={handlePlayPause}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all scale-110 active:scale-95"
            >
              {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
            </button>
            <button onClick={handleNext} className="p-2 text-white/40 hover:text-white transition-colors">
              <SkipForward className="h-4 w-4 fill-current" />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Volume & List */}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between px-2">
          <div className="flex items-center gap-3 group relative">
            <button onClick={() => setIsMuted(!isMuted)} className="text-white/40 hover:text-white transition-colors">
              {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <div className="w-0 group-hover:w-20 overflow-hidden transition-all duration-300 ease-out flex items-center">
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-16 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-green-400"
              />
            </div>
          </div>

          <button 
            onClick={() => setShowList(!showList)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
              showList ? "bg-green-500/20 border-green-500/40 text-green-400" : "bg-white/5 border-white/10 text-white/40 hover:text-white"
            }`}
          >
            <span className="text-[10px] font-black uppercase tracking-widest">Ver Lista</span>
            <ListMusic className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Playlist Dropdown */}
      <AnimatePresence>
        {showList && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-3xl border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl max-h-60 overflow-y-auto custom-scrollbar shadow-2xl"
          >
            <div className="p-2 flex flex-col gap-1">
              {tracks.map((track, idx) => (
                <button
                  key={track.id + idx}
                  onClick={() => selectTrack(idx)}
                  className={`flex items-center gap-3 p-2 rounded-2xl transition-all text-left ${
                    currentIndex === idx ? "bg-green-500/10 border border-green-500/20" : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <img src={track.image} className="h-10 w-10 rounded-lg object-cover" />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold truncate ${currentIndex === idx ? "text-green-400" : "text-white"}`}>
                        {track.name}
                      </span>
                      {!track.preview_url && (
                        <span className="text-[8px] px-1 rounded bg-white/5 text-white/30 uppercase">Sin preview</span>
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-white/40 truncate">{track.artist}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
