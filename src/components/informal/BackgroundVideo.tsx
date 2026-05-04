"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Background video component with fallback and dark overlay.
 */
export function BackgroundVideo({
  src = "/videos/hero.mp4",
  poster,
}: {
  src?: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sources = useMemo(() => [{ src, type: "video/mp4" }], [src]);
  const [canPlay, setCanPlay] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log("Autoplay prevented");
      });
    }
  }, []);

  // If the codec isn't supported (e.g. HEVC), video may stay black.
  // We keep a dark-tech fallback background so it never looks "empty".
  useEffect(() => {
    setCanPlay(false);
    setFailed(false);

    // Fallback: si en 2 segundos no ha disparado onCanPlay, intentamos mostrarlo
    const timer = setTimeout(() => {
      setCanPlay(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [src]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <video
        ref={videoRef}
        className={[
          "h-full w-full object-cover transition-opacity duration-1000",
          canPlay ? "opacity-60" : "opacity-0",
        ].join(" ")}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        disablePictureInPicture
        onCanPlay={() => setCanPlay(true)}
        onError={() => setFailed(true)}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>

      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}

