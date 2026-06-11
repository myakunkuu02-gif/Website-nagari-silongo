'use client';
import { useInView } from '@/lib/animations';

import { useState, useEffect, useRef } from 'react';
import { Mountain, TreePine, Utensils, Camera, MapPin, ArrowRight, Star } from 'lucide-react';
import { WisataData } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const defaultWisata: WisataData[] = [
  {
    id: '1', title: 'Rumah Gadang Silongo',
    description: 'Rumah Gadang tradisional Minangkabau yang menjadi ikon budaya Nagari Silongo. Bangunan dengan atap gonjong ini menjadi saksi sejarah dan kehidupan masyarakat sejak ratusan tahun lalu.',
    image_url: null, category: 'Budaya', created_at: '', updated_at: '',
  },
  {
    id: '2', title: 'Air Terjun Batang Tarok',
    description: 'Air terjun yang tersembunyi di perbukitan Nagari Silongo dengan ketinggian sekitar 25 meter. Air jernih yang mengalir dari hutan lindung menciptakan pemandangan yang menakjubkan.',
    image_url: null, category: 'Wisata Alam', created_at: '', updated_at: '',
  },
  {
    id: '3', title: 'Danau Pandan',
    description: 'Danau kecil yang dikelilingi pohon pandan dan hutan tropis. Tempat yang ideal untuk bersantai dan menikmati ketenangan alam pedesaan.',
    image_url: null, category: 'Wisata Alam', created_at: '', updated_at: '',
  },
  {
    id: '4', title: 'Randang Silongo',
    description: 'Kuliner khas Minangkabau yang telah melegenda. Randang daging sapi dengan bumbu rempah pilihan yang dimasak hingga kering dan awet.',
    image_url: null, category: 'Kuliner', created_at: '', updated_at: '',
  },
  {
    id: '5', title: 'Upacara Adat Baralek',
    description: 'Tradisi pernikahan adat Minangkabau yang megah dengan prosesi marapulai, batagak pangulu, dan berbagai rangkaian adat lainnya.',
    image_url: null, category: 'Budaya', created_at: '', updated_at: '',
  },
  {
    id: '6', title: 'Lapai Silongo',
    description: 'Jajanan tradisional terbuat dari beras ketan yang dibakar dengan daun pisang. Rasa gurih manis yang khas menjadi oleh-oleh favorit.',
    image_url: null, category: 'Kuliner', created_at: '', updated_at: '',
  },
];

const itemRatings: Record<string, number> = {
  '1': 4.9,
  '2': 4.7,
  '3': 4.8,
  '4': 4.9,
  '5': 4.6,
  '6': 4.8,
};

const categoryGradients: Record<string, string> = {
  'Budaya': 'from-amber-700 via-amber-600 to-yellow-700',
  'Wisata Alam': 'from-emerald-700 via-emerald-600 to-teal-700',
  'Kuliner': 'from-orange-700 via-red-600 to-rose-700',
};

export default function WisataSection() {
  const [wisata, setWisata] = useState<WisataData[]>(defaultWisata);
  const [selected, setSelected] = useState<WisataData | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    fetch('/api/wisata')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setWisata(data);
      })
      .catch(() => {});
  }, []);

  const categories = ['Semua', 'Budaya', 'Wisata Alam', 'Kuliner'];

  const filteredData = (category: string) => {
    if (category === 'Semua') return wisata;
    return wisata.filter((w) => w.category === category);
  };

  return (
    <section id="wisata" className="relative py-20 sm:py-24" ref={sectionRef}>
      <div className="section-divider mb-16" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div

          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Wisata & Budaya
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Jelajahi keindahan alam, budaya, dan kuliner khas Nagari Silongo
          </p>
        </div>

        {/* Category Tabs */}
        <div

          className="mb-10"
        >
          <Tabs defaultValue="Semua" className="w-full">
            <TabsList className="mx-auto flex w-fit flex-wrap gap-2 bg-transparent">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="data-[state=active]:bg-navy data-[state=active]:text-[var(--gold)] rounded-full border border-border px-5 py-2 text-sm font-medium"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((cat) => (
              <TabsContent key={cat} value={cat} className="mt-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredData(cat).map((item, i) => (
                    <div
                      key={item.id}


                      onClick={() => setSelected(item)}
                      className="glass-card group cursor-pointer overflow-hidden rounded-2xl transition-shadow hover:shadow-xl"
                    >
                      {/* Image placeholder */}
                      <div className="relative h-52 overflow-hidden">
                        <div
                          className={`h-full w-full bg-gradient-to-br ${
                            categoryGradients[item.category || 'Budaya'] || categoryGradients['Budaya']
                          }`}
                        >
                          <div className="flex h-full items-center justify-center">
                            {item.category === 'Budaya' && (
                              <Camera className="h-16 w-16 text-white/30" />
                            )}
                            {item.category === 'Wisata Alam' && (
                              <Mountain className="h-16 w-16 text-white/30" />
                            )}
                            {item.category === 'Kuliner' && (
                              <Utensils className="h-16 w-16 text-white/30" />
                            )}
                          </div>
                        </div>
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-navy/0 transition-all group-hover:bg-navy/40" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                            Lihat Detail
                          </span>
                        </div>
                        {/* Category badge */}
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-white/90 text-navy text-xs backdrop-blur-sm">
                            {item.category}
                          </Badge>
                        </div>
                        {/* Rating badge */}
                        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm">
                          <Star className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]" />
                          <span className="text-xs font-semibold text-white">
                            {itemRatings[item.id] || 4.8}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description || 'Destinasi wisata di Nagari Silongo'}
                        </p>
                        {/* Location tag */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 text-[var(--gold)]" />
                            <span>Nagari Silongo</span>
                          </div>
                          {/* Hover: Lihat Detail */}
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Lihat Detail
                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selected?.title}</DialogTitle>
            <DialogDescription>
              <Badge className="bg-navy/10 text-navy">{selected?.category}</Badge>
            </DialogDescription>
          </DialogHeader>
          <div className="glass-card mt-2 overflow-hidden rounded-xl">
            <div
              className={`h-48 bg-gradient-to-br ${
                categoryGradients[selected?.category || 'Budaya'] || categoryGradients['Budaya']
              }`}
            />
            <div className="p-5">
              <p className="leading-relaxed text-muted-foreground">
                {selected?.description || 'Informasi destinasi wisata Nagari Silongo.'}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}