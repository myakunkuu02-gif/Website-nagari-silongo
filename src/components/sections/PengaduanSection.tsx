'use client';
import { useInView } from '@/lib/animations';

import { useState, useRef, FormEvent } from 'react';
import { AlertTriangle, Send, Loader2, CheckCircle2, ChevronDown, MessageSquareWarning } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const kategoriOptions = [
  { value: 'Infrastruktur', label: 'Infrastruktur', color: 'from-orange-500/10 to-orange-500/5 border-orange-500/20 text-orange-600' },
  { value: 'Pelayanan Publik', label: 'Pelayanan Publik', color: 'from-blue-500/10 to-blue-500/5 border-blue-500/20 text-blue-600' },
  { value: 'Sosial', label: 'Sosial', color: 'from-pink-500/10 to-pink-500/5 border-pink-500/20 text-pink-600' },
  { value: 'Kebersihan', label: 'Kebersihan', color: 'from-green-500/10 to-green-500/5 border-green-500/20 text-green-600' },
  { value: 'Keamanan', label: 'Keamanan', color: 'from-red-500/10 to-red-500/5 border-red-500/20 text-red-600' },
  { value: 'Umum', label: 'Umum', color: 'from-gray-500/10 to-gray-500/5 border-gray-500/20 text-gray-600' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function PengaduanSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showKategori, setShowKategori] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    kategori: 'Umum',
    judul: '',
    pesan: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/pengaduan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setSubmitted(true);
        setFormData({ nama: '', email: '', telepon: '', kategori: 'Umum', judul: '', pesan: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        toast.error(data.error || 'Gagal mengirim pengaduan');
      }
    } catch {
      toast.error('Terjadi kesalahan saat mengirim pengaduan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedKategori = kategoriOptions.find((k) => k.value === formData.kategori);

  return (
    <section id="pengaduan" className="relative py-20 sm:py-24 overflow-hidden" ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, oklch(0.97 0.005 250) 0%, oklch(0.96 0.01 250) 100%)',
      }}
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pengaduan-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="oklch(0.50 0.05 25)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pengaduan-dots)" />
        </svg>
      </div>

      <div className="section-divider mb-16" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div

          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.06] px-4 py-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
            <span className="text-xs font-medium uppercase tracking-wider text-red-500">
              Layanan Pengaduan
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Pengaduan Masyarakat
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-red-400 to-transparent" />
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Sampaikan aspirasi, keluhan, atau saran Anda untuk pembangunan Nagari Silongo yang lebih baik
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left: Info panel */}
          <div

            className="lg:col-span-2 space-y-6"
          >
            {/* How it works */}
            <div className="rounded-2xl p-6 sm:p-8"
              style={{
                background: 'linear-gradient(135deg, oklch(0.25 0.08 260) 0%, oklch(0.22 0.07 260) 100%)',
                border: '1px solid oklch(0.78 0.15 85 / 0.1)',
              }}
            >
              <h3 className="mb-4 text-lg font-bold text-white">Cara Mengadu</h3>
              <div className="space-y-4">
                {[
                  { step: '1', text: 'Isi formulir pengaduan dengan data lengkap' },
                  { step: '2', text: 'Pilih kategori yang sesuai' },
                  { step: '3', text: 'Tim nagari akan menindaklanjuti dalam 3-7 hari kerja' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      style={{
                        background: 'linear-gradient(135deg, oklch(0.78 0.15 85), oklch(0.88 0.08 85))',
                        color: 'oklch(0.22 0.08 260)',
                      }}
                    >
                      {item.step}
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed pt-1">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kategori grid */}
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground/60">
                Kategori Pengaduan
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {kategoriOptions.map((kat) => (
                  <div
                    key={kat.value}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                      formData.kategori === kat.value
                        ? kat.color
                        : 'border-transparent bg-muted/30 text-muted-foreground'
                    }`}
                  >
                    <div className={`h-2 w-2 rounded-full ${
                      formData.kategori === kat.value ? 'bg-current' : 'bg-muted-foreground/30'
                    }`} />
                    {kat.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            variants={containerVariants}
            initial="hidden"

            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-border/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm sm:p-8 dark:bg-card/80">
              
                {submitted ? (
                  <div
                    key="success"


                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-foreground">Pengaduan Terkirim!</h3>
                    <p className="max-w-sm text-sm text-muted-foreground">
                      Terima kasih atas pengaduan Anda. Tim kami akan segera menindaklanjuti.
                    </p>
                  </div>
                ) : (
                  <form
                    key="form"
                    variants={containerVariants}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div variants={itemVariants} className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="pengaduan-nama" className="text-sm font-medium text-foreground">
                          Nama Lengkap <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="pengaduan-nama"
                          type="text"
                          placeholder="Masukkan nama lengkap"
                          required
                          value={formData.nama}
                          onChange={(e) => setFormData((p) => ({ ...p, nama: e.target.value }))}
                          className="transition-colors focus:border-[var(--gold)]/50 focus:ring-[var(--gold)]/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pengaduan-telepon" className="text-sm font-medium text-foreground">
                          No. Telepon
                        </Label>
                        <Input
                          id="pengaduan-telepon"
                          type="tel"
                          placeholder="08xxxxxxxxxx"
                          value={formData.telepon}
                          onChange={(e) => setFormData((p) => ({ ...p, telepon: e.target.value }))}
                          className="transition-colors focus:border-[var(--gold)]/50 focus:ring-[var(--gold)]/20"
                        />
                      </div>
                    </div>

                    <div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="pengaduan-email" className="text-sm font-medium text-foreground">
                        Email
                      </Label>
                      <Input
                        id="pengaduan-email"
                        type="email"
                        placeholder="email@contoh.com"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        className="transition-colors focus:border-[var(--gold)]/50 focus:ring-[var(--gold)]/20"
                      />
                    </div>

                    <div variants={itemVariants} className="relative space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Kategori <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowKategori(!showKategori)}
                          className="flex w-full items-center justify-between rounded-lg border border-border/50 bg-background/50 px-4 py-2.5 text-sm text-foreground transition-colors hover:border-[var(--gold)]/30 focus:border-[var(--gold)]/50 focus:ring-[var(--gold)]/20"
                        >
                          <div className="flex items-center gap-2">
                            <MessageSquareWarning className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedKategori?.label}</span>
                          </div>
                          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${showKategori ? 'rotate-180' : ''}`} />
                        </button>
                        
                          {showKategori && (
                            <div


                              className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-border/50 bg-white p-1.5 shadow-xl dark:bg-card"
                            >
                              {kategoriOptions.map((kat) => (
                                <button
                                  key={kat.value}
                                  type="button"
                                  onClick={() => {
                                    setFormData((p) => ({ ...p, kategori: kat.value }));
                                    setShowKategori(false);
                                  }}
                                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                    formData.kategori === kat.value
                                      ? 'bg-[var(--gold)]/10 text-[var(--gold)] font-medium'
                                      : 'text-foreground hover:bg-muted'
                                  }`}
                                >
                                  {kat.label}
                                </button>
                              ))}
                            </div>
                          )}
                        
                      </div>
                    </div>

                    <div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="pengaduan-judul" className="text-sm font-medium text-foreground">
                        Judul Pengaduan <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="pengaduan-judul"
                        type="text"
                        placeholder="Ringkasan singkat pengaduan Anda"
                        required
                        value={formData.judul}
                        onChange={(e) => setFormData((p) => ({ ...p, judul: e.target.value }))}
                        className="transition-colors focus:border-[var(--gold)]/50 focus:ring-[var(--gold)]/20"
                      />
                    </div>

                    <div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="pengaduan-pesan" className="text-sm font-medium text-foreground">
                        Detail Pengaduan <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="pengaduan-pesan"
                        placeholder="Jelaskan pengaduan Anda secara detail, termasuk lokasi, waktu kejadian, dan informasi lain yang relevan..."
                        required
                        rows={5}
                        value={formData.pesan}
                        onChange={(e) => setFormData((p) => ({ ...p, pesan: e.target.value }))}
                        className="resize-none transition-colors focus:border-[var(--gold)]/50 focus:ring-[var(--gold)]/20"
                      />
                      <p className="text-xs text-muted-foreground">
                        Minimal 10 karakter. Pengaduan bersifat anonim dan akan ditindaklanjuti oleh tim nagari.
                      </p>
                    </div>

                    <div variants={itemVariants}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/20 transition-all duration-300 cursor-pointer font-semibold"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Mengirim Pengaduan...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Kirim Pengaduan
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}