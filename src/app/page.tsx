export const dynamic = 'force-dynamic';

import { db } from '@/lib/db';
import Navbar from '@/components/layout/Navbar';
import ScrollToTop from '@/components/layout/ScrollToTop';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import Footer from '@/components/layout/Footer';
import WaveDivider from '@/components/layout/WaveDivider';
import PengumumanTicker from '@/components/sections/PengumumanTicker';
import HeroSection from '@/components/sections/HeroSection';
import SambutanSection from '@/components/sections/SambutanSection';
import AboutSection from '@/components/sections/AboutSection';
import VisiMisiSection from '@/components/sections/VisiMisiSection';
import StatisticsSection from '@/components/sections/StatisticsSection';
import LayananSection from '@/components/sections/LayananSection';
import AgendaSection from '@/components/sections/AgendaSection';
import PemerintahanSection from '@/components/sections/PemerintahanSection';
import WisataSection from '@/components/sections/WisataSection';
import BeritaSection from '@/components/sections/BeritaSection';
import GaleriSection from '@/components/sections/GaleriSection';
import FAQSection from '@/components/sections/FAQSection';
import KontakSection from '@/components/sections/KontakSection';
import BukuTamuSection from '@/components/sections/BukuTamuSection';
import PengaduanSection from '@/components/sections/PengaduanSection';

export default async function Home() {
  let heroData = null;

  try {
    heroData = await db.hero.findFirst();
  } catch (error) {
    console.error('Failed to load hero data on homepage:', error);
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <ScrollToTop />

      {/* Hero + Pengumuman */}
      <HeroSection initialHero={heroData} />
      <PengumumanTicker />

      {/* Wave transition to light section */}
      <WaveDivider variant="light-gold" />

      {/* Sambutan Wali Nagari */}
      <div className="section-bg-light bg-dots">
        <SambutanSection />
      </div>

      {/* About / Profil */}
      <AboutSection />

      {/* Wave transition to navy section */}
      <WaveDivider variant="navy-gold" flip />

      {/* Visi Misi (navy bg) */}
      <div className="section-bg-navy">
        <VisiMisiSection />
      </div>

      {/* Wave transition back to light */}
      <WaveDivider variant="light-gold" />

      {/* Statistics (default bg) */}
      <StatisticsSection />

      {/* Wave transition */}
      <WaveDivider variant="gold-light" />

      {/* Layanan (warm bg) */}
      <div className="section-bg-warm">
        <LayananSection />
      </div>

      {/* Wave transition */}
      <WaveDivider variant="navy-gold" flip />

      {/* Agenda (navy bg) */}
      <div className="section-bg-navy">
        <AgendaSection />
      </div>

      {/* Wave transition back to light */}
      <WaveDivider variant="light-gold" />

      {/* Pemerintahan */}
      <PemerintahanSection />

      {/* Wave transition */}
      <WaveDivider variant="gold-light" flip />

      {/* Wisata (warm bg) */}
      <div className="section-bg-warm bg-dots">
        <WisataSection />
      </div>

      {/* Berita */}
      <BeritaSection />

      {/* Wave transition */}
      <WaveDivider variant="navy-gold" />

      {/* Galeri (navy bg) */}
      <div className="section-bg-navy bg-grid">
        <GaleriSection />
      </div>

      {/* Wave transition to FAQ */}
      <WaveDivider variant="light-gold" />

      {/* FAQ */}
      <div className="section-bg-light">
        <FAQSection />
      </div>

      {/* Kontak */}
      <KontakSection />

      {/* Wave transition to Pengaduan */}
      <WaveDivider variant="light-gold" />

      {/* Pengaduan Masyarakat */}
      <PengaduanSection />

      {/* Wave transition to Buku Tamu */}
      <WaveDivider variant="gold-light" flip />

      {/* Buku Tamu */}
      <div className="section-bg-navy bg-dots">
        <BukuTamuSection />
      </div>

      <WhatsAppButton />
      <Footer />
    </main>
  );
}
