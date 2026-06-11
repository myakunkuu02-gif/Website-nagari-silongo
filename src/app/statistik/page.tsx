import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { PageHero } from "@/components/site/PageHero";
import { StatisticsSection } from "@/components/site/Stats";
import { getHomeData } from "@/services/site-content";

export default async function StatistikPage() {
  const data = await getHomeData();

  return (
    <main>
      <Navbar />
      <PageHero eyebrow="Statistik" title="Potret data utama Nagari Silongo" description="Menampilkan indikator penting seperti penduduk, jorong, luas wilayah, fasilitas ibadah, dan potensi UMKM secara visual dan mudah dipahami." />
      <StatisticsSection statistik={data.statistik} />
      <Footer footer={data.footer} kontak={data.kontak} />
    </main>
  );
}
