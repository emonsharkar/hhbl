import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { demoProjects } from "@/lib/site-data";
import { getPublicProjects } from "@/lib/site.functions";

export const Route = createFileRoute("/projects/")({ loader: async () => { try { const projects = await getPublicProjects(); return projects; } catch { return demoProjects; } }, head: () => ({ meta: [{ title: "Projects | HBL" }, { name: "description", content: "Browse current, upcoming, and completed HBL residential projects in Dhaka." }, { property: "og:title", content: "HBL Residential Projects" }, { property: "og:description", content: "Discover HBL homes across Dhaka." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Projects });

function Projects() {
  const projects = Route.useLoaderData();
  const [status, setStatus] = useState("All");
  const [location, setLocation] = useState("All");
  const statuses = ["All", ...new Set(projects.map(project => project.status))];
  const locations = ["All", ...new Set(projects.map(project => project.location.includes("Savar") ? "Savar" : "Dhaka"))];
  const visible = useMemo(() => projects.filter(project => (status === "All" || project.status === status) && (location === "All" || project.location.includes(location))), [projects, status, location]);
  return <><PageIntro eyebrow="Portfolio" title="Homes with a lasting sense of place" copy="Explore a selection of current, upcoming, and completed residential developments across Dhaka."/><section className="py-20 sm:py-28"><div className="section-shell"><div className="flex flex-wrap items-center gap-3 border-b pb-8"><span className="mr-2 text-xs font-semibold uppercase text-muted-foreground">Status</span>{statuses.map(item=><Button key={item} size="sm" variant={status === item ? "default" : "outline"} onClick={()=>setStatus(item)}>{item}</Button>)}<span className="ml-0 mr-2 text-xs font-semibold uppercase text-muted-foreground md:ml-5">Location</span>{locations.map(item=><Button key={item} size="sm" variant={location === item ? "default" : "outline"} onClick={()=>setLocation(item)}>{item}</Button>)}</div><div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visible.map(project=><ProjectCard key={project.id} project={project}/>)}</div>{visible.length === 0 && <p className="py-20 text-center text-muted-foreground">No projects match these filters.</p>}</div></section></>;
}