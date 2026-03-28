import { useMemo, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import DetailPanel from "./components/DetailPanel";
import AddEditModal from "./components/AddEditModal";
import OwnersModal from "./components/OwnersModal";
import type { FilterState, IconCatalogueEntry, IconSource, PasswordEntry } from "./types";
import { MOCK_COMPANIES, MOCK_ENTRIES } from "./data/mockData";
import type { Company } from "./types";
import { IconCacheContext } from "./contexts/IconCacheContext";

/**
 * After saving an entry that carries an iconify/url icon, call the icon-catalogue
 * endpoint so the backend registers + starts caching it, then insert/update the
 * icon in local catalogue state so it appears in the library picker immediately.
 */
async function _refreshCatalogueEntry(
  icon: IconSource | undefined,
  project: string,
  setIconCatalogue: React.Dispatch<React.SetStateAction<IconCatalogueEntry[]>>,
): Promise<void> {
  if (!icon || icon.type === "letter") return;
  try {
    const q   = `?project=${encodeURIComponent(project)}`;
    const res = await fetch(`/api/v1/icon-catalogue${q}`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ type: icon.type, value: icon.value }),
    });
    if (!res.ok) return;
    const saved = await res.json();
    const entry: IconCatalogueEntry = {
      id:        saved.id,
      type:      saved.type,
      value:     saved.value,
      label:     saved.label     ?? undefined,
      createdAt: saved.created_at ?? undefined,
      cachedUrl: saved.cached_url ?? undefined,
    };
    setIconCatalogue((prev) => {
      const exists = prev.some((e) => e.type === entry.type && e.value === entry.value);
      return exists
        ? prev.map((e) => (e.type === entry.type && e.value === entry.value ? entry : e))
        : [entry, ...prev];
    });
  } catch {
    // Non-critical — ignore failures
  }
}

const DEFAULT_FILTER: FilterState = {
  search: "", tags: [], categories: [], serviceTypes: [], loginMethods: [], countries: [],
  sortField: "title", sortDir: "asc",
};

