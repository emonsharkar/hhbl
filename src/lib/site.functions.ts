import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY']!;
  return createClient<Database>(process.env['SUPABASE_URL']!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => { const headers = new Headers(init?.headers); if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization"); headers.set("apikey", key); return fetch(input, { ...init, headers }); } },
  });
}

export const getPublicProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient().from("projects").select("id,title,slug,location,status,summary,description,image_key,image_url,amenities,facts,is_featured,is_published,sort_order").eq("is_published", true).order("sort_order");
  if (error) throw new Error("Unable to load projects");
  return data;
});

export const getPublicTeam = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient().from("team_members").select("id,name,role,phone,biography,image_url,is_published,sort_order").eq("is_published", true).order("sort_order");
  if (error) throw new Error("Unable to load team");
  return data;
});

export const getPublicProject = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1).max(120) }).parse(input))
  .handler(async ({ data }) => {
    const result = await publicClient().from("projects").select("id,title,slug,location,status,summary,description,image_key,image_url,amenities,facts,is_featured,is_published,sort_order").eq("slug", data.slug).eq("is_published", true).maybeSingle();
    if (result.error) throw new Error("Unable to load project");
    return result.data;
  });

export const getPublicContent = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient().from("site_content").select("section_key,heading,body,extra").eq("is_published", true);
  if (error) throw new Error("Unable to load website content");
  return data;
});

const messageSchema = z.object({ name: z.string().trim().min(2).max(100), email: z.string().email().max(200), phone: z.string().trim().max(30).optional(), subject: z.string().trim().min(2).max(160), message: z.string().trim().min(10).max(3000), website: z.string().max(0).optional() });
export const submitContactMessage = createServerFn({ method: "POST" }).inputValidator((input) => messageSchema.parse(input)).handler(async ({ data }) => {
  if (data.website) return { ok: true };
  const { error } = await publicClient().from("contact_messages").insert({ name: data.name, email: data.email, phone: data.phone || null, subject: data.subject, message: data.message });
  if (error) throw new Error("Your message could not be sent. Please try again.");
  return { ok: true };
});