import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/hbl-logo.png.asset.json";

const navigation = [
  { label: "Home", to: "/" as const },
  { label: "Corporate", to: "/corporate" as const },
  { label: "Projects", to: "/projects" as const },
  { label: "Management Team", to: "/management-team" as const },
  { label: "Contact", to: "/contact" as const },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" aria-label="HBL home" className="flex items-center gap-3">
             <img src={logoAsset.url} alt="HBL logo" className="h-14 w-14 rounded-full bg-background object-contain" />
             <span className="hidden max-w-52 text-xs font-semibold uppercase leading-tight text-foreground sm:block">Haque Home &amp; Builders<br/><span className="text-muted-foreground">Limited</span></span>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {navigation.map((item) => (
               <Link key={item.to} to={item.to} className={`border-b py-2 text-xs font-semibold uppercase transition-colors hover:text-primary ${pathname === item.to ? "border-sky text-primary" : "border-transparent text-foreground/70"}`}>{item.label}</Link>
            ))}
          </nav>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</Button>
        </div>
        {open && <nav className="border-t border-border bg-background px-5 py-4 lg:hidden">{navigation.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="block border-b border-border/60 py-3 text-sm font-semibold last:border-0">{item.label}</Link>)}</nav>}
      </header>
       <main className="pt-24">{children}</main>
       <footer className="bg-navy py-20 text-primary-foreground">
         <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
           <div><img src={logoAsset.url} alt="HBL logo" className="h-20 w-20 rounded-full bg-background object-contain" /><h2 className="mt-8 max-w-md text-4xl leading-tight">Homes shaped for generations.</h2><p className="mt-5 max-w-sm text-sm leading-7 text-primary-foreground/65">Thoughtful homes, dependable construction, and a commitment that continues well beyond handover.</p></div>
          <div><p className="text-xs font-bold uppercase text-sky">Explore</p><div className="mt-4 grid gap-3 text-sm">{navigation.map((item) => <Link key={item.to} to={item.to} className="text-primary-foreground/70 hover:text-primary-foreground">{item.label}</Link>)}</div></div>
           <div><p className="text-xs font-bold uppercase text-sky">Visit us</p><p className="mt-4 text-sm leading-7 text-primary-foreground/70">Dhanmondi, Dhaka 1209<br />info@hbl.com.bd<br />+880 1700-000000</p><Button asChild variant="outline" className="mt-6 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-navy"><Link to="/contact">Make an inquiry <ArrowUpRight/></Link></Button></div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-primary-foreground/15 px-5 pt-6 text-xs text-primary-foreground/50 lg:px-8">© 2026 Haque Home & Builders Limited. All rights reserved.</div>
      </footer>
       <a href="https://wa.me/8801700000000" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-success text-success-foreground shadow-lg transition-transform hover:scale-105"><MessageCircle className="h-5 w-5" /></a>
    </div>
  );
}

export function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <section className="relative overflow-hidden bg-navy py-24 text-primary-foreground sm:py-32"><div className="absolute inset-y-0 right-0 w-1/3 border-l border-primary-foreground/10 opacity-40"/><div className="section-shell relative reveal"><p className="section-label text-sky">{eyebrow}</p><h1 className="mt-5 max-w-4xl text-5xl leading-[1.03] sm:text-7xl">{title}</h1><p className="mt-7 max-w-2xl text-base leading-8 text-primary-foreground/70">{copy}</p></div></section>;
}