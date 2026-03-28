/**
 * IconCacheContext — provides a fast lookup from (type, value) → locally
 * cached icon URL so that icons keep rendering when the device is offline.
 *
 * The context value is a plain Map populated by App.tsx from the icon
 * catalogue data returned by the backend.  EntryIcon reads from it without
 * needing any extra props to be threaded through every intermediate component.
 */

import { createContext, useContext } from "react";
import type { IconSource } from "../types";

/** Map key: `"iconify:mdi:home"` or `"url:https://example.com/logo.png"` */
export type IconCacheMap = Map<string, string>;

export const IconCacheContext = createContext<IconCacheMap>(new Map());

/**
 * Returns the cached (local) URL for the given icon, or `undefined` when the
 * icon has not been downloaded yet or does not need caching (letter icons).
 */
export function useCachedIconUrl(icon: IconSource | undefined): string | undefined {
  const map = useContext(IconCacheContext);
  if (!icon || icon.type === "letter") return undefined;
  return map.get(`${icon.type}:${icon.value}`);
}
