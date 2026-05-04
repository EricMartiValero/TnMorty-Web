import type { ReactNode } from "react";

export function GlassCard({
  title,
  subtitle,
  children,
  className = "",
  right,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  right?: ReactNode;
}) {
  return (
    <section
      className={[
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_10px_40px_rgba(0,0,0,0.45)]",
        "backdrop-blur-md",
        className,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-wide text-white">{title}</h2>
          {subtitle ? <p className="mt-1 text-xs text-white/60">{subtitle}</p> : null}
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(217,70,239,0.12),transparent_40%),radial-gradient(circle_at_90%_40%,rgba(34,211,238,0.10),transparent_45%)]" />
    </section>
  );
}

