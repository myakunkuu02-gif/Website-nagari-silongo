import { Clock3, Mail, MapPinned, Phone } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionTitle } from "@/components/site/SectionTitle";
import { KontakContent } from "@/types/site";
import { formatWhatsAppLink } from "@/utils/format";

export function ContactSection({ kontak }: { kontak: KontakContent }) {
  return (
    <section id="kontak" className="section-spacing border-t border-white/10">
      <div className="container-shell space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow="Kontak Resmi"
            title="Kanal komunikasi publik yang jelas, mudah dijangkau, dan terpercaya"
            description="Masyarakat dapat menghubungi Pemerintahan Nagari Silongo melalui alamat resmi, WhatsApp, email, dan peta digital yang terintegrasi."
          />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-4">
            {[
              { icon: MapPinned, title: "Alamat", value: `${kontak.alamat} • ${kontak.kode_pos}` },
              { icon: Phone, title: "WhatsApp", value: kontak.whatsapp ?? "Belum diatur", href: formatWhatsAppLink(kontak.whatsapp) },
              { icon: Mail, title: "Email", value: kontak.email ?? "Belum diatur", href: `mailto:${kontak.email ?? "silongo.digital@example.com"}` },
              { icon: Clock3, title: "Jam Pelayanan", value: kontak.jam_layanan ?? "Senin - Jumat, 08.00 - 16.00 WIB" },
            ].map((item, index) => {
              const Icon = item.icon;
              const content = (
                <div className="glass-panel card-hover rounded-[28px] p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#f0c86e]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{item.title}</p>
                      <p className="mt-3 text-sm leading-7 text-slate-200">{item.value}</p>
                    </div>
                  </div>
                </div>
              );

              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </Reveal>
              );
            })}
          </Reveal>
          <Reveal className="glass-panel overflow-hidden rounded-[32px] p-3">
            <div className="overflow-hidden rounded-[24px] border border-white/10">
              <iframe
                src={kontak.maps_embed ?? "https://www.google.com/maps?q=-0.8180,101.0537&z=13&output=embed"}
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Nagari Silongo"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
