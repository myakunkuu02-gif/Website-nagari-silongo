'use client';
import { useInView } from '@/lib/animations';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Camera, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { GaleriData } from '@/types';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const defaultGaleri: GaleriData[] = [
  {
    id: '1', title: 'Pemandangan Nagari', description: 'Pemandangan indah Nagari Silongo dari ketinggian.',
    image_url: '', category: 'Alam', created_at: '', updated_at: '',
  },
  {
    id: '2', title: 'Rumah Gadang', description: 'Rumah Gadang tradisional yang masih terjaga.',
    image_url: '', category: 'Budaya', created_at: '', updated_at: '',
  },
  {
    id: '3', title: 'Sungai Batang Tarok', description: 'Keindahan sungai yang mengalir di nagari.',
    image_url: '', category: 'Alam', created_at: '', updated_at: '',
  },
  {
    id: '4', title: 'Upacara Adat', description: 'Prosesi upacara adat Minangkabau.',
    image_url: '', category: 'Budaya', created_at: '', updated_at: '',
  },
  {
    id: '5', title: 'Sawah Nagari', description: 'Persawahan hijau yang menghampar luas.',
    image_url: '', category: 'Alam', created_at: '', updated_at: '',
  },
  {
    id: '6', title: 'Masjid Nagari', description: 'Masjid yang menjadi pusat kegiatan keagamaan.',
    image_url: '', category: 'Infrastruktur', created_at: '', updated_at: '',
  },
  {
    id: '7', title: 'Pasar Tradisional', description: 'Pasar tradisional nagari yang ramai.',
    image_url: '', category: 'Budaya', created_at: '', updated_at: '',
  },
  {
    id: '8', title: 'Jembatan Penghubung', description: 'Jembatan yang menghubungkan jorong.',
    image_url: '', category: 'Infrastruktur', created_at: '', updated_at: '',
  },
  {
    id: '9', title: 'Perbukitan Hijau', description: 'Hamparan perbukitan hijau di sekitar nagari.',
    image_url: '', category: 'Alam', created_at: '', updated_at: '',
  },
  {
    id: '10', title: 'Kegiatan Gotong Royong', description: 'Gotong royong membangun nagari.',
    image_url: '', category: 'Sosial', created_at: '', updated_at: '',
  },
];

const galleryGradients = [
  'from-navy via-navy-light to-emerald-custom/20',
  'from-amber-800 via-amber-700 to-yellow-800',
  'from-emerald-800 via-emerald-700 to-teal-800',
  'from-purple-800 via-purple-700 to-indigo-800',
  'from-rose-800 via-rose-700 to-pink-800',
  'from-sky-800 via-sky-700 to-blue-800',
  'from-teal-800 via-teal-700 to-cyan-800',
  'from-orange-800 via-orange-700 to-amber-800',
  'from-lime-800 via-lime-700 to-green-800',
  'from-fuchsia-800 via-fuchsia-700 to-purple-800',
];

