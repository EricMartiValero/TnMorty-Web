"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const sx = useSpring(x, { stiffness: 700, damping: 35, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 700, damping: 35, mass: 0.25 });

  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkVisibility = () => {
      setIsVisible(!document.body.hasAttribute("data-hide-cursor"));
    };
    
    const observer = new MutationObserver(checkVisibility);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-hide-cursor"] });
    
    return () => observer.disconnect();
  }, []);

  const interactiveSelector = useMemo(
    () =>
      [
        "a[href]",
        "button",
        "[role='button']",
        "input",
        "select",
        "textarea",
        "[data-cursor='interactive']",
      ].join(","),
    []
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const el = e.target instanceof Element ? e.target : null;
      setIsInteractive(Boolean(el?.closest(interactiveSelector)));
    };
    const onOut = () => setIsInteractive(false);

    const prevBodyCursor = document.body.style.cursor;
    const prevHtmlCursor = document.documentElement.style.cursor;
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      document.body.style.cursor = prevBodyCursor;
      document.documentElement.style.cursor = prevHtmlCursor;
    };
  }, [interactiveSelector, x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className={[
        "pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full",
        "border border-fuchsia-300/35 bg-fuchsia-300/10 backdrop-blur-sm",
        "shadow-[0_0_30px_rgba(217,70,239,0.25)] [@media(pointer:fine)]:block",
        !isVisible ? "opacity-0" : "opacity-100",
      ].join(" ")}
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? (isInteractive ? 1.25 : 1) : 0,
        boxShadow: isInteractive
          ? "0 0 60px rgba(34,211,238,0.25)"
          : "0 0 30px rgba(217,70,239,0.25)",
        borderColor: isInteractive
          ? "rgba(34,211,238,0.55)"
          : "rgba(217,70,239,0.35)",
        backgroundColor: isInteractive
          ? "rgba(34,211,238,0.12)"
          : "rgba(217,70,239,0.10)",
      }}
      transition={{ type: "spring", stiffness: 520, damping: 28, mass: 0.22 }}
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={
          isInteractive
            ? { opacity: [0.25, 0.7, 0.25], scale: [1, 1.5, 1] }
            : { opacity: [0.15, 0.35, 0.15], scale: [1, 1.25, 1] }
        }
        transition={{ duration: isInteractive ? 0.9 : 1.2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          boxShadow: isInteractive
            ? "0 0 0 1px rgba(34,211,238,0.18) inset"
            : "0 0 0 1px rgba(217,70,239,0.12) inset",
        }}
      />
    </motion.div>
  );
}

