"use client";

import { useEffect, useMemo, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function Counter({
  value,
  prefix = "",
  suffix = "",
  durationMs = 900,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}) {
  const [n, setN] = useState(0);
  const target = useMemo(() => (Number.isFinite(value) ? value : 0), [value]);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const tick = (ts: number) => {
      const t = Math.min(1, (ts - start) / durationMs);
      setN(Math.round(target * easeOutCubic(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, target]);

  return (
    <span className="tabular-nums tracking-tight">
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

