type BadgeColor = "red" | "green" | "blue" | "purple";

const COLOR_MAP: Record<BadgeColor, { active: string; inactive: string }> = {
  red:    { active: "bg-red-700 text-white border-red-600 hover:bg-red-600",       inactive: "hover:border-red-700 hover:text-white" },
  green:  { active: "bg-green-700 text-white border-green-600 hover:bg-green-600", inactive: "hover:border-green-600 hover:text-green-400" },
  blue:   { active: "bg-blue-700 text-white border-blue-600 hover:bg-blue-600",    inactive: "hover:border-blue-600 hover:text-blue-400" },
  purple: { active: "bg-purple-700 text-white border-purple-600 hover:bg-purple-600", inactive: "hover:border-purple-700 hover:text-white" },
};

interface TagBadgeProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  removable?: boolean;
  onRemove?: () => void;
  size?: "sm" | "md";
  color?: BadgeColor;
}

export default function TagBadge({
  label,
  active = false,
  onClick,
  removable = false,
  onRemove,
  size = "md",
  color = "red",
}: TagBadgeProps) {
  const base =
    "inline-flex items-center gap-1 font-mono border rounded-sm transition-all cursor-pointer select-none";
  const sizeClass = size === "sm" ? "text-xs px-1.5 py-0.5" : "text-xs px-2 py-0.5";
  const { active: ac, inactive: ic } = COLOR_MAP[color];
  const colorClass = active
    ? ac
    : `bg-transparent text-white/50 border-white/20 ${ic}`;

  return (
    <span className={`${base} ${sizeClass} ${colorClass}`} onClick={onClick}>
      {label}
      {removable && (
        <button
          className="ml-0.5 text-white/60 hover:text-white leading-none"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
        >
          ×
        </button>
      )}
    </span>
  );
}