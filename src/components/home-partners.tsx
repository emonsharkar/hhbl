import rajuk from "@/assets/partners/rajuk.png.asset.json";
import ceramic from "@/assets/partners/haque-ceramic.png.asset.json";
import electronics from "@/assets/partners/sp-electronics.png.asset.json";
import agro from "@/assets/partners/haque-jsp-agro.png.asset.json";
import readymix from "@/assets/partners/haque-readymix.png.asset.json";
import rehab from "@/assets/partners/rehab.png.asset.json";

const supplied = [rajuk, ceramic, electronics, agro, readymix, rehab];
const names = ["RAJUK", "Haque Ceramic Industries Limited", "S.P. Electronics Limited", "Haque JSP Agro", "Haque Ready Mix", "REHAB"];

export function HomePartners({partners=[]}: {partners?: {id:string;name:string;logo_url:string|null}[]}) {
  return <section aria-labelledby="partners-title" className="border-y border-border bg-background py-14 sm:py-20">
    <div className="section-shell">
      <h2 id="partners-title" className="text-center">Best Ranked By</h2>
      <div className="mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">
        {partners.map((partner) => <div key={partner.id} className="flex h-32 items-center justify-center sm:h-40"><img src={partner.logo_url || supplied[names.indexOf(partner.name)]?.url} alt={partner.name} loading="lazy" className="h-full w-full max-w-48 object-contain transition-transform duration-300 motion-safe:hover:scale-105"/></div>)}
      </div>
    </div>
  </section>;
}