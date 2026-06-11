import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { BeritaItem } from "@/types/site";
import { formatDate } from "@/utils/format";

export function NewsSection({ berita }: { berita: BeritaItem[] }) {
  const featured = berita.find((item) => item.is_featured) ?? berita[0];
  const latest = berita.filter((item) => item.slug !== featured?.slug).slice(0, 3);

  return (
    <section id="berita" className="section-spacing border-y border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
      <div className="container-shell space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow="Berita Resmi"
            title="Sistem berita modern dengan artikel unggulan, kategori, dan detail dinamis"
            description="Berita resmi Nagari Silongo disusun dalam format editorial premium untuk memperkuat kredibilitas komunikasi publik serta memudahkan masyarakat mengikuti perkembangan terkini."
          />
        </Reveal>
        {featured ? (
          <Reveal>
            <article className="glass-panel overflow-hidden rounded-[36px] lg:grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[360px]">
                <Image src={featured.thumbnail_url ?? "/images/hero-bg.jpg"} alt={featured.title} fill className="object-cover" />
              </div>
              <div className="space-y-6 p-8 md:p-10">
                <span className="inline-flex rounded-full border border-[#f0c86e]/20 bg-[#f0c86e]/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#f0c86e]">Featured News</span>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{featured.category} • {formatDate(featured.published_at)}</p>
                  <h3 className="font-display mt-4 text-4xl text-white md:text-5xl">{featured.title}</h3>
                </div>
                <p className="text-sm leading-8 text-slate-300">{featured.excerpt}</p>
                <Link href={`/berita/${featured.slug}`} className="inline-flex items-center gap-2 rounded-full bg-[#f0c86e] px-5 py-3 text-sm font-bold text-slate-950">
                  Baca Selengkapnya
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </Reveal>
        ) : null}
        <div className="grid gap-5 lg:grid-cols-3">
          {latest.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.06}>
              <article className="glass-soft card-hover overflow-hidden rounded-[30px]">
                <div className="relative h-56 overflow-hidden">
                  <Image src={item.thumbnail_url ?? "/images/hero-bg.jpg"} alt={item.title} fill className="object-cover" />
                </div>
                <div className="space-y-4 p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{item.category} • {formatDate(item.published_at)}</p>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="line-clamp-3 text-sm leading-7 text-slate-300">{item.excerpt}</p>
                  <Link href={`/berita/${item.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#67a8ff]">
                    Lihat Detail
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
