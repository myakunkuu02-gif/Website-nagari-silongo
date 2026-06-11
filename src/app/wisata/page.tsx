import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { PageHero } from "@/components/site/PageHero";
import { WisataSection } from "@/components/site/Wisata";
import { getHomeData } from "@/services/site-content";

export const metadata: Metadata = {
  title: "Wisata dan Budaya",
  description: "Eksplorasi budaya Minangkabau, Rumah Gadang, Tari Tanduok, dan potensi alam Nagari Silongo dalam tampilan premium.",
};

export default async function WisataPage() {
  const data = await getHomeData();

  return (
    <main>
      <Navbar />
      <PageHero eyebrow="Wisata dan Budaya" title="Ruang budaya dan potensi alam Nagari Silongo" description="Halaman ini merangkum kekayaan adat, seni, kuliner, Rumah Gadang, dan panorama Sumatera Barat yang menjadi identitas visual Nagari Silongo." />
      <WisataSection wisata={data.wisata} />
      <Footer footer={data.footer} kontak={data.kontak} />
    </main>
  );
}
