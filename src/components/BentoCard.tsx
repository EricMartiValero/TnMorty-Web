import type { ReactNode } from "react";

export function BentoCard({
  title,
  eyebrow,
  children,
  className = "",
  icon,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <section
      className={[
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur",
        "transition-colors hover:bg-white/[0.06]",
        className,
      ].join(" ")}
    >
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/55">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-1 text-lg font-semibold leading-tight text-white">{title}</h2>
        </div>
        {icon ? (
          <div className="shrink-0 rounded-xl border border-white/10 bg-black/30 p-2 text-white/70">
            {icon}
          </div>
        ) : null}
      </header>
      <div className="mt-4">{children}</div>
    </section>
  );
}

