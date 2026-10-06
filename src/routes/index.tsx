import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Building2, Compass, Handshake, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProjectCard } from "@/components/project-card";
import { ParallaxImage } from "@/components/parallax-image";
import { demoProjects } from "@/lib/site-data";
import { getPublicAffiliations, getPublicFaqs, getPublicProjects, getPublicTestimonials } from "@/lib/site.functions";
import heroImage from "@/assets/hbl-hero.jpg";
import interiorImage from "@/assets/hbl-interior.jpg";

export const Route = createFileRoute("/")({
  loader: async () => { try { return await Promise.all([getPublicProjects(), getPublicTestimonials(), getPublicFaqs(), getPublicAffiliations()]); } catch { return [demoProjects, [], [], []] as const; } },
  head: () => ({ meta: [
    { title: "Haque Home & Builders Limited | Thoughtful Homes in Dhaka" },
    { name: "description", content: "Explore thoughtfully designed residential projects by Haque Home & Builders Limited in Dhaka." },
    { property: "og:title", content: "Haque Home & Builders Limited" },
    { property: "og:description", content: "Thoughtful homes, dependable construction, and enduring value." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}), component: Index,
});

const values = [
  { icon: ShieldCheck, title: "Integrity", text: "Transparent decisions and accountable delivery at every stage." },
  { icon: Compass, title: "Design intent", text: "Architecture shaped around comfort, light, privacy, and purpose." },
  { icon: Building2, title: "Enduring quality", text: "Sound engineering and resilient materials that age with confidence." },
  { icon: Handshake, title: "Lasting care", text: "Relationships that continue beyond the day you receive your keys." },
];

function Index() {
  const [projectRows, testimonials, faqs, affiliations] = Route.useLoaderData();
  const projects = projectRows.length ? projectRows : demoProjects;
  const stories = testimonials.length ? testimonials : [
    { id: "sample-1", name: "Sample homeowner", relationship: "HBL residence", quote: "The entire experience felt considered, transparent, and personal." },
    { id: "sample-2", name: "Sample landowner", relationship: "Development partner", quote: "Every promise was handled with care and professional clarity." },
  ];
  const questions = faqs.length ? faqs : [
    { id: "q1", question: "How can I arrange a project visit?", answer: "Send an inquiry or call our team. We will confirm a suitable visit time and connect you with the project representative." },
    { id: "q2", question: "Can I request project specifications?", answer: "Yes. Available plans, specifications, and current status can be shared after an initial conversation." },
  ];
  return <>
    <section className="relative min-h-[calc(100svh-6rem)] overflow-hidden bg-navy text-primary-foreground">
      <ParallaxImage src={heroImage} alt="Contemporary residential architecture in Dhaka" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="image-veil absolute inset-0" />
      <div className="relative mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl items-end px-5 pb-16 lg:px-8 lg:pb-24">
        <div className="max-w-4xl reveal"><p className="section-label text-sky">Haque Home &amp; Builders Limited</p><h1 className="mt-5 text-6xl leading-[0.98] sm:text-8xl lg:text-9xl">Elevated living,<br/><em className="text-sky">made enduring.</em></h1><p className="mt-8 max-w-xl text-base leading-8 text-primary-foreground/75 sm:text-lg">Purposeful residential design, conscientious construction, and dependable service across Dhaka.</p><div className="mt-10 flex flex-wrap gap-3"><Button asChild size="lg"><Link to="/projects">Explore our projects <ArrowRight /></Link></Button><Button asChild variant="outline" size="lg" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-navy"><Link to="/contact">Start a conversation</Link></Button></div></div>
      </div>
    </section>

    <section className="py-24 sm:py-32"><div className="section-shell grid items-center gap-16 lg:grid-cols-[1.1fr_.9fr]"><div><p className="section-label">Our commitment</p><h2 className="mt-5 text-5xl leading-tight sm:text-7xl">Built on trust.<br/><em className="text-primary">Designed for life.</em></h2><p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground">We create considered homes where modern utility meets a lasting sense of place. Every project is planned around real families, resilient materials, and transparent delivery.</p><Button asChild variant="link" className="mt-6 px-0"><Link to="/corporate">Discover our company <ArrowRight /></Link></Button></div><div className="grid grid-cols-2 gap-px bg-border">{[["12+","Years of focused work"],["18","Homes in our pipeline"],["96%","Client referral rate"],["4","Dhaka neighborhoods"]].map(([value,label])=><div key={label} className="bg-background p-8 sm:p-10"><p className="font-display text-5xl text-primary">{value}</p><p className="mt-2 text-sm text-muted-foreground">{label}</p></div>)}</div></div></section>

    <section className="bg-navy py-24 text-primary-foreground sm:py-32"><div className="section-shell"><div className="flex items-end justify-between gap-6"><div><p className="section-label text-sky">Selected residences</p><h2 className="mt-5 max-w-3xl text-5xl leading-tight sm:text-7xl">Spaces with a distinct point of view.</h2></div><Button asChild variant="outline" className="hidden border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-navy sm:flex"><Link to="/projects">View all</Link></Button></div><div className="mt-12 grid gap-6 md:grid-cols-3">{projects.filter(project => project.is_featured).slice(0,3).map(project => <ProjectCard key={project.slug} project={project} />)}</div></div></section>

    <section className="py-24 sm:py-32"><div className="section-shell"><p className="section-label">Why HBL</p><h2 className="mt-5 max-w-3xl text-5xl leading-tight sm:text-7xl">Every decision begins with the people who will live there.</h2><div className="mt-14 grid gap-px bg-border md:grid-cols-4">{values.map(({icon:Icon,title,text}, index) => <div key={title} className="bg-background p-8"><span className="font-display text-3xl text-sky">0{index+1}</span><Icon className="mt-10 h-7 w-7 text-primary"/><h3 className="mt-6 text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></div>)}</div></div></section>

    <section className="bg-accent py-24 sm:py-32"><div className="section-shell grid gap-16 lg:grid-cols-2"><div><p className="section-label">Our process</p><h2 className="mt-5 text-5xl leading-tight sm:text-7xl">Clarity from first sketch to final key.</h2></div><div className="divide-y divide-border">{[["Listen","We begin with the rhythms, expectations, and priorities of modern families."],["Design","Architecture and engineering are resolved together, never as afterthoughts."],["Build","Materials, workmanship, and progress are reviewed through a disciplined process."],["Stand beside you","Clear handover and responsive aftercare complete every HBL home."]].map(([title,text],i)=><div key={title} className="grid grid-cols-[3rem_1fr] gap-5 py-7 first:pt-0"><span className="font-display text-2xl text-sky">0{i+1}</span><div><h3 className="text-2xl">{title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p></div></div>)}</div></div></section>

    <section className="py-24 sm:py-32"><div className="section-shell"><div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><p className="section-label">Client stories</p><h2 className="mt-5 text-5xl leading-tight sm:text-6xl">Confidence, reflected.</h2></div><div className="grid gap-8 md:grid-cols-2">{stories.slice(0,4).map(item=><blockquote key={item.id} className="border-t border-primary pt-7"><p className="font-display text-3xl leading-snug">“{item.quote}”</p><footer className="mt-7 text-xs font-semibold uppercase text-muted-foreground">{item.name} · {item.relationship}</footer></blockquote>)}</div></div></div></section>

    {affiliations.length > 0 && <section className="border-y bg-accent py-12"><div className="section-shell"><p className="text-center text-xs font-semibold uppercase text-muted-foreground">Partners in quality</p><div className="mt-8 grid grid-cols-2 gap-5 text-center md:grid-cols-3 lg:grid-cols-6">{affiliations.map(item=><span key={item.id} className="text-sm font-semibold text-foreground/70">{item.name}</span>)}</div></div></section>}

    <section className="py-24 sm:py-32"><div className="section-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="section-label">Common questions</p><h2 className="mt-5 text-5xl leading-tight sm:text-6xl">Before you choose your home.</h2></div><Accordion type="single" collapsible className="border-t">{questions.slice(0,6).map(item=><AccordionItem key={item.id} value={item.id}><AccordionTrigger className="py-6 text-left text-lg">{item.question}</AccordionTrigger><AccordionContent className="max-w-2xl text-base leading-8 text-muted-foreground">{item.answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>

    <section className="relative min-h-[38rem] overflow-hidden bg-navy text-primary-foreground"><img src={interiorImage} alt="Thoughtfully designed residential interior" className="absolute inset-0 h-full w-full object-cover opacity-45"/><div className="absolute inset-0 bg-navy/60"/><div className="section-shell relative flex min-h-[38rem] items-center justify-center py-20 text-center"><div><p className="section-label text-sky">Your next chapter</p><h2 className="mx-auto mt-5 max-w-4xl text-6xl leading-none sm:text-8xl">Let’s find a place that feels entirely yours.</h2><Button asChild size="lg" className="mt-9"><Link to="/contact">Speak with our team <ArrowRight/></Link></Button></div></div></section>
  </>;
}