import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProjectCard } from "@/components/project-card";
import { ParallaxImage } from "@/components/parallax-image";
import { HomePartners } from "@/components/home-partners";
import { HomeVideoShowcase } from "@/components/home-video-showcase";
import { contentSection, listExtra, numberExtra, textExtra } from "@/lib/content";
import { demoProjects, officialContent } from "@/lib/site-data";
import { getPublicContent, getPublicAffiliations, getPublicFaqs, getPublicProjects, getPublicTestimonials } from "@/lib/site.functions";
import heroImage from "@/assets/hbl-residential-banner.jpg";
import interiorImage from "@/assets/hbl-interior.jpg";

export const Route = createFileRoute("/")({
  loader: async () => { try { return await Promise.all([getPublicProjects(), getPublicTestimonials(), getPublicFaqs(), getPublicAffiliations(), getPublicContent()]); } catch { return [demoProjects, [], [], [], officialContent] as const; } },
  head: () => ({ meta: [
    { title: "Haque Home & Builders Limited | Thoughtful Homes in Dhaka" },
    { name: "description", content: "Explore thoughtfully designed residential projects by Haque Home & Builders Limited in Dhaka." },
    { property: "og:title", content: "Haque Home & Builders Limited" },
    { property: "og:description", content: "Thoughtful homes, dependable construction, and enduring value." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}), component: Index,
});

function Index() {
  const [projectRows, testimonials, faqs, affiliations, content] = Route.useLoaderData();
  const projects = projectRows;
  const stories = testimonials;
  const questions = faqs;
  const hero = contentSection(content, "hero", officialContent[1]);
  const intro = contentSection(content, "introduction", officialContent[2]);
  const mission = contentSection(content, "mission", officialContent[4]);
  const services = contentSection(content, "services", officialContent[5]);
  const headings = contentSection(content, "home_sections", undefined);
  const closing = contentSection(content, "closing", undefined);
  const showcase = contentSection(content, "video_showcase", undefined);
  const stats = [
    [numberExtra(intro, "completed_count", projects.filter(project => project.status === "Completed").length), "Completed projects"],
    [numberExtra(intro, "ongoing_count", projects.filter(project => project.status === "Ongoing").length), "Ongoing projects"],
    [numberExtra(intro, "upcoming_count", projects.filter(project => project.status === "Upcoming").length), "Upcoming projects"],
    [numberExtra(intro, "published_count", projects.length), "Published projects"],
  ] as const;
  return <>
    <section className="home-hero relative overflow-hidden bg-navy text-primary-foreground">
      <ParallaxImage src={textExtra(hero,"banner_image") || heroImage} alt="Architectural illustration of contemporary residences with landscaped gardens" className="absolute inset-0 h-full w-full object-cover" />
      <div className="image-veil absolute inset-0" />
      <div className="home-hero-content relative mx-auto flex max-w-7xl items-end px-5 pb-16 lg:px-8 lg:pb-20">
        <div className="max-w-2xl reveal"><p className="section-label text-sky">{textExtra(hero,"eyebrow")}</p><h1 className="mt-5">{hero.heading}</h1><p className="mt-6 max-w-xl text-sm leading-7 text-primary-foreground/90 sm:text-base">{hero.body}</p><div className="hero-actions mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="bg-sky text-navy hover:bg-sky/90"><Link to="/projects">Explore our projects <ArrowRight /></Link></Button><Button asChild variant="outline" size="lg" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-navy"><Link to="/contact">Start a conversation</Link></Button></div></div>
      </div>
    </section>

    <section className="py-24 sm:py-32"><div className="section-shell grid items-center gap-16 lg:grid-cols-[1.1fr_.9fr]"><div><p className="section-label">Our commitment</p><h2 className="mt-5 text-5xl leading-tight sm:text-7xl">{intro.heading}</h2><p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground">{intro.body}</p><Button asChild variant="link" className="mt-6 px-0"><Link to="/corporate">Discover our company <ArrowRight /></Link></Button></div><div className="grid grid-cols-2 gap-px bg-border">{stats.map(([value,label])=><div key={label} className="bg-background p-8 sm:p-10"><p className="font-display text-5xl text-primary">{value}</p><p className="mt-2 text-sm text-muted-foreground">{label}</p></div>)}</div></div></section>

    <section className="bg-navy py-24 text-primary-foreground sm:py-32"><div className="section-shell"><div className="flex items-end justify-between gap-6"><div><p className="section-label text-sky">Selected residences</p><h2 className="mt-5 max-w-3xl text-5xl leading-tight sm:text-7xl">{textExtra(headings,"projects_heading","Spaces with a distinct point of view.")}</h2></div><Button asChild variant="outline" className="hidden border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-navy sm:flex"><Link to="/projects">View all</Link></Button></div><div className="mt-12 grid gap-6 md:grid-cols-3">{projects.filter(project => project.is_featured).slice(0,3).map(project => <ProjectCard key={project.slug} project={project} />)}</div></div></section>

    <section className="py-24 sm:py-32"><div className="section-shell"><p className="section-label">Our services</p><h2 className="mt-5 max-w-3xl text-5xl leading-tight sm:text-7xl">{services.heading}</h2><div className="mt-14 grid gap-px bg-border md:grid-cols-3">{listExtra(services,"points").map((item,index)=>{const [title,text]=item.split("|");return <div key={title} className="bg-background p-8"><span className="font-display text-3xl text-sky">0{index+1}</span><h3 className="mt-6 text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></div>})}</div></div></section>

    <section className="bg-accent py-24 sm:py-32"><div className="section-shell grid gap-16 lg:grid-cols-2"><div><p className="section-label">Our purpose</p><h2 className="mt-5 text-5xl leading-tight sm:text-7xl">{mission.heading}</h2><p className="mt-7 leading-8 text-muted-foreground">{mission.body}</p></div><div className="divide-y divide-border">{listExtra(mission,"points").map((text,i)=><div key={text} className="grid grid-cols-[3rem_1fr] gap-5 py-7 first:pt-0"><span className="font-display text-2xl text-sky">0{i+1}</span><p className="text-2xl">{text}</p></div>)}</div></div></section>

    {stories.length > 0 && <section className="py-24 sm:py-32"><div className="section-shell"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><p className="section-label">Client stories</p><h2 className="mt-5 text-5xl leading-tight sm:text-6xl">{textExtra(headings,"testimonials_heading","Confidence, reflected.")}</h2></div><div className="grid gap-8 md:grid-cols-2">{stories.slice(0,4).map(item=><blockquote key={item.id} className="border-t border-primary pt-7"><p className="font-display text-3xl leading-snug">“{item.quote}”</p><footer className="mt-7 text-xs font-semibold uppercase text-muted-foreground">{item.name} · {item.relationship}</footer></blockquote>)}</div></div></div></section>}

    <HomeVideoShowcase videoUrl={textExtra(showcase, "video_url")} heading={showcase.heading} />

    <HomePartners partners={affiliations} />

    {questions.length > 0 && <section className="py-24 sm:py-32"><div className="section-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="section-label">Common questions</p><h2 className="mt-5 text-5xl leading-tight sm:text-6xl">{textExtra(headings,"faq_heading","Before you choose your home.")}</h2></div><Accordion type="single" collapsible className="border-t">{questions.slice(0,6).map(item=><AccordionItem key={item.id} value={item.id}><AccordionTrigger className="py-6 text-left text-lg">{item.question}</AccordionTrigger><AccordionContent className="max-w-2xl text-base leading-8 text-muted-foreground">{item.answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>}

    <section className="relative min-h-[38rem] overflow-hidden bg-navy text-primary-foreground"><img src={textExtra(closing,"image") || interiorImage} alt="Thoughtfully designed residential interior" className="absolute inset-0 h-full w-full object-cover opacity-45"/><div className="absolute inset-0 bg-navy/60"/><div className="section-shell relative flex min-h-[38rem] items-center justify-center py-20 text-center"><div><p className="section-label text-sky">Your next chapter</p><h2 className="mx-auto mt-5 max-w-4xl text-6xl leading-none sm:text-8xl">{closing.heading || "Let’s find a place that feels entirely yours."}</h2><Button asChild size="lg" className="mt-9"><Link to="/contact">Speak with our team <ArrowRight/></Link></Button></div></div></section>
  </>;
}