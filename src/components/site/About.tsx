import Image from "next/image";
import { Landmark, MapPinned, School, Waves } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ProfilContent } from "@/types/site";

const infoCards = [
  { key: "jorong", icon: Landmark },
  { key: "sungai", icon: Waves },
  { key: "fasilitas", icon: School },
  { key: "jarak", icon: MapPinned },
] as const;

export function AboutSection({ profil }: { profil: ProfilContent }) {
  const cardValues = {
    jorong: profil.daftar_jorong_json.join(", "),
    sungai: profil.sungai_json.join(", "),
    fasilitas: [...profil.fasilitas_json.agama, ...profil.fasilitas_json.pendidikan].join(" • "),
    jarak: profil.fasilitas_json.jarak.join(" • "),
  };

  return (
    <section id="profil" className="section-grid section-spacing relative">
      <div className="container-shell relative space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow="Tentang Nagari"
            title="Alam, adat, dan tata kelola modern dalam satu identitas nagari"
            description="Nagari Silongo hadir sebagai kawasan yang memadukan karakter alam Sumatera Barat, kekuatan adat Minangkabau, dan semangat pemerintahan digital yang terbuka, profesional, serta relevan bagi masyarakat hari ini."
          />
        </Reveal>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="space-y-6">
            <div className="glass-panel card-hover rounded-[32px] p-7 md:p-8">
              <p className="text-sm leading-8 text-slate-300">{profil.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {infoCards.map(({ key, icon: Icon }, index) => (
                <Reveal key={key} delay={0.06 * (index + 1)}>
                  <div className="glass-soft card-hover h-full rounded-[28px] p-5">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-[#f0c86e]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{key}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-200">{cardValues[key]}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-[1fr_0.9fr]">
            <Reveal className="glass-panel shimmer-border overflow-hidden rounded-[32px] p-3">
              <div className="relative min-h-[480px] overflow-hidden rounded-[26px]">
                <Image src={profil.image_primary_url ?? "/images/hero-bg.jpg"} alt="Profil Nagari Silongo" fill className="object-cover" />
              </div>
            </Reveal>
            <div className="grid gap-4">
              <Reveal delay={0.1} className="glass-panel rounded-[32px] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Identitas Wilayah</p>
                <p className="mt-4 text-4xl font-bold text-white">{profil.wilayah}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">Luas wilayah administratif yang menjadi basis pengembangan ruang hidup, budaya, dan pelayanan publik nagari.</p>
              </Reveal>
              <Reveal delay={0.15} className="glass-panel overflow-hidden rounded-[32px] p-3">
                <div className="relative min-h-[220px] overflow-hidden rounded-[24px]">
                  <Image src={profil.image_secondary_url ?? "/images/hero-bg.jpg"} alt="Budaya Nagari Silongo" fill className="object-cover" />
                </div>
              </Reveal>
              <Reveal delay={0.2} className="grid gap-4 sm:grid-cols-2">
                <div className="glass-soft rounded-[28px] p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Penduduk</p>
                  <p className="mt-3 text-3xl font-bold text-white">{profil.jumlah_penduduk}</p>
                </div>
                <div className="glass-soft rounded-[28px] p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Jorong</p>
                  <p className="mt-3 text-3xl font-bold text-white">{profil.jumlah_jorong}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
