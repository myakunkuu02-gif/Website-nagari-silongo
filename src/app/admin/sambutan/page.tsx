'use client';

import { useEffect, useState, useCallback } from 'react';
import { Crown, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/components/admin/AdminLayout';
import AuthGuard from '@/components/admin/AuthGuard';
import { toast } from 'sonner';

interface SambutanData {
  id?: string;
  nama: string;
  jabatan: string;
  isi_sambutan: string;
  bio: string;
  masa_jabatan: string;
  jml_jorong: string;
  foto_url?: string;
}

const emptyData: SambutanData = {
  nama: '',
  jabatan: '',
  isi_sambutan: '',
  bio: '',
  masa_jabatan: '',
  jml_jorong: '',
};

function SambutanContent() {
  const [data, setData] = useState<SambutanData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSambutan = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sambutan', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json && json.id) {
          setData(json);
        }
      }
    } catch {
      toast.error('Gagal memuat data sambutan');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSambutan();
  }, [fetchSambutan]);

  const handleSave = async () => {
    if (!data.nama.trim() || !data.isi_sambutan.trim()) {
      toast.error('Nama dan isi sambutan wajib diisi');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/sambutan', {
        cache: 'no-store',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success('Data sambutan berhasil disimpan');
        fetchSambutan();
      } else {
        const json = await res.json();
        toast.error(json.error || 'Gagal menyimpan data');
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
          <div>
            <h1 className="text-2xl font-bold text-foreground">Kelola Sambutan</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Atur sambutan Wali Nagari di halaman utama
            </p>
          </div>

          <div

          >
            <Card className="rounded-xl border-border/30 shadow-sm bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Crown className="w-5 h-5 text-gold" />
                  Sambutan Wali Nagari
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nama">Nama Wali Nagari *</Label>
                        <Input
                          id="nama"
                          value={data.nama}
                          onChange={(e) => setData({ ...data, nama: e.target.value })}
                          placeholder="Nama lengkap"
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jabatan">Jabatan</Label>
                        <Input
                          id="jabatan"
                          value={data.jabatan}
                          onChange={(e) => setData({ ...data, jabatan: e.target.value })}
                          placeholder="Wali Nagari Silongo"
                          className="h-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="isi_sambutan">Isi Sambutan *</Label>
                      <Textarea
                        id="isi_sambutan"
                        value={data.isi_sambutan}
                        onChange={(e) => setData({ ...data, isi_sambutan: e.target.value })}
                        placeholder="Tulis isi sambutan di sini..."
                        rows={6}
                        className="resize-y"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio Singkat</Label>
                      <Textarea
                        id="bio"
                        value={data.bio}
                        onChange={(e) => setData({ ...data, bio: e.target.value })}
                        placeholder="Bio singkat Wali Nagari..."
                        rows={4}
                        className="resize-y"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="masa_jabatan">Masa Jabatan</Label>
                        <Input
                          id="masa_jabatan"
                          value={data.masa_jabatan}
                          onChange={(e) => setData({ ...data, masa_jabatan: e.target.value })}
                          placeholder="2024 - 2029"
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="jml_jorong">Jumlah Jorong</Label>
                        <Input
                          id="jml_jorong"
                          value={data.jml_jorong}
                          onChange={(e) => setData({ ...data, jml_jorong: e.target.value })}
                          placeholder="3"
                          className="h-10"
                        />
                      </div>
                    </div>

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
                            Simpan Perubahan
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}

export default function SambutanManagementPage() {
  return <SambutanContent />;
}
