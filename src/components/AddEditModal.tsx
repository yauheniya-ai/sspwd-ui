import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import TagBadge from "./TagBadge";
import EntryIcon from "./EntryIcon";
import type { IconSource, PasswordEntry, ServiceType } from "../types";
import { ALL_CATEGORIES, ALL_TAGS } from "../data/mockData";

interface AddEditModalProps {
  entry?: PasswordEntry | null;
  activeProject: string;
  onSave: (entry: Omit<PasswordEntry, "id" | "createdAt" | "updatedAt">) => void;
  onClose: () => void;
}

const SERVICE_TYPES: Array<{ value: ServiceType; label: string }> = [
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];

const ICON_TABS = ["letter", "iconify", "url", "upload"] as const;
type IconTab = typeof ICON_TABS[number];

function generatePassword(len = 20): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  return Array.from(crypto.getRandomValues(new Uint8Array(len)))
    .map((b) => chars[b % chars.length])
    .join("");
}

export default function AddEditModal({ entry, activeProject, onSave, onClose }: AddEditModalProps) {
  const isEdit = !!entry;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title,        setTitle]        = useState(entry?.title ?? "");
  const [username,     setUsername]      = useState(entry?.username ?? "");
  const [password,     setPassword]      = useState(entry?.password ?? "");
  const [url,          setUrl]          = useState(entry?.url ?? "");
  const [notes,        setNotes]        = useState(entry?.notes ?? "");
  const [category,     setCategory]     = useState(entry?.category ?? "");
  const [tags,         setTags]         = useState<string[]>(entry?.tags ?? []);
  const [serviceType,  setServiceType]  = useState<ServiceType>(entry?.serviceType ?? "free");
  const [iconTab,      setIconTab]      = useState<IconTab>(entry?.icon?.type === "upload" ? "upload" : (entry?.icon?.type as IconTab) ?? "letter");
  const [iconValue,    setIconValue]    = useState(entry?.icon?.type !== "upload" ? (entry?.icon?.value ?? "") : "");
  const [uploadedIcon, setUploadedIcon] = useState<string | null>(
    entry?.icon?.type === "url" && entry.icon.value.startsWith("/api/v1/icons/") ? entry.icon.value : null
  );
  const [uploadName,   setUploadName]   = useState("");
  const [uploading,    setUploading]    = useState(false);
  const [newTag,       setNewTag]       = useState("");
  const [pwVisible,    setPwVisible]    = useState(false);

  // Derive the current IconSource from form state
  const icon: IconSource = (() => {
    if (iconTab === "upload" && uploadedIcon) return { type: "url", value: uploadedIcon };
    if (iconTab === "iconify") return { type: "iconify", value: iconValue };
    if (iconTab === "url")     return { type: "url",     value: iconValue };
    return { type: "letter", value: iconValue || title.charAt(0).toUpperCase() };
  })();

  const addTag = (tag: string) => {
    const t = tag.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setNewTag("");
  };
  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadName(file.name);

    // In mock mode, create a local object URL so the preview works without a backend
    const objectUrl = URL.createObjectURL(file);

    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const q = activeProject !== "mock"
        ? `?project=${encodeURIComponent(activeProject)}`
        : "";
      const res = await fetch(`/api/v1/icons${q}`, { method: "POST", body: form });
      if (res.ok) {
        const data = await res.json();
        setUploadedIcon(data.url);           // /api/v1/icons/abc.png?project=ya
      } else {
        setUploadedIcon(objectUrl);          // mock mode fallback
      }
    } catch {
      setUploadedIcon(objectUrl);            // server not running / mock mode
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    if (!title.trim() || !username.trim() || !password.trim() || !category.trim()) return;
    onSave({
      title: title.trim(),
      username: username.trim(),
      password,
      url: url.trim() || undefined,
      notes: notes.trim() || undefined,
      icon: (iconTab === "letter" && !iconValue) ? undefined : icon,
      category: category.trim(),
      tags,
      serviceType,
    });
    onClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const isValid = title.trim() && username.trim() && password.trim() && category.trim();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-lg bg-neutral-950 border border-white/15 rounded-sm shadow-2xl flex flex-col max-h-[92vh]">

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0"
          style={{ background: "linear-gradient(to right, #1d4ed822, #b91c1c22)" }}
        >
          <div className="flex items-center gap-3">
            <EntryIcon icon={icon} title={title || "?"} size={32} />
            <h2 className="font-mono font-bold text-white text-sm">
              {isEdit ? `Edit — ${entry.title}` : "New entry"}
            </h2>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
            <Icon icon="mdi:close" className="text-lg" />
          </button>
        </div>

        {/* Form body */}
        <div className="flex flex-col gap-4 px-5 py-5 overflow-y-auto">

          {/* Title + Category — both required, side by side */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Title *">
              <input
                className={input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. GitHub"
                autoComplete="off"
                data-lpignore="true"
              />
            </Field>
            <Field label="Category *">
              <input
                className={input}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Software"
                list="modal-category-list"
                autoComplete="off"
                data-lpignore="true"
              />
              <datalist id="modal-category-list">
                {ALL_CATEGORIES.map((c) => <option key={c} value={c} />)}
              </datalist>
            </Field>
          </div>

          {/* Username */}
          <Field label="Username / Email *">
            <input
              className={input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="me@example.com"
              autoComplete="off"
              data-lpignore="true"
              data-form-type="other"
            />
          </Field>

          {/* Password */}
          <Field label="Password *">
            <div className="flex gap-1">
              <div className="relative flex-1">
                <input
                  className={`${input} pr-8`}
                  type={pwVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter or generate password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setPwVisible((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                >
                  <Icon icon={pwVisible ? "mdi:eye-off-outline" : "mdi:eye-outline"} className="text-sm" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => { setPassword(generatePassword()); setPwVisible(true); }}
                className="border border-white/15 px-2 rounded-sm text-white/40 hover:text-white hover:border-blue-700 transition-colors"
                title="Generate strong password"
              >
                <Icon icon="mdi:dice-6-outline" className="text-base" />
              </button>
            </div>
          </Field>

          {/* URL */}
          <Field label="URL">
            <input
              className={input}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              autoComplete="off"
              data-lpignore="true"
            />
          </Field>

          {/* Icon picker */}
          <Field label="Icon">
            {/* Tab strip */}
            <div className="flex gap-1 mb-2">
              {ICON_TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setIconTab(t)}
                  className={`font-mono text-xs px-2.5 py-0.5 border rounded-sm transition-colors ${
                    iconTab === t
                      ? "border-blue-700 text-blue-400 bg-blue-700/10"
                      : "border-white/15 text-white/40 hover:border-white/30"
                  }`}
                >
                  {t === "upload" ? "↑ upload" : t}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {(iconTab === "letter" || iconTab === "iconify" || iconTab === "url") && (
              <input
                className={input}
                value={iconValue}
                onChange={(e) => setIconValue(e.target.value)}
                placeholder={
                  iconTab === "iconify" ? "logos:github-icon"
                  : iconTab === "url"   ? "https://companieslogo.com/img/orig/…"
                  : "Leave blank to use first letter"
                }
                autoComplete="off"
                data-lpignore="true"
              />
            )}

            {iconTab === "upload" && (
              <div className="flex flex-col gap-2">
                {/* Drop zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 border border-dashed border-white/20 rounded-sm py-5 cursor-pointer hover:border-blue-700 hover:bg-blue-700/5 transition-colors"
                >
                  {uploadedIcon ? (
                    <img src={uploadedIcon} alt="preview" className="h-10 w-10 object-contain" />
                  ) : (
                    <Icon icon="mdi:cloud-upload-outline" className="text-2xl text-white/30" />
                  )}
                  <span className="font-mono text-xs text-white/40">
                    {uploading ? "Uploading…" : uploadName || "Click to upload PNG / SVG / WEBP"}
                  </span>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/svg+xml,image/webp,image/jpeg"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {/* Note about storage */}
                <p className="font-mono text-xs text-white/25">
                  Stored in <code className="text-white/40">.sspwd/&#123;project&#125;/icons/</code>
                </p>
              </div>
            )}
          </Field>

          {/* Service type — free / paid toggle */}
          <Field label="Service type">
            <div className="flex gap-1.5">
              {SERVICE_TYPES.map(({ value, label }) => (
                <TagBadge
                  key={value}
                  label={label}
                  active={serviceType === value}
                  onClick={() => setServiceType(value)}
                />
              ))}
            </div>
          </Field>

          {/* Tags */}
          <Field label="Tags">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map((tag) => (
                <TagBadge key={tag} label={tag} active removable onRemove={() => removeTag(tag)} size="sm" />
              ))}
            </div>
            <div className="flex gap-1">
              <input
                className={`${input} flex-1`}
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(newTag); } }}
                placeholder="Type tag + Enter"
                list="modal-tag-list"
                autoComplete="off"
                data-lpignore="true"
              />
              <datalist id="modal-tag-list">
                {ALL_TAGS.map((t) => <option key={t} value={t} />)}
              </datalist>
              <button
                type="button"
                onClick={() => addTag(newTag)}
                className="border border-white/15 px-2 rounded-sm text-white/40 hover:text-white hover:border-blue-700 transition-colors"
              >
                <Icon icon="mdi:plus" className="text-base" />
              </button>
            </div>
          </Field>

          {/* Notes */}
          <Field label="Notes">
            <textarea
              className={`${input} resize-none h-20`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes…"
            />
          </Field>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-5 py-4 border-t border-white/10 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 font-mono text-xs border border-white/15 text-white/50 hover:text-white hover:border-white/30 rounded-sm py-2 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="flex-1 font-mono text-xs font-semibold bg-red-700 hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-sm py-2 transition-colors"
          >
            {isEdit ? "Save changes" : "Add entry"}
          </button>
        </div>
      </div>
    </div>
  );
}

const input =
  "w-full font-mono text-xs bg-black border border-white/15 text-white placeholder-white/25 px-3 py-2 rounded-sm focus:outline-none focus:border-blue-700 transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-xs text-white/40 uppercase tracking-widest">{label}</label>
      {children}
    </div>
  );
}