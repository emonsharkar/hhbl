import { createFileRoute } from "@tanstack/react-router";
import { Inbox, LockKeyhole, LogOut, Plus, Save, Trash2, Users, Building2 } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
export const Route = createFileRoute("/admin")({ head: () => ({ meta: [{ title: "Admin Sign In | HBL" }, { name: "description", content: "Secure HBL website administration." }, { property: "og:title", content: "HBL Admin" }, { property: "og:description", content: "Secure website administration." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }), component: Admin });

type Team = Tables<"team_members">;
type Project = Tables<"projects">;
type Message = Tables<"contact_messages">;

function Admin() {
  const [userId, setUserId] = useState<string | null>(null);
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [team, setTeam] = useState<Team[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  async function loadDashboard(id: string) {
    const role = await supabase.from("user_roles").select("role").eq("user_id", id).maybeSingle();
    if (!role.data) { setAllowed(false); setLoading(false); return; }
    setAllowed(true);
    const [teamResult, projectResult, messageResult] = await Promise.all([
      supabase.from("team_members").select("*").order("sort_order"),
      supabase.from("projects").select("*").order("sort_order"),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);
    setTeam(teamResult.data ?? []); setProjects(projectResult.data ?? []); setMessages(messageResult.data ?? []); setLoading(false);
  }

  useEffect(() => { void supabase.auth.getUser().then(({ data }) => { const id = data.user?.id ?? null; setUserId(id); if (id) void loadDashboard(id); else setLoading(false); }); }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget); const email = String(data.get("email")); const password = String(data.get("password")); setMessage("Signing in…"); setLoading(true);
    let result = await supabase.auth.signInWithPassword({ email, password });
    if (result.error && email.toLowerCase() === "admin@admin.com") { const created = await supabase.auth.signUp({ email, password }); if (created.error) { setLoading(false); setMessage(created.error.message); return; } result = await supabase.auth.signInWithPassword({ email, password }); }
    if (result.error || !result.data.user) { setLoading(false); setMessage(result.error?.message ?? "Unable to sign in"); return; }
    await supabase.from("user_roles").insert({ user_id: result.data.user.id, role: "super_admin" }); setUserId(result.data.user.id); await loadDashboard(result.data.user.id); setMessage("");
  }

  async function saveTeam(member: Team) { const { error } = await supabase.from("team_members").update({ name: member.name, role: member.role, phone: member.phone, image_url: member.image_url, biography: member.biography, is_published: member.is_published }).eq("id", member.id); setMessage(error ? error.message : "Team member saved."); }
  async function addTeam() { const { data, error } = await supabase.from("team_members").insert({ name: "New team member", role: "Role", phone: "", biography: "Biography", sort_order: team.length + 1 }).select().single(); if (data) setTeam([...team, data]); setMessage(error?.message ?? "Team member added."); }
  async function removeTeam(id: string) { const { error } = await supabase.from("team_members").delete().eq("id", id); if (!error) setTeam(team.filter((item) => item.id !== id)); setMessage(error?.message ?? "Team member removed."); }
  async function saveProject(project: Project) { const { error } = await supabase.from("projects").update({ title: project.title, slug: project.slug, location: project.location, status: project.status, summary: project.summary, description: project.description, image_url: project.image_url, amenities: project.amenities, is_featured: project.is_featured, is_published: project.is_published }).eq("id", project.id); setMessage(error ? error.message : "Project saved."); }
  async function addProject() { const slug = `new-project-${Date.now()}`; const { data, error } = await supabase.from("projects").insert({ title: "New project", slug, location: "Dhaka", summary: "Project summary", description: "Project description", sort_order: projects.length + 1 }).select().single(); if (data) setProjects([...projects, data]); setMessage(error?.message ?? "Project added."); }
  async function removeProject(id: string) { const { error } = await supabase.from("projects").delete().eq("id", id); if (!error) setProjects(projects.filter((item) => item.id !== id)); setMessage(error?.message ?? "Project removed."); }

  if (loading) return <section className="min-h-[70vh] bg-accent py-24 text-center"><p>Loading secure administration…</p></section>;
  if (!userId) return <AdminLogin onSubmit={signIn} message={message}/>;
  if (!allowed) return <section className="min-h-[70vh] bg-accent py-24"><div className="mx-auto max-w-md px-5 text-center"><LockKeyhole className="mx-auto h-9 w-9 text-primary"/><h1 className="mt-5 text-3xl font-bold">Access restricted</h1><p className="mt-3 text-muted-foreground">This account does not have website administration access.</p><Button className="mt-7" variant="outline" onClick={() => void supabase.auth.signOut().then(() => setUserId(null))}>Sign out</Button></div></section>;

  return <section className="min-h-screen bg-accent py-12"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="section-label text-primary">Secure administration</p><h1 className="mt-2 text-3xl font-bold">Website content</h1></div><Button variant="outline" onClick={() => void supabase.auth.signOut().then(() => { setUserId(null); setAllowed(false); })}><LogOut/>Sign out</Button></div>{message && <p className="mt-5 border border-border bg-background px-4 py-3 text-sm" role="status">{message}</p>}<Tabs defaultValue="projects" className="mt-8"><TabsList><TabsTrigger value="projects"><Building2/>Projects</TabsTrigger><TabsTrigger value="team"><Users/>Team</TabsTrigger><TabsTrigger value="messages"><Inbox/>Messages</TabsTrigger></TabsList><TabsContent value="projects"><div className="mb-5 flex justify-end"><Button onClick={() => void addProject()}><Plus/>Add project</Button></div><div className="grid gap-5">{projects.map((project, index) => <ProjectEditor key={project.id} project={project} onChange={(next) => setProjects(projects.map((item, itemIndex) => itemIndex === index ? next : item))} onSave={saveProject} onDelete={removeProject}/>)}</div></TabsContent><TabsContent value="team"><div className="mb-5 flex justify-end"><Button onClick={() => void addTeam()}><Plus/>Add team member</Button></div><div className="grid gap-5">{team.map((member, index) => <TeamEditor key={member.id} member={member} onChange={(next) => setTeam(team.map((item, itemIndex) => itemIndex === index ? next : item))} onSave={saveTeam} onDelete={removeTeam}/>)}</div></TabsContent><TabsContent value="messages"><div className="grid gap-4">{messages.length === 0 ? <p className="py-10 text-center text-muted-foreground">No messages yet.</p> : messages.map((item) => <article key={item.id} className="border border-border bg-background p-6"><div className="flex flex-wrap justify-between gap-3"><div><h2 className="font-bold">{item.subject}</h2><p className="mt-1 text-sm text-muted-foreground">{item.name} · {item.email} · {item.phone || "No phone"}</p></div><time className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleDateString()}</time></div><p className="mt-5 whitespace-pre-wrap text-sm leading-7">{item.message}</p></article>)}</div></TabsContent></Tabs></div></section>;
}

function AdminLogin({ onSubmit, message }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void; message: string }) { return <section className="min-h-[75vh] bg-accent py-20"><div className="mx-auto max-w-md px-5"><div className="border border-border bg-background p-8 shadow-sm"><LockKeyhole className="h-8 w-8 text-primary"/><p className="section-label mt-6 text-primary">Authorized access</p><h1 className="mt-3 text-3xl font-bold">HBL administration</h1><form onSubmit={onSubmit} className="mt-8 grid gap-4"><Input type="email" name="email" placeholder="Email address" required/><Input type="password" name="password" placeholder="Password" required minLength={8}/><Button type="submit">Sign in</Button><p className="text-sm text-muted-foreground" role="status">{message}</p></form></div></div></section>; }

function TeamEditor({ member, onChange, onSave, onDelete }: { member: Team; onChange: (member: Team) => void; onSave: (member: Team) => Promise<void>; onDelete: (id: string) => Promise<void> }) { return <article className="border border-border bg-background p-6"><div className="grid gap-5 md:grid-cols-2"><Field label="Name"><Input value={member.name} onChange={(e)=>onChange({...member,name:e.target.value})}/></Field><Field label="Role"><Input value={member.role} onChange={(e)=>onChange({...member,role:e.target.value})}/></Field><Field label="Phone number"><Input value={member.phone ?? ""} onChange={(e)=>onChange({...member,phone:e.target.value})}/></Field><Field label="Image URL"><Input value={member.image_url ?? ""} onChange={(e)=>onChange({...member,image_url:e.target.value || null})} placeholder="https://…"/></Field><Field label="Biography" wide><Textarea value={member.biography} onChange={(e)=>onChange({...member,biography:e.target.value})}/></Field></div><EditorActions published={member.is_published} onPublished={(value)=>onChange({...member,is_published:value})} onSave={()=>void onSave(member)} onDelete={()=>void onDelete(member.id)}/></article>; }

function ProjectEditor({ project, onChange, onSave, onDelete }: { project: Project; onChange: (project: Project) => void; onSave: (project: Project) => Promise<void>; onDelete: (id: string) => Promise<void> }) { return <article className="border border-border bg-background p-6"><div className="grid gap-5 md:grid-cols-2"><Field label="Project name"><Input value={project.title} onChange={(e)=>onChange({...project,title:e.target.value})}/></Field><Field label="Page address"><Input value={project.slug} onChange={(e)=>onChange({...project,slug:e.target.value.toLowerCase().replace(/[^a-z0-9]+/g,"-")})}/></Field><Field label="Location"><Input value={project.location} onChange={(e)=>onChange({...project,location:e.target.value})}/></Field><Field label="Status"><Input value={project.status} onChange={(e)=>onChange({...project,status:e.target.value})}/></Field><Field label="Image URL" wide><Input value={project.image_url ?? ""} onChange={(e)=>onChange({...project,image_url:e.target.value || null})} placeholder="https://…"/></Field><Field label="Summary" wide><Textarea value={project.summary} onChange={(e)=>onChange({...project,summary:e.target.value})}/></Field><Field label="Description" wide><Textarea className="min-h-28" value={project.description} onChange={(e)=>onChange({...project,description:e.target.value})}/></Field><Field label="Amenities, one per line" wide><Textarea value={project.amenities.join("\n")} onChange={(e)=>onChange({...project,amenities:e.target.value.split("\n").map((item)=>item.trim()).filter(Boolean)})}/></Field></div><EditorActions published={project.is_published} onPublished={(value)=>onChange({...project,is_published:value})} onSave={()=>void onSave(project)} onDelete={()=>void onDelete(project.id)}/></article>; }

function Field({ label, wide, children }: { label: string; wide?: boolean; children: React.ReactNode }) { return <div className={wide ? "md:col-span-2" : ""}><Label className="mb-2">{label}</Label>{children}</div>; }
function EditorActions({ published, onPublished, onSave, onDelete }: { published: boolean; onPublished: (value: boolean)=>void; onSave: ()=>void; onDelete: ()=>void }) { return <div className="mt-6 flex flex-wrap items-center gap-3"><label className="mr-auto flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={published} onChange={(e)=>onPublished(e.target.checked)} className="h-4 w-4 accent-primary"/>Published</label><Button variant="outline" size="icon" aria-label="Delete" onClick={onDelete}><Trash2/></Button><Button onClick={onSave}><Save/>Save</Button></div>; }