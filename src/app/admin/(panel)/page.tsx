import { Newspaper, Sparkles, Users2, ImageIcon } from "lucide-react";
import { getHomeData } from "@/services/site-content";

export default async function AdminDashboardPage() {
  const data = await getHomeData();
  const cards = [
    { label: "Berita", value: data.berita.length, icon: Newspaper, color: "#67a8ff" },
    { label: "Galeri", value: data.galeri.length, icon: ImageIcon, color: "#f0c86e" },
    { label: "Pemerintahan", value: data.pemerintahan.length, icon: Users2, color: "#63c9a5" },
    { label: "Wisata", value: data.wisata.length, icon: Sparkles, color: "#f7df9c" },
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-panel rounded-[30px] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-slate-500">{label}</p>
                <p className="mt-4 text-4xl font-extrabold text-white">{value}</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10" style={{ color }}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className="glass-panel rounded-[32px] p-6 md:p-8">
        <h3 className="font-display text-4xl text-white">Ringkasan portal resmi</h3>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Hero Aktif</p>
            <p className="mt-4 font-display text-4xl text-white">{data.hero.title}</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{data.hero.slogan}</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Kontak Publik</p>
            <p className="mt-4 text-xl font-semibold text-white">{data.kontak.alamat}</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">WhatsApp: {data.kontak.whatsapp ?? "Belum diatur"}</p>
            <p className="text-sm leading-7 text-slate-300">Email: {data.kontak.email ?? "Belum diatur"}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
