import { Icon } from "@iconify/react";
import type { IconSource } from "../types";

interface EntryIconProps {
  icon?: IconSource;
  title: string;
  size?: number; // px
}

export default function EntryIcon({ icon, title, size = 32 }: EntryIconProps) {
  const letter = title.charAt(0).toUpperCase();

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
    return (
      <span className={wrapClass} style={style}>
        <Icon icon={icon.value} style={{ fontSize: size * 0.7 }} />
      </span>
    );
  }

  // url type — external or local asset
  return (
    <span className={wrapClass} style={style}>
      <img
        src={icon.value}
        alt={title}
        style={{ width: size * 0.7, height: size * 0.7, objectFit: "contain" }}
        onError={(e) => {
          // fallback to letter on broken image
          const target = e.currentTarget;
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