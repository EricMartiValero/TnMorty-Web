"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function GlowCTA() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
      <Link
        href="/PerfilProfesional"
        className={[
          "group relative inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white",
          "border border-fuchsia-300/25 bg-fuchsia-300/10 backdrop-blur",
          "shadow-[0_0_0_1px_rgba(217,70,239,0.15)_inset,0_0_40px_rgba(217,70,239,0.18)]",
          "transition-all hover:bg-fuchsia-300/15 hover:shadow-[0_0_0_1px_rgba(217,70,239,0.20)_inset,0_0_60px_rgba(217,70,239,0.26)]",
          "focus:outline-none focus:ring-2 focus:ring-fuchsia-300/40",
        ].join(" ")}
      >
        Perfil Profesional
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_70%_60%,rgba(217,70,239,0.25),transparent_55%)] opacity-60" />
      </Link>
    </motion.div>
  );
}

