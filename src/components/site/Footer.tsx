import Link from "next/link";
import { Facebook, Instagram, MapPinned, Mail, Phone, Youtube } from "lucide-react";
import { FooterSettings, KontakContent } from "@/types/site";
import { formatWhatsAppLink } from "@/utils/format";

export function Footer({ footer, kontak }: { footer: FooterSettings; kontak: KontakContent }) {
  const socialLinks = [
    { href: footer.facebook, label: "Facebook", icon: Facebook },
    { href: footer.instagram, label: "Instagram", icon: Instagram },
    { href: footer.youtube, label: "YouTube", icon: Youtube },
  ].filter((item) => item.href);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(103,168,255,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
      <div className="container-shell relative grid gap-8 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-5">
          <span className="inline-flex rounded-full border border-[#f0c86e]/20 bg-[#f0c86e]/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#f0c86e]">
            Pemerintahan Digital Premium
          </span>
          <div>
            <h3 className="font-display text-4xl text-white">Nagari Silongo</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">{footer.footer_description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-slate-100 transition hover:border-[#f0c86e]/30 hover:text-[#f4ddb1]"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Quick Links</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-200">
            <Link href="/profil">Profil Nagari</Link>
            <Link href="/pemerintahan">Struktur Pemerintahan</Link>
            <Link href="/berita">Berita Resmi</Link>
            <Link href="/galeri">Galeri Nagari</Link>
            <Link href="/admin/login">Login Admin</Link>
          </div>
        </div>
        <div className="space-y-4 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Kontak Resmi</p>
          <div className="flex items-start gap-3">
            <MapPinned className="mt-1 h-4 w-4 text-[#63c9a5]" />
            <span>{kontak.alamat}</span>
          </div>
          <a className="flex items-center gap-3" href={formatWhatsAppLink(kontak.whatsapp)} target="_blank" rel="noreferrer">
            <Phone className="h-4 w-4 text-[#f0c86e]" />
            <span>{kontak.whatsapp ?? "-"}</span>
          </a>
          <a className="flex items-center gap-3" href={`mailto:${kontak.email ?? "silongo.digital@example.com"}`}>
            <Mail className="h-4 w-4 text-[#67a8ff]" />
            <span>{kontak.email ?? "silongo.digital@example.com"}</span>
          </a>
        </div>
      </div>
      <div className="container-shell mt-6 flex flex-col gap-3 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Pemerintahan Nagari Silongo. Seluruh hak cipta dilindungi.</span>
        <span>Lubuk Tarok • Sijunjung • Sumatera Barat</span>
      </div>
    </footer>
  );
}
