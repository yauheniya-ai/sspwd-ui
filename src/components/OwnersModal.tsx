import { useState, useMemo } from "react";
import EntryIcon from "./EntryIcon";
import { IconClose, IconSearch, IconPlus } from "../constants/icons";
import type { Company, CompanyAddress, IconSource, PasswordEntry } from "../types";
import { formatRevenue } from "../types";

interface OwnersModalProps {
  companies:     Company[];
  entries:       PasswordEntry[];
  activeProject: string;
  onClose:       () => void;
  onUpdate:      (company: Company) => Promise<void>;
  onDelete:      (id: number) => Promise<void>;
  onAdd:         (company: Omit<Company, "id">) => Promise<void>;
}

const inp =
  "w-full font-mono text-xs bg-black border border-white/15 text-white placeholder-white/25 px-3 py-2 rounded-sm focus:outline-none focus:border-blue-700 transition-colors";

function Lbl({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-mono text-xs text-white/40 uppercase tracking-widest mb-0.5 block">
      {children}
    </label>
  );
}

// ── Simple icon editor (type buttons + value input) ──────────────────────────

type SimpleIconType = "letter" | "iconify" | "url";
const ICON_TYPES: SimpleIconType[] = ["letter", "iconify", "url"];

function SimpleIconEditor({
  value,
  onChange,
  title = "",
}: {
  value: IconSource | undefined;
  onChange: (icon: IconSource | undefined) => void;
  title?: string;
}) {
  const [type, setType] = useState<SimpleIconType>(
    (value?.type as SimpleIconType) ?? "letter"
  );
  const [val, setVal] = useState(
    value?.type !== "letter" ? (value?.value ?? "") : (value?.value ?? "")
  );

  const preview: IconSource =
    type === "iconify" ? { type: "iconify", value: val } :
    type === "url"     ? { type: "url",     value: val } :
                         { type: "letter",  value: val || title.charAt(0).toUpperCase() };

  const emit = (t: SimpleIconType, v: string) => {
    if (t === "letter")  onChange(v ? { type: "letter",  value: v } : undefined);
    if (t === "iconify") onChange({ type: "iconify", value: v });
    if (t === "url")     onChange({ type: "url",     value: v });
  };

  return (
    <div className="flex flex-col gap-1.5">
      <Lbl>Icon</Lbl>
      <div className="flex items-center gap-2">
        <EntryIcon icon={preview} title={title || "?"} size={24} />
        <div className="flex gap-1">
          {ICON_TYPES.map((t) => (
            <button
              key={t} type="button"
              onClick={() => { setType(t); emit(t, val); }}
              className={`font-mono text-xs px-2 py-0.5 border rounded-sm transition-colors ${
                type === t
                  ? "border-blue-700 text-blue-400 bg-blue-700/10"
                  : "border-white/15 text-white/40 hover:border-white/30"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <input
        className={inp}
        value={val}
        onChange={(e) => { setVal(e.target.value); emit(type, e.target.value); }}
        placeholder={
          type === "iconify" ? "logos:github-icon" :
          type === "url"     ? "https://example.com/logo.svg" :
                               "Leave blank for first letter"
        }
        autoComplete="off"
        data-lpignore="true"
      />
    </div>
  );
}

// ── Company form (shared by add & edit) ──────────────────────────────────────

interface CompanyFormState {
  name:    string;
  icon:    IconSource | undefined;
  street:  string;
  city:    string;
  state:   string;
  post:    string;
  country: string;
  code:    string;
  revenue: string;
}

function emptyForm(): CompanyFormState {
  return { name: "", icon: undefined, street: "", city: "", state: "", post: "", country: "", code: "", revenue: "" };
}

function companyToForm(c: Company): CompanyFormState {
  return {
    name:    c.name,
    icon:    c.icon as IconSource | undefined,
    street:  c.address?.street  ?? "",
    city:    c.address?.city    ?? "",
    state:   c.address?.state   ?? "",
    post:    c.address?.postcode ?? "",
    country: c.address?.country ?? "",
    code:    c.address?.countryCode ?? "",
    revenue: c.revenue != null ? String(c.revenue) : "",
  };
}

function formToCompany(f: CompanyFormState, id?: number): Company {
  const addr: CompanyAddress | undefined = f.country.trim() ? {
    street:      f.street.trim()  || undefined,
    city:        f.city.trim()    || undefined,
    state:       f.state.trim()   || undefined,
    postcode:    f.post.trim()    || undefined,
    country:     f.country.trim(),
    countryCode: f.code.trim().toLowerCase() || f.country.slice(0, 2).toLowerCase(),
  } : undefined;
  return {
    id:      id ?? 0,
    name:    f.name.trim(),
    icon:    f.icon,
    address: addr,
    revenue: f.revenue ? Number(f.revenue.replace(/[^0-9.]/g, "")) || undefined : undefined,
  };
}

function CompanyFormFields({
  form,
  onChange,
}: {
  form:     CompanyFormState;
  onChange: (patch: Partial<CompanyFormState>) => void;
}) {
  const s = (k: keyof CompanyFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => onChange({ [k]: e.target.value });
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-2">
      {/* Name spans full width */}
      <div className="col-span-2">
        <Lbl>Company name *</Lbl>
        <input className={inp} value={form.name} onChange={s("name")} placeholder="e.g. Alphabet Inc." autoComplete="off" data-lpignore="true" />
      </div>

      {/* Icon spans full width */}
      <div className="col-span-2">
        <SimpleIconEditor value={form.icon} onChange={(icon) => onChange({ icon })} title={form.name} />
      </div>

      {/* Address */}
      <div className="col-span-2">
        <Lbl>Street & number</Lbl>
        <input className={inp} value={form.street} onChange={s("street")} placeholder="345 Park Ave" autoComplete="off" data-lpignore="true" />
      </div>
      <div>
        <Lbl>City</Lbl>
        <input className={inp} value={form.city} onChange={s("city")} placeholder="San Jose" autoComplete="off" data-lpignore="true" />
      </div>
      <div>
        <Lbl>State</Lbl>
        <input className={inp} value={form.state} onChange={s("state")} placeholder="CA" autoComplete="off" data-lpignore="true" />
      </div>
      <div>
        <Lbl>Postcode</Lbl>
        <input className={inp} value={form.post} onChange={s("post")} placeholder="95110" autoComplete="off" data-lpignore="true" />
      </div>
      <div>
        <Lbl>Country</Lbl>
        <input className={inp} value={form.country} onChange={s("country")} placeholder="United States" autoComplete="off" data-lpignore="true" />
      </div>
      <div className="col-span-2">
        <Lbl>Country code (ISO 2-letter)</Lbl>
        <input className={inp} value={form.code} onChange={(e) => onChange({ code: e.target.value.toLowerCase() })}
          placeholder="us" maxLength={2} autoComplete="off" data-lpignore="true" />
      </div>
      <div className="col-span-2">
        <Lbl>Annual revenue (USD)</Lbl>
        <input className={inp} value={form.revenue} onChange={s("revenue")} placeholder="e.g. 307400000000" autoComplete="off" data-lpignore="true" />
      </div>
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────

export default function OwnersModal({
  companies, entries, onClose, onUpdate, onDelete, onAdd,
}: OwnersModalProps) {
  const [search,    setSearch]    = useState("");
  const [editId,    setEditId]    = useState<number | null>(null);
  const [editForm,  setEditForm]  = useState<CompanyFormState>(emptyForm());
  const [addOpen,   setAddOpen]   = useState(false);
  const [addForm,   setAddForm]   = useState<CompanyFormState>(emptyForm());
  const [saving,    setSaving]    = useState(false);

  // count entries per company
  const usageCount = useMemo(() => {
    const map: Record<number, number> = {};
    for (const e of entries) {
      if (e.companyId != null) map[e.companyId] = (map[e.companyId] ?? 0) + 1;
    }
    return map;
  }, [entries]);

  const filtered = useMemo(() => {
    if (!search) return companies;
    const q = search.toLowerCase();
    return companies.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.address?.country ?? "").toLowerCase().includes(q) ||
        (c.address?.city    ?? "").toLowerCase().includes(q),
    );
  }, [companies, search]);

  const startEdit = (c: Company) => {
    setEditId(c.id!);
    setEditForm(companyToForm(c));
  };

  const cancelEdit = () => setEditId(null);

  const saveEdit = async () => {
    if (!editForm.name.trim() || editId == null) return;
    setSaving(true);
    try {
      await onUpdate(formToCompany(editForm, editId));
      setEditId(null);
    } finally { setSaving(false); }
  };

  const saveAdd = async () => {
    if (!addForm.name.trim()) return;
    setSaving(true);
    try {
      await onAdd(formToCompany(addForm));
      setAddForm(emptyForm());
      setAddOpen(false);
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Delete owner "${name}"? This cannot be undone. Entries linked to this owner will lose the reference.`)) return;
    await onDelete(id);
    if (editId === id) setEditId(null);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl bg-neutral-950 border border-white/15 rounded-sm shadow-2xl flex flex-col max-h-[92vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0"
          style={{ background: "linear-gradient(to right, #1d4ed822, #b91c1c22)" }}>
          <div>
            <h2 className="font-mono font-bold text-white text-sm">Owners / Companies</h2>
            <p className="font-mono text-xs text-white/30 mt-0.5">{companies.length} total</p>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
            <IconClose className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 px-6 py-3 border-b border-white/10 shrink-0">
          <div className="relative flex-1">
            <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              className={`${inp} pl-8`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, city or country…"
              autoComplete="off"
              data-lpignore="true"
            />
          </div>
          <button
            type="button"
            onClick={() => { setAddOpen((v) => !v); setAddForm(emptyForm()); }}
            className="font-mono text-xs border border-white/15 text-white/50 hover:text-white hover:border-white/30 px-3 py-2 rounded-sm transition-colors flex items-center gap-1.5 shrink-0"
          >
            <IconPlus className="w-4 h-4" />
            New owner
          </button>
        </div>

        {/* Add form */}
        {addOpen && (
          <div className="px-6 py-4 border-b border-white/10 bg-blue-700/5 shrink-0">
            <p className="font-mono text-xs text-blue-400 mb-2 uppercase tracking-widest">New owner</p>
            <CompanyFormFields form={addForm} onChange={(patch) => setAddForm((f) => ({ ...f, ...patch }))} />
            <div className="flex gap-2 mt-3">
              <button onClick={() => setAddOpen(false)}
                className="font-mono text-xs border border-white/15 text-white/40 hover:text-white px-3 py-1.5 rounded-sm transition-colors">
                Cancel
              </button>
              <button onClick={saveAdd} disabled={!addForm.name.trim() || saving}
                className="font-mono text-xs bg-blue-700 hover:bg-blue-600 disabled:opacity-30 text-white px-4 py-1.5 rounded-sm transition-colors">
                {saving ? "Saving…" : "Add owner"}
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center h-40">
              <p className="font-mono text-xs text-white/25">
                {companies.length === 0 ? "No owners yet — add one above" : "No matches"}
              </p>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-neutral-950 z-10">
                <tr className="border-b border-white/10">
                  <th className="font-mono text-xs text-white/30 text-left px-4 py-2 font-normal">Owner</th>
                  <th className="font-mono text-xs text-white/30 text-left px-4 py-2 font-normal">Location</th>
                  <th className="font-mono text-xs text-white/30 text-left px-4 py-2 font-normal">Revenue</th>
                  <th className="font-mono text-xs text-white/30 text-center px-4 py-2 font-normal">In use</th>
                  <th className="px-4 py-2" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((company) => {
                  const isEditing = editId === company.id;
                  const count = usageCount[company.id!] ?? 0;
                  const icon  = company.icon as IconSource | undefined;
                  return (
                    <>
                      {/* Row */}
                      <tr
                        key={company.id}
                        className={`border-b border-white/5 transition-colors ${isEditing ? "bg-blue-700/5" : "hover:bg-white/[0.02]"}`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <EntryIcon icon={icon} title={company.name} size={26} />
                            <span className="font-mono text-xs text-white">{company.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-white/50">
                          {[company.address?.city, company.address?.country].filter(Boolean).join(", ") || "—"}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-white/50">
                          {formatRevenue(company.revenue)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-mono text-xs ${count > 0 ? "text-white/60" : "text-white/20"}`}>
                            {count}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => isEditing ? cancelEdit() : startEdit(company)}
                              className="font-mono text-xs text-white/30 hover:text-blue-400 transition-colors px-2 py-1 border border-transparent hover:border-blue-700/40 rounded-sm"
                            >
                              {isEditing ? "Cancel" : "Edit"}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(company.id!, company.name)}
                              className="font-mono text-xs text-white/30 hover:text-red-400 transition-colors px-2 py-1 border border-transparent hover:border-red-700/40 rounded-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Inline edit form */}
                      {isEditing && (
                        <tr key={`edit-${company.id}`} className="bg-blue-700/5 border-b border-blue-700/20">
                          <td colSpan={5} className="px-6 py-4">
                            <CompanyFormFields
                              form={editForm}
                              onChange={(patch) => setEditForm((f) => ({ ...f, ...patch }))}
                            />
                            <div className="flex gap-2 mt-3">
                              <button onClick={cancelEdit}
                                className="font-mono text-xs border border-white/15 text-white/40 hover:text-white px-3 py-1.5 rounded-sm transition-colors">
                                Cancel
                              </button>
                              <button onClick={saveEdit} disabled={!editForm.name.trim() || saving}
                                className="font-mono text-xs bg-blue-700 hover:bg-blue-600 disabled:opacity-30 text-white px-4 py-1.5 rounded-sm transition-colors">
                                {saving ? "Saving…" : "Save changes"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 shrink-0 flex justify-end">
          <button onClick={onClose}
            className="font-mono text-xs border border-white/15 text-white/40 hover:text-white hover:border-white/30 px-4 py-2 rounded-sm transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
