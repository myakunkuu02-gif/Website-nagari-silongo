'use client';
import { useInView } from '@/lib/animations';

import { useState, useEffect, useRef } from 'react';
import { Megaphone, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const pengumuman = [
  {
    id: 1,
    text: 'Pelayanan administrasi kependudukan buka setiap Senin-Jumat pukul 08.00-16.00 WIB di Balai Nagari Silongo.',
    type: 'info' as const,
  },
  {
    id: 2,
    text: 'Program Vaksinasi Gratis bulan ini tersedia di Puskesmas Nagari Silongo. Hubungi kantor nagari untuk informasi lebih lanjut.',
    type: 'urgent' as const,
  },
  {
    id: 3,
    text: 'Festival Budaya Nagari Silongo 2025 akan digelar pada bulan Desember. Persiapan sudah dimulai!',
    type: 'event' as const,
  },
  {
    id: 4,
    text: 'Pembangunan jalan penghubung Jorong Tanjuang - Muaro Pandan sedang dalam proses pengerjaan.',
    type: 'info' as const,
  },
];

const typeStyles = {
  info: 'bg-[var(--gold)]/10 text-[var(--gold)] border-[var(--gold)]/20',
  urgent: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  event: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

const typeLabels = {
  info: 'Info',
  urgent: 'Penting',
  event: 'Acara',
};

export default function PengumumanTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pengumuman.length);
    }, 5000);
  };

  useEffect(() => {
    if (!isPaused && inView) {
      startTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, inView]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isPaused) startTimer();
  };

  const current = pengumuman[currentIndex];

  return (
    <div
      ref={sectionRef}

      className="relative z-40 bg-[#0a1628]/95 backdrop-blur-md border-b border-white/[0.06]"
    >
      <div className="mx-auto flex max-w-7xl items-center px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mr-3 hidden shrink-0 items-center gap-1.5 sm:flex">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--gold)]/15">
            <Megaphone className="h-3.5 w-3.5 text-[var(--gold)]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
            Pengumuman
          </span>
        </div>

        {/* Divider */}
        <div className="mr-3 hidden h-4 w-px bg-white/10 sm:block" />

        {/* Content */}
        <div className="relative flex min-w-0 flex-1 items-center">
          <p
            key={currentIndex}


            className="min-w-0 flex-1 truncate pr-4 text-xs text-white/70 sm:text-sm"
          >
            <span className={`mr-2 inline-flex shrink-0 items-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase ${typeStyles[current.type]}`}>
              {typeLabels[current.type]}
            </span>
            {current.text}
          </p>
        </div>

        {/* Controls */}
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/5 hover:text-white/70 cursor-pointer"
            aria-label={isPaused ? 'Putar' : 'Jeda'}
          >
            {isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          </button>
          <button
            onClick={() => goTo((currentIndex - 1 + pengumuman.length) % pengumuman.length)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/5 hover:text-white/70 cursor-pointer"
            aria-label="Sebelumnya"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => goTo((currentIndex + 1) % pengumuman.length)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/5 hover:text-white/70 cursor-pointer"
            aria-label="Selanjutnya"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>

          {/* Dots */}
          <div className="ml-2 hidden items-center gap-1 sm:flex">
            {pengumuman.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === currentIndex
                    ? 'w-4 bg-[var(--gold)]'
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Pengumuman ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}