import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { GallerySection } from "@/components/site/Gallery";
import { PageHero } from "@/components/site/PageHero";
import { getGalleryList, getHomeData } from "@/services/site-content";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Galeri premium Nagari Silongo dengan masonry grid, lightbox, dan visual sinematik.",
};

export default async function GaleriPage() {
  const [items, home] = await Promise.all([getGalleryList(), getHomeData()]);
  return (
    <main>
      <Navbar />
      <PageHero eyebrow="Galeri" title="Dokumentasi visual Nagari Silongo" description="Menampilkan foto-foto unggulan nagari dalam tata letak premium yang dirancang untuk memperkuat identitas visual dan citra institusi." />
      <GallerySection items={items} />
      <Footer footer={home.footer} kontak={home.kontak} />
    </main>
  );
}
