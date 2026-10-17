import type { Json } from "@/integrations/supabase/types";
import official from "./official-content.json";

export type Project = {
  id: string;
  title: string;
  slug: string;
  location: string;
  status: string;
  summary: string;
  description: string;
  image_key: string;
  image_url: string | null;
  amenities: string[];
  facts: Json;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  map_url?: string | null;
  brochure_url?: string | null;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  phone: string | null;
  biography: string;
  image_url: string | null;
  is_published: boolean;
  sort_order: number;
};

export const demoProjects: Project[] = official.projects;
export const demoTeam: TeamMember[] = official.team;
export const officialContent = official.content;
export const getProjectImage = (project: Pick<Project, "image_key" | "image_url">) => project.image_url || "";
