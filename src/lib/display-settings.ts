import { contentExtras, type ContentRow } from "@/lib/content";

export const projectTotalFields = [
  { key: "completed_projects", label: "Completed projects", status: "Completed" },
  { key: "ongoing_projects", label: "Ongoing projects", status: "Ongoing" },
  { key: "upcoming_projects", label: "Upcoming projects", status: "Upcoming" },
  { key: "published_projects", label: "Published projects", status: null },
] as const;

export function projectTotals(row: ContentRow | undefined, projects: readonly { status: string }[]) {
  const extra = contentExtras(row);
  return projectTotalFields.map(field => {
    const value = extra[field.key];
    return { ...field, value: typeof value === "number" && Number.isInteger(value) && value >= 0
      ? value : projects.filter(project => !field.status || project.status === field.status).length };
  });
}

export const typographyOptions = {
  size: { small: "text-xl!", medium: "text-2xl!", large: "text-3xl!" },
  weight: { normal: "font-normal!", medium: "font-medium!", semibold: "font-semibold!", bold: "font-bold!" },
  font: { montserrat: "font-display!", poppins: "font-sans!" },
  case: { original: "normal-case", uppercase: "uppercase" },
  color: { primary: "text-primary", foreground: "text-foreground", muted: "text-muted-foreground" },
} as const;

export function teamTextClasses(row: ContentRow | undefined, field: "name" | "designation" | "biography") {
  const extra = contentExtras(row);
  const defaults = field === "name"
    ? { size: "medium", weight: "semibold", font: "montserrat", case: "original", color: "foreground" }
    : field === "designation"
      ? { size: "small", weight: "semibold", font: "poppins", case: "original", color: "primary" }
      : { size: "small", weight: "normal", font: "poppins", case: "original", color: "muted" };
  return Object.entries(typographyOptions).map(([key, options]) => {
    const selected = extra[`${field}_${key}`];
    const fallback = defaults[key as keyof typeof defaults];
    const values: Record<string, string> = options;
    if (field === "biography" && key === "size" && typeof selected !== "string") return "text-sm!";
    return values[typeof selected === "string" ? selected : ""] ?? values[fallback];
  }).join(" ");
}