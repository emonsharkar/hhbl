import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { demoProjects } from "@/lib/site-data";
import heroImage from "@/assets/hbl-hero.jpg";
import { ParallaxImage } from "@/components/parallax-image";
import { getPublicProjects } from "@/lib/site.functions";

export const Route = createFileRoute("/")({
  loader: async () => { try { const projects = await getPublicProjects(); return projects.length ? projects : demoProjects; } catch { return demoProjects; } },
  head: () => ({ meta: [
    { title: "Haque Home & Builders Limited | Thoughtful Homes in Dhaka" },
    { name: "description", content: "Explore thoughtfully designed residential projects by Haque Home & Builders Limited in Dhaka." },
    { property: "og:title", content: "Haque Home & Builders Limited" },
    { property: "og:description", content: "Thoughtful homes, dependable construction, and enduring value." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

function Index() {
  const projects = Route.useLoaderData();
  return (
    <>
      <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
        <ParallaxImage src={heroImage} alt="Contemporary residential towers in Dhaka" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy/65" />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 text-center text-primary-foreground lg:px-8 reveal">
          <p className="section-label text-sky">We are</p>
          <h1 className="mx-auto mt-5 max-w-5xl text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">Haque Home &amp; Builders Limited</h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-primary-foreground/80 sm:text-lg">Your trusted partner for thoughtful homes and enduring value in Bangladesh.</p>
          <Button asChild size="lg" className="mt-9"><Link to="/projects">Explore our projects <ArrowRight /></Link></Button>
        </div>
      </section>
      <section className="py-24"><div className="mx-auto max-w-5xl px-5 text-center lg:px-8"><p className="section-label text-primary">Our commitment</p><h2 className="mt-5 text-3xl font-bold sm:text-5xl">Built on trust. Designed for life.</h2><p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted-foreground">HBL creates considered residential spaces where craftsmanship, comfort, and community come together. Every address begins with clear communication, dependable delivery, and a home made to last.</p></div></section>
      <section className="bg-accent py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><p className="section-label text-primary">Why choose us</p><h2 className="mt-4 text-3xl font-bold sm:text-5xl">The reasons we stand apart</h2><div className="mt-12 grid gap-px bg-border md:grid-cols-3">{[[ShieldCheck,"Trustworthiness","Transparent, ethical practices keep every decision clear."],[Sparkles,"Excellence","Every detail is held to a high standard, from planning to handover."],[Building2,"Expertise","Experienced teams understand the needs of Bangladesh’s urban homeowners."]].map(([Icon,title,copy]) => { const ItemIcon = Icon as typeof ShieldCheck; return <div key={String(title)} className="bg-background p-8"><ItemIcon className="h-8 w-8 text-primary"/><h3 className="mt-6 text-xl font-bold">{String(title)}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{String(copy)}</p></div>; })}</div></div></section>
      <section className="py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="flex items-end justify-between gap-6"><div><p className="section-label text-primary">Take a look</p><h2 className="mt-4 text-3xl font-bold sm:text-5xl">Our projects</h2></div><Button asChild variant="outline"><Link to="/projects">View all <ArrowRight /></Link></Button></div><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{projects.filter((project) => project.is_featured).slice(0,3).map((project) => <ProjectCard key={project.id} project={project} />)}</div></div></section>
    </>
  );
}
