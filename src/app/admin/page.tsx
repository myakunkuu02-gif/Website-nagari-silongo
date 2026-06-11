'use client';

import { useEffect, useState } from 'react';
import {
  Newspaper,
  Users,
  Camera,
  MapPin,
  BarChart3,
  ExternalLink,
  ImageIcon,
  TrendingUp,
  Eye,
  Calendar,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import AuthGuard from '@/components/admin/AuthGuard';

interface DashboardStats {
  beritaCount: number;
  pemerintahanCount: number;
  galeriCount: number;
  wisataCount: number;
  statistikCount: number;
}

interface RecentBerita {
  id: string;
  title: string;
  category: string | null;
  created_at: string;
}

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

function DashboardContent() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBerita, setRecentBerita] = useState<RecentBerita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [beritaRes, pemRes, galeriRes, wisataRes, statistikRes] = await Promise.all([
          fetch('/api/berita?limit=5', { cache: 'no-store' }),
          fetch('/api/pemerintahan?all=true', { cache: 'no-store' }),
          fetch('/api/galeri', { cache: 'no-store' }),
          fetch('/api/wisata', { cache: 'no-store' }),
          fetch('/api/statistik', { cache: 'no-store' }),
        ]);

        const beritaData = await beritaRes.json();
        const pemData = await pemRes.json();
        const galeriData = await galeriRes.json();
        const wisataData = await wisataRes.json();
        const statistikData = await statistikRes.json();

        setRecentBerita(beritaData.data || []);
        setStats({
          beritaCount: beritaData.total || 0,
          pemerintahanCount: Array.isArray(pemData) ? pemData.length : 0,
          galeriCount: Array.isArray(galeriData) ? galeriData.length : 0,
          wisataCount: Array.isArray(wisataData) ? wisataData.length : 0,
          statistikCount: Array.isArray(statistikData) ? statistikData.length : 0,
        });
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    {
      label: 'Total Berita',
      value: stats?.beritaCount ?? 0,
      icon: <Newspaper className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
      href: '/admin/berita',
    },
    {
      label: 'Pejabat Pemerintahan',
      value: stats?.pemerintahanCount ?? 0,
      icon: <Users className="w-5 h-5" />,
      color: 'from-emerald-500 to-green-500',
      href: '/admin/pemerintahan',
    },
    {
      label: 'Foto Galeri',
      value: stats?.galeriCount ?? 0,
      icon: <Camera className="w-5 h-5" />,
      color: 'from-purple-500 to-violet-500',
      href: '/admin/galeri',
    },
    {
      label: 'Destinasi Wisata',
      value: stats?.wisataCount ?? 0,
      icon: <MapPin className="w-5 h-5" />,
      color: 'from-amber-500 to-orange-500',
      href: '/admin/wisata',
    },
    {
      label: 'Data Statistik',
      value: stats?.statistikCount ?? 0,
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'from-rose-500 to-pink-500',
      href: '/admin/statistik',
    },
  ];

  const quickActions = [
    { label: 'Kelola Berita', href: '/admin/berita', icon: <Newspaper className="w-4 h-4" /> },
    { label: 'Kelola Pemerintahan', href: '/admin/pemerintahan', icon: <Users className="w-4 h-4" /> },
    { label: 'Kelola Galeri', href: '/admin/galeri', icon: <Camera className="w-4 h-4" /> },
    { label: 'Kelola Hero', href: '/admin/hero', icon: <ImageIcon className="w-4 h-4" /> },
  ];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div


            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Ringkasan data website Nagari Silongo
              </p>
            </div>
            <Badge variant="secondary" className="w-fit px-3 py-1 text-xs bg-gold/10 text-gold border-gold/20 hover:bg-gold/20">
              <TrendingUp className="w-3 h-3 mr-1" />
              Aktif
            </Badge>
          </div>

          {/* Stats Cards */}
          <div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          >
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <Card key={i} className="border-border/30 shadow-sm">
                    <CardContent className="p-4">
                      <Skeleton className="h-16 w-full rounded-lg" />
                    </CardContent>
                  </Card>
                ))
              : statCards.map((card) => (
                  <div key={card.label} variants={fadeUp}>
                    <Card className="border-border/30 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg`}>
                              {card.icon}
                            </div>
                            <Eye className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-2xl font-bold text-foreground">{card.value}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{card.label}</p>
                        </div>
                        <div className="h-1 bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity" 
                             style={{ backgroundImage: `linear-gradient(to right, var(--color-chart-1), var(--color-gold))` }} />
                      </CardContent>
                    </Card>
                  </div>
                ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Berita */}
            <div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="lg:col-span-2"
            >
              <Card className="border-border/30 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <Newspaper className="w-4 h-4 text-gold" />
                      Berita Terbaru
                    </CardTitle>
                    <a
                      href="/admin/berita"
                      className="text-xs text-gold hover:underline flex items-center gap-1"
                    >
                      Lihat Semua
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {loading ? (
                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-14 w-full rounded-lg" />
                      ))}
                    </div>
                  ) : recentBerita.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground text-sm">
                      Belum ada berita
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {recentBerita.map((item, idx) => (
                        <div
                          key={item.id}

                          className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                              <span className="text-xs font-bold">{idx + 1}</span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate group-hover:text-gold transition-colors">
                                {item.title}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                {item.category && (
                                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                    {item.category}
                                  </Badge>
                                )}
                                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                  <Calendar className="w-2.5 h-2.5" />
                                  {formatDate(item.created_at)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              <Card className="border-border/30 shadow-sm h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-gold" />
                    Aksi Cepat
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {quickActions.map((action) => (
                      <a
                        key={action.href}
                        href={action.href}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 group border border-transparent hover:border-border/50"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {action.icon}
                        </div>
                        <span className="text-sm font-medium text-foreground group-hover:text-gold transition-colors">
                          {action.label}
                        </span>
                      </a>
                    ))}
                  </div>

                  {/* Info Card */}
                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-gold/5 border border-gold/10">
                    <p className="text-xs font-semibold text-foreground mb-1">Website Resmi</p>
                    <p className="text-xs text-muted-foreground">
                      Nagari Silongo, Kec. Lubuk Tarok, Kab. Sijunjung, Sumatera Barat
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}

export default function AdminDashboardPage() {
  return <DashboardContent />;
}
