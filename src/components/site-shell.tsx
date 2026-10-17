import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/hbl-logo.png.asset.json";

import { contentSection, textExtra, type ContentRow } from "@/lib/content";
import { officialContent } from "@/lib/site-data";
import { primaryContact } from "@/lib/contact-details";

const navigation = [
  { label: "Home", to: "/" as const },
  { label: "Corporate", to: "/corporate" as const },
  { label: "Projects", to: "/projects" as const },
  { label: "Management Team", to: "/management-team" as const },
  { label: "Contact", to: "/contact" as const },
];

export function SiteShell({ children, content }: { children: ReactNode; content: ContentRow[] }) {
  const contact = contentSection(content, "contact", officialContent[0]);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          <Link to="/" aria-label="HBL home" className="flex items-center gap-3">
             <img src={logoAsset.url} alt="HBL logo" className="h-14 w-14 rounded-full bg-background object-contain" />
             <span className="hidden max-w-52 text-xs font-semibold uppercase leading-tight text-foreground sm:block">Haque Home &amp; Builders<br/><span className="text-muted-foreground">Limited</span></span>
          </Link>
          <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
            {navigation.map((item) => (
               <Link key={item.to} to={item.to} className={`border-b py-2 text-xs font-semibold uppercase transition-colors hover:text-primary ${pathname === item.to ? "border-sky text-primary" : "border-transparent text-foreground/70"}`}>{item.label}</Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2"><Button asChild variant="ghost" className="hidden px-2 text-xs sm:inline-flex"><a href={primaryContact.callHref}><Phone className="h-4 w-4"/> {primaryContact.callLabel}</a></Button><Button asChild variant="ghost" size="icon" className="sm:hidden"><a href={primaryContact.callHref} aria-label={`Call ${primaryContact.callLabel}`}><Phone/></a></Button><Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</Button></div>
        </div>
        {open && <nav aria-label="Mobile navigation" className="border-t border-border bg-background px-5 py-4 xl:hidden">{navigation.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="block border-b border-border/60 py-3 text-sm font-semibold last:border-0">{item.label}</Link>)}</nav>}
      </header>
       <main className="site-content pt-24">{children}</main>
       <footer className="bg-navy py-20 text-primary-foreground">
         <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
           <div><img src={logoAsset.url} alt="HBL logo" className="h-20 w-20 rounded-full bg-background object-contain" /><h2 className="mt-8 max-w-md text-4xl leading-tight">Homes shaped for generations.</h2><p className="mt-5 max-w-sm text-sm leading-7 text-primary-foreground/65">Thoughtful homes, dependable construction, and a commitment that continues well beyond handover.</p></div>
          <div><p className="text-xs font-bold uppercase text-sky">Explore</p><div className="mt-4 grid gap-3 text-sm">{navigation.map((item) => <Link key={item.to} to={item.to} className="text-primary-foreground/70 hover:text-primary-foreground">{item.label}</Link>)}</div></div>
           <div className="min-w-0"><p className="text-xs font-bold uppercase text-sky">Visit us</p><p className="mt-4 break-words text-sm leading-7 text-primary-foreground/70">{textExtra(contact,"address")}<br />{textExtra(contact,"email")}</p><div className="mt-4 grid gap-3 text-sm"><a href={primaryContact.callHref}>Call: {primaryContact.callLabel}</a><a href={primaryContact.whatsappHref} target="_blank" rel="noreferrer">WhatsApp: {primaryContact.whatsappLabel}</a></div><Button asChild variant="outline" className="mt-6 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-navy"><Link to="/contact">Make an inquiry <ArrowUpRight/></Link></Button></div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-primary-foreground/15 px-5 pt-6 text-xs text-primary-foreground/50 lg:px-8">© 2026 Haque Home & Builders Limited. All rights reserved.</div>
      </footer>
       <Button asChild size="icon" className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-success text-success-foreground shadow-lg transition-transform hover:scale-105 hover:bg-success/90"><a href={primaryContact.whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" title={`WhatsApp ${primaryContact.whatsappLabel}`}><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-7"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 5.9L.1 24l6.3-1.7a11.9 11.9 0 0 0 5.7 1.5c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4ZM12.1 21.8c-1.8 0-3.5-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.3-.4a9.9 9.9 0 1 1 8.5 4.6Zm5.4-7.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2l-1 1.2c-.2.2-.4.2-.7.1-2-.9-3.3-2.4-3.8-3.2-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.7.9 3.7.8.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z"/></svg></a></Button>
    </div>
  );
}

export function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <section className="relative overflow-hidden bg-navy py-24 text-primary-foreground sm:py-32"><div className="absolute inset-y-0 right-0 w-1/3 border-l border-primary-foreground/10 opacity-40"/><div className="section-shell relative reveal"><p className="section-label text-sky">{eyebrow}</p><h1 className="mt-5 max-w-4xl text-5xl leading-[1.03] sm:text-7xl">{title}</h1><p className="mt-7 max-w-2xl text-base leading-8 text-primary-foreground/70">{copy}</p></div></section>;
}