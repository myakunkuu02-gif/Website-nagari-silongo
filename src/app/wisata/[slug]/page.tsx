import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { PageHero } from "@/components/site/PageHero";
import { getHomeData, getWisataBySlug } from "@/services/site-content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getWisataBySlug(slug);
  if (!item) {
    return {};
  }

  return {
    title: item.title,
    description: item.description,
  };
}

export default async function WisataDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [item, home] = await Promise.all([getWisataBySlug(slug), getHomeData()]);
  if (!item) {
    notFound();
  }

  return (
    <main>
      <Navbar />
      <PageHero eyebrow="Detail Wisata dan Budaya" title={item.title} description={item.description} />
      <section className="container-shell section-spacing">
        <div className="glass-panel overflow-hidden rounded-[36px] p-4 md:p-5">
          <div className="relative min-h-[500px] overflow-hidden rounded-[28px]">
            <Image src={item.image_url ?? "/images/hero-bg.jpg"} alt={item.title} fill className="object-cover" />
          </div>
          <div className="space-y-5 p-4 md:p-8">
            <span className="inline-flex rounded-full border border-[#63c9a5]/20 bg-[#63c9a5]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#7ad7b5]">{item.category}</span>
            <p className="text-base leading-8 text-slate-300">{item.description}</p>
          </div>
        </div>
      </section>
      <Footer footer={home.footer} kontak={home.kontak} />
    </main>
  );
}
