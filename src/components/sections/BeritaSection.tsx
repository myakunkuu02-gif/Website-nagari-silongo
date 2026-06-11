'use client';
import { useInView } from '@/lib/animations';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Calendar, ArrowRight, X } from 'lucide-react';
import { BeritaData } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const defaultBerita: BeritaData[] = [
  {
    id: '1', title: 'Festival Budaya Nagari Silongo 2024 Resmi Dibuka',
    slug: 'festival-budaya-2024', content: 'Festival budaya tahunan Nagari Silongo resmi dibuka dengan meriah. Acara ini menampilkan berbagai pertunjukan seni tradisional Minangkabau.',
    thumbnail: null, category: 'Budaya', is_featured: true, author: 'Admin', created_at: '2024-12-01T00:00:00', updated_at: '',
  },
  {
    id: '2', title: 'Pembangunan Jalan Penghubung Jorong Selesai',
    slug: 'pembangunan-jalan', content: 'Proyek pembangunan jalan penghubung antar jorong telah selesai dikerjakan.',
    thumbnail: null, category: 'Pembangunan', is_featured: false, author: 'Admin', created_at: '2024-11-28T00:00:00', updated_at: '',
  },
  {
    id: '3', title: 'Pelatihan UMKM Digital Marketing untuk Warga',
    slug: 'pelatihan-umkm', content: 'Program pelatihan digital marketing untuk UMKM lokal nagari.',
    thumbnail: null, category: 'Ekonomi', is_featured: false, author: 'Admin', created_at: '2024-11-20T00:00:00', updated_at: '',
  },
  {
    id: '4', title: 'Gotong Royong Bersihkan Sungai Batang Tarok',
    slug: 'gotong-royong', content: 'Masyarakat nagari bergotong royong membersihkan sungai Batang Tarok.',
    thumbnail: null, category: 'Sosial', is_featured: false, author: 'Admin', created_at: '2024-11-15T00:00:00', updated_at: '',
  },
  {
    id: '5', title: 'Vaksinasi Gratis di Balai Nagari Silongo',
    slug: 'vaksinasi-gratis', content: 'Program vaksinasi gratis bagi seluruh masyarakat Nagari Silongo.',
    thumbnail: null, category: 'Kesehatan', is_featured: false, author: 'Admin', created_at: '2024-11-10T00:00:00', updated_at: '',
  },
];

const categoryColors: Record<string, string> = {
  'Budaya': 'bg-amber-100 text-amber-800',
  'Pembangunan': 'bg-emerald-100 text-emerald-800',
  'Ekonomi': 'bg-blue-100 text-blue-800',
  'Sosial': 'bg-purple-100 text-purple-800',
  'Kesehatan': 'bg-rose-100 text-rose-800',
};

const gradientThumbnails = [
  'from-navy to-navy-light',
  'from-emerald-custom/30 to-navy-light',
  'from-[var(--gold)]/20 to-navy',
  'from-purple-800/30 to-navy',
  'from-rose-800/30 to-navy',
];

