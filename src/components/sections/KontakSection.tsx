'use client';
import { useInView } from '@/lib/animations';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { KontakData } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const defaultKontak: KontakData = {
  id: 'default',
  alamat: 'Nagari Silongo, Kecamatan Lubuk Tarok, Kabupaten Sijunjung, Sumatera Barat',
  kode_pos: '27553',
  phone: '+62 812 3456 7890',
  whatsapp: '+62 812 3456 7890',
  email: 'nagarisilongo@gmail.com',
  maps_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127773.1178511!2d100.7!3d-0.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwNDgnMDAuMCJTIDEwMMKwNDInMDAuMCJF!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
  jam_layanan: 'Senin - Jumat: 08.00 - 16.00 WIB',
  created_at: '',
  updated_at: '',
};

const contactCards = [
  { icon: <MapPin className="h-5 w-5" />, label: 'Alamat', key: 'alamat' as const },
  { icon: <Phone className="h-5 w-5" />, label: 'Telepon', key: 'phone' as const },
  { icon: <Mail className="h-5 w-5" />, label: 'Email', key: 'email' as const },
  { icon: <Clock className="h-5 w-5" />, label: 'Jam Layanan', key: 'jam_layanan' as const },
];

export default function KontakSection() {
  const [kontak, setKontak] = useState<KontakData>(defaultKontak);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const mapInView = useInView(mapRef, { once: true, margin: '-50px' });

  useEffect(() => {
    fetch('/api/kontak')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.alamat) setKontak(data);
      })
      .catch(() => {});
  }, []);

  const handleWhatsApp = () => {
    const phone = kontak.whatsapp?.replace(/[^0-9]/g, '') || '6281234567890';
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(data.message || 'Gagal mengirim pesan');
      }
    } catch {
      toast.error('Terjadi kesalahan saat mengirim pesan');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontak" className="relative py-20 sm:py-24 bg-navy/5" ref={sectionRef}>
      <div className="section-divider mb-16" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div

          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Hubungi Kami
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Silakan hubungi kami untuk informasi lebih lanjut tentang Nagari Silongo
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column: Contact Info Cards + WhatsApp CTA */}
          <div

            className="space-y-4"
          >
            {contactCards.map((card, i) => (
              <div
                key={card.label}


                className="glass-card flex items-start gap-4 rounded-xl p-5 transition-all hover:shadow-lg hover:border-[var(--gold)]/30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy text-[var(--gold)]">
                  {card.icon}
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-bold text-foreground">{card.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {(kontak[card.key] as string) || '-'}
                  </p>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <div

              className="pt-2"
            >
              <button
                onClick={handleWhatsApp}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all hover:bg-[#1da851] hover:shadow-xl hover:shadow-[#25D366]/35"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat via WhatsApp
              </button>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div

            className="glass-card overflow-hidden rounded-2xl p-6 sm:p-8"
          >
            <h3 className="mb-6 text-xl font-bold text-foreground sm:text-2xl">
              Kirim Pesan
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                  Nama Lengkap
                </Label>
                <Input
                  id="contact-name"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="glass-card border-border/50 bg-background/50 transition-colors focus:border-[var(--gold)]/50 focus:ring-[var(--gold)]/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="Masukkan alamat email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="glass-card border-border/50 bg-background/50 transition-colors focus:border-[var(--gold)]/50 focus:ring-[var(--gold)]/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-subject" className="text-sm font-medium text-foreground">
                  Subjek
                </Label>
                <Input
                  id="contact-subject"
                  type="text"
                  placeholder="Masukkan subjek pesan"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                  className="glass-card border-border/50 bg-background/50 transition-colors focus:border-[var(--gold)]/50 focus:ring-[var(--gold)]/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message" className="text-sm font-medium text-foreground">
                  Pesan
                </Label>
                <Textarea
                  id="contact-message"
                  placeholder="Tulis pesan Anda di sini..."
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="glass-card border-border/50 bg-background/50 resize-none transition-colors focus:border-[var(--gold)]/50 focus:ring-[var(--gold)]/20"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-navy to-navy-light text-[var(--gold)] hover:from-navy-light hover:to-navy hover:shadow-lg transition-all duration-300"
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
        </div>

        {/* Full-width Map Section */}
        <div
          ref={mapRef}

          className="mt-10 glass-card overflow-hidden rounded-2xl"
        >
          <div className="relative h-80 overflow-hidden">
            {kontak.maps_embed ? (
              <iframe
                src={kontak.maps_embed}
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Nagari Silongo"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-navy to-navy-light">
                <MapPin className="mb-3 h-16 w-16 text-[var(--gold)]/40" />
                <p className="text-lg font-semibold text-primary-foreground/60">
                  Nagari Silongo
                </p>
                <p className="mt-1 text-sm text-primary-foreground/40">
                  Kabupaten Sijunjung, Sumatera Barat
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}