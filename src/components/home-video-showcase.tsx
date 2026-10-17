import { useState } from "react";
import { ArrowUpRight, Film, Play } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import poster from "@/assets/hbl-residential-banner.jpg";

export function HomeVideoShowcase({ videoUrl = "" }: { videoUrl?: string }) {
  const [playing, setPlaying] = useState(false);
  let embed = "";
  let source = "";
  try {
    const url = new URL(videoUrl);
    if (url.protocol === "https:") {
      const host = url.hostname.replace(/^www\./, "");
      const id = host === "youtu.be" ? url.pathname.slice(1) : ["youtube.com", "youtube-nocookie.com"].includes(host) ? url.searchParams.get("v") || url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1] : "";
      if (id && /^[\w-]{11}$/.test(id)) embed = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      else if (/\.(mp4|webm)$/i.test(url.pathname)) source = url.href;
    }
  } catch { /* An absent or invalid film keeps the cover visible. */ }
  const available = Boolean(embed || source);
  return <section aria-labelledby="showcase-title" className="bg-navy py-20 text-primary-foreground sm:py-28">
    <div className="section-shell">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div><p className="section-label text-sky">The HBL showcase</p><h2 id="showcase-title" className="mt-4 max-w-3xl">A closer look at Haque Home &amp; Builders.</h2></div>
        <Button asChild variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-navy"><Link to="/projects">Our residences <ArrowUpRight /></Link></Button>
      </div>
      <div className="relative aspect-video w-full overflow-hidden bg-navy">
        {playing && embed ? <iframe src={embed} title="Haque Home & Builders showcase film" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full border-0" />
          : playing && source ? <video src={source} poster={poster} autoPlay controls playsInline className="absolute inset-0 h-full w-full object-contain" onError={() => setPlaying(false)} />
          : <><img src={poster} alt="Contemporary residential architecture and landscaped gardens" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-navy/25" />
            {available ? <Button size="icon" onClick={() => setPlaying(true)} aria-label="Play HBL showcase film" className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background text-navy hover:bg-background/90 sm:h-24 sm:w-24"><Play className="size-7 fill-current sm:size-9" /></Button>
              : <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-navy/80 px-4 py-3 text-xs text-primary-foreground sm:bottom-6 sm:left-6 sm:text-sm"><Film className="size-4 shrink-0" />Showcase film coming soon</div>}
          </>}
      </div>
    </div>
  </section>;
}