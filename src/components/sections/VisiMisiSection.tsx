'use client';
import { useInView } from '@/lib/animations';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Target, Eye, Users, Landmark, BookOpen, Leaf, Sparkles } from 'lucide-react';
import { VisiMisiData } from '@/types';

const defaultVisi: VisiMisiData = {
  id: 'default',
  visi: 'Mewujudkan Nagari Silongo yang maju, mandiri, religius, berbudaya, dan berbasis digital.',
  misi: JSON.stringify([
    'Meningkatkan kualitas pelayanan publik yang transparan dan akuntabel kepada masyarakat.',
    'Mengembangkan potensi wisata dan budaya lokal sebagai sumber pendapatan nagari.',
    'Memperkuat pendidikan dan peningkatan sumber daya manusia yang berkualitas.',
    'Membangun infrastruktur nagari yang modern dan berkelanjutan.',
    'Melestarikan adat istiadat dan budaya Minangkabau sebagai identitas nagari.',
  ]),
  created_at: '',
  updated_at: '',
};

const misiIcons = [Target, Users, BookOpen, Landmark, Leaf];

export default function VisiMisiSection() {
  const [data, setData] = useState<VisiMisiData>(defaultVisi);
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const progressInView = useInView(progressRef, { once: true, margin: '-50px' });

  useEffect(() => {
    fetch('/api/visi-misi')
      .then((res) => res.json())
      .then((d) => {
        if (d && d.visi) setData(d);
      })
      .catch(() => {});
  }, []);

  const misiList = useMemo(() => {
    try {
      const parsed = JSON.parse(data.misi);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [data.misi]);

  return (
    <section id="visi-misi" className="relative py-20 sm:py-24 overflow-hidden" ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, oklch(0.22 0.09 260) 0%, oklch(0.20 0.08 260) 50%, oklch(0.22 0.09 260) 100%)',
      }}
    >
      {/* Decorative diagonal line pattern background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonal-lines-gold-vm" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="24" stroke="oklch(0.92 0.05 85)" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-lines-gold-vm)" />
        </svg>
      </div>

      {/* Decorative gold glow orbs */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, oklch(0.78 0.15 85), transparent 70%)' }}
      />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, oklch(0.78 0.15 85), transparent 70%)' }}
      />

      <div className="section-divider mb-16" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div

          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Visi & Misi
          </h2>
          <p className="mx-auto max-w-lg text-sm text-white/50 sm:text-base">
            Arah dan tujuan pembangunan Nagari Silongo menuju masa depan yang lebih baik
          </p>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, oklch(0.78 0.15 85), transparent)' }}
          />
        </div>

        {/* Visi Card */}
        <div

          className="mx-auto mb-16 max-w-3xl"
        >
          <div
            className="relative overflow-hidden rounded-2xl p-8 sm:p-10"
            style={{
              background: 'linear-gradient(135deg, oklch(0.78 0.15 85) 0%, oklch(0.85 0.12 85) 40%, oklch(0.92 0.06 85) 70%, oklch(0.78 0.15 85) 100%)',
              backgroundSize: '200% 200%',
              boxShadow: '0 8px 40px rgba(212, 168, 67, 0.25), 0 0 80px rgba(212, 168, 67, 0.08)',
            }}
          >
            {/* Shimmer overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 6s ease infinite',
              }}
            />

            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 h-40 w-40 rounded-bl-full bg-white/10" />
            <div className="absolute bottom-0 left-0 h-24 w-24 rounded-tr-full bg-black/5" />

            {/* Sparkle decorations */}
            <Sparkles className="absolute top-4 right-6 h-5 w-5 text-white/20 hidden sm:block" />
            <Sparkles className="absolute bottom-4 left-6 h-4 w-4 text-white/15 hidden sm:block" />

            <div className="relative flex items-start gap-4">
              {/* Decorative quote icon */}
              <div className="hidden sm:block shrink-0">
                <span className="block text-6xl font-serif leading-none text-white/25 select-none">
                  &ldquo;
                </span>
              </div>
              <div className="flex-1">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black/15 backdrop-blur-sm">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white/90 sm:text-2xl">Visi</h3>
                </div>
                {/* Mobile quote icon */}
                <span className="sm:hidden mb-2 block text-4xl font-serif leading-none text-white/25 select-none">
                  &ldquo;
                </span>
                <p className="text-base leading-relaxed text-white/80 sm:text-lg sm:pl-1">
                  {data.visi}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Misi */}
        <div className="mx-auto max-w-3xl">
          <div

            className="mb-8 text-center"
          >
            <h3 className="inline-flex items-center gap-4 text-2xl font-bold text-white">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--gold)]/40" />
              <span className="text-[var(--gold)]">Misi</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--gold)]/40" />
            </h3>
          </div>
          <div className="space-y-4">
            {misiList.map((misi, i) => {
              const Icon = misiIcons[i % misiIcons.length];
              return (
                <div
                  key={i}


                  className="group relative overflow-hidden rounded-xl p-5 transition-all duration-300 sm:p-6"
                  style={{
                    background: `linear-gradient(135deg, 
                      oklch(${0.78 - i * 0.02} ${0.15 - i * 0.01} 85 / 0.12) 0%, 
                      oklch(${0.78 - i * 0.02} ${0.15 - i * 0.01} 85 / 0.06) 50%,
                      oklch(${0.78 - i * 0.02} ${0.15 - i * 0.01} 85 / 0.10) 100%)`,
                    border: '1px solid oklch(0.78 0.15 85 / 0.12)',
                  }}
                >
                  {/* Hover gold gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, oklch(0.78 0.15 85 / 0.08) 0%, transparent 60%)',
                    }}
                  />
                  
                  <div className="relative flex items-start gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, oklch(0.78 0.15 85 / 0.2) 0%, oklch(0.78 0.15 85 / 0.08) 100%)',
                        border: '1px solid oklch(0.78 0.15 85 / 0.15)',
                      }}
                    >
                      <Icon className="h-5 w-5 text-[var(--gold)]" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                          style={{
                            background: 'linear-gradient(135deg, oklch(0.78 0.15 85), oklch(0.88 0.08 85))',
                            color: 'oklch(0.22 0.08 260)',
                          }}
                        >
                          {i + 1}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-white/75 sm:text-base">
                        {misi}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pencapaian Visi Progress Bar */}
        <div
          ref={progressRef}

          className="mx-auto mt-16 max-w-3xl"
        >
          <div
            className="overflow-hidden rounded-2xl p-6 sm:p-8"
            style={{
              background: 'linear-gradient(135deg, oklch(0.78 0.15 85 / 0.08) 0%, oklch(0.78 0.15 85 / 0.03) 100%)',
              border: '1px solid oklch(0.78 0.15 85 / 0.1)',
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white/90 sm:text-base">
                Pencapaian Visi 2025
              </h4>
              <span className="text-sm font-bold text-[var(--gold)]">
                {progressInView ? '65%' : '0%'}
              </span>
            </div>
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: 'linear-gradient(90deg, oklch(0.78 0.15 85), oklch(0.92 0.05 85))' }}

              />
              {/* Shimmer effect on progress bar */}
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                  animation: progressInView ? 'shimmer-gold 2s ease-in-out infinite 1.5s' : 'none',
                }}

              />
            </div>
            <p className="mt-3 text-xs text-white/40">
              Realisasi program pembangunan Nagari Silongo tahun 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}