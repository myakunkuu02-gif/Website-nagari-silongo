'use client';
import { useInView } from '@/lib/animations';

import { useState, useEffect, useRef } from 'react';
import { MapPin, Waves, GraduationCap, ArrowDown } from 'lucide-react';
import { ProfilData } from '@/types';

const defaultProfil: ProfilData = {
  id: 'default',
  title: 'Tentang Nagari Silongo',
  description:
    'Nagari Silongo merupakan salah satu nagari yang terletak di Kecamatan Lubuk Tarok, Kabupaten Sijunjung, Provinsi Sumatera Barat. Nagari ini memiliki kekayaan budaya Minangkabau yang masih terjaga hingga kini, dengan adat dan tradisi yang menjadi kebanggaan masyarakat.\n\nSecara geografis, Nagari Silongo dikelilingi oleh perbukitan hijau dan aliran sungai yang jernih, menciptakan pemandangan alam yang memesona. Mata pencaharian utama masyarakat adalah pertanian dan peternakan, dengan potensi wisata alam yang semakin berkembang.\n\nNagari Silongo terdiri dari 3 (tiga) jorong yang masing-masing memiliki keunikan tersendiri dalam budaya dan tradisinya. Masyarakat menjunjung tinggi adat istiadat dan gotong royong sebagai fondasi kehidupan bermasyarakat.',
  image_url: null,
  created_at: '',
  updated_at: '',
};

const infoCards = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: '3 Jorong',
    description: 'Silongo, Tanjuang, Muaro Pandan',
  },
  {
    icon: <Waves className="h-6 w-6" />,
    title: '2 Sungai',
    description: 'Batang Tarok & Batang Kuranji',
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'SD Negeri 1 Silongo',
    description: 'Sarana pendidikan nagari',
  },
];

export default function AboutSection() {
  const [profil, setProfil] = useState<ProfilData>(defaultProfil);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    fetch('/api/profil')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.description) setProfil(data);
      })
      .catch(() => {});
  }, []);

  const paragraphs = profil.description.split('\n').filter((p) => p.trim());

  return (
    <section id="profil" className="relative py-20 sm:py-24 overflow-hidden" ref={sectionRef}>
      {/* Geometric Minang-inspired dot pattern background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="minang-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="16" cy="16" r="1.5" fill="currentColor" />
              <path d="M0 0L32 32M32 0L0 32" stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#minang-dots)" />
        </svg>
      </div>

      {/* Section divider */}
      <div className="section-divider mb-16" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div

          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            {profil.title}
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div

            className="space-y-4"
          >
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {p}
              </p>
            ))}
          </div>

          {/* Image Placeholder + Info Cards */}
          <div

            className="space-y-4"
          >
            {/* Image Placeholder */}
            <div className="glass-card relative h-64 overflow-hidden rounded-2xl sm:h-72 lg:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-emerald-custom/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto mb-3 h-12 w-12 text-[var(--gold)]/60" />
                  <p className="text-lg font-semibold text-primary-foreground/60">
                    Pemandangan Nagari Silongo
                  </p>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {infoCards.map((card, i) => (
                <div
                  key={card.title}


                  className="glass-card card-premium-hover rounded-xl p-4 text-center cursor-default"
                >
                  <div className="mb-2 flex items-center justify-center text-[var(--gold)]">
                    {card.icon}
                  </div>
                  <h3 className="mb-1 text-sm font-bold text-foreground">{card.title}</h3>
                  <p className="text-xs text-muted-foreground">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selengkapnya Button */}
        <div

          className="mt-16 flex justify-center"
        >
          <button
            onClick={() => document.getElementById('visi-misi')?.scrollIntoView({ behavior: 'smooth' })}
            className="glass-card group flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-foreground transition-all hover:bg-[var(--gold)]/10 hover:shadow-lg"
          >
            Selengkapnya
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
