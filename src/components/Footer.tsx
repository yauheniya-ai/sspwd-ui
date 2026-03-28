import type { SVGProps } from "react";
import { IconGithub, IconPypi, IconApi, IconBook } from "../constants/icons";

type NavIcon = (props: SVGProps<SVGSVGElement>) => React.ReactElement;

const LINKS: Array<{ label: string; href: string; Icon: NavIcon }> = [
  { label: "GitHub",        href: "https://github.com/yauheniya-ai/sspwd",  Icon: IconGithub },
  { label: "PyPI",          href: "https://pypi.org/project/sspwd",          Icon: IconPypi   },
  { label: "API Docs",      href: "/api/v1/docs",                            Icon: IconApi    },
  { label: "Documentation", href: "/docs",                                   Icon: IconBook   },
];

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-6 py-3 bg-black border-t border-white/10">
      {/* Brand pill */}
      <span
        className="font-mono text-sm font-bold text-white 
                  bg-gradient-to-b from-blue-700 to-red-700
                  px-3 py-0.5 rounded-sm tracking-widest"
      >
        sspwd
      </span>

      {/* Nav links */}
      <nav className="flex items-center gap-6">
        {LINKS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="flex items-center gap-1.5 font-mono text-sm text-white/60 hover:text-white transition-colors"
          >
            <Icon className="w-4 h-4" />
            {label}
          </a>
        ))}
      </nav>

      {/* Version */}
      <span className="font-mono text-xs text-white/70">v0.3.0</span>
    </footer>
  );
}
