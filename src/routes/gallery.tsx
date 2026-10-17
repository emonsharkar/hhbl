import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PageIntro } from "@/components/site-shell";
import { getPublicContent, getPublicGallery } from "@/lib/site.functions";
import { contentSection } from "@/lib/content";

export const Route = createFileRoute("/gallery")({
  loader: async () => ({ images: await getPublicGallery(), content: await getPublicContent() }),
  head: () => ({ meta: [
    { title: "Gallery | Haque Home & Builders Limited" },
    { name: "description", content: "Explore the HBL photo gallery, featuring moments from Haque Home & Builders Limited." },
    { property: "og:title", content: "HBL Photo Gallery" },
    { property: "og:description", content: "A visual collection of HBL moments, people, and places." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Gallery,
});

function Gallery() {
  const { images, content } = Route.useLoaderData();
  const intro = contentSection(content, "gallery", undefined);
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const categories = ["All", ...new Set(images.map(image => image.category))];
  const visible = images.filter(image => category === "All" || image.category === category);
  const active = selected === null ? undefined : visible[selected];
  function move(direction: number) { setSelected(index => index === null ? null : (index + direction + visible.length) % visible.length); }
  return <>
    <PageIntro eyebrow="Haque Home & Builders" title={intro.heading || "Gallery"} copy={intro.body || "People, places, and moments from HBL."} />
    <section className="py-16 sm:py-24"><div className="section-shell">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b pb-6"><p className="section-label">{visible.length} photographs</p><div className="flex flex-wrap gap-2">{categories.length > 2 && categories.map(item => <Button key={item} variant={category === item ? "default" : "outline"} size="sm" onClick={() => setCategory(item)}>{item}</Button>)}</div></div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible.map((image, index) => <figure key={image.id} className="group min-w-0"><Button variant="ghost" className="relative block aspect-[4/3] h-auto w-full overflow-hidden rounded-none p-0" aria-label={`Open photograph ${index + 1}`} onClick={() => setSelected(index)}><img src={image.url} alt={image.caption || `HBL moment ${index + 1}`} loading={index < 3 ? "eager" : "lazy"} className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"/><span className="absolute bottom-3 right-3 bg-background/90 p-2 text-foreground"><Expand className="size-4"/></span></Button>{image.caption && <figcaption className="pt-3 text-sm text-muted-foreground">{image.caption}</figcaption>}</figure>)}</div>
      {!visible.length && <p className="py-20 text-center text-muted-foreground">No photographs published yet.</p>}
    </div></section>
    <Dialog open={active !== undefined} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="max-w-6xl bg-background p-3 sm:p-6" onKeyDown={event => { if(event.key === "ArrowLeft") move(-1); if(event.key === "ArrowRight") move(1); }}><DialogTitle className="pr-8 text-base">{active?.caption || "HBL gallery"}</DialogTitle>{active && <img src={active.url} alt={active.caption || "HBL gallery photograph"} className="max-h-[72svh] w-full object-contain"/>}<div className="flex items-center justify-between"><Button variant="outline" size="icon" aria-label="Previous photograph" onClick={() => move(-1)}><ChevronLeft/></Button><p className="text-sm text-muted-foreground">{(selected ?? 0) + 1} / {visible.length}</p><Button variant="outline" size="icon" aria-label="Next photograph" onClick={() => move(1)}><ChevronRight/></Button></div></DialogContent></Dialog>
  </>;
}