export default function App() {
  const [activeProject,    setActiveProject]    = useState("mock");
  const [unlockedProjects, setUnlockedProjects] = useState<string[]>([]);
  const [entries,          setEntries]          = useState<PasswordEntry[]>(MOCK_ENTRIES);
  const [companies,          setCompanies]       = useState<Company[]>(MOCK_COMPANIES);
  const [iconCatalogue,    setIconCatalogue]    = useState<IconCatalogueEntry[]>([]);
  const [loading,          setLoading]          = useState(false);
  const [vaultError,       setVaultError]       = useState<string | null>(null);
  const [filter,           setFilter]           = useState<FilterState>(DEFAULT_FILTER);
  const [selectedId,       setSelectedId]       = useState<number | null>(null);
  const [modalEntry,       setModalEntry]       = useState<PasswordEntry | null | undefined>(undefined);
  const [ownersModalOpen,  setOwnersModalOpen]  = useState(false);

  // ── load entries for a project that is already unlocked ──
  const loadProject = async (project: string) => {
    if (project === "mock") { setEntries(MOCK_ENTRIES); setCompanies(MOCK_COMPANIES); setIconCatalogue([]); return; }
    setLoading(true); setVaultError(null); setSelectedId(null);
    try {
      const q = encodeURIComponent(project);
      const [eRes, cRes, icRes] = await Promise.all([
        fetch(`/api/v1/entries?project=${q}`),
        fetch(`/api/v1/companies?project=${q}`),
        fetch(`/api/v1/icon-catalogue?project=${q}`),
      ]);
      if (!eRes.ok) throw new Error(`Server returned ${eRes.status}`);
      const [entriesData, companiesData, icData] = await Promise.all([
        eRes.json(),
        cRes.ok ? cRes.json() : [],
        icRes.ok ? icRes.json() : [],
      ]);
      const companyMap = new Map<number, Company>(
        (companiesData as any[]).map((c: any) => [c.id, {
          id:      c.id,
          name:    c.name,
          icon:    c.icon    ?? undefined,
          address: c.address ?? undefined,
          revenue: c.revenue ?? undefined,
        } as Company])
      );
      setCompanies([...companyMap.values()]);
      setIconCatalogue(
        (icData as any[]).map((e: any) => ({
          id:        e.id,
          type:      e.type,
          value:     e.value,
          label:     e.label     ?? undefined,
          createdAt: e.created_at ?? undefined,
          cachedUrl: e.cached_url ?? undefined,
        } as IconCatalogueEntry))
      );
      // Fire-and-forget: ask the backend to cache any icons not yet downloaded
      fetch(`/api/v1/icons/sync?project=${q}`, { method: "POST" }).catch(() => {});
      setEntries((entriesData as any[]).map((e: any) => ({
        id:             e.id,
        title:          e.title,
        username:       e.username        ?? undefined,
        email:          e.email           ?? undefined,
        password:       e.password        ?? undefined,
        url:            e.url             ?? undefined,
        notes:          e.notes           ?? undefined,
        icon:           e.icon            ?? undefined,
        category:       (e.category ?? "other").toLowerCase(),
        tags:           e.tags            ?? [],
        serviceType:    e.service_type    ?? "free",
        loginMethods:   e.login_methods   ?? [],
        companyId:      e.company_id      ?? undefined,
        company:        e.company_id ? companyMap.get(e.company_id) : undefined,
        userCreatedAt:  e.user_created_at ?? undefined,
        createdAt:      e.created_at,
        updatedAt:      e.updated_at,
      })));
    } catch {
      setVaultError("Could not load entries. Is `sspwd serve` running on :7523?");
      setEntries([]);
    } finally { setLoading(false); }
  };

  // ── unlock an existing project ──
  const handleUnlockRequest = async (project: string, password: string) => {
    const res = await fetch(`/api/v1/projects/${encodeURIComponent(project)}/unlock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Wrong password.");
    }
    setUnlockedProjects((prev) => [...new Set([...prev, project])]);
  };

  // ── create a new project ──
  const handleCreateRequest = async (name: string, password: string) => {
    const res = await fetch("/api/v1/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Could not create project.");
    }
    setUnlockedProjects((prev) => [...new Set([...prev, name])]);
  };

  // ── switch active project ──
  const handleProjectChange = (project: string) => {
    setActiveProject(project);
    loadProject(project);
  };

  const selectedEntry = useMemo(
    () => entries.find((e) => e.id === selectedId) ?? null,
    [entries, selectedId]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const e of entries) counts[e.category] = (counts[e.category] ?? 0) + 1;
    return counts;
  }, [entries]);

  /**
   * Map from "type:value" → cached local URL.
   * Used by EntryIcon (via IconCacheContext) to render icons offline.
   */
  const iconCacheMap = useMemo(() => {
    const m = new Map<string, string>();
    for (const e of iconCatalogue) {
      if (e.cachedUrl) m.set(`${e.type}:${e.value}`, e.cachedUrl);
    }
    return m;
  }, [iconCatalogue]);

  const handleSave = async (data: Omit<PasswordEntry, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();

    // mock mode — local state only
    if (activeProject === "mock") {
      if (modalEntry) {
        setEntries((prev) => prev.map((e) =>
          e.id === modalEntry.id ? { ...e, ...data, updatedAt: now } : e
        ));
      } else {
        const newEntry: PasswordEntry = { ...data, id: Date.now(), createdAt: now, updatedAt: now };
        setEntries((prev) => [...prev, newEntry]);
        setSelectedId(newEntry.id);
      }
      return;
    }

    // real project — persist to backend
    const q = `?project=${encodeURIComponent(activeProject)}`;
    try {
      // ── 1. Upsert company if owner details were provided ──────────────
      let resolvedCompanyId: number | null = data.companyId ?? null;
      let resolvedCompany: Company | undefined = data.company;

      if (data.company?.name?.trim()) {
        const companyBody = {
          name:    data.company.name,
          icon:    data.company.icon    ?? null,
          address: data.company.address ?? null,
          revenue: data.company.revenue ?? null,
        };
        if (resolvedCompanyId && resolvedCompanyId > 0) {
          // update existing company
          const cRes = await fetch(`/api/v1/companies/${resolvedCompanyId}${q}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(companyBody),
          });
          if (!cRes.ok) throw new Error("Failed to update company.");
          const savedC = await cRes.json();
          resolvedCompany = { id: savedC.id, name: savedC.name, icon: savedC.icon ?? undefined, address: savedC.address ?? undefined, revenue: savedC.revenue ?? undefined };
          setCompanies((prev) => prev.map((c) => c.id === savedC.id ? resolvedCompany! : c));
        } else {
          // create new company
          const cRes = await fetch(`/api/v1/companies${q}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(companyBody),
          });
          if (!cRes.ok) throw new Error("Failed to create company.");
          const savedC = await cRes.json();
          resolvedCompanyId = savedC.id;
          resolvedCompany = { id: savedC.id, name: savedC.name, icon: savedC.icon ?? undefined, address: savedC.address ?? undefined, revenue: savedC.revenue ?? undefined };
          setCompanies((prev) => [...prev, resolvedCompany!]);
        }
      }

      // ── 2. Build entry body with all fields ───────────────────────────
      const entryBody = {
        title:           data.title,
        username:        data.username        ?? null,
        email:           data.email           ?? null,
        password:        data.password        ?? null,
        url:             data.url             ?? null,
        notes:           data.notes           ?? null,
        icon:            data.icon            ?? null,
        category:        data.category        ?? "other",
        service_type:    data.serviceType     ?? "free",
        tags:            data.tags            ?? [],
        login_methods:   data.loginMethods    ?? [],
        company_id:      resolvedCompanyId,
        user_created_at: data.userCreatedAt   ?? null,
      };

      if (modalEntry) {
        // update
        const res = await fetch(`/api/v1/entries/${modalEntry.id}${q}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entryBody),
        });
        if (!res.ok) throw new Error("Failed to update entry.");
        const saved = await res.json();
        setEntries((prev) => prev.map((e) =>
          e.id === modalEntry.id
            ? { ...e, ...data, id: saved.id, updatedAt: saved.updated_at, company: resolvedCompany, companyId: resolvedCompanyId ?? undefined }
            : e
        ));
        // Refresh catalogue so the updated icon appears in the cache map
        _refreshCatalogueEntry(data.icon, activeProject, setIconCatalogue);
      } else {
        // create
        const res = await fetch(`/api/v1/entries${q}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entryBody),
        });
        if (!res.ok) throw new Error("Failed to create entry.");
        const saved = await res.json();
        const newEntry: PasswordEntry = {
          ...data,
          id:        saved.id,
          company:   resolvedCompany,
          companyId: resolvedCompanyId ?? undefined,
          createdAt: saved.created_at,
          updatedAt: saved.updated_at,
        };
        setEntries((prev) => [...prev, newEntry]);
        setSelectedId(newEntry.id);
        // Refresh catalogue so the new icon appears in the cache map
        _refreshCatalogueEntry(data.icon, activeProject, setIconCatalogue);
      }
    } catch (err: any) {
      alert(err.message || "Could not save entry.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this entry?")) return;

    if (activeProject !== "mock") {
      const q = `?project=${encodeURIComponent(activeProject)}`;
      try {
        const res = await fetch(`/api/v1/entries/${id}${q}`, { method: "DELETE" });
        if (!res.ok && res.status !== 204) throw new Error("Failed to delete.");
      } catch (err: any) {
        alert(err.message || "Could not delete entry.");
        return;
      }
    }

    setEntries((prev) => prev.filter((e) => e.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  // ── company CRUD (used by OwnersModal) ──
  const handleUpdateCompany = async (company: Company) => {
    if (activeProject === "mock") {
      setCompanies((prev) => prev.map((c) => c.id === company.id ? company : c));
      return;
    }
    const q = `?project=${encodeURIComponent(activeProject)}`;
    const res = await fetch(`/api/v1/companies/${company.id}${q}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:    company.name,
        icon:    company.icon    ?? null,
        address: company.address ?? null,
        revenue: company.revenue ?? null,
      }),
    });
    if (!res.ok) throw new Error("Failed to update owner.");
    const saved = await res.json();
    const updated: Company = { id: saved.id, name: saved.name, icon: saved.icon ?? undefined, address: saved.address ?? undefined, revenue: saved.revenue ?? undefined };
    setCompanies((prev) => prev.map((c) => c.id === updated.id ? updated : c));
  };

  const handleDeleteCompany = async (id: number) => {
    if (activeProject !== "mock") {
      const q = `?project=${encodeURIComponent(activeProject)}`;
      const res = await fetch(`/api/v1/companies/${id}${q}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) throw new Error("Failed to delete owner.");
    }
    setCompanies((prev) => prev.filter((c) => c.id !== id));
    setEntries((prev) => prev.map((e) => e.companyId === id ? { ...e, companyId: undefined, company: undefined } : e));
  };

  const handleAddCompany = async (company: Omit<Company, "id">) => {
    if (activeProject === "mock") {
      const newC: Company = { ...company, id: Date.now() };
      setCompanies((prev) => [...prev, newC]);
      return;
    }
    const q = `?project=${encodeURIComponent(activeProject)}`;
    const res = await fetch(`/api/v1/companies${q}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:    company.name,
        icon:    company.icon    ?? null,
        address: company.address ?? null,
        revenue: company.revenue ?? null,
      }),
    });
    if (!res.ok) throw new Error("Failed to create owner.");
    const saved = await res.json();
    const newC: Company = { id: saved.id, name: saved.name, icon: saved.icon ?? undefined, address: saved.address ?? undefined, revenue: saved.revenue ?? undefined };
    setCompanies((prev) => [...prev, newC]);
  };

  // ── icon catalogue ──
  const handleDeleteFromCatalogue = async (id: number) => {
    if (activeProject === "mock") return;
    const q = `?project=${encodeURIComponent(activeProject)}`;
    await fetch(`/api/v1/icon-catalogue/${id}${q}`, { method: "DELETE" });
    setIconCatalogue((prev) => prev.filter((e) => e.id !== id));
  };

  const handleUpdateCatalogueLabel = async (id: number, label: string) => {
    if (activeProject === "mock") return;
    const q = `?project=${encodeURIComponent(activeProject)}`;
    const res = await fetch(`/api/v1/icon-catalogue/${id}${q}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label }),
    });
    if (!res.ok) return;
    const saved = await res.json();
    setIconCatalogue((prev) =>
      prev.map((e) => e.id === id ? { ...e, label: saved.label ?? undefined } : e)
    );
  };

    return (
    <IconCacheContext.Provider value={iconCacheMap}>
    <div className="flex flex-col h-screen bg-neutral-950 text-white font-mono overflow-hidden">
      <Header
        activeProject={activeProject}
        unlockedProjects={unlockedProjects}
        onProjectChange={handleProjectChange}
        onUnlockRequest={handleUnlockRequest}
        onCreateRequest={handleCreateRequest}
      />

      <div className="flex flex-1 min-h-0">
        <div className="w-64 shrink-0">
          <Sidebar
            entries={entries}
            filter={filter}
            setFilter={setFilter}
            categoryCounts={categoryCounts}
            onSelectCategory={() => {}}
          />
        </div>

        <main className="flex-1 min-w-0 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
              <span className="font-mono text-sm text-white/50 animate-pulse">Loading vault…</span>
            </div>
          )}
          {vaultError && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 font-mono text-xs text-red-300 bg-red-900/40 border border-red-700 px-4 py-2 rounded-sm max-w-sm text-center">
              {vaultError}
            </div>
          )}
          <MainContent
            entries={entries}
            filter={filter}
            selectedId={selectedId}
            onSelect={(e) => setSelectedId((prev) => prev === e.id ? null : e.id)}
            onAdd={() => setModalEntry(null)}
          />
        </main>

        <div className="w-72 shrink-0">
          <DetailPanel
            entry={selectedEntry}
            onEdit={(e) => setModalEntry(e)}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <Footer />

      {modalEntry !== undefined && (
        <AddEditModal
          entry={modalEntry}
          activeProject={activeProject}
          companies={companies}
          entries={entries}
          iconCatalogue={iconCatalogue}
          onSave={handleSave}
          onClose={() => setModalEntry(undefined)}
          onOpenOwners={() => setOwnersModalOpen(true)}
          onDeleteFromCatalogue={handleDeleteFromCatalogue}
          onUpdateCatalogueLabel={handleUpdateCatalogueLabel}
        />
      )}

      {ownersModalOpen && (
        <OwnersModal
          companies={companies}
          entries={entries}
          activeProject={activeProject}
          onClose={() => setOwnersModalOpen(false)}
          onUpdate={handleUpdateCompany}
          onDelete={handleDeleteCompany}
          onAdd={handleAddCompany}
        />
      )}
    </div>
    </IconCacheContext.Provider>
  );
}