import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { getProjectImage, type Project } from "@/lib/site-data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative aspect-[7/10] overflow-hidden bg-muted">
      <img src={getProjectImage(project)} alt={`${project.title} residential development`} loading="lazy" width={1024} height={1440} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
        <p className="flex items-center gap-2 text-xs uppercase"><MapPin className="h-3.5 w-3.5" />{project.location}</p>
        <div className="mt-2 flex items-end justify-between gap-4"><div><h3 className="text-2xl font-bold">{project.title}</h3><p className="mt-1 text-sm text-primary-foreground/70">{project.status}</p></div><Link to="/projects/$slug" params={{ slug: project.slug }} aria-label={`View ${project.title}`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary-foreground/40 transition-colors hover:bg-primary-foreground hover:text-navy"><ArrowUpRight /></Link></div>
      </div>
    </article>
  );
}