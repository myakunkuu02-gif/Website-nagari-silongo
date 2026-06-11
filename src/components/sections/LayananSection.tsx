'use client';
import { useInView } from '@/lib/animations';

import { useRef, useState, useEffect } from 'react';
import {
  FileText,
  UserPlus,
  Building,
  Scale,
  Heart,
  GraduationCap,
  Shield,
  Landmark,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ClipboardList,
  Briefcase,
  Users,
  Home,
  FileCheck,
  FilePlus,
  FileSearch,
  Gavel,
  BookOpen,
  HandHelping,
  CircleDollarSign,
  Truck,
  Droplets,
  Flame,
  Baby,
  Syringe,
  Stethoscope,
  Hammer,
  Wrench,
  Megaphone,
  Scroll,
  School,
  Church,
  Mountain,
  Trees,
  Palette,
  Music,
  Camera,
  UtensilsCrossed,
  Store,
  ShoppingBag,
  CreditCard,
  Receipt,
  Calculator,
  PieChart,
  BarChart3,
  TrendingUp,
  Globe,
  Wifi,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Star,
  Award,
  Medal,
  Flag,
  Lock,
  Key,
  Eye,
  EyeOff,
  Bell,
  Settings,
  Sliders,
  Filter,
  Search,
  Plus,
  Minus,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  ExternalLink,
  Download,
  Upload,
  Share2,
  Printer,
  Copy,
  Edit,
  Trash2,
  MoreVertical,
  MoreHorizontal,
  Menu,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const iconMap: Record<string, LucideIcon> = {
  FileText,
  UserPlus,
  Building,
  Scale,
  Heart,
  GraduationCap,
  Shield,
  Landmark,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ClipboardList,
  Briefcase,
  Users,
  Home,
  FileCheck,
  FilePlus,
  FileSearch,
  Gavel,
  BookOpen,
  HandHelping,
  CircleDollarSign,
  Truck,
  Droplets,
  Flame,
  Baby,
  Syringe,
  Stethoscope,
  Hammer,
  Wrench,
  Megaphone,
  Scroll,
  School,
  Church,
  Mountain,
  Trees,
  Palette,
  Music,
  Camera,
  UtensilsCrossed,
  Store,
  ShoppingBag,
  CreditCard,
  Receipt,
  Calculator,
  PieChart,
  BarChart3,
  TrendingUp,
  Globe,
  Wifi,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Star,
  Award,
  Medal,
  Flag,
  Lock,
  Key,
  Eye,
  EyeOff,
  Bell,
  Settings,
  Sliders,
  Filter,
  Search,
  Plus,
  Minus,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  ExternalLink,
  Download,
  Upload,
  Share2,
  Printer,
  Copy,
  Edit,
  Trash2,
  MoreVertical,
  MoreHorizontal,
  Menu,
};

interface LayananItem {
  id: string;
  nama: string;
  deskripsi: string;
  icon: string;
  tag: string | null;
  urutan: number;
  aktif: boolean;
}

export default function LayananSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [items, setItems] = useState<LayananItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLayanan() {
      try {
        const res = await fetch('/api/layanan', { cache: 'no-store' });
        const data: LayananItem[] = await res.json();
        const activeItems = data
          .filter((item) => item.aktif)
          .sort((a, b) => a.urutan - b.urutan);
        setItems(activeItems);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchLayanan();
  }, []);

  return (
    <section id="layanan" className="relative py-20 sm:py-24" ref={sectionRef}>
      <div className="section-divider mb-16" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/[0.06] px-4 py-1.5">
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--gold)]">
              Pelayanan Masyarakat
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Layanan Publik
          </h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Layanan administrasi dan informasi yang tersedia untuk masyarakat Nagari Silongo
          </p>
        </div>

        {/* Loading State — 4 Skeleton Cards */}
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl p-5 bg-white/85 dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] sm:p-6"
                style={{
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <Skeleton className="mb-4 h-14 w-14 rounded-2xl" />
                  <Skeleton className="mb-2 h-4 w-24 rounded" />
                  <Skeleton className="mb-1 h-3 w-full rounded" />
                  <Skeleton className="h-3 w-3/4 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && items.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <p className="text-lg">Belum ada layanan.</p>
          </div>
        )}

        {/* Service Cards Grid */}
        {!loading && items.length > 0 && (
          <div
            className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
          >
            {items.map((item) => {
              const Icon = iconMap[item.icon] || FileText;
              return (
                <div
                  key={item.id}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl p-5 bg-white/85 dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] transition-all duration-300 sm:p-6"
                  style={{
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  }}
                >
                  {/* Hover gold border glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      boxShadow: '0 0 0 1.5px oklch(0.78 0.15 85 / 0.4), 0 8px 30px rgba(212, 168, 67, 0.12)',
                    }}
                  />

                  {/* Hover gradient overlay from top-left */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(135deg, oklch(0.78 0.15 85 / 0.06) 0%, transparent 60%)',
                    }}
                  />

                  {/* Tag badge */}
                  {item.tag && (
                    <div className="absolute top-3 right-3">
                      <span
                        className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          background: 'linear-gradient(135deg, oklch(0.78 0.15 85 / 0.15) 0%, oklch(0.78 0.15 85 / 0.08) 100%)',
                          color: 'oklch(0.55 0.12 85)',
                          border: '1px solid oklch(0.78 0.15 85 / 0.15)',
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon */}
                    <div
                      className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, oklch(0.25 0.08 260 / 0.06) 0%, oklch(0.25 0.08 260 / 0.03) 100%)',
                        color: 'oklch(0.35 0.12 260)',
                      }}
                    >
                      <Icon className="h-6 w-6 transition-colors duration-300 group-hover:text-[var(--gold)]" />
                    </div>

                    {/* Service Name */}
                    <h3 className="mb-2 text-sm font-bold leading-tight text-foreground sm:text-base">
                      {item.nama}
                    </h3>

                    {/* Description */}
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {item.deskripsi}
                    </p>

                    {/* "Layani" hover CTA */}
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-transparent transition-all duration-300 group-hover:text-[var(--gold)]">
                      <span>Pelajari</span>
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
