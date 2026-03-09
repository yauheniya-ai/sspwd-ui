import { useState } from "react";
import { Icon } from "@iconify/react";
import EntryIcon from "./EntryIcon";
import TagBadge from "./TagBadge";
import type { PasswordEntry } from "../types";

const SERVICE_TYPE_STYLE: Record<string, string> = {
  free:     "text-green-400 border-green-800",
  paid:     "text-blue-400 border-blue-800",
  freemium: "text-yellow-400 border-yellow-800",
  unknown:  "text-white/30 border-white/10",
};

interface PasswordCardProps {
  entry: PasswordEntry;
  onSelect: (entry: PasswordEntry) => void;
  selected: boolean;
}

export default function PasswordCard({ entry, onSelect, selected }: PasswordCardProps) {
  const [pwVisible, setPwVisible] = useState(false);
  const [copied, setCopied]       = useState<"user" | "pwd" | null>(null);

  const copy = (text: string, field: "user" | "pwd") => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <article
      onClick={() => onSelect(entry)}
      className={`group flex flex-col gap-3 p-4 rounded-sm border cursor-pointer transition-all ${
        selected
          ? "bg-blue-700/15 border-blue-700"
          : "bg-black/30 border-white/10 hover:border-white/25 hover:bg-black/50"
      }`}
    >
      {/* Top row: icon + title + service badge */}
      <div className="flex items-start gap-3">
        <EntryIcon icon={entry.icon} title={entry.title} size={36} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono font-semibold text-white text-sm truncate">
              {entry.title}
            </span>
            <span
              className={`font-mono text-xs border rounded-sm px-1.5 py-px ${
                SERVICE_TYPE_STYLE[entry.serviceType] ?? SERVICE_TYPE_STYLE.unknown
              }`}
            >
              {entry.serviceType}
            </span>
          </div>
          <span className="font-mono text-xs text-white/40 truncate block">{entry.category}</span>
        </div>

        {/* External link */}
        {entry.url && (
          <a
            href={entry.url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-white/25 hover:text-blue-400 transition-colors shrink-0"
            title={entry.url}
          >
            <Icon icon="mdi:open-in-new" className="text-sm" />
          </a>
        )}
      </div>

      {/* Username row */}
      <div className="flex items-center gap-2 bg-black/40 border border-white/8 rounded-sm px-3 py-1.5">
        <Icon icon="mdi:account-outline" className="text-white/30 text-sm shrink-0" />
        <span className="font-mono text-xs text-white/60 flex-1 truncate">{entry.username}</span>
        <button
          onClick={(e) => { e.stopPropagation(); copy(entry.username, "user"); }}
          className="text-white/20 hover:text-white transition-colors shrink-0"
          title="Copy username"
        >
          <Icon
            icon={copied === "user" ? "mdi:check" : "mdi:content-copy"}
            className={`text-xs ${copied === "user" ? "text-green-400" : ""}`}
          />
        </button>
      </div>

      {/* Password row */}
      <div className="flex items-center gap-2 bg-black/40 border border-white/8 rounded-sm px-3 py-1.5">
        <Icon icon="mdi:lock-outline" className="text-white/30 text-sm shrink-0" />
        <span className="font-mono text-xs text-white/50 flex-1 tracking-widest">
          {pwVisible ? entry.password : "••••••••••••"}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); setPwVisible((v) => !v); }}
          className="text-white/20 hover:text-white transition-colors shrink-0"
          title={pwVisible ? "Hide" : "Reveal"}
        >
          <Icon icon={pwVisible ? "mdi:eye-off-outline" : "mdi:eye-outline"} className="text-xs" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); copy(entry.password, "pwd"); }}
          className="text-white/20 hover:text-white transition-colors shrink-0"
          title="Copy password"
        >
          <Icon
            icon={copied === "pwd" ? "mdi:check" : "mdi:content-copy"}
            className={`text-xs ${copied === "pwd" ? "text-green-400" : ""}`}
          />
        </button>
      </div>

      {/* Tags */}
      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {entry.tags.map((tag) => (
            <TagBadge key={tag} label={tag} size="sm" />
          ))}
        </div>
      )}

      {/* Updated at */}
      <p className="font-mono text-xs text-white/20 text-right">
        updated {new Date(entry.updatedAt).toLocaleDateString("en-GB")}
      </p>
    </article>
  );
}