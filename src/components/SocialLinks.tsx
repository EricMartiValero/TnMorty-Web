import { Github, Linkedin, Mail } from "lucide-react";

const LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/eric-mart%C3%AD-valero-930191372/",
    Icon: Linkedin,
  },
  { label: "GitHub", href: "https://github.com/EricMartiValero", Icon: Github },
  { label: "Email", href: "mailto:martivaleroeric@gmail.com", Icon: Mail },
];

export function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {LINKS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className={[
            "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2",
            "text-sm text-white/80 transition-colors hover:bg-white/[0.08] hover:text-white",
            "focus:outline-none focus:ring-2 focus:ring-white/25",
          ].join(" ")}
          aria-label={label}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}

