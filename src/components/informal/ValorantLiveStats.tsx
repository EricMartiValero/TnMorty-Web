"use client";

import { Shield } from "lucide-react";
import { GlassCard } from "./GlassCard";

export function ValorantLiveStats() {
  return (
    <GlassCard
      title="Live Stats"
      subtitle="Simulado · Tracker.gg"
      right={<Shield className="h-4 w-4 text-white/70" aria-hidden="true" />}
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-white/55">Rango</div>
          <div className="mt-1 text-lg font-semibold text-white">Immortal</div>
          <div className="mt-1 text-xs text-white/60">Conexión: simulada</div>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-[0.18em] text-white/55">K/D</div>
          <div className="mt-1 text-lg font-semibold text-white">1.32</div>
          <div className="mt-1 text-xs text-white/60">Últimas 10</div>
        </div>
      </div>
    </GlassCard>
  );
}

