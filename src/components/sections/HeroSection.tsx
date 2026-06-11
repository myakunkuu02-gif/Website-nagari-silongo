'use client';
import { useInView } from '@/lib/animations';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Users, MapPin, Maximize2, ShoppingBag, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HeroData } from '@/types';
import VisitorCounter from '@/components/sections/VisitorCounter';

const defaultHero: HeroData = {
  id: 'default',
  badge: 'Website Resmi Pemerintahan Nagari',
  title: 'NAGARI SILONGO',
  subtitle: 'Kecamatan Lubuk Tarok \u2022 Kabupaten Sijunjung \u2022 Sumatera Barat',
  slogan: 'Di Mana Bumi Dipijak, Di Situ Langit Dijunjung',
  image_url: null,
  created_at: '',
  updated_at: '',
};

interface StatCard {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const heroStats: StatCard[] = [
  { icon: <Users className="h-5 w-5" />, value: 839, suffix: '', label: 'Jiwa' },
  { icon: <MapPin className="h-5 w-5" />, value: 3, suffix: '', label: 'Jorong' },
  { icon: <Maximize2 className="h-5 w-5" />, value: 1340, suffix: '', label: 'km\u00B2' },
  { icon: <ShoppingBag className="h-5 w-5" />, value: 25, suffix: '+', label: 'UMKM' },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  const display = target >= 1000 ? (count / 100).toFixed(2) : count.toString();

  return (
    <span className="tabular-nums">
      {display}{suffix}
    </span>
  );
}

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 168, 67, ${p.opacity})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-bg" />;
}

export default function HeroSection({ initialHero }: { initialHero?: HeroData | null }) {
  const [hero, setHero] = useState<HeroData>(initialHero && initialHero.title ? initialHero : defaultHero);
  const mounted = true;
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' });

  const scrollToAbout = useCallback(() => {
    const el = document.querySelector('#profil');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section id="beranda" className="relative min-h-screen overflow-hidden bg-navy">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 hero-bg bg-cover bg-center" style={{ backgroundImage: hero.image_url ? `url('${hero.image_url}')` : "url('/images/hero-bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/40 to-navy/70 animate-gradient" />
        <Particles />

        {/* Rumah Gadang SVG silhouette pattern */}
        <svg
          className="absolute bottom-0 left-0 w-full opacity-[0.04]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,320 L0,280 Q60,180 120,200 Q180,100 240,160 Q300,80 360,140 Q420,60 480,120 Q540,40 600,100 Q660,20 720,80 Q780,10 840,70 Q900,20 960,80 Q1020,40 1080,100 Q1140,60 1200,120 Q1260,80 1320,140 Q1380,100 1440,160 L1440,320 Z"
            fill="rgba(212, 168, 67, 1)"
          />
          <path
            d="M0,320 L0,260 Q80,200 160,220 Q240,140 320,180 Q400,100 480,160 Q560,80 640,140 Q720,60 800,120 Q880,40 960,100 Q1040,60 1120,120 Q1200,80 1280,140 Q1360,100 1440,160 L1440,320 Z"
            fill="rgba(212, 168, 67, 0.5)"
          />
        </svg>

        {/* Cinematic overlay */}
        <div className="cinematic-overlay-light absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div

          >
            <Badge
              variant="outline"
              className="mb-6 border-[var(--gold)]/50 bg-[var(--gold)]/10 px-5 py-2 text-sm text-[var(--gold)]"
            >
              {hero.badge}
            </Badge>
          </div>

          {/* Title */}
          <h1

            className="mb-4 text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="text-shimmer-gold">{hero.title}</span>
          </h1>

          {/* Subtitle */}
          <p

            className="mb-6 text-lg font-medium text-primary-foreground/70 sm:text-xl"
          >
            {hero.subtitle}
          </p>

          {/* Slogan */}
          <div

            className="mb-10 inline-flex items-center gap-3 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/[0.08] px-6 py-2.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            <span className="text-sm sm:text-base font-medium tracking-wide text-[var(--gold)]">{hero.slogan}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
          </div>

          {/* CTA Buttons */}
          <div

            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="bg-[var(--gold)] px-8 text-navy font-semibold shadow-lg hover:bg-[var(--gold-light)]"
              onClick={scrollToAbout}
            >
              Jelajahi Nagari
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 px-8 text-primary-foreground backdrop-blur-sm hover:bg-white/10 hover:text-[var(--gold)] cursor-pointer"
              onClick={() => {
                const el = document.querySelector('#berita');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Informasi Publik
            </Button>
          </div>
        </div>

        {/* Floating Statistics Cards */}
        <div ref={statsRef} className="mt-16 w-full max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}

                className={`rounded-xl p-4 text-center sm:p-5 bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl border border-white/[0.12] shadow-lg shadow-black/20 ${
                  i % 2 === 0 ? 'animate-float' : 'animate-float-delayed'
                }`}
              >
                <div className="mb-2 flex items-center justify-center text-[var(--gold)]">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-primary-foreground sm:text-3xl">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={statsInView} />
                </div>
                <div className="mt-1 text-xs font-medium text-primary-foreground/60 sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visitor Counter */}
        <div className="mt-8 w-full max-w-5xl px-4 sm:px-6">
          <VisitorCounter />
        </div>

        {/* Scroll indicator */}
        <div

          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div

          >
            <ChevronDown className="h-6 w-6 text-[var(--gold)]/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
