import { Icon } from "@iconify/react";
import TagBadge from "./TagBadge";
import type { FilterState, SortField } from "../types";
import { ALL_TAGS, ALL_CATEGORIES, SERVICE_TYPES } from "../data/mockData";

interface SidebarProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  categoryCounts: Record<string, number>;
  onSelectCategory: (cat: string) => void;
}

const SORT_OPTIONS: Array<{ value: SortField; label: string }> = [
  { value: "title",     label: "Title A→Z" },
  { value: "createdAt", label: "Date added" },
  { value: "updatedAt", label: "Last updated" },
  { value: "category",  label: "Category" },
];

// Solid/filled iconify icons per category. Add new ones here as categories grow.
const CATEGORY_ICONS: Record<string, string> = {
  Education:  "mdi:school",
  Email:      "mdi:email",
  Finance:    "mdi:bank",
  Hosting:    "mdi:server",
  Internet:   "mdi:wifi",
  Shopping:   "mdi:cart",
  Software:   "fa7-solid:square-binary",
  Technology: "pixel:technology",
  Telecom:    "mingcute:radar-2-fill",
  // fallback for anything not listed
  Other:      "mdi:folder",
};

function categoryIcon(cat: string): string {
  return CATEGORY_ICONS[cat] ?? "mdi:folder";
}

export default function Sidebar({
  filter,
  setFilter,
  categoryCounts,
  onSelectCategory,
}: SidebarProps) {
  const toggleTag = (tag: string) =>
    setFilter((f) => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
    }));

  const toggleServiceType = (st: string) =>
    setFilter((f) => ({
      ...f,
      serviceTypes: f.serviceTypes.includes(st as any)
        ? f.serviceTypes.filter((x) => x !== st)
        : [...f.serviceTypes, st as any],
    }));

  const isActiveCategory = (cat: string) => filter.categories.includes(cat);

  const toggleCategory = (cat: string) => {
    setFilter((f) => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter((c) => c !== cat)
        : [...f.categories, cat],
    }));
    onSelectCategory(cat);
  };

  const clearAll = () =>
    setFilter((f) => ({ ...f, tags: [], categories: [], serviceTypes: [], search: "" }));

  const hasFilters =
    filter.tags.length > 0 ||
    filter.categories.length > 0 ||
    filter.serviceTypes.length > 0 ||
    filter.search !== "";

  return (
    <aside className="flex flex-col gap-5 h-full overflow-y-auto px-4 py-5 border-r border-white/10 bg-black/20 min-w-0">

      {/* Search — autocomplete/autofill fully disabled so browsers don't show the fingerprint/password prompt */}
      <section>
        <label className="block font-mono text-xs text-white/50 mb-1.5 uppercase tracking-widest">
          Search
        </label>
        <div className="relative">
          <Icon
            icon="mdi:magnify"
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white/30 text-base pointer-events-none"
          />
          <input
            type="search"
            name="sspwd-search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            data-form-type="other"
            data-lpignore="true"
            value={filter.search}
            onChange={(e) => setFilter((f) => ({ ...f, search: e.target.value }))}
            placeholder="title, username, url…"
            className="w-full font-mono text-sm bg-black border border-white/20 text-white placeholder-white/25 pl-7 pr-3 py-1.5 rounded-sm focus:outline-none focus:border-blue-700 transition-colors [&::-webkit-search-cancel-button]:hidden"
          />
        </div>
      </section>

      {/* Clear filters */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1 font-mono text-xs text-red-400 hover:text-red-300 transition-colors w-fit"
        >
          <Icon icon="mdi:close-circle" />
          Clear all filters
        </button>
      )}

      {/* Filter by tags */}
      <section>
        <label className="block font-mono text-xs text-white/50 mb-2 uppercase tracking-widest">
          Filter by tags
        </label>
        <div className="flex flex-wrap gap-1.5">
          {ALL_TAGS.map((tag) => (
            <TagBadge
              key={tag}
              label={tag}
              active={filter.tags.includes(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
        </div>
      </section>

      {/* Service type */}
      <section>
        <label className="block font-mono text-xs text-white/50 mb-2 uppercase tracking-widest">
          Service type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SERVICE_TYPES.map(({ value, label }) => (
            <TagBadge
              key={value}
              label={label}
              active={filter.serviceTypes.includes(value as any)}
              onClick={() => toggleServiceType(value)}
            />
          ))}
        </div>
      </section>

      {/* Sort */}
      <section>
        <label className="block font-mono text-xs text-white/50 mb-2 uppercase tracking-widest">
          Sort by
        </label>
        <div className="flex gap-1">
          <select
            value={filter.sortField}
            onChange={(e) =>
              setFilter((f) => ({ ...f, sortField: e.target.value as SortField }))
            }
            className="flex-1 font-mono text-xs bg-black border border-white/20 text-white px-2 py-1.5 rounded-sm focus:outline-none focus:border-blue-700 appearance-none"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setFilter((f) => ({ ...f, sortDir: f.sortDir === "asc" ? "desc" : "asc" }))}
            title={filter.sortDir === "asc" ? "Ascending" : "Descending"}
            className="border border-white/20 px-2 py-1.5 rounded-sm text-white/50 hover:text-white hover:border-blue-700 transition-colors"
          >
            <Icon
              icon={filter.sortDir === "asc" ? "mdi:sort-ascending" : "mdi:sort-descending"}
              className="text-base"
            />
          </button>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Category tree */}
      <section>
        <label className="block font-mono text-xs text-white/50 mb-2 uppercase tracking-widest">
          List by category
        </label>
        <ul className="flex flex-col gap-0.5">
          {ALL_CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => toggleCategory(cat)}
                className={`w-full flex items-center gap-2 text-left font-mono text-sm px-2 py-1 rounded-sm transition-colors group ${
                  isActiveCategory(cat)
                    ? "text-white bg-red-700/30 border-l-2 border-red-700"
                    : "text-white/55 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                }`}
              >
                <Icon
                  icon={categoryIcon(cat)}
                  className={`text-base shrink-0 transition-colors ${
                    isActiveCategory(cat) ? "text-red-400" : "text-white/30 group-hover:text-white/60"
                  }`}
                />
                <span className="flex-1">{cat}</span>
                <span
                  className={`text-xs font-mono tabular-nums transition-colors ${
                    isActiveCategory(cat) ? "text-white/80" : "text-white/25 group-hover:text-white/50"
                  }`}
                >
                  {categoryCounts[cat] ?? 0}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}