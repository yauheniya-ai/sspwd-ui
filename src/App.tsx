import { useMemo, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import DetailPanel from "./components/DetailPanel";
import AddEditModal from "./components/AddEditModal";
import type { FilterState, PasswordEntry } from "./types";
import { MOCK_COMPANIES, MOCK_ENTRIES } from "./data/mockData";
import type { Company } from "./types";

const DEFAULT_FILTER: FilterState = {
  search: "", tags: [], categories: [], serviceTypes: [],
  sortField: "title", sortDir: "asc",
};

export default function App() {
  const [activeProject,    setActiveProject]    = useState("mock");
  const [unlockedProjects, setUnlockedProjects] = useState<string[]>([]);
  const [entries,          setEntries]          = useState<PasswordEntry[]>(MOCK_ENTRIES);
  const [companies,        setCompanies]        = useState<Company[]>(MOCK_COMPANIES);
  const [loading,          setLoading]          = useState(false);
  const [vaultError,       setVaultError]       = useState<string | null>(null);
  const [filter,           setFilter]           = useState<FilterState>(DEFAULT_FILTER);
  const [selectedId,       setSelectedId]       = useState<number | null>(null);
  const [modalEntry,       setModalEntry]       = useState<PasswordEntry | null | undefined>(undefined);

  // ── load entries for a project that is already unlocked ──
  const loadProject = async (project: string) => {
    if (project === "mock") { setEntries(MOCK_ENTRIES); return; }
    setLoading(true); setVaultError(null); setSelectedId(null);
    try {
      const res = await fetch(`/api/v1/entries?project=${encodeURIComponent(project)}`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setEntries(data.map((e: any) => ({
        id:             e.id,
        title:          e.title,
        username:       e.username   ?? undefined,
        email:          e.email      ?? undefined,
        password:       e.password   ?? undefined,
        url:            e.url        ?? undefined,
        notes:          e.notes      ?? undefined,
        icon:           e.icon       ?? undefined,
        category:       e.category   ?? "Other",
        tags:           e.tags       ?? [],
        serviceType:    e.service_type ?? "free",
        loginMethods:   e.login_methods ?? [],
        companyId:      e.company_id ?? undefined,
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
      if (modalEntry) {
        // update
        const res = await fetch(`/api/v1/entries/${modalEntry.id}${q}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title:           data.title,
            username:        data.username        ?? null,
            email:           data.email           ?? null,
            password:        data.password        ?? null,
            url:             data.url             ?? null,
            notes:           data.notes           ?? null,
            category:        data.category        ?? "Other",
            tags:            data.tags            ?? [],
            login_methods:   data.loginMethods    ?? [],
            company_id:      data.companyId       ?? null,
            user_created_at: data.userCreatedAt   ?? null,
          }),
        });
        if (!res.ok) throw new Error("Failed to update entry.");
        const saved = await res.json();
        setEntries((prev) => prev.map((e) =>
          e.id === modalEntry.id
            ? { ...e, ...data, id: saved.id, updatedAt: saved.updated_at }
            : e
        ));
      } else {
        // create
        const res = await fetch(`/api/v1/entries${q}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title:           data.title,
            username:        data.username        ?? null,
            email:           data.email           ?? null,
            password:        data.password        ?? null,
            url:             data.url             ?? null,
            notes:           data.notes           ?? null,
            category:        data.category        ?? "Other",
            tags:            data.tags            ?? [],
            login_methods:   data.loginMethods    ?? [],
            company_id:      data.companyId       ?? null,
            user_created_at: data.userCreatedAt   ?? null,
          }),
        });
        if (!res.ok) throw new Error("Failed to create entry.");
        const saved = await res.json();
        const newEntry: PasswordEntry = {
          ...data, id: saved.id,
          createdAt: saved.created_at, updatedAt: saved.updated_at,
        };
        setEntries((prev) => [...prev, newEntry]);
        setSelectedId(newEntry.id);
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

  return (
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
          onSave={handleSave}
          onClose={() => setModalEntry(undefined)}
        />
      )}
    </div>
  );
}