"use client";

import { motion } from "framer-motion";
import { BackgroundVideo } from "@/components/informal/BackgroundVideo";
import { CustomCursor } from "@/components/informal/CustomCursor";
import { BackgroundAudio } from "@/components/informal/BackgroundAudio";
import { DiscordLive } from "@/components/informal/DiscordLive";
import { GlowCTA } from "@/components/informal/GlowCTA";
import { SocialDock } from "@/components/informal/SocialDock";
import { Modal } from "@/components/informal/Modal";
import { MapPin, Cpu, Monitor, MousePointer2, Keyboard, Database, HardDrive, Smartphone, Layout, ExternalLink, Trophy, Target, Headphones, Mic, Music } from "lucide-react";
import { useState } from "react";

// Icono de Steam personalizado para consistencia
function SteamIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 1.053.136 2.073.39 3.045l4.897 2.016c.36-.264.8-.42 1.275-.42.27 0 .524.053.757.147l2.138-3.085a3.176 3.176 0 0 1-.205-1.127c0-1.767 1.433-3.2 3.2-3.2s3.2 1.433 3.2 3.2-1.433 3.2-3.2 3.2c-.41 0-.796-.078-1.147-.22l-3.082 2.14a3.17 3.17 0 0 1 .15.962c0 1.767-1.433 3.2-3.2 3.2-.843 0-1.608-.328-2.176-.858l-3.328-1.37A11.956 11.956 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm-5.452 18.82c-.967 0-1.75-.783-1.75-1.75s.783-1.75 1.75-1.75 1.75.783 1.75 1.75-.783 1.75-1.75 1.75zm0-2.625c-.483 0-.875.392-.875.875s.392.875.875.875.875-.392.875-.875-.392-.875-.875-.875zm5.902-6.125c-.483 0-.875.392-.875.875s.392.875.875.875.875-.392.875-.875-.392-.875-.875-.875z" />
    </svg>
  );
}

function SetupIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <Monitor className="h-full w-full text-fuchsia-400/80" />
      <Keyboard className="absolute -bottom-1.5 -right-1.5 h-3.5 w-3.5 text-white bg-[#0a0a0a] rounded-sm p-0.5 border border-white/10" />
    </div>
  );
}

