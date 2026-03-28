import { Icon } from "@iconify/react";
import type { IconSource } from "../types";
import { useCachedIconUrl } from "../contexts/IconCacheContext";

interface EntryIconProps {
  icon?: IconSource;
  title: string;
  size?: number; // px
}

export default function EntryIcon({ icon, title, size = 32 }: EntryIconProps) {
  const letter     = title.charAt(0).toUpperCase();
  const cachedUrl  = useCachedIconUrl(icon);

  const wrapClass = "flex items-center justify-center rounded-sm overflow-hidden shrink-0 bg-white/5 border border-white/10";
  const style = { width: size, height: size, minWidth: size };

  if (!icon || icon.type === "letter") {
    return (
      <span
        className={`${wrapClass} font-mono font-bold text-white/60`}
        style={{ ...style, fontSize: size * 0.45 }}
      >
        {icon?.value || letter}
      </span>
    );
  }

  if (icon.type === "iconify") {
    // Use cached SVG (served locally) when available so the icon renders offline.
    // Falls back to the @iconify/react live-fetching component when not yet cached.
    if (cachedUrl) {
      return (
        <span className={wrapClass} style={style}>
          <img
            src={cachedUrl}
            alt={title}
            style={{ width: size * 0.7, height: size * 0.7, objectFit: "contain" }}
            onError={(e) => {
              // Cache file missing — fall back to live Iconify render
              const parent = e.currentTarget.parentElement as HTMLElement | null;
              if (parent) {
                e.currentTarget.replaceWith(
                  Object.assign(document.createElement("span"), {
                    style: `font-size:${size * 0.7}px`,
                  })
                );
              }
            }}
          />
        </span>
      );
    }
    return (
      <span className={wrapClass} style={style}>
        <Icon icon={icon.value} style={{ fontSize: size * 0.7 }} />
      </span>
    );
  }

  // url type — prefer the locally cached copy, fall back to the remote URL
  const src = cachedUrl ?? icon.value;
  return (
    <span className={wrapClass} style={style}>
      <img
        src={src}
        alt={title}
        style={{ width: size * 0.7, height: size * 0.7, objectFit: "contain" }}
        onError={(e) => {
          const target = e.currentTarget;
          // If we tried the cache and it failed, attempt the original remote URL
          if (cachedUrl && src === cachedUrl) {
            target.src = icon.value;
            return;
          }
          // Both failed — show the letter fallback
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            parent.textContent = letter;
            parent.classList.add("font-mono", "font-bold", "text-white/60");
            (parent as HTMLElement).style.fontSize = `${size * 0.45}px`;
          }
        }}
      />
    </span>
  );
}
