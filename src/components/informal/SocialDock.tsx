import type { ReactNode } from "react";
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitch,
  Twitter,
} from "lucide-react";

type Item = { label: string; href: string; icon: ReactNode };

function SteamIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12c0 1.053.136 2.073.39 3.045l4.897 2.016c.36-.264.8-.42 1.275-.42.27 0 .524.053.757.147l2.138-3.085a3.176 3.176 0 0 1-.205-1.127c0-1.767 1.433-3.2 3.2-3.2s3.2 1.433 3.2 3.2-1.433 3.2-3.2 3.2c-.41 0-.796-.078-1.147-.22l-3.082 2.14a3.17 3.17 0 0 1 .15.962c0 1.767-1.433 3.2-3.2 3.2-.843 0-1.608-.328-2.176-.858l-3.328-1.37A11.956 11.956 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm-5.452 18.82c-.967 0-1.75-.783-1.75-1.75s.783-1.75 1.75-1.75 1.75.783 1.75 1.75-.783 1.75-1.75 1.75zm0-2.625c-.483 0-.875.392-.875.875s.392.875.875.875.875-.392.875-.875-.392-.875-.875-.875zm5.902-6.125c-.483 0-.875.392-.875.875s.392.875.875.875.875-.392.875-.875-.392-.875-.875-.875z" />
    </svg>
  );
}

function TikTokIcon({ className = "h-5 w-5" }: { className?: string }) {
  // Clean SVG icon (closer to TikTok mark than generic Music icon)
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M15.35 3c.4 2.55 1.84 4.07 4.3 4.23v2.55c-1.45.08-2.74-.38-4.24-1.28v6.48c0 3.2-2.2 5.55-5.35 5.94-3.18.4-6.1-1.78-6.63-4.92-.58-3.45 2.02-6.55 5.72-6.78.38-.02.77 0 1.22.08v2.78c-.32-.06-.6-.08-.9-.06-1.72.1-3.02 1.5-2.92 3.16.1 1.62 1.58 2.88 3.28 2.72 1.52-.14 2.72-1.46 2.72-3.1V3h2.8z" />
    </svg>
  );
}

const items: Item[] = [
  { label: "Instagram", href: "https://instagram.com/tnmorty", icon: <Instagram className="h-5 w-5" /> },
  { label: "TikTok", href: "https://tiktok.com/@tnmorty_", icon: <TikTokIcon className="h-5 w-5" /> },
  { label: "X", href: "https://x.com/Tn_Morty", icon: <Twitter className="h-5 w-5" /> },
  { label: "Twitch", href: "https://twitch.tv/tnmorty", icon: <Twitch className="h-5 w-5" /> },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/eric-mart%C3%AD-valero-930191372/",
    icon: <Linkedin className="h-5 w-5" />,
  },
  { label: "Email", href: "mailto:tnmorty@gmail.com", icon: <Mail className="h-5 w-5" /> },
  { label: "Steam", href: "https://steamcommunity.com/id/tnmorty", icon: <SteamIcon className="h-5 w-5" /> },
  { label: "GitHub", href: "https://github.com/EricMartiValero", icon: <Github className="h-5 w-5" /> },
];

export function SocialDock() {
  return (
    <div className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 px-4 w-max max-w-full">
      <div
        className={[
          "flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.06] p-1.5 sm:p-2",
          "shadow-[0_10px_50px_rgba(0,0,0,0.55)] backdrop-blur-md",
        ].join(" ")}
      >
        {items.map((it) => (
          <a
            key={it.label}
            href={it.href}
            target={it.href.startsWith("http") ? "_blank" : undefined}
            rel={it.href.startsWith("http") ? "noreferrer" : undefined}
            className={[
              "group relative inline-flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl",
              "text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white",
              "focus:outline-none focus:ring-2 focus:ring-fuchsia-300/35",
            ].join(" ")}
            aria-label={it.label}
            title={it.label}
          >
            {it.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

