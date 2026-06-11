'use client';

import { useEffect, useState, useCallback } from 'react';
import { ImageIcon, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/components/admin/AdminLayout';
import AuthGuard from '@/components/admin/AuthGuard';
import ImageUploader from '@/components/admin/ImageUploader';
import { toast } from 'sonner';
import type { HeroData } from '@/types';

function HeroContent() {
  const [hero, setHero] = useState<Partial<HeroData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchHero = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/hero', { cache: 'no-store' });
      const data = await res.json();
      setHero(data || null);
    } catch {
      toast.error('Gagal memuat data Hero');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHero();
  }, [fetchHero]);

  const handleSave = async () => {
    if (!hero?.title?.trim()) {
      toast.error('Judul Hero wajib diisi');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/hero', {
        cache: 'no-store',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hero),
      });
      if (res.ok) {
        toast.success('Data Hero berhasil disimpan');
        fetchHero();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Gagal menyimpan data Hero');
      }
    } catch {
      toast.error('Terjadi kesalahan koneksi');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div


          >
            <h1 className="text-2xl font-bold text-foreground">Kelola Hero</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Atur tampilan section hero di halaman utama
            </p>
          </div>

          {/* Form */}
          <div

            className="rounded-xl border border-border/30 shadow-sm p-6 bg-card"
          >
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
              <ImageIcon className="w-5 h-5 text-gold" />
              Section Hero
            </h2>

            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero-badge">Badge</Label>
                    <Input
                      id="hero-badge"
                      value={hero?.badge || ''}
                      onChange={(e) => setHero((prev) => prev ? { ...prev, badge: e.target.value } : null)}
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-title">Judul *</Label>
                    <Input
                      id="hero-title"
                      value={hero?.title || ''}
                      onChange={(e) => setHero((prev) => prev ? { ...prev, title: e.target.value } : null)}
                      className="h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hero-subtitle">Subtitle</Label>
                  <Input
                    id="hero-subtitle"
                    value={hero?.subtitle || ''}
                    onChange={(e) => setHero((prev) => prev ? { ...prev, subtitle: e.target.value } : null)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hero-slogan">Slogan</Label>
                  <Input
                    id="hero-slogan"
                    value={hero?.slogan || ''}
                    onChange={(e) => setHero((prev) => prev ? { ...prev, slogan: e.target.value } : null)}
                    className="h-10"
                  />
                </div>

                <ImageUploader
                  value={hero?.image_url || ''}
                  onChange={(url) => setHero((prev) => prev ? { ...prev, image_url: url || null } : null)}
                  folder="hero"
                  label="Gambar Background Hero"
                  maxHeight="240px"
                />

                <Separator />

                <div className="flex justify-end">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    {saving ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Menyimpan...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Simpan Hero
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}

export default function HeroManagementPage() {
  return <HeroContent />;
}
