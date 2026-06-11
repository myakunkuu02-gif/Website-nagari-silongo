'use client';
import { useInView } from '@/lib/animations';
import { useRef, useState, useEffect } from 'react';
import { Quote, Crown, Landmark } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface SambutanData {
  id?: string;
  nama: string;
  jabatan: string;
  isi_sambutan: string;
  bio: string;
  masa_jabatan: string;
  jml_jorong: string;
  foto_url?: string | null;
}

export default function SambutanSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [data, setData] = useState<SambutanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/sambutan', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json && json.id) setData(json);
        }
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="sambutan" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" ref={sectionRef}>
      {/* Subtle decorative background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sambutan-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="oklch(0.78 0.15 85)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sambutan-dots)" />
        </svg>
      </div>

      <div className="section-divider mb-16" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            <span className="text-shimmer-gold">Sambutan Wali Nagari</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Pesan dari pimpinan tertinggi Nagari Silongo
          </p>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>

        {loading ? (
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-12 items-start">
            <div className="lg:col-span-3 space-y-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-32 w-full rounded-2xl" />
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-12 items-start">
            {/* Left: Quote Card (3 cols) */}
            <div className="lg:col-span-3">
              <div className="glow-gold glass-card relative overflow-hidden rounded-2xl p-8 sm:p-10">
                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 h-40 w-40 rounded-bl-full bg-[var(--gold)]/8" />
                <div className="absolute bottom-0 left-0 h-24 w-24 rounded-tr-full bg-[var(--gold)]/5" />

                <div className="relative flex flex-col gap-6">
                  {/* Large decorative quote mark */}
                  <div className="flex items-center gap-3">
                    <Quote className="h-10 w-10 text-[var(--gold)]/60 sm:h-12 sm:w-12" />
                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--gold)]/40 to-transparent" />
                  </div>

                  {/* Sambutan text */}
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-loose italic">
                    {data?.isi_sambutan || 'Belum ada sambutan yang ditambahkan.'}
                  </p>

                  {/* Closing quote and signature */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--gold)]/40" />
                      <Quote className="h-8 w-8 rotate-180 text-[var(--gold)]/60 sm:h-10 sm:w-10" />
                    </div>
                  </div>

                  <div className="border-t border-[var(--gold)]/20 pt-4">
                    <p className="text-base font-semibold text-foreground">
                      {data?.nama || 'Wali Nagari'}
                    </p>
                    <p className="text-sm text-[var(--gold)]">
                      {data?.jabatan || 'Wali Nagari Silongo'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Wali Nagari Profile Card (2 cols) */}
            <div className="lg:col-span-2">
              <div className="card-premium-hover glass-card relative overflow-hidden rounded-2xl">
                {/* Gradient header background */}
                <div className="relative bg-gradient-to-br from-[var(--navy)] via-[var(--navy-light)] to-[var(--navy)] p-8 pb-12">
                  {/* Decorative pattern overlay */}
                  <div className="pointer-events-none absolute inset-0 opacity-10">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="sambutan-card-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                          <line x1="0" y1="0" x2="0" y2="20" stroke="oklch(0.92 0.05 85)" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#sambutan-card-pattern)" />
                    </svg>
                  </div>

                  {/* Crown icon */}
                  <div className="relative mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gold)]/20 ring-2 ring-[var(--gold)]/40 animate-pulse-gold">
                      <Crown className="h-8 w-8 text-[var(--gold)]" />
                    </div>
                  </div>

                  <div className="relative text-center">
                    <h3 className="text-xl font-bold text-white sm:text-2xl">{data?.nama || 'Wali Nagari'}</h3>
                    <p className="mt-1 text-sm font-medium text-[var(--gold)]">
                      {data?.jabatan || 'Wali Nagari Silongo'}
                    </p>
                  </div>
                </div>

                {/* Bio content */}
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-2 text-muted-foreground">
                    <Landmark className="h-4 w-4 text-[var(--gold)]" />
                    <span className="text-xs font-medium uppercase tracking-wider">Profil Singkat</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {data?.bio || 'Belum ada profil singkat.'}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[var(--navy)]/5 p-3 text-center dark:bg-[var(--navy)]/20">
                      <p className="text-lg font-bold text-[var(--gold)]">{data?.masa_jabatan || '-'}</p>
                      <p className="text-xs text-muted-foreground">Masa Jabatan</p>
                    </div>
                    <div className="rounded-xl bg-[var(--navy)]/5 p-3 text-center dark:bg-[var(--navy)]/20">
                      <p className="text-lg font-bold text-[var(--gold)]">{data?.jml_jorong || '-'}</p>
                      <p className="text-xs text-muted-foreground">Jorong</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}