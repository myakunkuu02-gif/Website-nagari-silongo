import type { Metadata } from "next";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { ContactSection } from "@/components/site/Contact";
import { PageHero } from "@/components/site/PageHero";
import { getHomeData } from "@/services/site-content";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi Nagari Silongo melalui alamat resmi, WhatsApp, email, dan peta digital yang terintegrasi.",
};

export default async function KontakPage() {
  const data = await getHomeData();
  return (
    <main>
      <Navbar />
      <PageHero eyebrow="Kontak Resmi" title="Terhubung dengan pemerintah nagari" description="Sampaikan kebutuhan informasi, koordinasi, dan komunikasi melalui kanal resmi yang tersedia di bawah ini." />
      <ContactSection kontak={data.kontak} />
      <Footer footer={data.footer} kontak={data.kontak} />
    </main>
  );
}
