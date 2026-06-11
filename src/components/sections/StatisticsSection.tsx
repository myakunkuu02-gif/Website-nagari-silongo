'use client';
import { useInView } from '@/lib/animations';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Users,
  MapPin,
  Landmark,
  GraduationCap,
  Building,
  ShoppingBag,
  Trees,
  Heart,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { StatistikData } from '@/types';

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="h-6 w-6" />,
  MapPin: <MapPin className="h-6 w-6" />,
  Landmark: <Landmark className="h-6 w-6" />,
  GraduationCap: <GraduationCap className="h-6 w-6" />,
  Building: <Building className="h-6 w-6" />,
  ShoppingBag: <ShoppingBag className="h-6 w-6" />,
  Trees: <Trees className="h-6 w-6" />,
  Heart: <Heart className="h-6 w-6" />,
};

const defaultStats: StatistikData[] = [
  { id: '1', label: 'Total Penduduk', value: '839', icon: 'Users', created_at: '', updated_at: '' },
  { id: '2', label: 'Jumlah Jorong', value: '3', icon: 'MapPin', created_at: '', updated_at: '' },
  { id: '3', label: 'Luas Wilayah', value: '13.40', icon: 'Landmark', created_at: '', updated_at: '' },
  { id: '4', label: 'Sekolah', value: '2', icon: 'GraduationCap', created_at: '', updated_at: '' },
  { id: '5', label: 'Masjid', value: '4', icon: 'Building', created_at: '', updated_at: '' },
  { id: '6', label: 'UMKM', value: '25', icon: 'ShoppingBag', created_at: '', updated_at: '' },
  { id: '7', label: 'Hutan Lindung', value: '85', icon: 'Trees', created_at: '', updated_at: '' },
  { id: '8', label: 'Kelompok Tani', value: '6', icon: 'Heart', created_at: '', updated_at: '' },
];

function AnimatedCounter({ target, inView }: { target: string; inView: boolean }) {
  const numericVal = parseFloat(target);
  const hasDecimal = target.includes('.');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * numericVal);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, numericVal]);

  const display = hasDecimal ? count.toFixed(2) : Math.floor(count).toString();
  return <span className="tabular-nums">{display}</span>;
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="glass-card rounded-2xl p-5 text-center sm:p-6"
        >
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/50">
            <Skeleton className="h-6 w-6 rounded-md" />
          </div>
          <div className="mx-auto mb-2 h-8 w-20">
            <Skeleton className="h-full w-full rounded-md" />
          </div>
          <div className="mx-auto h-4 w-24">
            <Skeleton className="h-full w-full rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StatisticsSection() {
  const [stats, setStats] = useState<StatistikData[]>(defaultStats);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    fetch('/api/statistik')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setStats(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="statistik" className="relative py-20 sm:py-24" ref={sectionRef}>
      <div className="section-divider mb-16" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div

          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Statistik Nagari
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Data dan informasi statistik Nagari Silongo yang diperbarui secara berkala
          </p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <StatsSkeleton />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.id}


                className="glass-card group relative overflow-hidden rounded-2xl p-5 text-center transition-shadow hover:shadow-xl sm:p-6"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/0 to-[var(--gold)]/0 transition-all group-hover:from-[var(--gold)]/5 group-hover:to-transparent" />
                <div className="relative z-10">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-[var(--gold)]/10 group-hover:text-[var(--gold)]">
                    {stat.icon && iconMap[stat.icon] ? iconMap[stat.icon] : <Building className="h-6 w-6" />}
                  </div>
                  <div className="mb-1 text-2xl font-bold text-foreground sm:text-3xl">
                    <AnimatedCounter target={stat.value} inView={inView} />
                    {stat.label === 'Luas Wilayah' && <span className="text-lg"> km\u00B2</span>}
                    {stat.label === 'Total Penduduk' && <span className="text-lg"> Jiwa</span>}
                  </div>
                  <div className="text-xs font-medium text-muted-foreground sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
