import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { NewsSearch } from "@/components/site/NewsSearch";
import { PageHero } from "@/components/site/PageHero";
import { getBeritaList, getHomeData } from "@/services/site-content";

export const metadata: Metadata = {
  title: "Berita",
  description: "Sistem berita resmi Nagari Silongo dengan artikel unggulan, kategori, pencarian, dan detail dinamis.",
};

export default async function BeritaPage() {
  const [items, home] = await Promise.all([getBeritaList(), getHomeData()]);

  return (
    <main>
      <Navbar />
      <PageHero eyebrow="Berita Resmi" title="Informasi terbaru dari Nagari Silongo" description="Halaman berita menyajikan artikel unggulan, daftar berita terbaru, kategori, dan pencarian cepat untuk memudahkan akses informasi publik." />
      <section className="container-shell section-spacing">
        <NewsSearch items={items} />
      </section>
      <Footer footer={home.footer} kontak={home.kontak} />
    </main>
  );
}
