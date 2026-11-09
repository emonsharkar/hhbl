import type { Json } from "@/integrations/supabase/types";

export type ContentRow = { section_key: string; heading: string; body: string; extra: Json };
export function contentSection(rows: ContentRow[], key: string, fallback: ContentRow | undefined): ContentRow {
  return rows.find(row => row.section_key === key) ?? fallback ?? { section_key: key, heading: "", body: "", extra: {} };
}
export function contentExtras(row: ContentRow | null | undefined): Record<string, Json | undefined> {
  return row?.extra && typeof row.extra === "object" && !Array.isArray(row.extra) ? row.extra : {};
}
export function textExtra(row: ContentRow | null | undefined, key: string, fallback = ""): string {
  const value = contentExtras(row)[key];
  return typeof value === "string" ? value : fallback;
}
export function numberExtra(row: ContentRow | null | undefined, key: string, fallback: number): number {
  const value = contentExtras(row)[key];
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
export function listExtra(row: ContentRow, key: string): string[] {
  const value = contentExtras(row)[key];
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}