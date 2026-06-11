'use client';
import { useInView } from '@/lib/animations';

import { useState, useEffect, useRef } from 'react';
import { User, Crown, Eye } from 'lucide-react';
import { PemerintahanData } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const defaultOfficials: PemerintahanData[] = [
  {
    id: '1', nama: 'Zulfi Amri', jabatan: 'Wali Nagari',
    deskripsi: 'Pemimpin tertinggi Nagari Silongo yang bertanggung jawab atas pemerintahan dan pembangunan nagari.',
    foto_url: null, urutan: 1, status_aktif: true, created_at: '', updated_at: '',
  },
  {
    id: '2', nama: 'Erwin Saputra', jabatan: 'Sekretaris Nagari',
    deskripsi: 'Mengelola administrasi pemerintahan nagari dan mengkoordinasikan kegiatan pemerintah.',
    foto_url: null, urutan: 2, status_aktif: true, created_at: '', updated_at: '',
  },
  {
    id: '3', nama: 'Darmawi', jabatan: 'Kepala Jorong Silongo',
    deskripsi: 'Pemimpin Jorong Silongo yang mengayomi masyarakat dan mengelola kegiatan adat.',
    foto_url: null, urutan: 3, status_aktif: true, created_at: '', updated_at: '',
  },
  {
    id: '4', nama: 'Rizki Ananda', jabatan: 'Kepala Jorong Tanjuang',
    deskripsi: 'Mengelola kegiatan dan pembangunan di Jorong Tanjuang.',
    foto_url: null, urutan: 4, status_aktif: true, created_at: '', updated_at: '',
  },
  {
    id: '5', nama: 'Firmansyah', jabatan: 'Kepala Jorong Muaro Pandan',
    deskripsi: 'Mengayomi masyarakat Jorong Muaro Pandan dalam kehidupan sehari-hari.',
    foto_url: null, urutan: 5, status_aktif: true, created_at: '', updated_at: '',
  },
  {
    id: '6', nama: 'Hendra Putra', jabatan: 'Bendahara Nagari',
    deskripsi: 'Bertanggung jawab atas pengelolaan keuangan dan aset nagari.',
    foto_url: null, urutan: 6, status_aktif: true, created_at: '', updated_at: '',
  },
];

