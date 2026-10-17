import type { Json } from "@/integrations/supabase/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Upload } from "lucide-react";

export function ContentSettingsEditor({ value, onChange, prefix = "", onUpload }: { value: Json; onChange: (value: Json) => void; prefix?: string; onUpload?: (file: File) => Promise<string | null> }) {
  if (Array.isArray(value)) return <div className="grid gap-3">{value.map((item,index) => <div key={index} className="flex items-start gap-2"><div className="min-w-0 flex-1"><ContentSettingsEditor value={item} prefix={`${prefix} ${index+1}`} onChange={next => onChange(value.map((row,i) => i === index ? next : row))}/></div><Button size="icon" variant="outline" aria-label="Remove entry" onClick={() => onChange(value.filter((_,i) => i!==index))}><Trash2/></Button></div>)}<Button variant="outline" size="sm" className="w-fit" onClick={() => onChange([...value, ""])}><Plus/>Add entry</Button></div>;
  if (value && typeof value === "object") return <div className="grid gap-5">{Object.entries(value).map(([key,item]) => <div key={key}><Label className="mb-2 capitalize">{key.replaceAll("_", " ")}</Label><ContentSettingsEditor value={item ?? ""} prefix={key} onUpload={onUpload} onChange={next => onChange({...value,[key]:next})}/></div>)}</div>;
  if (typeof value === "number") return <Input type="number" aria-label={prefix} value={value} onChange={event => onChange(Number(event.target.value))}/>;
  if (typeof value === "boolean") return <Switch aria-label={prefix} checked={value} onCheckedChange={onChange}/>;
  if (onUpload && /image|banner|poster/.test(prefix)) return <div className="grid gap-3">{value && <img src={String(value)} alt="Current image" className="h-32 w-full object-contain"/>}<div className="flex gap-2"><Input aria-label={prefix} value={String(value ?? "")} onChange={event => onChange(event.target.value)}/><Button asChild variant="outline"><label className="cursor-pointer"><Upload/>Upload<input type="file" accept="image/*" className="sr-only" onChange={async event=>{const file=event.target.files?.[0];if(file){const url=await onUpload(file);if(url)onChange(url);}}}/></label></Button></div></div>;
  return <Textarea aria-label={prefix} value={String(value ?? "")} onChange={event => onChange(event.target.value)} rows={2}/>;
}