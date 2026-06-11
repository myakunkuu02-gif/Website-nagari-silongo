import Link from "next/link";
import { BarChart3, Building2, GalleryVertical, Home, ImageIcon, Landmark, LayoutDashboard, Mail, Mountain, Newspaper, Sparkles, Target, Users2 } from "lucide-react";
import { LogoutButton } from "@/components/admin/LogoutButton";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero", icon: Home },
  { href: "/admin/profil", label: "Profil", icon: Landmark },
  { href: "/admin/visi-misi", label: "Visi Misi", icon: Target },
  { href: "/admin/statistik", label: "Statistik", icon: BarChart3 },
  { href: "/admin/pemerintahan", label: "Pemerintahan", icon: Users2 },
  { href: "/admin/wisata", label: "Wisata", icon: Mountain },
  { href: "/admin/berita", label: "Berita", icon: Newspaper },
  { href: "/admin/galeri", label: "Galeri", icon: GalleryVertical },
  { href: "/admin/kontak", label: "Kontak", icon: Mail },
  { href: "/admin/footer", label: "Footer", icon: ImageIcon },
];

export function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#07111f_0%,#091525_55%,#07111f_100%)]">
      <div className="container-shell grid gap-6 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="glass-panel h-fit rounded-[32px] p-6 lg:sticky lg:top-6">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-[#f0c86e]">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">CMS Premium</p>
              <h1 className="font-display text-3xl text-white">Nagari Silongo</h1>
            </div>
          </div>
          <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Login Sebagai</p>
            <p className="mt-2 font-semibold text-white">{userEmail}</p>
          </div>
          <nav className="mt-6 space-y-2">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-white/10 hover:bg-white/6 hover:text-white"
              >
                <Icon className="h-4 w-4 text-[#67a8ff]" />
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 p-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Status</p>
              <p className="mt-2 text-sm font-semibold text-[#7ad7b5]">Online dan terlindungi</p>
            </div>
            <Sparkles className="h-5 w-5 text-[#f0c86e]" />
          </div>
        </aside>
        <div className="space-y-6">
          <div className="glass-panel flex flex-col gap-4 rounded-[32px] p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Admin Dashboard</p>
              <h2 className="font-display text-4xl text-white">Kelola konten website secara real-time</h2>
            </div>
            <LogoutButton />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
