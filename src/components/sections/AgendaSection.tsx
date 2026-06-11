'use client';
import { useInView } from '@/lib/animations';

import { useState, useEffect, useRef } from 'react';
import { CalendarDays, MapPin, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const categoryColors: Record<string, string> = {
  Pemerintahan: 'bg-[var(--navy)] text-white',
  Sosial: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  Ekonomi: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  Budaya: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  Kesehatan: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
  Pembangunan: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
};

export default function AgendaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [events, setEvents] = useState<Array<{
    id: string;
    tanggal: string;
    judul: string;
    lokasi: string;
    kategori: string;
    deskripsi?: string | null;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAgenda() {
      try {
        const res = await fetch('/api/agenda', { cache: 'no-store' });
        if (!res.ok) throw new Error('Gagal memuat data agenda');
        const data = await res.json();
        const sorted = [...data].sort(
          (a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime()
        );
        setEvents(sorted);
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAgenda();
  }, []);

  return (
    <section
      id="agenda"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      ref={sectionRef}
    >
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--navy)]/[0.02] to-transparent" />

      <div className="section-divider mb-16" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <CalendarDays className="h-8 w-8 text-[var(--gold)]" />
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            <span className="text-shimmer-gold">Agenda Nagari</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Jadwal kegiatan dan acara Nagari Silongo
          </p>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          {/* Vertical timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--gold)]/40 via-[var(--gold)]/20 to-transparent sm:left-1/2 sm:-translate-x-px" />

          {loading ? (
            <div className="space-y-8 sm:space-y-12">
              {Array.from({ length: 6 }).map((_, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className="relative flex items-start gap-6 sm:gap-0"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-5 top-6 -translate-x-1/2 z-10 sm:left-1/2 sm:top-6 sm:-translate-x-1/2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-background bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)]">
                        <div className="h-2 w-2 rounded-full bg-white" />
                      </div>
                    </div>

                    {/* Mobile: all cards on right of timeline */}
                    <div className="ml-10 w-full sm:ml-0">
                      {/* Desktop: alternating layout */}
                      <div className={`sm:flex sm:items-start sm:gap-8 ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                        {/* Spacer for the opposite side (hidden on mobile) */}
                        <div className="hidden sm:block sm:w-1/2" />

                        {/* Skeleton Card */}
                        <div className="glass-card w-full rounded-xl p-5 sm:w-1/2 sm:p-6 space-y-3">
                          <Skeleton className="h-5 w-28 rounded-lg" />
                          <Skeleton className="h-5 w-3/4 rounded" />
                          <div className="flex flex-wrap items-center gap-3">
                            <Skeleton className="h-4 w-24 rounded" />
                            <Skeleton className="h-5 w-20 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CalendarDays className="mb-4 h-12 w-12 text-muted-foreground/30" />
              <p className="text-lg font-semibold text-muted-foreground">Belum ada agenda</p>
              <p className="mt-1 text-sm text-muted-foreground/70">
                Jadwal kegiatan akan ditampilkan di sini
              </p>
            </div>
          ) : (
            <div className="space-y-8 sm:space-y-12">
              {events.map((event, i) => {
                const isLeft = i % 2 === 0;
                const formattedDate = new Date(event.tanggal).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });

                return (
                  <div
                    key={event.id}
                    className="relative flex items-start gap-6 sm:gap-0"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-5 top-6 -translate-x-1/2 z-10 sm:left-1/2 sm:top-6 sm:-translate-x-1/2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-background bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)]">
                        <div className="h-2 w-2 rounded-full bg-white" />
                      </div>
                    </div>

                    {/* Mobile: all cards on right of timeline */}
                    <div className="ml-10 w-full sm:ml-0">
                      {/* Desktop: alternating layout */}
                      <div className={`sm:flex sm:items-start sm:gap-8 ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                        {/* Spacer for the opposite side (hidden on mobile) */}
                        <div className="hidden sm:block sm:w-1/2" />

                        {/* Card */}
                        <div className="glass-card card-premium-hover w-full rounded-xl p-5 sm:w-1/2 sm:p-6">
                          {/* Date badge */}
                          <div className="mb-3 flex items-center gap-2">
                            <div className="flex items-center gap-1.5 rounded-lg bg-[var(--gold)]/10 px-3 py-1.5">
                              <CalendarDays className="h-3.5 w-3.5 text-[var(--gold)]" />
                              <span className="text-xs font-semibold text-[var(--gold)] sm:text-sm">
                                {formattedDate}
                              </span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="mb-3 text-sm font-bold text-foreground sm:text-base">
                            {event.judul}
                          </h3>

                          {/* Location and Category */}
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5 shrink-0" />
                              <span className="text-xs sm:text-sm">{event.lokasi}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                              <Badge
                                variant="outline"
                                className={`text-xs ${categoryColors[event.kategori] || ''}`}
                              >
                                {event.kategori}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
