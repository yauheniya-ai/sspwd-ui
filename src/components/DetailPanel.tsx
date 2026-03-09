import { useState } from "react";
import { Icon } from "@iconify/react";
import EntryIcon from "./EntryIcon";
import TagBadge from "./TagBadge";
import type { PasswordEntry } from "../types";

interface DetailPanelProps {
  entry: PasswordEntry | null;
  onEdit: (entry: PasswordEntry) => void;
  onDelete: (id: number) => void;
}

function CopyField({ label, value, secret }: { label: string; value: string; secret?: boolean }) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied]   = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-xs text-white/30 uppercase tracking-widest">{label}</span>
      <div className="flex items-center gap-2 bg-black/40 border border-white/8 rounded-sm px-3 py-2">
        <span className="font-mono text-xs text-white/70 flex-1 truncate tracking-widest">
          {secret && !visible ? "••••••••••••" : value}
        </span>
        {secret && (
          <button
            onClick={() => setVisible((v) => !v)}
            className="text-white/25 hover:text-white transition-colors"
          >
            <Icon icon={visible ? "mdi:eye-off-outline" : "mdi:eye-outline"} className="text-sm" />
          </button>
        )}
        <button onClick={copy} className="text-white/25 hover:text-white transition-colors">
          <Icon
            icon={copied ? "mdi:check" : "mdi:content-copy"}
            className={`text-sm ${copied ? "text-green-400" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}

export default function DetailPanel({ entry, onEdit, onDelete }: DetailPanelProps) {
  if (!entry) {
    return (
      <aside className="flex flex-col items-center justify-center h-full text-white/15 px-6 border-l border-white/10 bg-black/20">
        <Icon icon="mdi:lock-outline" className="text-4xl mb-3" />
        <p className="font-mono text-xs text-center">Select an entry<br />to view details</p>
      </aside>
    );
  }

  const updatedDate = new Date(entry.updatedAt).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
  const createdDate = new Date(entry.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });

  return (
    <aside className="flex flex-col h-full overflow-y-auto border-l border-white/10 bg-black/20">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b border-white/10"
        style={{ background: "linear-gradient(to bottom, #1d4ed811, transparent)" }}
      >
        <EntryIcon icon={entry.icon} title={entry.title} size={40} />
        <div className="flex-1 min-w-0">
          <h2 className="font-mono font-bold text-white text-sm truncate">{entry.title}</h2>
          <p className="font-mono text-xs text-white/35 truncate">{entry.category}</p>
        </div>
        {entry.url && (
          <a
            href={entry.url}
            target="_blank"
            rel="noreferrer"
            className="text-white/25 hover:text-blue-400 transition-colors"
          >
            <Icon icon="mdi:open-in-new" />
          </a>
        )}
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-4 px-5 py-5 flex-1">
        <CopyField label="Username" value={entry.username} />
        <CopyField label="Password" value={entry.password} secret />
        {entry.url && <CopyField label="URL" value={entry.url} />}

        {entry.notes && (
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Notes</span>
            <p className="font-mono text-xs text-white/55 bg-black/40 border border-white/8 rounded-sm px-3 py-2 whitespace-pre-wrap">
              {entry.notes}
            </p>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Tags</span>
          <div className="flex flex-wrap gap-1.5">
            {entry.tags.length > 0 ? (
              entry.tags.map((t) => <TagBadge key={t} label={t} active size="sm" />)
            ) : (
              <span className="font-mono text-xs text-white/20">no tags</span>
            )}
          </div>
        </div>

        {/* Service type */}
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Service type</span>
          <span className="font-mono text-xs text-white/60 capitalize">{entry.serviceType}</span>
        </div>

        {/* Meta */}
        <div className="mt-auto pt-4 border-t border-white/8 flex flex-col gap-1">
          <p className="font-mono text-xs text-white/20">Created: {createdDate}</p>
          <p className="font-mono text-xs text-white/20">Updated: {updatedDate}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 px-5 py-4 border-t border-white/10">
        <button
          onClick={() => onEdit(entry)}
          className="flex-1 flex items-center justify-center gap-1.5 font-mono text-xs border border-blue-700 text-blue-400 hover:bg-blue-700/20 rounded-sm py-2 transition-colors"
        >
          <Icon icon="mdi:pencil-outline" />
          Edit
        </button>
        <button
          onClick={() => onDelete(entry.id)}
          className="flex-1 flex items-center justify-center gap-1.5 font-mono text-xs border border-red-700 text-red-400 hover:bg-red-700/20 rounded-sm py-2 transition-colors"
        >
          <Icon icon="mdi:trash-can-outline" />
          Delete
        </button>
      </div>
    </aside>
  );
}