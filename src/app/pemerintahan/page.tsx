import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { PageHero } from "@/components/site/PageHero";
import { GovernmentSection } from "@/components/site/Government";
import { getHomeData } from "@/services/site-content";

export default async function PemerintahanPage() {
  const data = await getHomeData();

  return (
    <main>
      <Navbar />
      <PageHero eyebrow="Pemerintahan" title="Struktur pemerintahan Nagari Silongo" description="Direktori perangkat pemerintahan ditampilkan secara modern dan responsif untuk memperkuat transparansi serta kepercayaan publik." />
      <GovernmentSection items={data.pemerintahan} />
      <Footer footer={data.footer} kontak={data.kontak} />
    </main>
  );
}
