"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { WisataItem } from "@/types/site";

export function WisataSection({ wisata }: { wisata: WisataItem[] }) {
  const [selected, setSelected] = useState<WisataItem | null>(null);

  return (
    <section id="wisata" className="section-spacing">
      <div className="container-shell space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow="Wisata Dan Budaya"
            title="Rumah Gadang, Tari Tanduok, kuliner, dan potensi alam dalam panggung visual sinematik"
            description="Bagian ini menonjolkan kekuatan citra Nagari Silongo sebagai wilayah yang kaya akan nilai adat, identitas budaya, dan lanskap alam Sumatera Barat yang otentik."
          />
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {wisata.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.08}>
              <article className="glass-panel card-hover group overflow-hidden rounded-[32px]">
                <div className="relative h-80 overflow-hidden">
                  <Image src={item.image_url ?? "/images/hero-bg.jpg"} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05101a] via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/12 bg-[#08111f]/75 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#f0c86e]">{item.category}</span>
                </div>
                <div className="space-y-4 p-6">
                  <h3 className="font-display text-3xl text-white">{item.title}</h3>
                  <p className="line-clamp-3 text-sm leading-7 text-slate-300">{item.description}</p>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setSelected(item)} className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#67a8ff]/30">
                      Lihat Detail
                    </button>
                    <Link href={`/wisata/${item.slug}`} className="inline-flex items-center gap-2 rounded-full text-sm font-semibold text-[#f0c86e]">
                      Buka Halaman
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center bg-[#020817]/86 p-4 backdrop-blur-xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} className="glass-panel relative w-full max-w-3xl overflow-hidden rounded-[32px] p-3">
              <button type="button" onClick={() => setSelected(null)} className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-[#08111f]/80 text-white">
                <X className="h-4 w-4" />
              </button>
              <div className="relative h-72 overflow-hidden rounded-[24px]">
                <Image src={selected.image_url ?? "/images/hero-bg.jpg"} alt={selected.title} fill className="object-cover" />
              </div>
              <div className="space-y-4 p-5 md:p-7">
                <span className="inline-flex rounded-full border border-[#63c9a5]/20 bg-[#63c9a5]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#7ad7b5]">{selected.category}</span>
                <h3 className="font-display text-4xl text-white">{selected.title}</h3>
                <p className="text-sm leading-8 text-slate-300">{selected.description}</p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