export default function GaleriSection() {
  const [galeri, setGaleri] = useState<GaleriData[]>(defaultGaleri);
  const [selected, setSelected] = useState<GaleriData | null>(null);
  const [activeTab, setActiveTab] = useState('Semua');
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    fetch('/api/galeri')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setGaleri(data);
      })
      .catch(() => {});
  }, []);

  // Dynamically extract categories from data
  const categories = useMemo(() => {
    const uniqueCats = Array.from(
      new Set(galeri.map((item) => item.category).filter(Boolean) as string[])
    ).sort((a, b) => a.localeCompare(b));
    return ['Semua', ...uniqueCats];
  }, [galeri]);

  // Filter items based on active tab
  const filteredGaleri = useMemo(() => {
    if (activeTab === 'Semua') return galeri;
    return galeri.filter((item) => item.category === activeTab);
  }, [galeri, activeTab]);

  // Get the index of the selected item within the currently filtered list
  const selectedIndex = useMemo(() => {
    if (!selected) return -1;
    return filteredGaleri.findIndex((item) => item.id === selected.id);
  }, [selected, filteredGaleri]);

  // Get the global index for gradient selection
  const globalIndex = useMemo(() => {
    if (!selected) return 0;
    return galeri.findIndex((item) => item.id === selected.id);
  }, [selected, galeri]);

  const goPrev = useCallback(() => {
    if (selectedIndex <= 0) return;
    setSelected(filteredGaleri[selectedIndex - 1]);
  }, [selectedIndex, filteredGaleri]);

  const goNext = useCallback(() => {
    if (selectedIndex < 0 || selectedIndex >= filteredGaleri.length - 1) return;
    setSelected(filteredGaleri[selectedIndex + 1]);
  }, [selectedIndex, filteredGaleri]);

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (!selected) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected, goPrev, goNext]);

  // Find gradient index for an item in the original gallery array
  const getGradientIndex = (item: GaleriData) => {
    const idx = galeri.findIndex((g) => g.id === item.id);
    return idx >= 0 ? idx : 0;
  };

  const getHeight = (index: number) => {
    if (index % 3 === 0) return '280px';
    if (index % 3 === 1) return '220px';
    return '320px';
  };

  return (
    <section id="galeri" className="relative py-20 sm:py-24" ref={sectionRef}>
      <div className="section-divider mb-16" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div

          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Galeri Nagari
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Momen-momen terbaik dan keindahan Nagari Silongo
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div

          className="mb-10"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
          </Tabs>
        </div>

        {/* Masonry Grid with staggered animations */}
        
          <div
            key={activeTab}
            className="masonry-grid"


          >
            {filteredGaleri.map((item, i) => {
              const gradIdx = getGradientIndex(item);
              return (
                <div
                  key={item.id}


                  className="masonry-item"
                >
                  <div
                    onClick={() => setSelected(item)}
                    className="group cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:ring-2 hover:ring-[var(--gold)] hover:ring-offset-2 hover:ring-offset-background"
                  >
                    {/* Image placeholder with varying heights */}
                    <div
                      className={`relative bg-gradient-to-br ${galleryGradients[gradIdx % galleryGradients.length]}`}
                      style={{ height: getHeight(i) }}
                    >
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title || 'Galeri'}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Camera className="h-10 w-10 text-white/20" />
                        </div>
                      )}
                      {/* Cinematic hover overlay */}
                      <div className="cinematic-overlay absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      {/* Zoom icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                          <ZoomIn className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      {/* Title overlay at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/90 to-transparent p-4 pt-8">
                        <h3 className="text-sm font-bold text-white sm:text-base">
                          {item.title || 'Galeri Nagari'}
                        </h3>
                        {item.category && (
                          <p className="text-xs text-white/60">{item.category}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        
      </div>

      {/* Lightbox Dialog with Prev/Next Navigation */}
      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <div className="relative">
            {/* Image area */}
            <div
              className={`h-64 bg-gradient-to-br ${galleryGradients[globalIndex % galleryGradients.length] || galleryGradients[0]} sm:h-80 lg:h-96`}
            >
              {selected?.image_url ? (
                <img
                  src={selected.image_url}
                  alt={selected.title || 'Galeri'}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Camera className="h-20 w-20 text-white/20" />
                </div>
              )}

              {/* Image Counter */}
              {selectedIndex >= 0 && (
                <div className="absolute top-4 right-4 rounded-full bg-black/50 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                  {selectedIndex + 1} / {filteredGaleri.length}
                </div>
              )}

              {/* Prev Button */}
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                disabled={selectedIndex <= 0}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Gambar sebelumnya"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                disabled={selectedIndex >= filteredGaleri.length - 1}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Gambar selanjutnya"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Info area */}
            <div className="p-6">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {selected?.title || 'Galeri Nagari'}
                </DialogTitle>
                <DialogDescription className="mt-2 text-base">
                  {selected?.description || 'Dokumentasi kegiatan dan keindahan Nagari Silongo.'}
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}