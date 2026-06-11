"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPinned, Mountain, Sparkles, Users } from "lucide-react";
import { HeroContent } from "@/types/site";
import { useCounter } from "@/hooks/use-counter";

function FloatingStat({ label, value, suffix, icon: Icon, delay }: { label: string; value: number; suffix: string; icon: typeof Users; delay: number }) {
  const count = useCounter(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="glass-panel rounded-[28px] p-5"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#f0c86e]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-extrabold text-white md:text-3xl">{count}{suffix}</p>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero({ hero }: { hero: HeroContent }) {
  return (
    <section id="beranda" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image src={hero.background_image_url ?? "/images/hero-bg.jpg"} alt="Nagari Silongo" fill className="object-cover" priority />
        <div className="hero-veil absolute inset-0" />
      </div>
      <div className="noise-overlay absolute inset-0" />
      <div className="pulse-glow absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-[#67a8ff]/12 blur-[130px]" />
      <div className="pulse-glow absolute bottom-[15%] right-[10%] h-64 w-64 rounded-full bg-[#f0c86e]/12 blur-[130px]" />
      <div className="container-shell relative flex min-h-screen flex-col justify-center py-32">
        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-4xl space-y-8">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.34em] text-[#f0c86e]">
              <Sparkles className="h-3.5 w-3.5" />
              {hero.badge}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="space-y-5">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-300">Pemerintahan digital modern bernuansa Minangkabau</p>
              <h1 className="font-display text-6xl leading-none text-white md:text-7xl lg:text-[7.5rem]">{hero.title}</h1>
              <p className="max-w-2xl text-base leading-8 text-slate-200 md:text-lg">{hero.subtitle}</p>
              <p className="max-w-2xl text-lg italic text-[#f4ddb1] md:text-xl">{hero.slogan}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="flex flex-col gap-4 sm:flex-row">
              <Link href={hero.primary_cta_href} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f0c86e] px-7 py-4 text-sm font-extrabold text-slate-950 transition hover:scale-[1.02]">
                {hero.primary_cta_label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={hero.secondary_cta_href} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-7 py-4 text-sm font-semibold text-white transition hover:border-[#67a8ff]/30 hover:bg-white/12">
                {hero.secondary_cta_label}
              </Link>
            </motion.div>
          </div>
          <div className="grid gap-4 lg:pb-8">
            <div className="glass-panel parallax-float rounded-[32px] p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Koordinat Resmi</p>
                  <p className="mt-3 text-xl font-semibold text-white">-0.8180, 101.0537</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-white/8 text-[#67a8ff]">
                  <MapPinned className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-300">
                <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Kabupaten Sijunjung</span>
                <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Kode Pos 27553</span>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FloatingStat label="Penduduk" value={839} suffix="" icon={Users} delay={0.1} />
              <FloatingStat label="Jorong" value={3} suffix="" icon={Mountain} delay={0.2} />
              <FloatingStat label="Luas" value={13} suffix=" km²" icon={MapPinned} delay={0.3} />
              <FloatingStat label="UMKM" value={25} suffix="+" icon={Sparkles} delay={0.4} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
