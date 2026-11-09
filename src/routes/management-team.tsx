import { Route as RootRoute } from "./__root";
import { contentExtras, contentSection } from "@/lib/content";
import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { PageIntro } from "@/components/site-shell";
import { demoTeam } from "@/lib/site-data";
import { getPublicTeam } from "@/lib/site.functions";

export const Route = createFileRoute("/management-team")({ loader: async () => { try { const team = await getPublicTeam(); return team; } catch { return demoTeam; } }, head: () => ({ meta: [{ title: "Management Team | HBL" }, { name: "description", content: "Meet the leadership team guiding Haque Home & Builders Limited." }, { property: "og:title", content: "HBL Management Team" }, { property: "og:description", content: "Experienced leaders committed to better homes." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Team });

const sizeClasses: Record<string, string> = { small: "text-xl", medium: "text-2xl", large: "text-3xl" };
const roleSizeClasses: Record<string, string> = { small: "text-xs", medium: "text-sm", large: "text-base" };
const weightClasses: Record<string, string> = { normal: "font-normal", medium: "font-medium", semibold: "font-semibold", bold: "font-bold" };
const colorClasses: Record<string, string> = { foreground: "text-foreground", primary: "text-primary", sky: "text-sky", muted: "text-muted-foreground" };

function Team() {
  const team = Route.useLoaderData();
  const intro = contentSection(RootRoute.useLoaderData(), "team_intro", undefined);
  const style = contentExtras(intro);
  const nameSize = sizeClasses[String(style.name_size)] ?? sizeClasses.medium;
  const roleSize = roleSizeClasses[String(style.role_size)] ?? roleSizeClasses.medium;
  const nameWeight = weightClasses[String(style.name_weight)] ?? weightClasses.semibold;
  const roleWeight = weightClasses[String(style.role_weight)] ?? weightClasses.semibold;
  const nameColor = colorClasses[String(style.name_color)] ?? colorClasses.foreground;
  const roleColor = colorClasses[String(style.role_color)] ?? colorClasses.primary;
  return <><PageIntro eyebrow="Leadership" title={intro.heading || "Experience behind every decision"} copy={intro.body || "The people behind Haque Home & Builders Limited."}/><section className="py-24 sm:py-32"><div className="section-shell grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{team.map(member=><article key={member.id} className="group"><div className="aspect-[4/5] overflow-hidden bg-accent">{member.image_url ? <img src={member.image_url} alt={member.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/> : <div className="grid h-full place-items-center font-display text-7xl text-primary/30">{member.name.split(" ").map(part=>part[0]).slice(0,2).join("")}</div>}</div><div className="border-b border-border py-7"><p className={`${roleSize} ${roleWeight} ${roleColor} uppercase`}>{member.role}</p><h2 className={`mt-3 ${nameSize} ${nameWeight} ${nameColor}`}>{member.name}</h2>{member.phone && <a href={`tel:${member.phone.replace(/\s/g,"")}`} className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary"><Phone className="h-4 w-4"/>{member.phone}</a>}<p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">{member.biography}</p></div></article>)}</div></section></>;
}