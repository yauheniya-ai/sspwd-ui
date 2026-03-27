import { useState } from "react";
import { Icon } from "@iconify/react"; // kept for dynamic circle-flags icons only
import {
  IconEye, IconEyeOff, IconCopy, IconCheck,
  IconLockOutline, IconOpenInNew, IconBuilding,
  IconChevronUp, IconChevronDown,
  IconCalendarStar, IconCalendarPlus, IconCalendarEdit,
  IconPencil, IconDelete,
} from "../constants/icons";
import EntryIcon from "./EntryIcon";
import TagBadge from "./TagBadge";
import { formatRevenue } from "../types";
import type { PasswordEntry } from "../types";

interface DetailPanelProps {
  entry: PasswordEntry | null;
  onEdit: (entry: PasswordEntry) => void;
  onDelete: (id: number) => void;
}

function CopyField({ label, value, secret }: { label: string; value?: string; secret?: boolean }) {
  const [visible, setVisible] = useState(false);
  const [copied,  setCopied]  = useState(false);
  const empty = !value;
  const copy = () => { if (!value) return; navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-xs text-white/30 uppercase tracking-widest">{label}</span>
      <div className={`flex items-center gap-2 border rounded-sm px-3 py-2 ${empty ? "bg-black/15 border-white/5" : "bg-black/40 border-white/8"}`}>
        <span className={`font-mono text-xs flex-1 truncate tracking-widest ${empty ? "text-white/18 italic" : "text-white/70"}`}>
          {empty ? "—" : secret && !visible ? "••••••••••••" : value}
        </span>
        {!empty && secret && (
          <button onClick={() => setVisible(v => !v)} className="text-white/25 hover:text-white transition-colors shrink-0">
            {visible ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
          </button>
        )}
        {!empty && (
          <button onClick={copy} className="text-white/25 hover:text-white transition-colors shrink-0">
            {copied
              ? <IconCheck className="w-4 h-4 text-green-400" />
              : <IconCopy className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}

function StaticField({ label, children, empty }: { label: string; children?: React.ReactNode; empty?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-xs text-white/30 uppercase tracking-widest">{label}</span>
      {empty
        ? <span className="font-mono text-xs text-white/18 italic">—</span>
        : <div className="font-mono text-xs text-white/60">{children}</div>
      }
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 pt-2">
      <span className="font-mono text-xs text-white/20 uppercase tracking-widest shrink-0">{label}</span>
      <div className="flex-1 border-t border-white/8" />
    </div>
  );
}

export default function DetailPanel({ entry, onEdit, onDelete }: DetailPanelProps) {
  const [addrOpen, setAddrOpen] = useState(false);

  if (!entry) {
    return (
      <aside className="flex flex-col items-center justify-center h-full text-white/15 px-6 border-l border-white/10 bg-black/20">
        <IconLockOutline className="w-9 h-9 mb-3" />
        <p className="font-mono text-xs text-center">Select an entry<br />to view details</p>
      </aside>
    );
  }

  const fmt = (iso?: string) =>
    iso ? new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : null;

  const c   = entry.company;
  const adr = c?.address;

  return (
    <aside className="flex flex-col h-full overflow-y-auto border-l border-white/10 bg-black/20">

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 shrink-0"
        style={{ background: "linear-gradient(to bottom, #1d4ed811, transparent)" }}>
        <EntryIcon icon={entry.icon} title={entry.title} size={40} />
        <div className="flex-1 min-w-0">
          <h2 className="font-mono font-bold text-white text-sm truncate">{entry.title}</h2>
          <p className="font-mono text-xs text-white/35 truncate">{entry.category}</p>
        </div>
        {entry.url && (
          <a href={entry.url} target="_blank" rel="noreferrer"
            className="text-white/25 hover:text-blue-400 transition-colors shrink-0">
            <IconOpenInNew className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 px-5 py-4 flex-1">

        <Divider label="Credentials" />
        <CopyField label="Username" value={entry.username} />
        <CopyField label="Email"    value={entry.email} />
        <CopyField label="Password" value={entry.password} secret />
        <CopyField label="URL"      value={entry.url} />

        <StaticField label="Login methods" empty={!entry.loginMethods?.length}>
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {entry.loginMethods?.map((m) => (
              <span key={m} className="bg-blue-700 text-white border-blue-600 hover:bg-blue-600 px-2 py-0.5 rounded-sm">{m}</span>
            ))}
          </div>
        </StaticField>

        <StaticField label="Notes" empty={!entry.notes}>
          {entry.notes && (
            <p className="bg-black/40 border border-white/8 rounded-sm px-3 py-2 whitespace-pre-wrap text-white/55 leading-relaxed">{entry.notes}</p>
          )}
        </StaticField>

        <Divider label="Classification" />

        <StaticField label="Service type">
          <span className="capitalize">{entry.serviceType}</span>
        </StaticField>

        <StaticField label="Tags" empty={!entry.tags?.length}>
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {entry.tags?.map((t) => <TagBadge key={t} label={t} active size="sm" />)}
          </div>
        </StaticField>

        {/* Owner */}
        <Divider label="Owner" />

        <div className="flex flex-col gap-3 pl-3 border-l border-white/8">

          {/* Name + icon */}
          <div className="flex items-center gap-3">
            {c?.icon
              ? <EntryIcon icon={c.icon} title={c.name} size={28} />
              : <div className="h-7 w-7 border border-white/8 rounded-sm flex items-center justify-center bg-black/30 shrink-0">
                  <IconBuilding className="w-4 h-4 text-white/18" />
                </div>
            }
            <span className={`font-mono text-xs font-semibold ${c?.name ? "text-white/75" : "text-white/18 italic"}`}>
              {c?.name ?? "—"}
            </span>
          </div>

          {/* Headquarters — country flag + toggle */}
          <StaticField label="Headquarters" empty={!adr}>
            {adr && (
              <div className="flex flex-col gap-1">
                {/* Country line — always visible */}
                <div className="flex items-center gap-2">
                  <Icon icon={`circle-flags:${adr.countryCode}`} className="text-base shrink-0" />
                  <span className="text-white/65">{adr.country}</span>
                  {/* address toggle */}
                  <button type="button" onClick={() => setAddrOpen(v => !v)}
                    className="ml-auto font-mono text-xs text-white/25 hover:text-white/60 transition-colors flex items-center gap-0.5">
                    {addrOpen ? <IconChevronUp className="w-4 h-4" /> : <IconChevronDown className="w-4 h-4" />}
                    <span>{addrOpen ? "less" : "full address"}</span>
                  </button>
                </div>
                {/* Full address — collapsible */}
                {addrOpen && (
                  <div className="text-white/45 leading-relaxed pl-6">
                    {[adr.street, adr.city, adr.state, adr.postcode].filter(Boolean).join(", ")}
                    {adr.country && `, ${adr.country}`}
                  </div>
                )}
              </div>
            )}
          </StaticField>

          <StaticField label="Annual revenue" empty={c?.revenue == null}>
            {c?.revenue != null && (
              <span className="text-white/55">{formatRevenue(c.revenue)}</span>
            )}
          </StaticField>
        </div>

        {/* Dates */}
        <Divider label="Dates" />

        <div className="flex flex-col gap-2 pb-2">
          <div className="flex items-center gap-2">
            <IconCalendarStar
              className={`w-4 h-4 shrink-0 ${entry.userCreatedAt ? "text-white/35" : "text-white/15"}`} />
            <span className="font-mono text-xs">
              <span className="text-white/30">Using since&nbsp;</span>
              <span className={entry.userCreatedAt ? "text-white/65" : "text-white/18 italic"}>
                {fmt(entry.userCreatedAt) ?? "—"}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <IconCalendarPlus className="w-4 h-4 text-white/20 shrink-0" />
            <span className="font-mono text-xs">
              <span className="text-white/25">Added&nbsp;</span>
              <span className="text-white/45">{fmt(entry.createdAt)}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <IconCalendarEdit className="w-4 h-4 text-white/20 shrink-0" />
            <span className="font-mono text-xs">
              <span className="text-white/25">Updated&nbsp;</span>
              <span className="text-white/45">{fmt(entry.updatedAt)}</span>
            </span>
          </div>
        </div>

      </div>

      {/* Actions */}
      <div className="flex gap-2 px-5 py-4 border-t border-white/10 shrink-0">
        <button onClick={() => onEdit(entry)}
          className="flex-1 flex items-center justify-center gap-1.5 font-mono text-xs border border-blue-700 text-blue-400 hover:bg-blue-700/20 rounded-sm py-2 transition-colors">
          <IconPencil className="w-4 h-4" /> Edit
        </button>
        <button onClick={() => onDelete(entry.id)}
          className="flex-1 flex items-center justify-center gap-1.5 font-mono text-xs border border-red-700 text-red-400 hover:bg-red-700/20 rounded-sm py-2 transition-colors">
          <IconDelete className="w-4 h-4" /> Delete
        </button>
      </div>
    </aside>
  );
}