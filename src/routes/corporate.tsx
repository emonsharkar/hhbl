import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { getPublicContent } from "@/lib/site.functions";
import { officialContent } from "@/lib/site-data";
import { contentSection, listExtra, textExtra } from "@/lib/content";
import corporateImage from "@/assets/hbl-corporate.jpg";
import interiorImage from "@/assets/hbl-interior.jpg";

export const Route = createFileRoute("/corporate")({
  loader: async () => { try { return await getPublicContent(); } catch { return officialContent; } },
  head: () => ({ meta: [{ title: "Corporate | HBL" }, { name: "description", content: "Learn about HBL’s purpose, values, and approach to responsible residential development." }, { property: "og:title", content: "About Haque Home & Builders Limited" }, { property: "og:description", content: "Building enduring homes with integrity and care." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Corporate,
});

function Corporate() { const content = Route.useLoaderData(); const corporate = contentSection(content,"corporate",officialContent[3]); const mission = contentSection(content,"mission",officialContent[4]); return <>
  <PageIntro eyebrow="Corporate" title={corporate.heading} copy="Trusted Home Builder in Bangladesh"/>
  <section className="py-24 sm:py-32"><div className="section-shell grid gap-16 lg:grid-cols-[.85fr_1.15fr]"><div><p className="section-label">Who we are</p><h2 className="mt-5 text-5xl leading-tight sm:text-7xl">A focused developer with a long-view mindset.</h2></div><div className="space-y-6 self-end text-lg leading-9 text-muted-foreground">{corporate.body.split("\n\n").map(text=><p key={text}>{text}</p>)}</div></div></section>
  <section className="grid min-h-[44rem] lg:grid-cols-2"><div className="min-h-[30rem]"><img src={textExtra(corporate,"image",corporateImage)} alt={textExtra(corporate,"leader")} className="h-full w-full object-cover"/></div><div className="flex items-center bg-navy px-6 py-20 text-primary-foreground sm:px-14 lg:px-20"><div><p className="section-label text-sky">{textExtra(corporate,"role")}</p><h2 className="mt-5 text-5xl leading-tight sm:text-7xl">{textExtra(corporate,"leader")}</h2><p className="mt-7 max-w-lg leading-8 text-primary-foreground/70">{mission.body}</p></div></div></section>
  <section className="bg-accent py-24 sm:py-32"><div className="section-shell"><p className="section-label">What guides us</p><div className="mt-12 grid gap-px bg-border md:grid-cols-3">{listExtra(mission,"points").slice(0,3).map((text,i)=><div key={text} className="bg-background p-9 sm:p-12"><span className="font-display text-4xl text-sky">0{i+1}</span><p className="mt-16 text-3xl leading-snug">{text}</p></div>)}</div></div></section>
  <section className="py-24 sm:py-32"><div className="section-shell grid gap-16 lg:grid-cols-2"><div><p className="section-label">Our mission</p><h2 className="mt-5 text-5xl leading-tight sm:text-7xl">{mission.heading}</h2><img src={interiorImage} alt="Refined residential interior" className="mt-10 aspect-[4/3] w-full object-cover"/></div><div className="space-y-5 self-center">{listExtra(mission,"points").map(text=><div key={text} className="flex gap-4 border-b py-5"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary"/><p className="text-lg">{text}</p></div>)}<Button asChild className="mt-6"><Link to="/contact">Talk to our team <ArrowRight/></Link></Button></div></div></section>
</> }