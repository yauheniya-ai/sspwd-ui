import { useRef, useState } from "react";
import {
  IconClose, IconCheck, IconPencil, IconDelete,
  IconImageMultiple, IconUpload, IconEye, IconEyeOff,
  IconDice, IconChevronDown, IconChevronRight, IconTableEdit,
} from "../constants/icons";
import TagBadge from "./TagBadge";
import EntryIcon from "./EntryIcon";
import type { Company, CompanyAddress, IconCatalogueEntry, IconSource, PasswordEntry, ServiceType } from "../types";
import { ALL_TAGS } from "../data/mockData";
import { CATEGORY_META } from "../constants";
import { COMMON_LOGIN_METHODS } from "../types";

interface AddEditModalProps {
  entry?: PasswordEntry | null;
  activeProject: string;
  companies?: Company[];
  entries?: PasswordEntry[];
  iconCatalogue?: IconCatalogueEntry[];
  onSave: (entry: Omit<PasswordEntry, "id" | "createdAt" | "updatedAt">) => void;
  onClose: () => void;
  onOpenOwners?: () => void;
  onDeleteFromCatalogue?: (id: number) => void;
  onUpdateCatalogueLabel?: (id: number, label: string) => void;
}

const ICON_TABS = ["library", "letter", "iconify", "url", "upload"] as const;
type IconTab = typeof ICON_TABS[number];

const SERVICE_TYPES: Array<{ value: ServiceType; label: string }> = [
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];

function generatePassword(len = 20): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  return Array.from(crypto.getRandomValues(new Uint8Array(len)))
    .map((b) => chars[b % chars.length]).join("");
}

