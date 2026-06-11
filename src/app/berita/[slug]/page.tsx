import type { Metadata } from "next";
        import Image from "next/image";
        import { notFound } from "next/navigation";
        import { Footer } from "@/components/site/Footer";
        import { Navbar } from "@/components/site/Navbar";
        import { getBeritaBySlug, getHomeData } from "@/services/site-content";
        import { formatDate } from "@/utils/format";

        export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
          const { slug } = await params;
          const item = await getBeritaBySlug(slug);
          if (!item) {
            return {};
          }

          return {
            title: item.title,
            description: item.excerpt ?? item.content,
          };
        }

        export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
          const { slug } = await params;
          const [item, home] = await Promise.all([getBeritaBySlug(slug), getHomeData()]);
          if (!item) {
            notFound();
          }

          return (
            <main>
              <Navbar />
              <section className="relative overflow-hidden border-b border-white/10 pt-32">
                <div className="container-shell section-spacing relative space-y-8">
                  <span className="inline-flex rounded-full border border-[#f0c86e]/20 bg-[#f0c86e]/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#f0c86e]">{item.category}</span>
                  <div className="space-y-4">
                    <h1 className="font-display max-w-5xl text-5xl leading-none text-white md:text-6xl lg:text-7xl">{item.title}</h1>
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Dipublikasikan {formatDate(item.published_at)}</p>
                  </div>
                  <div className="glass-panel overflow-hidden rounded-[36px] p-3">
                    <div className="relative min-h-[460px] overflow-hidden rounded-[28px]">
                      <Image src={item.thumbnail_url ?? "/images/hero-bg.jpg"} alt={item.title} fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </section>
              <section className="container-shell section-spacing">
                <article className="glass-panel rounded-[36px] p-8 md:p-10">
                  <div className="max-w-3xl space-y-5 text-base leading-8 text-slate-200">
                    {(item.content || "").split(/
+/).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              </section>
              <Footer footer={home.footer} kontak={home.kontak} />
            </main>
          );
        }
