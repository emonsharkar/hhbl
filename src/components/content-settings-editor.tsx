import type { Json } from "@/integrations/supabase/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function ContentSettingsEditor({ value, onChange, prefix = "" }: { value: Json; onChange: (value: Json) => void; prefix?: string }) {
  if (Array.isArray(value)) return <div className="grid gap-3">{value.map((item,index) => <div key={index} className="flex items-start gap-2"><div className="min-w-0 flex-1"><ContentSettingsEditor value={item} prefix={`${prefix} ${index+1}`} onChange={next => onChange(value.map((row,i) => i === index ? next : row))}/></div><Button size="icon" variant="outline" aria-label="Remove entry" onClick={() => onChange(value.filter((_,i) => i!==index))}><Trash2/></Button></div>)}<Button variant="outline" size="sm" className="w-fit" onClick={() => onChange([...value, ""])}><Plus/>Add entry</Button></div>;
  if (value && typeof value === "object") return <div className="grid gap-5">{Object.entries(value).map(([key,item]) => <div key={key}><Label className="mb-2 capitalize">{key.replaceAll("_", " ")}</Label><ContentSettingsEditor value={item ?? ""} prefix={key} onChange={next => onChange({...value,[key]:next})}/></div>)}</div>;
  if (typeof value === "number") return <Input type="number" aria-label={prefix} value={value} onChange={event => onChange(Number(event.target.value))}/>;
  return <Textarea aria-label={prefix} value={String(value ?? "")} onChange={event => onChange(event.target.value)} rows={2}/>;
}