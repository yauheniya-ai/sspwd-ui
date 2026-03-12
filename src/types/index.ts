export type IconSource =
  | { type: "iconify"; value: string }
  | { type: "url";     value: string }
  | { type: "letter";  value: string };

export type ServiceType = "free" | "paid";

export const COMMON_LOGIN_METHODS = [
  "Email / Password",
  "Email Link",
  "Phone",
  "GitHub",
  "Google",
  "Apple",
  "Facebook",
  "Microsoft",
  "Twitter / X",
  "SSO",
  "API Key",
  "SSH Key",
] as const;

export interface CompanyAddress {
  street?:     string;
  city?:       string;
  state?:      string;
  postcode?:   string;
  country:     string;        // full name, e.g. "United States"
  countryCode: string;        // ISO 2-letter, e.g. "us" — used for circle-flags:XX
}

export interface Company {
  id: number;
  name: string;
  icon?: IconSource;          // same 4-option icon as entries
  address?: CompanyAddress;
  revenue?: number;           // raw number in USD, e.g. 307_400_000_000
}

export interface PasswordEntry {
  id: number;
  title: string;
  username?: string;          // optional — login handle / display name
  email?: string;             // optional — login email
  password?: string;          // optional
  url?: string;
  notes?: string;
  icon?: IconSource;
  category: string;
  tags: string[];
  serviceType: ServiceType;
  loginMethods: string[];
  company?: Company;
  companyId?: number;
  userCreatedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type SortField = "title" | "createdAt" | "updatedAt" | "category" | "userCreatedAt";
export type SortDir   = "asc" | "desc";

export interface FilterState {
  search:        string;
  tags:          string[];
  categories:    string[];
  serviceTypes:  ServiceType[];
  loginMethods:  string[];
  sortField:     SortField;
  sortDir:       SortDir;
}

// ── Revenue formatting ────────────────────────────────────────────────────

export function formatRevenue(n?: number): string {
  if (n == null) return "—";
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
  if (n >= 1_000_000)     return `$${(n / 1_000_000).toFixed(0)}M`;
  if (n >= 1_000)         return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}