"use client";

import Link from "next/link";
import { BentoCard } from "@/components/BentoCard";
import { Counter } from "@/components/Counter";
import { SocialLinks } from "@/components/SocialLinks";
import { getAgeFromBirthdate } from "@/lib/age";
import { ArrowLeft, Briefcase, GraduationCap, Languages, Sparkles } from "lucide-react";

const STUDIES = [
  { title: "GS en Desarrollo de Aplicaciones Multiplataforma (DAM)", org: "Grupo Aspasia" },
  { title: "Desarrollo de Aplicaciones Web (DAW)", org: "Grupo Aspasia" },
  { title: "GM en Sistemas Microinformáticos y Redes", org: "Institut Marianao" },
  { title: "ESO", org: "Institut Camps Blancs" },
];

const EXPERIENCE = [
  {
    role: "Web Designer & Developer",
    org: "Tofeek & Black",
    bullets: [
      "Diseño y desarrollo web end-to-end con enfoque en conversión y rendimiento.",
      "Liderazgo técnico y coordinación con cliente para entrega estable y escalable.",
      "Optimización online: velocidad, estructura y experiencia para mejorar resultados.",
    ],
  },
  {
    role: "Web Designer & Developer",
    org: "Nury Valero Academy",
    bullets: [
      "Liderazgo técnico en la implementación y evolución de la presencia digital.",
      "Estandarización visual y consistencia de marca en todas las plataformas.",
      "Mejora continua basada en métricas y objetivos de negocio.",
    ],
  },
  {
    role: "Web Designer & Developer",
    org: "Elektra Nails",
    bullets: [
      "Arquitectura y ejecución de web profesional enfocada en captación.",
      "Optimización de contenidos y estructura para mejorar claridad y visibilidad.",
      "Iteración rápida: mantenimiento y ajustes continuos según necesidades.",
    ],
  },
];

const LANGUAGES_LIST = [
  { name: "Catalán", level: "Nativo", width: 100 },
  { name: "Castellano", level: "Nativo", width: 100 },
  { name: "Inglés", level: "B2", width: 70 },
];

const SOFT_SKILLS = ["Gestión de clientes", "Resolución de problemas", "Adaptabilidad", "Autogestión"];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white/80">
      {children}
    </span>
  );
}

export default function PerfilProfesionalPage() {
  const age = getAgeFromBirthdate("2007-02-03");

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto w-full max-w-6xl px-6 py-14">
        <header className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div className="min-w-0">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/55">
                  Perfil profesional · Barcelona · {age} años
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Eric Martí Valero <span className="text-white/65">(TnMorty)</span>
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/75">
                  Bio por hacer - En desarrollo.
                </p>
                <div className="mt-5">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Ir al perfil personal (Informal)
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3">
                  <div className="text-sm text-white/55">Proyectos reales</div>
                  <div className="mt-1 text-2xl font-semibold text-white">
                    <Counter prefix="+" value={3} />
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3">
                  <div className="text-sm text-white/55">Títulos técnicos</div>
                  <div className="mt-1 text-2xl font-semibold text-white">
                    <Counter prefix="+" value={2} />
                  </div>
                </div>
              </div>
            </div>

            <SocialLinks />
          </div>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12">
          <BentoCard
            title="Estudios"
            eyebrow="Formación"
            icon={<GraduationCap className="h-4 w-4" aria-hidden="true" />}
            className="md:col-span-7"
          >
            <div className="grid gap-3">
              {STUDIES.map((s) => (
                <div key={s.title} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <div className="text-sm font-medium text-white">{s.title}</div>
                  <div className="mt-1 text-sm text-white/65">{s.org}</div>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard
            title="Idiomas"
            eyebrow="Comunicación"
            icon={<Languages className="h-4 w-4" aria-hidden="true" />}
            className="md:col-span-5"
          >
            <div className="space-y-4">
              {LANGUAGES_LIST.map((l) => (
                <div key={l.name} className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium text-white">{l.name}</div>
                    <div className="text-sm text-white/55">{l.level}</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-white/70" style={{ width: `${l.width}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard
            title="Experiencia"
            eyebrow="Profesional"
            icon={<Briefcase className="h-4 w-4" aria-hidden="true" />}
            className="md:col-span-8"
          >
            <div className="space-y-4">
              {EXPERIENCE.map((e) => (
                <article key={e.org} className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-sm font-semibold text-white">{e.role}</div>
                    <div className="text-sm text-white/65">{e.org}</div>
                  </div>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/75">
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </BentoCard>

          <BentoCard
            title="Soft Skills"
            eyebrow="Forma de trabajar"
            icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
            className="md:col-span-4"
          >
            <div className="flex flex-wrap gap-2">
              {SOFT_SKILLS.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-sm font-medium text-white">Enfoque</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Proyectos web, optimización online y mejora continua de presencia digital.
              </p>
            </div>
          </BentoCard>
        </div>

        <footer className="mt-12 border-t border-white/10 pt-8 text-sm text-white/55">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Eric Martí Valero</p>
            <Link
              href="/"
              className="text-white/40 transition-colors hover:text-white/70"
            >
              Volver al perfil personal (Informal)
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

