"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, X } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { PemerintahanItem } from "@/types/site";

export function GovernmentSection({ items }: { items: PemerintahanItem[] }) {
  const [selected, setSelected] = useState<PemerintahanItem | null>(null);

  return (
    <section id="pemerintahan" className="section-spacing border-y border-white/10 bg-[linear-gradient(180deg,rgba(103,168,255,0.04),rgba(255,255,255,0.01))]">
      <div className="container-shell space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow="Pemerintahan"
            title="Struktur pemerintahan yang tampil modern, terbuka, dan berwibawa"
            description="Tampilan perangkat nagari disusun seperti direktori institusi premium dengan profil singkat, urutan resmi, dan modal detail untuk pengalaman membaca yang lebih mendalam."
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.filter((item) => item.status_aktif).map((item, index) => (
            <Reveal key={`${item.nama}-${index}`} delay={index * 0.07}>
              <button
                type="button"
                onClick={() => setSelected(item)}
                className="glass-panel card-hover group h-full overflow-hidden rounded-[32px] text-left"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image src={item.foto_url ?? "/images/hero-bg.jpg"} alt={item.nama} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#06101c] to-transparent" />
                </div>
                <div className="space-y-3 p-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#63c9a5]/20 bg-[#63c9a5]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#7ad7b5]">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Aktif
                  </span>
                  <div>
                    <p className="font-display text-3xl text-white">{item.nama}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.25em] text-[#f0c86e]">{item.jabatan}</p>
                  </div>
                  <p className="line-clamp-3 text-sm leading-7 text-slate-300">{item.deskripsi}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center bg-[#020817]/86 p-4 backdrop-blur-xl">
            <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18 }} className="glass-panel relative w-full max-w-4xl overflow-hidden rounded-[36px]">
              <button type="button" onClick={() => setSelected(null)} className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white">
                <X className="h-5 w-5" />
              </button>
              <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[420px]">
                  <Image src={selected.foto_url ?? "/images/hero-bg.jpg"} alt={selected.nama} fill className="object-cover" />
                </div>
                <div className="space-y-5 p-8 md:p-10">
                  <span className="inline-flex rounded-full border border-[#f0c86e]/20 bg-[#f0c86e]/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#f0c86e]">
                    Struktur Pemerintahan
                  </span>
                  <div>
                    <h3 className="font-display text-4xl text-white md:text-5xl">{selected.nama}</h3>
                    <p className="mt-3 text-sm uppercase tracking-[0.3em] text-[#67a8ff]">{selected.jabatan}</p>
                  </div>
                  <p className="text-sm leading-8 text-slate-300">{selected.deskripsi}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
