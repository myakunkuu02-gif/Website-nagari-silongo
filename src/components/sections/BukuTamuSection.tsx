'use client';
import { useInView } from '@/lib/animations';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { Send, Loader2, BookOpen, MessageSquareQuote } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface BukuTamuEntry {
  id: string;
  nama: string;
  email: string | null;
  pesan: string;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

function formatTimeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMinutes < 1) return 'Baru saja';
  if (diffMinutes < 60) return `${diffMinutes} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays < 7) return `${diffDays} hari yang lalu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan yang lalu`;
  return `${Math.floor(diffDays / 365)} tahun yang lalu`;
}

export default function BukuTamuSection() {
  const [entries, setEntries] = useState<BukuTamuEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ nama: '', email: '', pesan: '' });
  const [errors, setErrors] = useState<{ nama?: string; pesan?: string; email?: string }>({});

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    fetch('/api/buku-tamu')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEntries(data.slice(0, 10));
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const validate = () => {
    const newErrors: { nama?: string; pesan?: string; email?: string } = {};
    if (!formData.nama.trim() || formData.nama.trim().length < 2) {
      newErrors.nama = 'Nama wajib diisi (minimal 2 karakter)';
    }
    if (!formData.pesan.trim() || formData.pesan.trim().length < 5) {
      newErrors.pesan = 'Pesan wajib diisi (minimal 5 karakter)';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Format email tidak valid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/buku-tamu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newEntry = await res.json();
        toast.success('Pesan berhasil dikirim!');
        setFormData({ nama: '', email: '', pesan: '' });
        setErrors({});
        // Prepend the new entry to the list
        setEntries((prev) => [newEntry, ...prev].slice(0, 10));
      } else {
        const data = await res.json();
        toast.error(data.error || 'Gagal mengirim pesan');
      }
    } catch {
      toast.error('Terjadi kesalahan saat mengirim pesan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayEntries = entries.slice(0, 10);

  return (
    <section id="buku-tamu" className="relative py-20 px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <div

          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/20 bg-[var(--gold-light)]/10 px-4 py-1.5">
            <BookOpen className="h-4 w-4 text-[var(--gold)]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">
              Buku Tamu
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Buku Tamu
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Tinggalkan pesan dan kesan Anda tentang Nagari Silongo
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column: Form */}
          <div

            className="glass-card overflow-hidden rounded-2xl p-6 sm:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--gold-light)]/10 text-[var(--gold)]">
                <MessageSquareQuote className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                  Tulis Pesan
                </h3>
                <p className="text-sm text-muted-foreground">
                  Bagikan pengalaman Anda
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="bt-nama" className="text-sm font-medium text-foreground">
                  Nama <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bt-nama"
                  type="text"
                  placeholder="Masukkan nama Anda"
                  value={formData.nama}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, nama: e.target.value }));
                    if (errors.nama) setErrors((prev) => ({ ...prev, nama: undefined }));
                  }}
                  className="glass-card border-border/50 bg-background/50 transition-colors focus:border-[var(--gold)]/50 focus:ring-[var(--gold)]/20"
                />
                {errors.nama && (
                  <p className="text-sm text-red-500">{errors.nama}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bt-email" className="text-sm font-medium text-foreground">
                  Email <span className="text-xs text-muted-foreground">(opsional)</span>
                </Label>
                <Input
                  id="bt-email"
                  type="email"
                  placeholder="Masukkan alamat email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className="glass-card border-border/50 bg-background/50 transition-colors focus:border-[var(--gold)]/50 focus:ring-[var(--gold)]/20"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bt-pesan" className="text-sm font-medium text-foreground">
                  Pesan <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="bt-pesan"
                  placeholder="Tulis pesan dan kesan Anda tentang Nagari Silongo..."
                  rows={5}
                  value={formData.pesan}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, pesan: e.target.value }));
                    if (errors.pesan) setErrors((prev) => ({ ...prev, pesan: undefined }));
                  }}
                  className="glass-card border-border/50 bg-background/50 resize-none transition-colors focus:border-[var(--gold)]/50 focus:ring-[var(--gold)]/20"
                />
                {errors.pesan && (
                  <p className="text-sm text-red-500">{errors.pesan}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-navy font-semibold hover:shadow-lg hover:shadow-[var(--gold)]/25 transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Kirim Pesan
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Right Column: Entries */}
          <div

            className="glass-card overflow-hidden rounded-2xl p-6 sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--gold-light)]/10 text-[var(--gold)]">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                    Pesan Terbaru
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {displayEntries.length} pesan dari tamu
                  </p>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-xl bg-background/50 p-4 animate-pulse">
                    <div className="h-4 w-32 rounded bg-muted mb-2" />
                    <div className="h-3 w-20 rounded bg-muted mb-3" />
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-3/4 rounded bg-muted mt-2" />
                  </div>
                ))}
              </div>
            ) : displayEntries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gold-light)]/10">
                  <MessageSquareQuote className="h-8 w-8 text-[var(--gold)]/40" />
                </div>
                <p className="text-lg font-medium text-muted-foreground">
                  Belum ada pesan
                </p>
                <p className="mt-1 text-sm text-muted-foreground/70">
                  Jadilah yang pertama menulis pesan!
                </p>
              </div>
            ) : (
              <div className="max-h-[480px] overflow-y-auto space-y-3 pr-1 buku-tamu-scroll">
                
                  {displayEntries.map((entry, index) => (
                    <div
                      key={entry.id}
                      layout


                      className={`rounded-xl p-4 transition-colors ${
                        index % 2 === 0
                          ? 'bg-[var(--gold-light)]/5 border border-[var(--gold)]/5'
                          : 'bg-background/50 border border-border/30'
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] text-navy text-xs font-bold">
                            {entry.nama.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-foreground text-sm">
                            {entry.nama}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {formatTimeAgo(entry.created_at)}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/80 pl-10">
                        {entry.pesan}
                      </p>
                    </div>
                  ))}
                
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .buku-tamu-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .buku-tamu-scroll::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 3px;
        }
        .buku-tamu-scroll::-webkit-scrollbar-thumb {
          background: var(--gold);
          border-radius: 3px;
          opacity: 0.4;
        }
        .buku-tamu-scroll::-webkit-scrollbar-thumb:hover {
          opacity: 0.6;
        }
        .buku-tamu-scroll {
          scrollbar-width: thin;
          scrollbar-color: var(--gold) transparent;
        }
      `}</style>
    </section>
  );
}