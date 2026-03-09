export type IconSource =
  | { type: "iconify"; value: string }   // e.g. "logos:github-icon"
  | { type: "url"; value: string }       // https://… or /api/v1/icons/filename.png
  | { type: "letter"; value: string };   // fallback: first letter of title

export type ServiceType = "free" | "paid";

export interface Tag {
  name: string;
}

export interface PasswordEntry {
  id: number;
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
  icon?: IconSource;
  category: string;       // e.g. "Software", "Telecom"
  tags: string[];         // e.g. ["Email", "Technology"]
  serviceType: ServiceType;
  createdAt: string;      // ISO
  updatedAt: string;      // ISO
}

export type SortField = "title" | "createdAt" | "updatedAt" | "category";
export type SortDir   = "asc" | "desc";

export interface FilterState {
  search: string;
  tags: string[];
  categories: string[];
  serviceTypes: ServiceType[];
  sortField: SortField;
  sortDir: SortDir;
}