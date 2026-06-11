'use client';

import { useState, useEffect } from 'react';
import { Facebook, Instagram, Youtube, ExternalLink, Eye, ArrowUp, Mail, Send } from 'lucide-react';
import { FooterData } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import WaveDivider from '@/components/layout/WaveDivider';

const defaultFooter: FooterData = {
  id: 'default',
  description: 'Website resmi Pemerintahan Nagari Silongo sebagai media informasi dan transparansi pelayanan publik.',
  facebook: 'https://facebook.com/nagarisilongo',
  instagram: 'https://instagram.com/nagarisilongo',
  youtube: 'https://youtube.com/@nagarisilongo',
  tiktok: 'https://tiktok.com/@nagarisilongo',
  created_at: '',
  updated_at: '',
};

const quickLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Profil Nagari', href: '#profil' },
  { label: 'Layanan Publik', href: '#layanan' },
  { label: 'Pemerintahan', href: '#pemerintahan' },
  { label: 'Wisata & Budaya', href: '#wisata' },
  { label: 'Berita', href: '#berita' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Pengaduan', href: '#pengaduan' },
];

const contactLinks = [
  { label: 'Nagari Silongo, Kec. Lubuk Tarok', href: '#' },
  { label: 'Kab. Sijunjung, Sumatera Barat', href: '#' },
  { label: 'Kode Pos: 27553', href: '#' },
];

const socialIcons: Record<string, React.ReactNode> = {
  facebook: <Facebook className="h-5 w-5" />,
  instagram: <Instagram className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
  tiktok: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.67a8.16 8.16 0 004.76 1.52V6.79a4.85 4.85 0 01-1-.1z" />
    </svg>
  ),
};

export default function Footer() {
  const [footer, setFooter] = useState<FooterData>(defaultFooter);
  const [email, setEmail] = useState('');
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/footer')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) setFooter(data);
      })
      .catch(() => {});

    fetch('/api/visitors')
      .then((res) => res.json())
      .then((data) => {
        if (data?.total) setVisitorCount(data.total);
      })
      .catch(() => {});
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success('Berhasil berlangganan!', {
      description: 'Anda akan menerima informasi terbaru dari Nagari Silongo.',
    });
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatCount = (n: number) => n.toLocaleString('id-ID');

  return (
    <footer className="relative overflow-hidden">
      {/* Wave divider above footer */}
      <WaveDivider variant="navy-gold" flip className="relative -mb-px" />

      {/* Main footer */}
      <div className="bg-gradient-to-b from-navy to-[#0a1128]">
        {/* Decorative corner dots - top left */}
        <div className="absolute left-6 top-8 hidden lg:block">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-[var(--gold)]/15" />
            ))}
          </div>
        </div>

        {/* Decorative corner dots - top right */}
        <div className="absolute right-6 top-8 hidden lg:block">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-[var(--gold)]/15" />
            ))}
          </div>
        </div>

        {/* Top gold divider line */}
        <div className="section-divider" />

        {/* Newsletter section */}
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-2 sm:px-6 lg:px-8">
          <div
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/[0.06] px-4 py-1.5">
              <Mail className="h-4 w-4 text-[var(--gold)]" />
              <span className="text-xs font-medium uppercase tracking-wider text-[var(--gold)]">
                Newsletter
              </span>
            </div>
            <h4 className="mb-2 text-lg font-bold text-primary-foreground sm:text-xl">
              Berlangganan Informasi
            </h4>
            <p className="mb-5 text-sm text-primary-foreground/50">
              Dapatkan informasi terbaru langsung ke email Anda
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <Input
                type="email"
                placeholder="Masukkan alamat email Anda..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 w-full max-w-sm border-white/10 bg-white/[0.06] text-primary-foreground placeholder:text-primary-foreground/30 focus-visible:ring-[var(--gold)]/50 sm:w-auto"
              />
              <Button
                type="submit"
                className="h-11 bg-[var(--gold)] px-6 font-semibold text-navy hover:bg-[var(--gold-light)]"
              >
                <Send className="mr-2 h-4 w-4" />
                Berlangganan
              </Button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto my-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Main grid */}
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div
              className="lg:col-span-1"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)]">
                  <span className="text-lg font-black text-navy">NS</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-[var(--gold)]">Nagari</span>
                  <span className="ml-1 text-sm font-semibold text-primary-foreground">Silongo</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-primary-foreground/60">
                {footer.description}
              </p>
            </div>

            {/* Quick Links */}
            <div
            >
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--gold)]">
                Tautan Cepat
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="flex items-center gap-2 text-sm text-primary-foreground/60 transition-colors hover:text-[var(--gold)] hover-underline-gold"
                    >
                      <ExternalLink className="h-3 w-3 shrink-0" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontak */}
            <div
            >
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--gold)]">
                Kontak
              </h4>
              <ul className="space-y-2">
                {contactLinks.map((link, i) => (
                  <li key={i}>
                    <span className="text-sm text-primary-foreground/60">{link.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div
            >
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--gold)]">
                Media Sosial
              </h4>
              <div className="flex flex-wrap gap-3">
                {Object.entries(socialIcons).map(([platform, icon]) => {
                  const url = footer[platform as keyof FooterData] as string | null;
                  return (
                    <a
                      key={platform}
                      href={url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-primary-foreground/60 transition-colors hover:bg-[var(--gold)] hover:text-navy"
                      aria-label={platform}
                    >
                      {icon}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright / Bottom bar */}
        <div className="border-t border-white/5">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <p className="text-center text-xs text-primary-foreground/40 sm:text-left">
                &copy; {new Date().getFullYear()} Pemerintahan Nagari Silongo. Hak Cipta Dilindungi.
              </p>
              {visitorCount !== null && (
                <div className="flex items-center gap-1.5 text-xs text-primary-foreground/30">
                  <Eye className="h-3 w-3" />
                  <span>Total Pengunjung: {formatCount(visitorCount)}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <p className="hidden text-xs text-primary-foreground/30 sm:block">
                Kecamatan Lubuk Tarok, Kabupaten Sijunjung
              </p>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 text-xs text-primary-foreground/40 transition-colors hover:text-[var(--gold)]"
                aria-label="Kembali ke Atas"
              >
                <ArrowUp className="h-3.5 w-3.5" />
                <span>Kembali ke Atas</span>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative corner dots - bottom left */}
        <div className="absolute bottom-6 left-6 hidden lg:block">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-[var(--gold)]/10" />
            ))}
          </div>
        </div>

        {/* Decorative corner dots - bottom right */}
        <div className="absolute bottom-6 right-6 hidden lg:block">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-[var(--gold)]/10" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}