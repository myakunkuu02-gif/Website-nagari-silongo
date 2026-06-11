"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Beranda", href: "/#beranda" },
  { label: "Profil", href: "/profil" },
  { label: "Pemerintahan", href: "/pemerintahan" },
  { label: "Statistik", href: "/statistik" },
  { label: "Wisata", href: "/wisata" },
  { label: "Berita", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
        <div
          className={cn(
            "container-shell flex items-center justify-between rounded-full border px-5 py-3 transition-all duration-300",
            scrolled ? "glass-panel border-white/12 shadow-[0_18px_50px_rgba(2,8,23,0.4)]" : "border-transparent bg-transparent"
          )}
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-lg font-bold text-[#f0c86e]">
              NS
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Portal Resmi</p>
              <p className="font-display text-2xl text-white">Nagari Silongo</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-200 transition hover:text-[#f0c86e]">
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="rounded-full border border-[#f0c86e]/30 bg-[#f0c86e]/12 px-4 py-2 text-sm font-semibold text-[#f4ddb1] transition hover:bg-[#f0c86e]/18"
            >
              Login Admin
            </Link>
          </nav>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white lg:hidden"
            aria-label="Buka menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-x-4 top-24 z-40 rounded-[28px] border border-white/12 bg-[#08111f]/92 p-5 shadow-[0_24px_80px_rgba(2,8,23,0.55)] backdrop-blur-2xl lg:hidden"
          >
            <div className="space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-white/10 hover:bg-white/6"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="/admin/login"
              onClick={() => setOpen(false)}
              className="mt-4 block rounded-2xl bg-[#f0c86e] px-4 py-3 text-center text-sm font-bold text-slate-950"
            >
              Login Admin
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
