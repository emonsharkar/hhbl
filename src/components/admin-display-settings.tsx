import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { contentExtras } from "@/lib/content";
import { projectTotals, typographyOptions } from "@/lib/display-settings";

export function AdminDisplaySettings({ mode, content, projects, onSaved, setNotice }: {
  mode: "totals" | "team"; content: Tables<"site_content">[]; projects: { status: string }[];
  onSaved: () => Promise<void>; setNotice: (message: string) => void;
}) {
  const sectionKey = mode === "totals" ? "introduction" : "team_intro";
  const row = content.find(item => item.section_key === sectionKey);
  const [draft, setDraft] = useState(contentExtras(row));
  const [saving, setSaving] = useState(false);
  async function save() {
    setSaving(true);
    const values = { extra: { ...contentExtras(row), ...draft } };
    const result = row
      ? await supabase.from("site_content").update(values).eq("id", row.id).select("id").single()
      : await supabase.from("site_content").insert({ ...values, section_key: sectionKey, heading: "", body: "", is_published: true }).select("id").single();
    setSaving(false);
    setNotice(result.error?.message ?? "Display settings saved.");
    if (!result.error) await onSaved();
  }
  return <div className="my-7 border bg-background p-6">
    <h3 className="mb-5 text-xl">{mode === "totals" ? "Homepage project totals" : "Management team text styles"}</h3>
    {mode === "totals" ? <div className="grid gap-4 sm:grid-cols-2">{projectTotals({ section_key: sectionKey, heading: "", body: "", extra: draft }, projects).map(field => <div key={field.key}>
      <Label htmlFor={field.key} className="mb-2">{field.label}</Label>
      <Input id={field.key} type="number" min={0} step={1} value={typeof draft[field.key] === "number" ? Number(draft[field.key]) : ""} placeholder={String(field.value)} onChange={event => setDraft({ ...draft, [field.key]: event.target.value === "" ? null : Math.max(0, Math.floor(Number(event.target.value))) })}/>
    </div>)}</div> : <div className="grid gap-6">{(["name", "designation", "biography"] as const).map(field => <div key={field}>
      <h4 className="mb-3 font-semibold capitalize">{field}</h4>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{Object.entries(typographyOptions).map(([key, options]) => {
        const value = draft[`${field}_${key}`];
        return <div key={key}><Label className="mb-2 capitalize">{key === "case" ? "Capitalization" : key}</Label><Select value={typeof value === "string" ? value : "default"} onValueChange={selected => setDraft({ ...draft, [`${field}_${key}`]: selected === "default" ? null : selected })}><SelectTrigger aria-label={`${field} ${key}`}><SelectValue/></SelectTrigger><SelectContent><SelectItem value="default">Default</SelectItem>{Object.keys(options).map(option => <SelectItem key={option} value={option} className="capitalize">{option}</SelectItem>)}</SelectContent></Select></div>;
      })}</div>
    </div>)}</div>}
    <div className="mt-5 flex justify-end"><Button disabled={saving} onClick={() => void save()}><Save/>{saving ? "Saving…" : "Save display settings"}</Button></div>
  </div>;
}