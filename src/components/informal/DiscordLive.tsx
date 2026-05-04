"use client";

import { useLanyardWS } from "use-lanyard";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Gamepad2 } from "lucide-react";
import { useEffect, useState } from "react";

const DISCORD_ID = "344169903995224064";

export function DiscordLive() {
  const data = useLanyardWS(DISCORD_ID);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !data) return null;

  const user = data.discord_user;
  const status = data.discord_status;
  const activities = data.activities || [];
  
  // Filtrar actividades (Juegos, Spotify, etc.)
  // tipo 0: Juego, tipo 2: Spotify/Música
  const displayActivities = activities.filter(a => a.type === 0 || a.type === 2);
  const spotify = data.spotify;

  const statusColors = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  };

  const statusLabels = {
    online: "Online",
    idle: "Ausente",
    dnd: "No molestar",
    offline: "Offline",
  };

  // Helper para obtener la URL de la imagen del asset de Discord
  const getAssetUrl = (appId: string, assetId: string) => {
    // Si el assetId ya es una URL (a veces ocurre con links externos)
    if (assetId.startsWith("http")) return assetId;
    
    // Si es un asset externo de Discord (usado en juegos como Valorant o Spotify)
    if (assetId.startsWith("mp:external/")) {
      // El formato suele ser mp:external/HASH/https/url_real
      // Discord lo sirve a través de su propio proxy media.discordapp.net
      return `https://media.discordapp.net/external/${assetId.replace("mp:external/", "")}`;
    }
    
    // Si es un asset normal de una aplicación de Discord
    // Probamos con .png que es el más compatible para assets de juegos
    return `https://cdn.discordapp.com/app-assets/${appId}/${assetId}.png`;
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      {/* Perfil de Usuario y Estado */}
      <div className="flex items-center justify-between px-5 py-4 rounded-[2rem] bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            {user.avatar && (
              <img 
                src={`https://cdn.discordapp.com/avatars/${DISCORD_ID}/${user.avatar}.webp?size=128`}
                alt={user.username}
                className="h-14 w-14 rounded-2xl shadow-lg border border-white/10"
              />
            )}
            <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#0a0a0a] ${statusColors[status] || statusColors.offline} shadow-sm`} />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-lg font-bold text-white tracking-tight">{user.global_name || user.username}</span>
            <span className="text-xs font-medium text-white/40 tracking-wider">@{user.username}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-black">Discord Live</span>
          <span className="text-[11px] font-bold text-white/60 uppercase tracking-wider">{statusLabels[status] || statusLabels.offline}</span>
        </div>
      </div>

      {/* Actividades */}
      <div className="grid gap-3">
        <AnimatePresence mode="popLayout">
          {displayActivities.map((activity, idx) => {
            // Si es Spotify, renderizar diseño especial
            if (activity.type === 2 && spotify) {
              return (
                <motion.div 
                  key="spotify"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative overflow-hidden flex items-center gap-4 px-5 py-4 rounded-[2rem] bg-green-500/5 border border-green-500/20 backdrop-blur-2xl shadow-lg"
                >
                  {spotify.album_art_url && (
                    <img 
                      src={spotify.album_art_url} 
                      alt={spotify.album || "Album Art"} 
                      className="h-16 w-16 rounded-xl shadow-2xl border border-white/5"
                    />
                  )}
                  <div className="flex flex-col min-w-0 flex-1 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-green-400/60 uppercase tracking-[0.15em] font-black">Escuchando</span>
                      <Music className="h-4 w-4 text-green-400 animate-pulse" />
                    </div>
                    <span className="text-base font-bold text-white truncate tracking-tight leading-tight">{spotify.song}</span>
                    <span className="text-xs font-medium text-white/50 truncate mb-2">{spotify.artist}</span>
                    
                    {spotify.timestamps?.start && spotify.timestamps?.end && (
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${Math.min(100, Math.max(0, ((Date.now() - spotify.timestamps.start) / (spotify.timestamps.end - spotify.timestamps.start)) * 100))}%` 
                          }}
                          transition={{ duration: 1, ease: "linear" }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            }

            {/* Actividad de Juego (tipo 0) u otras */}
            if (activity.type === 0) {
              const largeImageUrl = activity.assets?.large_image 
                ? getAssetUrl(activity.application_id!, activity.assets.large_image)
                : null;
              
              const smallImageUrl = activity.assets?.small_image
                ? getAssetUrl(activity.application_id!, activity.assets.small_image)
                : null;

              return (
                <motion.div 
                  key={activity.id || activity.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-4 px-5 py-4 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/20 backdrop-blur-2xl shadow-lg group/activity"
                >
                  <div className="relative h-16 w-16 flex-shrink-0">
                    {largeImageUrl ? (
                      <img 
                        src={largeImageUrl}
                        alt={activity.name}
                        className="h-full w-full rounded-xl object-cover shadow-2xl border border-white/5 transition-transform duration-500 group-hover/activity:scale-110"
                        onError={(e) => {
                          // Si falla el .png, intentamos con .webp o mostramos fallback
                          const target = e.target as HTMLImageElement;
                          if (target.src.endsWith(".png")) {
                            target.src = target.src.replace(".png", ".webp");
                          } else {
                            target.style.display = 'none';
                            target.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                          }
                        }}
                      />
                    ) : (
                      <div className="h-full w-full rounded-xl bg-indigo-500/10 border border-indigo-500/20 shadow-inner flex items-center justify-center">
                        <Gamepad2 className="h-6 w-6 text-indigo-300" />
                      </div>
                    )}
                    
                    {/* Fallback icon si la imagen falla */}
                    <div className="fallback-icon hidden absolute inset-0 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Gamepad2 className="h-6 w-6 text-indigo-300" />
                    </div>

                    {smallImageUrl && (
                      <img 
                        src={smallImageUrl}
                        alt="Small Asset"
                        className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-[#0a0a0a] shadow-lg"
                        onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                      />
                    )}
                  </div>
                  <div className="flex flex-col text-left min-w-0 flex-1">
                    <span className="text-[10px] text-indigo-300/60 uppercase tracking-[0.15em] font-black">Jugando a</span>
                    <span className="text-base font-bold text-white tracking-tight leading-tight truncate">{activity.name}</span>
                    <div className="flex flex-col">
                      {activity.details && (
                        <span className="text-[11px] text-white/50 font-medium truncate" title={activity.details}>{activity.details}</span>
                      )}
                      {activity.state && (
                        <span className="text-[11px] text-white/40 font-medium truncate" title={activity.state}>{activity.state}</span>
                      )}
                    </div>
                    {activity.timestamps?.start && (
                      <span className="text-[10px] text-indigo-400/60 font-black mt-1 uppercase tracking-wider">
                        HACE {Math.floor((Date.now() - activity.timestamps.start) / 60000)} MINUTOS
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            }

            return null;
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
