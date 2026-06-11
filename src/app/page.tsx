import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { AboutSection } from "@/components/site/About";
import { VisionSection } from "@/components/site/Vision";
import { StatisticsSection } from "@/components/site/Stats";
import { GovernmentSection } from "@/components/site/Government";
import { WisataSection } from "@/components/site/Wisata";
import { NewsSection } from "@/components/site/News";
import { GallerySection } from "@/components/site/Gallery";
import { ContactSection } from "@/components/site/Contact";
import { getHomeData } from "@/services/site-content";

export const revalidate = 60;

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <main>
      <Navbar />
      <Hero hero={data.hero} />
      <AboutSection profil={data.profil} />
      <VisionSection visiMisi={data.visiMisi} />
      <StatisticsSection statistik={data.statistik} />
      <GovernmentSection items={data.pemerintahan} />
      <WisataSection wisata={data.wisata} />
      <NewsSection berita={data.berita} />
      <GallerySection items={data.galeri} />
      <ContactSection kontak={data.kontak} />
      <Footer footer={data.footer} kontak={data.kontak} />
    </main>
  );
}
