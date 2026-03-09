import { Icon } from "@iconify/react";

const LINKS = [
  { label: "GitHub",        href: "https://github.com/yauheniya-ai/sspwd",  icon: "mdi:github" },
  { label: "PyPI",          href: "https://pypi.org/project/sspwd",          icon: "simple-icons:pypi" },
  { label: "API Docs",      href: "/api/v1/docs",                            icon: "mdi:api" },
  { label: "Documentation", href: "/docs",                                   icon: "mdi:book-open-outline" },
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
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="flex items-center gap-1.5 font-mono text-sm text-white/60 hover:text-white transition-colors"
          >
            <Icon icon={link.icon} className="text-base" />
            {link.label}
          </a>
        ))}
      </nav>

      {/* Version */}
      <span className="font-mono text-xs text-white/30">v0.1.0</span>
    </footer>
  );
}