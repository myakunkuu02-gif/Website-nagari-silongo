'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, ChevronDown, Shield } from 'lucide-react';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navItems = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Sambutan', href: '#sambutan' },
  { label: 'Profil', href: '#profil' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Pemerintahan', href: '#pemerintahan' },
  { label: 'Wisata', href: '#wisata' },
  { label: 'Berita', href: '#berita' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontak', href: '#kontak' },
  { label: 'Buku Tamu', href: '#buku-tamu' },
  { label: 'Pengaduan', href: '#pengaduan' },
];

const mobileNavItems = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Sambutan', href: '#sambutan' },
  { label: 'Profil', href: '#profil' },
  { label: 'Visi & Misi', href: '#visi-misi' },
  { label: 'Statistik', href: '#statistik' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Pemerintahan', href: '#pemerintahan' },
  { label: 'Wisata', href: '#wisata' },
  { label: 'Berita', href: '#berita' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontak', href: '#kontak' },
  { label: 'Buku Tamu', href: '#buku-tamu' },
  { label: 'Pengaduan', href: '#pengaduan' },
];

// Solid navy colors — no transparency, no theme dependency
const NAVY_DARK = 'rgb(13, 25, 52)';
const NAVY_MID = 'rgb(20, 35, 68)';
const NAVY_DEEP = 'rgb(10, 20, 42)';
const GOLD_BRIGHT = '#c9a43a';
const GOLD_LIGHT = '#e6d08f';
const GOLD_MID = 'rgba(201, 164, 58, 0.12)';
const GOLD_GLOW = 'rgba(201, 164, 58, 0.25)';

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Scroll listener for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const allIds = mobileNavItems.map((item) => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: '-40% 0px -55% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
    setMoreOpen(false);
  }, []);

  const handleLoginClick = () => {
    router.push('/admin/login');
    setMobileOpen(false);
  };

  // Desktop: show first 7 items, rest in "Lainnya" dropdown
  const primaryItems = navItems.slice(0, 7);
  const moreItems = navItems.slice(7);

  return (
    <header

      className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-500"
      style={{
        background: `linear-gradient(90deg, ${NAVY_DARK} 0%, ${NAVY_MID} 50%, ${NAVY_DARK} 100%)`,
        boxShadow: scrolled
          ? '0 4px 30px rgba(0,0,0,0.5), 0 1px 0 rgba(201,164,58,0.1)'
          : '0 2px 10px rgba(0,0,0,0.2)',
      }}
    >
      {/* Gold accent line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-500"
        style={{
          opacity: scrolled ? 1 : 0,
          background: `linear-gradient(90deg, transparent 0%, ${GOLD_BRIGHT} 30%, ${GOLD_LIGHT} 50%, ${GOLD_BRIGHT} 70%, transparent 100%)`,
        }}
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#beranda"
          onClick={(e) => handleNavClick(e, '#beranda')}
          className="flex items-center gap-3 group"
        >
          <div
            className="relative flex h-11 w-11 items-center justify-center rounded-xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${GOLD_BRIGHT} 0%, ${GOLD_LIGHT} 50%, ${GOLD_BRIGHT} 100%)`,
              boxShadow: '0 2px 12px rgba(212, 168, 67, 0.35)',
            }}
          >
            <span className="text-base font-black tracking-tight" style={{ color: NAVY_DARK }}>NS</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-sm font-bold tracking-wide" style={{ color: GOLD_BRIGHT }}>Nagari</span>
            <span className="ml-1.5 text-sm font-semibold text-white/90">Silongo</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 xl:flex">
          {primaryItems.map((item, i) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}

                className="relative rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-300 cursor-pointer"
                style={{
                  color: isActive ? GOLD_BRIGHT : 'rgba(255,255,255,0.7)',
                  background: isActive ? GOLD_MID : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget.style.color = '#ffffff');
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget.style.color = 'rgba(255,255,255,0.7)');
                }}
              >
                {item.label}
                {isActive && (
                  <div
                    className="absolute bottom-0.5 left-1/2 h-[2.5px] w-6 -translate-x-1/2 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${GOLD_BRIGHT}, ${GOLD_LIGHT})` }}
                  />
                )}
              </a>
            );
          })}

          {/* "Lainnya" dropdown */}
          <div ref={moreRef} className="relative ml-1">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-300 cursor-pointer"
              style={{
                color: moreItems.some((item) => activeSection === item.href.replace('#', ''))
                  ? GOLD_BRIGHT
                  : 'rgba(255,255,255,0.7)',
                background: moreItems.some((item) => activeSection === item.href.replace('#', ''))
                  ? GOLD_MID
                  : 'transparent',
              }}
            >
              Lainnya
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${moreOpen ? 'rotate-180' : ''}`} />
            </button>
            
              {moreOpen && (
                <div


                  className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-xl p-1.5"
                  style={{
                    background: `linear-gradient(180deg, ${NAVY_MID} 0%, ${NAVY_DEEP} 100%)`,
                    border: `1px solid ${GOLD_GLOW}`,
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,164,58,0.1)',
                  }}
                >
                  {moreItems.map((item) => {
                    const isActive = activeSection === item.href.replace('#', '');
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer"
                        style={{
                          color: isActive ? GOLD_BRIGHT : 'rgba(255,255,255,0.7)',
                          background: isActive
                            ? `linear-gradient(90deg, rgba(201, 164, 58, 0.15) 0%, transparent 100%)`
                            : 'transparent',
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            (e.currentTarget.style.color = '#ffffff');
                            (e.currentTarget.style.background = 'rgba(255,255,255,0.05)');
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            (e.currentTarget.style.color = 'rgba(255,255,255,0.7)');
                            (e.currentTarget.style.background = 'transparent');
                          }
                        }}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              )}
            
          </div>
        </div>

        {/* Right side — Desktop */}
        <div

          className="hidden items-center gap-3 xl:flex"
        >
          <ThemeToggle />
          <Button
            size="sm"
            className="gap-2 font-medium cursor-pointer text-[13px] px-4 py-2 rounded-lg transition-all duration-300 hover:opacity-90"
            style={{
              background: `linear-gradient(135deg, ${GOLD_BRIGHT} 0%, ${GOLD_LIGHT} 100%)`,
              color: NAVY_DARK,
              boxShadow: '0 2px 12px rgba(212, 168, 67, 0.3)',
            }}
            onClick={handleLoginClick}
          >
            <Shield className="w-3.5 h-3.5" />
            Login
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="xl:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 p-0"
              style={{
                background: `linear-gradient(180deg, ${NAVY_MID} 0%, ${NAVY_DEEP} 100%)`,
                borderLeft: `1px solid ${GOLD_GLOW}`,
                color: 'rgba(255,255,255,0.9)',
              }}
            >
              {/* Mobile header with gold accent */}
              <div className="px-6 pt-6 pb-4" style={{ borderBottom: `1px solid ${GOLD_GLOW}` }}>
                <SheetTitle className="text-left text-lg font-bold" style={{ color: GOLD_BRIGHT }}>Menu Navigasi</SheetTitle>
                <p className="text-white/40 text-xs mt-1">Nagari Silongo</p>
              </div>
              <div className="flex flex-col gap-0.5 px-3 pt-4 max-h-[calc(100vh-180px)] overflow-y-auto">
                {mobileNavItems.map((item, i) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}

                      className="rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer"
                      style={{
                        color: isActive ? GOLD_BRIGHT : 'rgba(255,255,255,0.6)',
                        background: isActive
                          ? `linear-gradient(90deg, rgba(201, 164, 58, 0.15) 0%, transparent 100%)`
                          : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          (e.currentTarget.style.color = '#ffffff');
                          (e.currentTarget.style.background = 'rgba(255,255,255,0.05)');
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          (e.currentTarget.style.color = 'rgba(255,255,255,0.6)');
                          (e.currentTarget.style.background = 'transparent');
                        }
                      }}
                    >
                      {item.label}
                    </a>
                  );
                })}
                <div className="mt-4 flex items-center gap-3 pt-4 px-2" style={{ borderTop: `1px solid rgba(201,164,58,0.12)` }}>
                  <ThemeToggle />
                  <Button
                    className="flex-1 gap-2 font-medium cursor-pointer hover:opacity-90"
                    style={{
                      background: `linear-gradient(135deg, ${GOLD_BRIGHT} 0%, ${GOLD_LIGHT} 100%)`,
                      color: NAVY_DARK,
                    }}
                    onClick={handleLoginClick}
                  >
                    <Shield className="w-4 h-4" />
                    Login Admin
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}