export default function BeritaSection() {
  const [berita, setBerita] = useState<BeritaData[]>(defaultBerita);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedBerita, setSelectedBerita] = useState<BeritaData | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    fetch('/api/berita')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setBerita(data);
      })
      .catch(() => {});
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(berita.map((b) => b.category).filter(Boolean)));
    return ['Semua', ...cats];
  }, [berita]);

  const isSearching = search.trim().length > 0;

  const filteredBerita = useMemo(() => {
    let result = berita;
    if (isSearching) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          (b.category && b.category.toLowerCase().includes(q))
      );
    } else if (activeCategory !== 'Semua') {
      result = result.filter((b) => b.category === activeCategory);
    }
    return result;
  }, [berita, search, activeCategory, isSearching]);

  const featured = filteredBerita.find((b) => b.is_featured) || filteredBerita[0];
  const regulars = filteredBerita.filter((b) => b.id !== featured?.id).slice(0, 4);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const displayList = isSearching ? filteredBerita : (activeCategory !== 'Semua' ? filteredBerita.slice(0, 5) : filteredBerita.slice(0, 5));
  const displayFeatured = isSearching ? null : (activeCategory !== 'Semua' ? (filteredBerita.find((b) => b.is_featured) || filteredBerita[0]) : featured);
  const displayRegulars = isSearching
    ? filteredBerita
    : filteredBerita.filter((b) => b.id !== displayFeatured?.id).slice(0, 4);

  return (
    <section id="berita" className="relative py-20 sm:py-24 bg-navy/5" ref={sectionRef}>
      <div className="section-divider mb-16" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div

          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Berita Terkini
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        </div>

        {/* Search Bar */}
        <div

          className="mx-auto mb-6 max-w-md"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-10"
            />
            {search.length > 0 && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                aria-label="Hapus pencarian"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs — only shown when NOT searching */}
        {!isSearching && categories.length > 1 && (
          <div

            className="mx-auto mb-10 flex max-w-2xl flex-wrap items-center justify-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[var(--gold)] text-navy shadow-md shadow-[var(--gold)]/20'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Featured News — only when NOT searching */}
        {displayFeatured && !isSearching && (
          <div

            className="mb-8"
          >
            <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-[var(--gold)] animate-gradient-shift">
              <div className="glass-card group overflow-hidden rounded-2xl transition-shadow hover:shadow-xl hover:shadow-[var(--gold)]/10 lg:grid lg:grid-cols-2">
                {/* Thumbnail */}
                <div className={`relative h-64 bg-gradient-to-br ${gradientThumbnails[0]} lg:h-full`}>
                  <div className="flex h-full items-center justify-center">
                    <span className="text-4xl font-black text-white/10">FEATURED</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[var(--gold)] text-navy font-semibold">
                      Berita Utama
                    </Badge>
                  </div>
                </div>
                {/* Content */}
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <div className="mb-3 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(displayFeatured.created_at)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {displayFeatured.category}
                    </Badge>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">
                    {displayFeatured.title}
                  </h3>
                  <p className="mb-6 text-muted-foreground line-clamp-3">
                    {displayFeatured.content}
                  </p>
                  <Button
                    variant="ghost"
                    className="w-fit gap-2 text-[var(--gold)] hover:text-[var(--gold-light)] hover:bg-[var(--gold)]/10 group/btn cursor-pointer"
                    onClick={() => setSelectedBerita(displayFeatured)}
                  >
                    Baca Selengkapnya
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular News Grid */}
        
          <div
            key={`${search}-${activeCategory}`}


            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {(isSearching ? filteredBerita : displayRegulars).map((item, i) => (
              <div
                key={item.id}


                className="glass-card group cursor-pointer overflow-hidden rounded-2xl transition-shadow hover:shadow-xl"
                onClick={() => setSelectedBerita(item)}
              >
                {/* Thumbnail */}
                <div className={`relative h-40 bg-gradient-to-br ${gradientThumbnails[(i + 1) % gradientThumbnails.length]}`}>
                  <div className="absolute top-3 left-3">
                    <Badge
                      className={`text-xs ${categoryColors[item.category || 'Budaya'] || 'bg-gray-100 text-gray-800'}`}
                    >
                      {item.category || 'Umum'}
                    </Badge>
                  </div>
                  {/* Number badge */}
                  <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-navy/70 text-[10px] font-bold text-white/80 backdrop-blur-sm">
                    {isSearching ? i + 1 : i + 2}
                  </div>
                </div>
                {/* Content */}
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(item.created_at)}
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-sm font-bold text-foreground sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {item.content}
                  </p>
                  <p className="mt-2 text-xs font-medium text-[var(--gold)] group-hover:underline">
                    Selengkapnya →
                  </p>
                </div>
              </div>
            ))}
          </div>
        

        {/* No results */}
        {isSearching && filteredBerita.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <Search className="mx-auto mb-3 h-8 w-8 opacity-40" />
            <p>Tidak ada berita untuk &ldquo;{search}&rdquo;</p>
          </div>
        )}

        {/* Lihat Semua */}
        {!isSearching && (
          <div

            className="mt-10 text-center"
          >
            <Button
              variant="outline"
              className="border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-navy cursor-pointer"
              onClick={() => {
                const el = document.querySelector('#galeri');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Lihat Semua Berita
            </Button>
          </div>
        )}
      </div>

      {/* Berita Detail Dialog */}
      <Dialog open={!!selectedBerita} onOpenChange={() => setSelectedBerita(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-gradient-to-b from-[#0f1d35] to-[#0a1628] border-white/[0.08] p-0 gap-0 [&>button]:top-4 [&>button]:right-4 [&>button]:text-white/40 [&>button]:hover:text-white [&>button]:bg-white/5 [&>button]:hover:bg-white/10">
          {selectedBerita && (
            <>
              {/* Header image area */}
              <div className="relative h-48 sm:h-56 bg-gradient-to-br from-navy via-[#0f2240] to-[var(--gold)]/10 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6bTAtMzBWMkgydjJoMzR6TTIgMjJoMzR2LTJIMHYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
                {selectedBerita.thumbnail ? (
                  <img src={selectedBerita.thumbnail} alt={selectedBerita.title} className="h-full w-full object-cover opacity-60" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-6xl font-black text-white/[0.04]">BERITA</span>
                  </div>
                )}
                {/* Gradient fade to content */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a1628] to-transparent" />
                {/* Category badge */}
                <div className="absolute bottom-4 left-6">
                  <Badge className="bg-[var(--gold)] text-navy font-semibold text-xs px-3 py-1">
                    {selectedBerita.category || 'Umum'}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Date & author */}
                <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-white/40">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(selectedBerita.created_at)}
                  </span>
                  {selectedBerita.author && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>Oleh {selectedBerita.author}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-white sm:text-2xl leading-tight mb-6">
                  {selectedBerita.title}
                </h2>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent mb-6" />

                {/* Body */}
                <div className="text-sm text-white/70 leading-relaxed">
                  {selectedBerita.content}
                </div>

                {/* Footer */}
                <div className="mt-8 flex items-center justify-between">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] flex items-center justify-center">
                    <span className="text-xs font-black text-navy">NS</span>
                  </div>
                  <p className="text-[10px] text-white/20">Nagari Silongo</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}