function IconPicker({
  label,
  value,
  onChange,
  title = "",
  activeProject,
  entries = [],
  iconCatalogue = [],
  onDeleteFromCatalogue,
  onUpdateCatalogueLabel,
}: {
  label: string;
  value: IconSource | undefined;
  onChange: (icon: IconSource | undefined) => void;
  title?: string;
  activeProject: string;
  entries?: PasswordEntry[];
  iconCatalogue?: IconCatalogueEntry[];
  onDeleteFromCatalogue?: (id: number) => void;
  onUpdateCatalogueLabel?: (id: number, label: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [tab,        setTab]        = useState<IconTab>(
    value?.type === "iconify" ? "iconify"
    : value?.type === "url"   ? "url"
    : "letter"
  );
  const [iconValue,  setIconValue]  = useState(
    (value?.type === "iconify" || value?.type === "url") ? value.value : ""
  );
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(
    value?.type === "url" && value.value.startsWith("/api") ? value.value : null
  );
  const [uploadName,  setUploadName]  = useState("");
  const [uploading,   setUploading]   = useState(false);

  // library tab state
  const [libSearch,    setLibSearch]    = useState("");
  const [libEditId,    setLibEditId]    = useState<number | null>(null);
  const [libEditLabel, setLibEditLabel] = useState("");
  const [libOpen,      setLibOpen]      = useState(false);

  const previewIcon: IconSource =
    tab === "library"                   ? (value ?? { type: "letter", value: title.charAt(0).toUpperCase() })
    : tab === "upload" && uploadedUrl   ? { type: "url",     value: uploadedUrl }
    : tab === "iconify"                 ? { type: "iconify", value: iconValue }
    : tab === "url"                     ? { type: "url",     value: iconValue }
    : { type: "letter", value: iconValue || title.charAt(0).toUpperCase() };

  const emit = (t: IconTab, v: string, up: string | null) => {
    if (t === "upload" && up)   onChange({ type: "url",     value: up });
    else if (t === "iconify")   onChange({ type: "iconify", value: v });
    else if (t === "url")       onChange({ type: "url",     value: v });
    else if (t === "library")   { /* handled by clicking catalogue item */ }
    else                        onChange(v ? { type: "letter", value: v } : undefined);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadName(file.name);
    const objUrl = URL.createObjectURL(file);
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const q = activeProject !== "mock" ? `?project=${encodeURIComponent(activeProject)}` : "";
      const res = await fetch(`/api/v1/icons${q}`, { method: "POST", body: form });
      const url = res.ok ? (await res.json()).url : objUrl;
      setUploadedUrl(url);
      emit("upload", "", url);
    } catch {
      setUploadedUrl(objUrl);
      emit("upload", "", objUrl);
    } finally { setUploading(false); }
  };

  // Build entry-based icon suggestions from all existing entries (those that have an icon)
  const entryIconRows = (() => {
    const q = libSearch.toLowerCase();
    const withIcon = entries.filter((e) => e.icon != null);
    const filtered = q
      ? withIcon.filter((e) => e.title.toLowerCase().includes(q))
      : withIcon;
    // Deduplicate by (type, value) but collect all titles per icon value
    const byKey = new Map<string, { icon: IconSource; titles: string[] }>();
    for (const e of filtered) {
      const key = `${e.icon!.type}::${e.icon!.value}`;
      if (!byKey.has(key)) byKey.set(key, { icon: e.icon!, titles: [] });
      byKey.get(key)!.titles.push(e.title);
    }
    return Array.from(byKey.values());
  })();

  const filteredCatalogue = iconCatalogue.filter((e) => {
    if (!libSearch) return true;
    const q = libSearch.toLowerCase();
    return e.value.toLowerCase().includes(q) || (e.label ?? "").toLowerCase().includes(q);
  });

  const TAB_LABELS: Record<IconTab, string> = {
    library: "library",
    letter:  "letter",
    iconify: "iconify",
    url:     "url",
    upload:  "↑ upload",
  };

  return (
    <Field label={label}>
      <div className="flex items-center gap-3 mb-2">
        <EntryIcon icon={previewIcon} title={title || "?"} size={28} />
        <div className="flex flex-wrap gap-1">
          {ICON_TABS.map((t) => (
            <button key={t} type="button"
              onClick={() => { setTab(t); emit(t, iconValue, uploadedUrl); }}
              className={`font-mono text-xs px-2.5 py-0.5 border rounded-sm transition-colors ${
                tab === t
                  ? "border-white/40 text-white bg-white/10"
                  : "border-white/15 text-white/40 hover:border-white/30"
              }`}>
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Library tab — opens a full overlay table */}
      {tab === "library" && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLibOpen(true)}
            className="flex items-center gap-2 font-mono text-xs border border-white/15 text-white/50 hover:text-white hover:border-white/50 px-3 py-2 rounded-sm transition-colors cursor-pointer"
          >
            <IconImageMultiple className="w-4 h-4" />
            Browse icon library
            {(entryIconRows.length + filteredCatalogue.length) > 0 && (
              <span className="text-white/25">({entryIconRows.length + filteredCatalogue.length})</span>
            )}
          </button>
          {value && value.type !== "letter" && (
            <span className="font-mono text-[10px] text-white/30 truncate max-w-[12rem]" title={value.value}>
              {value.value}
            </span>
          )}
        </div>
      )}

      {/* Icon library overlay */}
      {libOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLibOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-neutral-950 border border-white/15 rounded-sm shadow-2xl flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10 shrink-0">
              <h3 className="font-mono text-xs font-bold text-white uppercase tracking-widest shrink-0">Icon library</h3>
              <input
                className="flex-1 font-mono text-xs bg-black border border-white/15 text-white placeholder-white/25 px-3 py-1.5 rounded-sm focus:outline-none focus:border-blue-700 transition-colors"
                value={libSearch}
                onChange={(e) => setLibSearch(e.target.value)}
                placeholder="Search by title or icon name…"
                autoFocus
                autoComplete="off"
                data-lpignore="true"
              />
              <button type="button" onClick={() => setLibOpen(false)} className="ml-1 text-white/30 hover:text-white transition-colors shrink-0">
                <IconClose className="w-5 h-5" />
              </button>
            </div>

            {/* table */}
            <div className="overflow-y-auto flex-1">
              {entryIconRows.length > 0 && (
                <>
                  <p className="font-mono text-[10px] text-white/25 uppercase tracking-widest px-5 py-2 border-b border-white/5">
                    From entries ({entryIconRows.length})
                  </p>
                  {entryIconRows.map(({ icon, titles }) => {
                    const isSelected = value?.type === icon.type && value?.value === icon.value;
                    return (
                      <div
                        key={`${icon.type}::${icon.value}`}
                        className={`flex items-center gap-3 px-5 py-2.5 cursor-pointer transition-colors border-b border-white/5 ${
                          isSelected ? "bg-blue-700/15" : "hover:bg-white/5"
                        }`}
                        onClick={() => { onChange(icon); setLibOpen(false); }}
                      >
                        <EntryIcon icon={icon} title={titles[0]} size={24} />
                        <span className="flex-1 font-mono text-xs text-white/70 truncate" title={titles.join(", ")}>{titles.join(", ")}</span>
                        <span className="font-mono text-[10px] text-white/25 bg-white/5 px-1.5 py-0.5 rounded shrink-0">{icon.type}</span>
                        {isSelected && <IconCheck className="w-4 h-4 text-blue-400 shrink-0" />}
                      </div>
                    );
                  })}
                </>
              )}

              {filteredCatalogue.length > 0 && (
                <>
                  <p className="font-mono text-[10px] text-white/25 uppercase tracking-widest px-5 py-2 border-b border-white/5">
                    Bookmarked ({filteredCatalogue.length})
                  </p>
                  {filteredCatalogue.map((entry) => {
                    const icon: IconSource = { type: entry.type as IconSource["type"], value: entry.value };
                    const isSelected = value?.type === entry.type && value?.value === entry.value;
                    const displayLabel = entry.label || entry.value;
                    return (
                      <div
                        key={entry.id}
                        className={`group flex items-center gap-3 px-5 py-2.5 cursor-pointer transition-colors border-b border-white/5 ${
                          isSelected ? "bg-blue-700/15" : "hover:bg-white/5"
                        }`}
                        onClick={() => { onChange(icon); setLibOpen(false); }}
                      >
                        <EntryIcon icon={icon} title={displayLabel} size={24} />
                        {libEditId === entry.id ? (
                          <input
                            className="flex-1 font-mono text-xs bg-black border border-blue-700 text-white px-2 py-0.5 rounded-sm focus:outline-none"
                            value={libEditLabel}
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setLibEditLabel(e.target.value)}
                            onKeyDown={(e) => {
                              e.stopPropagation();
                              if (e.key === "Enter") { onUpdateCatalogueLabel?.(entry.id, libEditLabel); setLibEditId(null); }
                              else if (e.key === "Escape") { setLibEditId(null); }
                            }}
                            onBlur={() => { onUpdateCatalogueLabel?.(entry.id, libEditLabel); setLibEditId(null); }}
                          />
                        ) : (
                          <span className="flex-1 font-mono text-xs text-white/70 truncate" title={entry.value}>{displayLabel}</span>
                        )}
                        <span className="font-mono text-[10px] text-white/25 bg-white/5 px-1.5 py-0.5 rounded shrink-0">{entry.type}</span>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button type="button" title="Edit label"
                            className="text-white/30 hover:text-blue-400 transition-colors"
                            onClick={(e) => { e.stopPropagation(); setLibEditId(entry.id); setLibEditLabel(entry.label ?? ""); }}>
                            <IconPencil className="w-4 h-4" />
                          </button>
                          <button type="button" title="Remove from library"
                            className="text-white/30 hover:text-red-400 transition-colors"
                            onClick={(e) => { e.stopPropagation(); onDeleteFromCatalogue?.(entry.id); }}>
                            <IconDelete className="w-4 h-4" />
                          </button>
                        </div>
                        {isSelected && <IconCheck className="w-4 h-4 text-blue-400 shrink-0" />}
                      </div>
                    );
                  })}
                </>
              )}

              {entryIconRows.length === 0 && filteredCatalogue.length === 0 && (
                <p className="font-mono text-xs text-white/30 px-5 py-10 text-center">
                  {libSearch ? `No results for "${libSearch}"` : "Library is empty — add icons to entries to populate it"}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {(tab === "letter" || tab === "iconify" || tab === "url") && (
        <input className={inp} value={iconValue}
          onChange={(e) => { setIconValue(e.target.value); emit(tab, e.target.value, uploadedUrl); }}
          placeholder={
            tab === "iconify" ? "logos:github-icon"
            : tab === "url"   ? "https://example.com/logo.svg"
            : "Leave blank for first letter"
          }
          autoComplete="off" data-lpignore="true" />
      )}

      {tab === "upload" && (
        <>
          <div onClick={() => fileRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 border border-dashed border-white/20 rounded-sm py-3 cursor-pointer hover:border-white/50 hover:bg-white/5 transition-colors">
            {uploadedUrl
              ? <img src={uploadedUrl} alt="preview" className="h-8 w-8 object-contain" />
              : <IconUpload className="w-5 h-5 text-white/30" />}
            <span className="font-mono text-xs text-white/40">
              {uploading ? "Uploading…" : uploadName || "Click to upload PNG / SVG / WEBP"}
            </span>
          </div>
          <input ref={fileRef} type="file" accept="image/png,image/svg+xml,image/webp,image/jpeg"
            className="hidden" onChange={handleFile} />
        </>
      )}
    </Field>
  );
}

export default function AddEditModal({
  entry, activeProject, companies = [], entries = [], iconCatalogue = [], onSave, onClose, onOpenOwners,
  onDeleteFromCatalogue, onUpdateCatalogueLabel,
}: AddEditModalProps) {
  const isEdit = !!entry;

  // ── core fields ──────────────────────────────────────────────────────
  const [title,       setTitle]       = useState(entry?.title ?? "");
  const [username,    setUsername]    = useState(entry?.username ?? "");
  const [email,       setEmail]       = useState(entry?.email ?? "");
  const [password,    setPassword]    = useState(entry?.password ?? "");
  const [url,         setUrl]         = useState(entry?.url ?? "");
  const [notes,       setNotes]       = useState(entry?.notes ?? "");
  const [category,    setCategory]    = useState((entry?.category ?? "").toLowerCase());
  const [tags,        setTags]        = useState<string[]>(entry?.tags ?? []);
  const [serviceType, setServiceType] = useState<ServiceType>(entry?.serviceType ?? "free");
  const [loginMethods, setLoginMethods] = useState<string[]>(entry?.loginMethods ?? []);
  const [customMethod, setCustomMethod] = useState("");
  const [userCreatedAt, setUserCreatedAt] = useState(entry?.userCreatedAt?.slice(0, 10) ?? "");
  const [pwVisible,   setPwVisible]   = useState(false);
  const [newTag,      setNewTag]      = useState("");
  const [catOpen,     setCatOpen]     = useState(false);
  const [tagOpen,     setTagOpen]     = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  // ── icon ─────────────────────────────────────────────────────────────
  const [entryIcon, setEntryIcon] = useState<IconSource | undefined>(entry?.icon);

  // ── owner / company ───────────────────────────────────────────────────
  const [showOwner,    setShowOwner]    = useState(!!(entry?.company || entry?.companyId));
  const [companyId,    setCompanyId]    = useState<number | undefined>(entry?.companyId);
  const [ownerName,    setOwnerName]    = useState(entry?.company?.name ?? "");
  const [ownerIcon,    setOwnerIcon]    = useState<IconSource | undefined>(entry?.company?.icon);
  const [ownerStreet,  setOwnerStreet]  = useState(entry?.company?.address?.street ?? "");
  const [ownerCity,    setOwnerCity]    = useState(entry?.company?.address?.city ?? "");
  const [ownerState,   setOwnerState]   = useState(entry?.company?.address?.state ?? "");
  const [ownerPost,    setOwnerPost]    = useState(entry?.company?.address?.postcode ?? "");
  const [ownerCountry, setOwnerCountry] = useState(entry?.company?.address?.country ?? "");
  const [ownerCode,    setOwnerCode]    = useState(entry?.company?.address?.countryCode ?? "");
  const [ownerRevenue, setOwnerRevenue] = useState(
    entry?.company?.revenue != null ? String(entry.company.revenue) : ""
  );

  const toggleLoginMethod = (m: string) =>
    setLoginMethods((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]);
  const addTag = (t: string) => { const v = t.trim(); if (v && !tags.includes(v)) setTags([...tags, v]); setNewTag(""); };

  const fillCompanyFromExisting = (name: string) => {
    const match = companies.find((c) => c.name.toLowerCase() === name.toLowerCase());
    if (match) {
      setCompanyId(match.id);
      setOwnerIcon(match.icon);
      setOwnerStreet(match.address?.street ?? "");
      setOwnerCity(match.address?.city ?? "");
      setOwnerState(match.address?.state ?? "");
      setOwnerPost(match.address?.postcode ?? "");
      setOwnerCountry(match.address?.country ?? "");
      setOwnerCode(match.address?.countryCode ?? "");
      setOwnerRevenue(match.revenue != null ? String(match.revenue) : "");
    } else {
      setCompanyId(undefined);
    }
  };

  const handleSave = () => {
    if (!title.trim()) return;

    let company: Company | undefined;
    if (showOwner && ownerName.trim()) {
      const addr: CompanyAddress | undefined = ownerCountry.trim() ? {
        street: ownerStreet.trim() || undefined,
        city: ownerCity.trim() || undefined,
        state: ownerState.trim() || undefined,
        postcode: ownerPost.trim() || undefined,
        country: ownerCountry.trim(),
        countryCode: ownerCode.trim().toLowerCase() || ownerCountry.slice(0, 2).toLowerCase(),
      } : undefined;
      company = {
        id: companyId ?? 0,
        name: ownerName.trim(),
        icon: ownerIcon,
        address: addr,
        revenue: ownerRevenue ? Number(ownerRevenue.replace(/[^0-9.]/g, "")) : undefined,
      };
    }

    onSave({
      title: title.trim(),
      username: username.trim() || undefined,
      email: email.trim() || undefined,
      password: password || undefined,
      url: url.trim() || undefined,
      notes: notes.trim() || undefined,
      icon: entryIcon,
      category: category.trim() || "other",
      tags,
      serviceType,
      loginMethods,
      company,
      companyId,
      userCreatedAt: userCreatedAt ? new Date(userCreatedAt).toISOString() : undefined,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
    >
      <div className="w-full max-w-lg bg-neutral-950 border border-white/15 rounded-sm shadow-2xl flex flex-col max-h-[92vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0"
          style={{ background: "linear-gradient(to right, #1d4ed822, #b91c1c22)" }}>
          <div className="flex items-center gap-3">
            <EntryIcon icon={entryIcon} title={title || "?"} size={32} />
            <h2 className="font-mono font-bold text-white text-sm">
              {isEdit ? `Edit — ${entry.title}` : "New entry"}
            </h2>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
            <IconClose className="w-5 h-5" />
          </button>
        </div>

        {/* Form body */}
        <div className="flex flex-col gap-4 px-5 py-5 overflow-y-auto">

          {/* Title + Category */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Title *">
              <input className={inp} value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. GitHub" autoComplete="off" data-lpignore="true" />
            </Field>
            <Field label="Category">
              <div className="relative">
                <button type="button"
                  className={`${inp} flex items-center justify-between`}
                  onClick={() => setCatOpen((v) => !v)}
                  onBlur={() => setTimeout(() => setCatOpen(false), 150)}>
                  <span className={category ? "text-white" : "text-white/25"}>
                    {category
                      ? (CATEGORY_META[category.toLowerCase()]?.label ?? category)
                      : "Select category…"}
                  </span>
                  <IconChevronDown className="w-3 h-3 text-white/40 shrink-0" />
                </button>
                {catOpen && (
                  <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-black border border-white/15 rounded-sm max-h-48 overflow-y-auto shadow-lg">
                    {Object.entries(CATEGORY_META).map(([key, meta]) => {
                      const CatIcon = meta.icon;
                      return (
                        <button key={key} type="button"
                          onMouseDown={() => { setCategory(key); setCatOpen(false); }}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 font-mono text-xs text-left transition-colors ${
                            category.toLowerCase() === key
                              ? "bg-red-700/20 text-red-400"
                              : "text-white/60 hover:bg-red-700/10 hover:text-red-300"
                          }`}>
                          <CatIcon className="w-3.5 h-3.5 shrink-0" />
                          {meta.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </Field>
          </div>

          {/* Username + Email */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Username">
              <input className={inp} value={username} onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. me-dev" autoComplete="off" data-lpignore="true" data-form-type="other" />
            </Field>
            <Field label="Email">
              <input className={inp} value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="me@example.com" autoComplete="off" data-lpignore="true" data-form-type="other" />
            </Field>
          </div>

          {/* Password */}
          <Field label="Password">
            <div className="flex gap-1">
              <div className="relative flex-1">
                <input className={`${inp} pr-8`} type={pwVisible ? "text" : "password"}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter or generate" autoComplete="new-password" />
                <button type="button" onClick={() => setPwVisible((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                  {pwVisible ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
                </button>
              </div>
              <button type="button"
                onClick={() => { setPassword(generatePassword()); setPwVisible(true); }}
                className="border border-white/15 px-2 rounded-sm text-white/40 hover:text-white hover:border-blue-700 transition-colors"
                title="Generate">
                <IconDice className="w-4 h-4" />
              </button>
            </div>
          </Field>

          {/* URL */}
          <Field label="URL">
            <input className={inp} value={url} onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com" autoComplete="off" data-lpignore="true" />
          </Field>

          {/* Login methods */}
          <Field label="Login methods">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {COMMON_LOGIN_METHODS.map((m) => (
                <TagBadge key={m} label={m} size="sm" color="blue"
                  active={loginMethods.includes(m)}
                  onClick={() => toggleLoginMethod(m)} />
              ))}
            </div>
            <div className="flex gap-1">
              <input className={`${inp} flex-1`} value={customMethod}
                onChange={(e) => setCustomMethod(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); const v = customMethod.trim(); if (v && !loginMethods.includes(v)) setLoginMethods((p) => [...p, v]); setCustomMethod(""); } }}
                placeholder="Custom + Enter" autoComplete="off" data-lpignore="true" />
            </div>
          </Field>

          {/* Entry Icon */}
          <IconPicker label="Icon" value={entryIcon} onChange={setEntryIcon}
            title={title} activeProject={activeProject}
            entries={entries}
            iconCatalogue={iconCatalogue}
            onDeleteFromCatalogue={onDeleteFromCatalogue}
            onUpdateCatalogueLabel={onUpdateCatalogueLabel} />

          {/* Service type + Tags */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Service type">
              <div className="flex gap-1.5">
                {SERVICE_TYPES.map(({ value, label }) => (
                  <TagBadge key={value} label={label}
                    color={value === "free" ? "green" : "blue"}
                    active={serviceType === value} onClick={() => setServiceType(value)} />
                ))}
              </div>
            </Field>
            <Field label="Tags">
              <div className="flex flex-wrap gap-1.5 mb-1">
                {tags.map((t) => (
                  <TagBadge key={t} label={t} active removable size="sm" onRemove={() => setTags(tags.filter((x) => x !== t))} />
                ))}
              </div>
              <div className="relative">
                <input className={`${inp} w-full`} value={newTag}
                  onChange={(e) => { setNewTag(e.target.value); setTagOpen(true); }}
                  onFocus={() => setTagOpen(true)}
                  onBlur={() => setTimeout(() => setTagOpen(false), 150)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(newTag); setTagOpen(false); } }}
                  placeholder="Add tag…" autoComplete="off" data-lpignore="true" />
                {tagOpen && (
                  <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-black border border-white/15 rounded-sm max-h-36 overflow-y-auto shadow-lg">
                    {ALL_TAGS.filter((t) => !tags.includes(t) && t.toLowerCase().includes(newTag.toLowerCase())).map((t) => (
                      <button key={t} type="button"
                        onMouseDown={() => { addTag(t); setTagOpen(false); }}
                        className="w-full flex items-center px-3 py-1.5 font-mono text-xs text-white/60 hover:bg-red-700/10 hover:text-red-300 transition-colors text-left">
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Field>
          </div>

          {/* Used since */}
          <Field label="Used since">
            <input className={inp} type="date" value={userCreatedAt}
              onChange={(e) => setUserCreatedAt(e.target.value)} style={{ colorScheme: "dark" }} />
            <p className="font-mono text-xs text-white/25 mt-1">When you started using this service.</p>
          </Field>

          {/* Owner / Company */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <button type="button" onClick={() => setShowOwner((v) => !v)}
                className="flex items-center gap-2 font-mono text-xs text-white/40 hover:text-white transition-colors">
                {showOwner ? <IconChevronDown className="w-4 h-4" /> : <IconChevronRight className="w-4 h-4" />}
                <span className="uppercase tracking-widest">Owner / Company</span>
                {ownerName && <span className="text-white/60 normal-case tracking-normal">— {ownerName}</span>}
              </button>
              {onOpenOwners && (
                <button type="button" onClick={onOpenOwners}
                  className="font-mono text-xs text-white/30 hover:text-purple-400 transition-colors flex items-center gap-1">
                  <IconTableEdit className="w-4 h-4" />
                  <span>All owners</span>
                </button>
              )}
            </div>

            {showOwner && (
              <div className="flex flex-col gap-3 pl-3 border-l border-white/10">
                <Field label="Company name">
                  <div className="relative">
                    <input className={inpPurple} value={ownerName}
                      onChange={(e) => { setOwnerName(e.target.value); fillCompanyFromExisting(e.target.value); setCompanyOpen(true); }}
                      onFocus={() => setCompanyOpen(true)}
                      onBlur={() => setTimeout(() => setCompanyOpen(false), 150)}
                      placeholder="e.g. Alphabet Inc."
                      autoComplete="off" data-lpignore="true" />
                    {companyOpen && companies.filter((c) => c.name.toLowerCase().includes(ownerName.toLowerCase())).length > 0 && (
                      <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-black border border-white/15 rounded-sm max-h-36 overflow-y-auto shadow-lg">
                        {companies
                          .filter((c) => c.name.toLowerCase().includes(ownerName.toLowerCase()))
                          .map((c) => (
                            <button key={c.id} type="button"
                              onMouseDown={() => { setOwnerName(c.name); fillCompanyFromExisting(c.name); setCompanyOpen(false); }}
                              className={`w-full flex items-center px-3 py-1.5 font-mono text-xs text-left transition-colors ${
                                ownerName === c.name
                                  ? "bg-purple-700/20 text-purple-400"
                                  : "text-white/60 hover:bg-purple-700/10 hover:text-purple-300"
                              }`}>
                              {c.name}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </Field>

                {/* Owner Icon — same 4 tabs */}
                <IconPicker label="Owner icon" value={ownerIcon} onChange={setOwnerIcon}
                  title={ownerName} activeProject={activeProject}
                  entries={entries}
                  iconCatalogue={iconCatalogue}
                  onDeleteFromCatalogue={onDeleteFromCatalogue}
                  onUpdateCatalogueLabel={onUpdateCatalogueLabel} />

                {/* Address — split fields */}
                <Field label="Street & number">
                  <input className={inpPurple} value={ownerStreet} onChange={(e) => setOwnerStreet(e.target.value)}
                    placeholder="345 Park Ave" autoComplete="off" data-lpignore="true" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="City">
                    <input className={inpPurple} value={ownerCity} onChange={(e) => setOwnerCity(e.target.value)}
                      placeholder="San Jose" autoComplete="off" data-lpignore="true" />
                  </Field>
                  <Field label="State">
                    <input className={inpPurple} value={ownerState} onChange={(e) => setOwnerState(e.target.value)}
                      placeholder="CA" autoComplete="off" data-lpignore="true" />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Postcode">
                    <input className={inpPurple} value={ownerPost} onChange={(e) => setOwnerPost(e.target.value)}
                      placeholder="95110" autoComplete="off" data-lpignore="true" />
                  </Field>
                  <Field label="Country">
                    <input className={inpPurple} value={ownerCountry} onChange={(e) => setOwnerCountry(e.target.value)}
                      placeholder="United States" autoComplete="off" data-lpignore="true" />
                  </Field>
                </div>
                <Field label="Country code (ISO 2-letter)">
                  <input className={inpPurple} value={ownerCode} onChange={(e) => setOwnerCode(e.target.value.toLowerCase())}
                    placeholder="us" maxLength={2} autoComplete="off" data-lpignore="true" />
                  <p className="font-mono text-xs text-white/25 mt-1">Used for flag icon, e.g. "us", "de", "gb".</p>
                </Field>

                <Field label="Annual revenue (USD)">
                  <input className={inpPurple} value={ownerRevenue} onChange={(e) => setOwnerRevenue(e.target.value)}
                    placeholder="e.g. 307400000000" autoComplete="off" data-lpignore="true" />
                  <p className="font-mono text-xs text-white/25 mt-1">Raw number in USD. Displayed as $307.4B in UI.</p>
                </Field>
              </div>
            )}
          </div>

          {/* Notes */}
          <Field label="Notes">
            <textarea className={`${inp} resize-none h-20`}
              value={notes} onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes…" />
          </Field>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-5 py-4 border-t border-white/10 shrink-0">
          <button onClick={onClose}
            className="flex-1 font-mono text-xs border border-white/15 text-white/50 hover:text-white hover:border-white/30 rounded-sm py-2 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} disabled={!title.trim()}
            className="flex-1 font-mono text-xs font-semibold bg-red-700 hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-sm py-2 transition-colors">
            {isEdit ? "Save changes" : "Add entry"}
          </button>
        </div>
      </div>
    </div>
  );
}

const inp = "w-full font-mono text-xs bg-black border border-white/15 text-white placeholder-white/25 px-3 py-2 rounded-sm focus:outline-none focus:border-blue-700 transition-colors";
const inpPurple = "w-full font-mono text-xs bg-black border border-white/15 text-white placeholder-white/25 px-3 py-2 rounded-sm focus:outline-none focus:border-purple-700 transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-xs text-white/40 uppercase tracking-widest">{label}</label>
      {children}
    </div>
  );
}