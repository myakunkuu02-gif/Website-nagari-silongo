import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { PageHero } from "@/components/site/PageHero";
import { AboutSection } from "@/components/site/About";
import { getHomeData } from "@/services/site-content";

export default async function ProfilPage() {
  const data = await getHomeData();

  return (
    <main>
      <Navbar />
      <PageHero eyebrow="Profil Nagari" title="Identitas resmi Nagari Silongo" description="Menampilkan profil lengkap nagari, geografi, jorong, sungai, fasilitas utama, dan karakter sosial budaya yang menjadi dasar arah pembangunan Nagari Silongo." />
      <AboutSection profil={data.profil} />
      <Footer footer={data.footer} kontak={data.kontak} />
    </main>
  );
}
