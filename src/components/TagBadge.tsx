interface TagBadgeProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  removable?: boolean;
  onRemove?: () => void;
  size?: "sm" | "md";
}

export default function TagBadge({
  label,
  active = false,
  onClick,
  removable = false,
  onRemove,
  size = "md",
}: TagBadgeProps) {
  const base =
    "inline-flex items-center gap-1 font-mono border rounded-sm transition-all cursor-pointer select-none";
  const sizeClass = size === "sm" ? "text-xs px-1.5 py-0.5" : "text-xs px-2 py-0.5";
  const colorClass = active
    ? "bg-red-700 text-white border-red-600 hover:bg-red-600"
    : "bg-transparent text-white/50 border-white/20 hover:border-red-700 hover:text-white";

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