export default function Page() {
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isSteamOpen, setIsSteamOpen] = useState(false);
  const [isValorantOpen, setIsValorantOpen] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [steamData, setSteamData] = useState<any>(null);
  const [valorantData, setValorantData] = useState<any>(null);

  // Fetch Steam Data
  const fetchSteamData = async () => {
    try {
      const res = await fetch("/api/steam");
      const data = await res.json();
      setSteamData(data);
    } catch (err) {
      console.error("Error fetching steam data", err);
    }
  };

  // Fetch Valorant Data
  const fetchValorantData = async () => {
    try {
      const res = await fetch("/api/valorant");
      const data = await res.json();
      setValorantData(data);
    } catch (err) {
      console.error("Error fetching valorant data", err);
    }
  };

  return (
    <main className="hide-system-cursor relative min-h-screen text-white overflow-hidden bg-[#0a0a0a]">
      <BackgroundVideo />
      <BackgroundAudio />
      <CustomCursor />
      <SocialDock />

      {/* Cuadro centralizado y mejorado */}
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-[420px] sm:max-w-[540px] overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-white/10 bg-white/[0.03] p-6 sm:p-10 text-center backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
        >
          {/* Decoración de fondo del cuadro */}
          <div className="absolute -left-32 -top-32 h-60 w-60 rounded-full bg-fuchsia-500/15 blur-[80px]" />
          <div className="absolute -right-32 -bottom-32 h-60 w-60 rounded-full bg-cyan-500/15 blur-[80px]" />

          <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-fuchsia-500/20 blur-2xl rounded-full group-hover:bg-fuchsia-500/40 transition-all duration-500" />
              <img 
                src="/avatar.jpeg" 
                alt="Avatar" 
                className="relative h-20 w-24 sm:h-24 sm:w-24 rounded-3xl border-2 border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-110 object-cover"
              />
            </motion.div>

            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl font-black tracking-tighter leading-none">
                <span className="bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent drop-shadow-2xl">
                  TnMorty
                </span>
              </h1>
              <div className="space-y-1">
                <p className="text-xl sm:text-2xl font-bold tracking-tight text-white/90">
                  Eric Martí Valero
                </p>
                <p className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-white/40">
                  <MapPin className="h-4 w-4 text-white/30" aria-hidden="true" />
                  Barcelona, Spain
                </p>
              </div>
            </div>

            {/* Triggers de Modales */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(217,70,239,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSetupOpen(true)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all hover:bg-white/[0.08]"
              >
                <div className="flex flex-col items-center gap-2">
                  <SetupIcon className="h-6 w-6 text-fuchsia-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">Setup</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34,211,238,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsSteamOpen(true);
                  fetchSteamData();
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all hover:bg-white/[0.08]"
              >
                <div className="flex flex-col items-center gap-2">
                  <SteamIcon className="h-6 w-6 text-cyan-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white truncate">Steam</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255,70,85,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsValorantOpen(true);
                  fetchValorantData();
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all hover:bg-white/[0.08]"
              >
                <div className="flex flex-col items-center gap-2">
                  <Trophy className="h-6 w-6 text-red-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">Valorant</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34,197,94,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMusicOpen(true)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all hover:bg-white/[0.08]"
              >
                <div className="flex flex-col items-center gap-2">
                  <Music className="h-6 w-6 text-green-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white">Música</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </div>

            <div className="w-full flex flex-col items-center gap-2 sm:gap-4 lg:gap-6">
              <div className="h-px w-24 bg-white/5" />
              <div className="w-full">
                <DiscordLive />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal de Setup */}
      <Modal 
        isOpen={isSetupOpen} 
        onClose={() => setIsSetupOpen(false)} 
        title="Gaming Setup"
        neonColor="purple"
      >
        <div className="relative overflow-hidden">
          {/* Efecto láser */}
          <motion.div 
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-fuchsia-500/50 shadow-[0_0_15px_rgba(217,70,239,0.8)] z-20 pointer-events-none"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Cpu, label: "CPU", val: "Ryzen 7 5800X" },
              { icon: Database, label: "GPU", val: "NVIDIA RTX 3070" },
              { icon: HardDrive, label: "RAM", val: "32GB DDR4 3600MHz" },
              { icon: Monitor, label: "Monitor", val: "KOORUI 27E1QA 2K 144Hz IPS" },
              { icon: MousePointer2, label: "Mouse", val: "Logitech G Pro X" },
              { icon: Keyboard, label: "Keyboard", val: "Glorious GMMK2" },
              { icon: Headphones, label: "Audio", val: "Logitech G PRO X" },
              { icon: Mic, label: "Mic", val: "Fifine K669B" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:bg-white/[0.05] transition-colors">
                <item.icon className="h-6 w-6 text-fuchsia-400/80" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{item.label}</span>
                  <span className="text-sm font-bold text-white/90">{item.val}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Modal de Steam */}
      <Modal 
        isOpen={isSteamOpen} 
        onClose={() => setIsSteamOpen(false)} 
        title="Actividad de Steam"
        neonColor="blue"
      >
        <div className="flex flex-col gap-6">
          {/* Cabecera: Perfil y Nivel */}
          <div className="flex items-center justify-between px-6 py-4 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-4">
              {steamData?.player?.avatarfull && (
                <img 
                  src={steamData.player.avatarfull} 
                  alt="Steam Avatar" 
                  className="h-14 w-14 rounded-2xl border border-white/10 shadow-lg"
                />
              )}
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight">{steamData?.player?.personaname || "TnMorty"}</span>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${steamData?.player?.personastate > 0 ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-gray-500"}`} />
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                    {steamData?.player?.gameextrainfo ? "Jugando ahora" : steamData?.player?.personastate > 0 ? "En línea" : "Desconectado"}
                  </span>
                </div>
              </div>
            </div>
            <a 
              href="https://steamcommunity.com/id/TnMorty/" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:bg-cyan-500/20 transition-all"
            >
              Perfil <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Grid de Juegos (Más actividad) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {steamData?.recentGames?.map((game: any) => (
              <div key={game.appid} className="group relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-lg transition-all hover:border-cyan-500/30">
                <img 
                  src={`https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.appid}/capsule_616x353.jpg`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-100"
                  alt={game.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h4 className="text-xs font-black text-white truncate mb-0.5">{game.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold text-cyan-400/60 uppercase tracking-tighter">Actividad</span>
                    <span className="text-[9px] font-black text-white/60 uppercase">{Math.floor(game.playtime_2weeks / 60)}h recientes</span>
                  </div>
                </div>
              </div>
            )) || (
              <div className="col-span-2 py-10 text-center">
                <span className="text-sm font-bold text-white/20 uppercase tracking-widest animate-pulse">Cargando actividad...</span>
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Modal de Valorant */}
      <Modal 
        isOpen={isValorantOpen} 
        onClose={() => setIsValorantOpen(false)} 
        title="Valorant Stats"
        neonColor="blue"
      >
        <div className="flex flex-col gap-6">
          {valorantData ? (
            <>
              {/* Card de Rango */}
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 p-8">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Target className="h-32 w-32 text-red-500" />
                </div>
                
                <div className="relative z-10 flex flex-col items-center text-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
                    <img 
                      src={valorantData.images?.small || valorantData.images?.large} 
                      alt={valorantData.currenttierpatched} 
                      className="h-32 w-32 relative drop-shadow-[0_0_15px_rgba(255,70,85,0.5)]"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">Rango Actual</span>
                    <h3 className="text-4xl font-black text-white tracking-tighter uppercase flex items-center justify-center gap-3">
                      {valorantData.currenttierpatched}
                      {valorantData.currenttierpatched?.toLowerCase().includes("immortal") && valorantData.leaderboard_rank && (
                        <span className="text-xl text-red-400 font-black">
                          #{valorantData.leaderboard_rank}
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center justify-center gap-3 mt-2">
                      <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                        <Trophy className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs font-black text-white/80">{valorantData.elo} MMR</span>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        <span className="text-xs font-black text-white/80">EU West</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón Tracker */}
              <div className="flex justify-center mt-2">
                <a 
                  href="https://tracker.gg/valorant/profile/riot/TnMorty%23Akali/overview?platform=pc&playlist=competitive&season=ce2783e8-44fc-dd48-3da3-33b5ba6c4a22"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-500/20 transition-all group"
                >
                  Ir al Tracker <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Estadísticas Secundarias */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-white/[0.03] border border-white/5 p-6 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Puntos de Rango</span>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-black text-white">{valorantData.ranking_in_tier}</span>
                    <span className="text-xs font-bold text-white/20 mb-1">/ 100</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${valorantData.ranking_in_tier}%` }}
                      className="h-full bg-red-500 shadow-[0_0_8px_rgba(255,70,85,0.5)]"
                    />
                  </div>
                </div>
                <div className="rounded-3xl bg-white/[0.03] border border-white/5 p-6 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Último Cambio</span>
                  <span className={`text-xl font-black ${valorantData.mmr_change_to_last_game >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {valorantData.mmr_change_to_last_game >= 0 ? "+" : ""}{valorantData.mmr_change_to_last_game} RR
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="py-20 text-center flex flex-col items-center gap-4">
              <div className="h-12 w-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin" />
              <span className="text-xs font-black text-white/20 uppercase tracking-[0.2em]">Sincronizando con Riot Games...</span>
            </div>
          )}
        </div>
      </Modal>

      {/* Modal de Música */}
      <Modal
        isOpen={isMusicOpen}
        onClose={() => setIsMusicOpen(false)}
        title="Mi Música Favorita"
        neonColor="purple"
      >
        <div className="w-full">
          <div 
            className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/40 shadow-2xl transition-all duration-500"
            onMouseEnter={() => document.body.setAttribute("data-hide-cursor", "true")}
            onMouseLeave={() => document.body.removeAttribute("data-hide-cursor")}
          >
            <iframe 
              src="https://open.spotify.com/embed/playlist/2iuE2kHOzx5JgCmwBBcwzn?utm_source=generator&theme=0" 
              width="100%" 
              height="380" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="relative z-10 block rounded-[1.5rem]"
              style={{ 
                imageRendering: 'auto',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden'
              }}
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-[1.5rem] z-20" />
          </div>
          <p className="mt-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] text-center">
            Escuchando desde Spotify Premium
          </p>
        </div>
      </Modal>

      {/* Botón de Perfil Profesional - Inferior Derecha */}
      <div className="fixed bottom-8 right-8 z-50">
        <GlowCTA />
      </div>

      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10 opacity-20 text-[10px] text-white/50 tracking-widest pointer-events-none">
        © {new Date().getFullYear()} TNMORTY
      </footer>
    </main>
  );
}
