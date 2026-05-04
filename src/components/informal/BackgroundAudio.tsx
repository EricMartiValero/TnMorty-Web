"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpotifyPlaying, setIsSpotifyPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;

    const handleInteraction = () => {
      audio.play().then(() => setIsPlaying(true)).catch(() => console.log("Autoplay blocked"));
      window.removeEventListener("click", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    
    // Listener para cuando el usuario interactúa con Spotify (pierde foco la web)
    const handleSpotifyFocus = () => {
      // Solo hacemos fade a 0 si detectamos que el usuario clica en el iframe
      // No pausamos, solo bajamos volumen por si acaso
      setIsSpotifyPlaying(true);
      fadeAudio(0, 1000);
    };

    // Listener para cuando el usuario vuelve a la web
    const handleWindowFocus = () => {
      setIsSpotifyPlaying(false);
      if (isPlaying) {
        fadeAudio(volume, 1000);
      }
    };

    // Eliminamos la pausa automática por visibilidad de página para que siga sonando siempre
    window.addEventListener("blur", handleSpotifyFocus);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("blur", handleSpotifyFocus);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [volume, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const fadeAudio = (targetVolume: number, duration: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const startVolume = audio.volume;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentVol = startVolume + (targetVolume - startVolume) * progress;
      
      // Asegurarnos de que el volumen sea válido (0-1)
      audio.volume = Math.max(0, Math.min(1, currentVol));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <>
      <audio ref={audioRef} src="/fondo.mp3" loop />
      
      {/* Control de Volumen Global Rediseñado */}
      <div className="fixed top-8 left-8 z-[100] flex items-center gap-4 group bg-[#0a0a0a]/60 backdrop-blur-2xl p-4 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:scale-105 hover:border-fuchsia-500/30">
        <div className="flex items-center gap-2">
          <button 
            onClick={togglePlay}
            className="text-white/70 hover:text-white transition-colors p-1"
            title={isPlaying ? "Pausar fondo" : "Reproducir fondo"}
          >
            {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
          </button>
          
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="relative text-white/70 hover:text-white transition-colors p-1"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-6 w-6" />
            ) : (
              <div className="relative">
                <Volume2 className="h-6 w-6" />
                {!isSpotifyPlaying && isPlaying && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
                  </span>
                )}
              </div>
            )}
          </button>
        </div>
        
        <div className="flex flex-col gap-2 w-32">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Volumen</span>
            <span className="text-[10px] font-black text-fuchsia-400 uppercase">{Math.round(volume * 100)}%</span>
          </div>
          <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-fuchsia-600 to-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.5)]"
              animate={{ width: `${isMuted ? 0 : volume * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume}
              onChange={(e) => {
                const newVol = parseFloat(e.target.value);
                setVolume(newVol);
                setIsMuted(false);
                setIsSpotifyPlaying(false);
                if (audioRef.current) audioRef.current.volume = newVol;
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
          </div>
        </div>
      </div>
    </>
  );
}
