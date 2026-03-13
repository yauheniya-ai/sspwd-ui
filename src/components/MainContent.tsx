import { useMemo } from "react";
import PasswordCard from "./PasswordCard";
import type { FilterState, PasswordEntry } from "../types";
import { categoryIcon } from "../data/mockData";
import { Icon } from "@iconify/react";

interface MainContentProps {
  entries: PasswordEntry[];
  filter: FilterState;
  selectedId: number | null;
  onSelect: (entry: PasswordEntry) => void;
  onAdd: () => void;
}

function applyFilter(entries: PasswordEntry[], filter: FilterState): PasswordEntry[] {
  let result = [...entries];

  // search
  if (filter.search.trim()) {
    const q = filter.search.toLowerCase();
    result = result.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        (e.username ?? "").toLowerCase().includes(q) ||
        (e.email ?? "").toLowerCase().includes(q) ||
        (e.url ?? "").toLowerCase().includes(q) ||
        (e.notes ?? "").toLowerCase().includes(q)
    );
  }

  // tags (AND logic — entry must have ALL selected tags)
  if (filter.tags.length > 0) {
    result = result.filter((e) => filter.tags.some((t) => e.tags.includes(t)));
  }

  // categories
  if (filter.categories.length > 0) {
    result = result.filter((e) => filter.categories.includes(e.category));
  }

  // service types
  if (filter.serviceTypes.length > 0) {
    result = result.filter((e) => filter.serviceTypes.includes(e.serviceType));
  }

  if (filter.loginMethods.length > 0) {
    result = result.filter((e) =>
      filter.loginMethods.every((m) => e.loginMethods.includes(m))
    );
  }

  if (filter.countries.length > 0) {
    result = result.filter(
      (e) => e.company?.address?.country != null &&
             filter.countries.includes(e.company.address.country)
    );
  }

  // sort
  result.sort((a, b) => {
    let va: string;
    let vb: string;
    if (filter.sortField === "title")           { va = a.title;              vb = b.title; }
    else if (filter.sortField === "category")    { va = a.category;           vb = b.category; }
    else if (filter.sortField === "createdAt")   { va = a.createdAt;          vb = b.createdAt; }
    else if (filter.sortField === "userCreatedAt") { va = a.userCreatedAt ?? ""; vb = b.userCreatedAt ?? ""; }
    else { va = a.updatedAt; vb = b.updatedAt; }

    const cmp = va.localeCompare(vb);
    return filter.sortDir === "asc" ? cmp : -cmp;
  });

  return result;
}

export default function MainContent({
  entries,
  filter,
  selectedId,
  onSelect,
  onAdd,
}: MainContentProps) {
  const filtered = useMemo(() => applyFilter(entries, filter), [entries, filter]);

  // Group by category
  const groups = useMemo(() => {
    const map = new Map<string, PasswordEntry[]>();
    for (const e of filtered) {
      const group = map.get(e.category) ?? [];
      group.push(e);
      map.set(e.category, group);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-white/20">
        <span className="font-mono text-5xl">∅</span>
        <p className="font-mono text-sm">
          {entries.length === 0 ? "No entries yet." : "No entries match your filters."}
        </p>
        <button
          onClick={onAdd}
          className="animated-border-btn flex items-center gap-1 font-mono text-xs text-white/50 hover:text-white px-3 py-1.5 transition-colors mt-1"
        >
          <span className="btn-line btn-line-1" />
          <span className="btn-line btn-line-2" />
          <span className="btn-line btn-line-3" />
          <span className="btn-line btn-line-4" />
          <Icon icon="mdi:plus" className="text-sm" />
          Add first entry
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Summary bar — sticky, never scrolls */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5 shrink-0">
        <p className="font-mono text-xs text-white/35">
          {filtered.length} {filtered.length === 1 ? "entry" : "entries"} &middot; {groups.length} {groups.length === 1 ? "category" : "categories"}
        </p>
        <button
          onClick={onAdd}
          className="animated-border-btn flex items-center gap-1 font-mono text-xs text-white/50 hover:text-white px-2.5 py-1 transition-colors"
        >
          <span className="btn-line btn-line-1" />
          <span className="btn-line btn-line-2" />
          <span className="btn-line btn-line-3" />
          <span className="btn-line btn-line-4" />
          <Icon icon="mdi:plus" className="text-sm" />
          Add entry
        </button>
      </div>

      {/* Scrollable category groups */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
      <div className="flex flex-col gap-10">
        {groups.map(([category, items]) => (
          <section key={category}>
            {/* Category heading */}
            <div className="flex items-center gap-3 mb-4">
              <Icon icon={categoryIcon(category)} className="text-sm text-white/30 shrink-0" />
              <h2 className="font-mono text-xs font-semibold text-white/40 uppercase tracking-[0.2em]">
                {category}
              </h2>
              <div className="flex-1 h-px bg-white/8" />
              <span className="font-mono text-xs text-white/25">{items.length}</span>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {items.map((entry) => (
                <PasswordCard
                  key={entry.id}
                  entry={entry}
                  selected={entry.id === selectedId}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
      </div>
    </div>
  );
}