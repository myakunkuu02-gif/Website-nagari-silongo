"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { GaleriItem } from "@/types/site";

export function GallerySection({ items }: { items: GaleriItem[] }) {
  const [selected, setSelected] = useState<GaleriItem | null>(null);

  return (
    <section id="galeri" className="section-spacing">
      <div className="container-shell space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow="Galeri Premium"
            title="Masonry gallery dengan atmosfer visual yang hangat, tajam, dan sinematik"
            description="Galeri dirancang untuk menampilkan citra nagari dalam format premium melalui tata letak masonry, lazy loading gambar, dan lightbox modern yang halus."
          />
        </Reveal>
        <div className="masonry">
          {items.map((item, index) => (
            <Reveal key={`${item.title}-${index}`} delay={index * 0.03} className="masonry-item">
              <button type="button" onClick={() => setSelected(item)} className="glass-panel card-hover group block w-full overflow-hidden rounded-[28px] p-3 text-left">
                <div className="relative min-h-[220px] overflow-hidden rounded-[20px]">
                  <Image src={item.image_url} alt={item.title ?? "Galeri Nagari Silongo"} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="space-y-2 px-2 pb-2 pt-4">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{item.category}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center bg-[#020817]/92 p-4 backdrop-blur-xl">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="relative w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/12 bg-[#07111f] p-3 shadow-[0_32px_100px_rgba(2,8,23,0.66)]">
              <button type="button" onClick={() => setSelected(null)} className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-[#08111f]/86 text-white">
                <X className="h-5 w-5" />
              </button>
              <div className="relative min-h-[70vh] overflow-hidden rounded-[24px]">
                <Image src={selected.image_url} alt={selected.title ?? "Galeri"} fill className="object-contain" />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