export default function PemerintahanSection() {
  const [officials, setOfficials] = useState<PemerintahanData[]>(defaultOfficials);
  const [selected, setSelected] = useState<PemerintahanData | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    fetch('/api/pemerintahan')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setOfficials(data.sort((a: PemerintahanData, b: PemerintahanData) => a.urutan - b.urutan));
        }
      })
      .catch(() => {});
  }, []);

  const waliNagari = officials.find((o) => o.urutan === 1);
  const otherOfficials = officials.filter((o) => o.urutan !== 1);

  return (
    <section id="pemerintahan" className="relative py-20 sm:py-24 bg-navy/5" ref={sectionRef}>
      <div className="section-divider mb-16" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div

          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Pemerintahan Nagari
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Aparatur pemerintahan yang mengabdikan diri untuk kemajuan Nagari Silongo
          </p>
        </div>

        {/* Wali Nagari — Premium Card */}
        {waliNagari && (
          <div

            className="mb-10"
          >
            <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-[var(--gold)]">
              <div
                className="glass-card group cursor-pointer overflow-hidden rounded-2xl transition-shadow hover:shadow-2xl hover:shadow-[var(--gold)]/15 lg:grid lg:grid-cols-2"
                onClick={() => setSelected(waliNagari)}
              >
                {/* Avatar area */}
                <div className="relative h-64 sm:h-72 lg:h-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-br from-navy via-[#0f2240] to-navy">
                    <div className="flex h-full items-center justify-center">
                      {waliNagari.foto_url ? (
                        <img
                          src={waliNagari.foto_url}
                          alt={waliNagari.nama}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[var(--gold)]/15 ring-4 ring-[var(--gold)]/20">
                          <User className="h-14 w-14 text-[var(--gold)]/50" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-navy/80" />
                  {/* Crown icon */}
                  <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] shadow-lg shadow-[var(--gold)]/30">
                    <Crown className="h-5 w-5 text-navy" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--gold)]/15 px-4 py-1.5 text-sm font-bold text-[var(--gold)]">
                      <Crown className="h-3.5 w-3.5" />
                      Wali Nagari
                    </span>
                  </div>
                  <h3 className="mb-2 text-2xl font-extrabold text-foreground sm:text-3xl" style={{ color: 'var(--gold)' }}>
                    {waliNagari.nama}
                  </h3>
                  <p className="mb-5 text-muted-foreground leading-relaxed">
                    {waliNagari.deskripsi || 'Pemimpin Nagari Silongo yang berkomitmen untuk melayani masyarakat.'}
                  </p>
                  <div className="inline-flex w-fit items-center gap-2 text-sm font-medium text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye className="h-4 w-4" />
                    Lihat Profil Lengkap
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Officials — 3-column grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherOfficials.map((official, i) => (
            <div
              key={official.id}


              onClick={() => setSelected(official)}
              className="glass-card group cursor-pointer overflow-hidden rounded-2xl transition-all hover:shadow-xl hover:shadow-[var(--gold)]/10 hover:ring-1 hover:ring-[var(--gold)]/30"
            >
              <div className="relative">
                {/* Avatar area */}
                <div className="relative h-48 overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-br from-navy via-navy-light to-navy">
                    <div className="flex h-full items-center justify-center">
                      {official.foto_url ? (
                        <img
                          src={official.foto_url}
                          alt={official.nama}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--gold)]/10">
                          <User className="h-12 w-12 text-[var(--gold)]/40" />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                </div>

                {/* Info */}
                <div className="p-5">
                  <span className="mb-2 inline-block rounded-full bg-[var(--gold)]/10 px-3 py-1 text-xs font-semibold text-[var(--gold)]">
                    {official.jabatan}
                  </span>
                  <h3 className="mb-1 text-lg font-bold text-foreground">{official.nama}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {official.deskripsi || 'Aparatur Pemerintahan Nagari Silongo'}
                  </p>
                  {/* Hover: Lihat Profil */}
                  <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye className="h-3.5 w-3.5" />
                    Lihat Profil
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Dialog — Navy/Gold Theme */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto bg-gradient-to-b from-[#0f1d35] to-[#0a1628] border-white/[0.08] p-0 gap-0 [&>button]:top-4 [&>button]:right-4 [&>button]:text-white/40 [&>button]:hover:text-white [&>button]:bg-white/5 [&>button]:hover:bg-white/10">
          {selected && (
            <>
              {/* Header area with gradient */}
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-navy via-[#0f2240] to-[var(--gold)]/10 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6bTAtMzBWMkgydjJoMzR6TTIgMjJoMzR2LTJIMHYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

                {selected.urutan === 1 && (
                  <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] shadow-lg shadow-[var(--gold)]/30">
                    <Crown className="h-5 w-5 text-navy" />
                  </div>
                )}

                {/* Profile image centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {selected.foto_url ? (
                    <img
                      src={selected.foto_url}
                      alt={selected.nama}
                      className="h-28 w-28 rounded-full object-cover ring-4 ring-[var(--gold)]/30 shadow-xl"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[var(--gold)]/10 ring-4 ring-[var(--gold)]/20 shadow-xl">
                      <User className="h-14 w-14 text-[var(--gold)]/40" />
                    </div>
                  )}
                </div>

                {/* Gradient fade to content */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a1628] to-transparent" />
              </div>

              {/* Content */}
              <div className="px-6 pb-6 pt-2 sm:px-8 sm:pb-8">
                <DialogHeader className="sr-only">
                  <DialogTitle>{selected.nama}</DialogTitle>
                  <DialogDescription>{selected.jabatan}</DialogDescription>
                </DialogHeader>

                {/* Name & Position */}
                <div className="text-center">
                  {selected.urutan === 1 ? (
                    <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[var(--gold)]/15 px-4 py-1.5 text-xs font-bold text-[var(--gold)]">
                      <Crown className="h-3.5 w-3.5" />
                      {selected.jabatan}
                    </span>
                  ) : (
                    <span className="mb-2 inline-block rounded-full bg-[var(--gold)]/10 px-3 py-1 text-xs font-semibold text-[var(--gold)]">
                      {selected.jabatan}
                    </span>
                  )}
                  <h2 className={`text-2xl font-bold leading-tight ${selected.urutan === 1 ? 'text-[var(--gold)]' : 'text-white'} sm:text-3xl`}>
                    {selected.nama}
                  </h2>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />

                {/* Description */}
                <p className="text-center text-sm leading-relaxed text-white/70">
                  {selected.deskripsi || 'Aparatur Pemerintahan Nagari Silongo yang berkomitmen untuk melayani masyarakat.'}
                </p>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] flex items-center justify-center">
                    <span className="text-xs font-black text-navy">NS</span>
                  </div>
                  <p className="text-[10px] text-white/20">Pemerintahan Nagari Silongo</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}