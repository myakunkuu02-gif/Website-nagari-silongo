'use client';

import { useEffect, useState, useCallback } from 'react';
import { Eye, Loader2, Plus, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/components/admin/AdminLayout';
import AuthGuard from '@/components/admin/AuthGuard';
import { toast } from 'sonner';

interface VisiMisiData {
  id?: string;
  visi: string;
  misi: string; // JSON array of strings
}

function VisiMisiContent() {
  const [data, setData] = useState<VisiMisiData>({ visi: '', misi: '[]' });
  const [misiItems, setMisiItems] = useState<string[]>([]);
  const [newMisi, setNewMisi] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchVisiMisi = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/visi-misi', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json && json.id) {
          setData({ visi: json.visi || '', misi: json.misi || '[]' });
          try {
            const parsed = JSON.parse(json.misi || '[]');
            setMisiItems(Array.isArray(parsed) ? parsed : []);
          } catch {
            setMisiItems([]);
          }
        }
      }
    } catch {
      toast.error('Gagal memuat data visi misi');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVisiMisi();
  }, [fetchVisiMisi]);

  const handleSave = async () => {
    if (!data.visi.trim()) {
      toast.error('Visi wajib diisi');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        visi: data.visi,
        misi: JSON.stringify(misiItems),
      };
      const res = await fetch('/api/visi-misi', {
        cache: 'no-store',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success('Visi & Misi berhasil disimpan');
        fetchVisiMisi();
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

  const addMisi = () => {
    const trimmed = newMisi.trim();
    if (!trimmed) return;
    if (misiItems.length >= 15) {
      toast.error('Maksimal 15 misi');
      return;
    }
    setMisiItems([...misiItems, trimmed]);
    setNewMisi('');
  };

  const removeMisi = (index: number) => {
    setMisiItems(misiItems.filter((_, i) => i !== index));
  };

  const updateMisi = (index: number, value: string) => {
    const updated = [...misiItems];
    updated[index] = value;
    setMisiItems(updated);
  };

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Kelola Visi & Misi</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Atur visi dan misi Nagari Silongo
            </p>
          </div>

          {/* Visi */}
          <div

          >
            <Card className="rounded-xl border-border/30 shadow-sm bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="w-5 h-5 text-gold" />
                  Visi Nagari
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-28 w-full" />
                ) : (
                  <div className="space-y-2">
                    <Textarea
                      value={data.visi}
                      onChange={(e) => setData({ ...data, visi: e.target.value })}
                      placeholder="Tulis visi Nagari..."
                      rows={4}
                      className="resize-y"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Misi */}
          <div

          >
            <Card className="rounded-xl border-border/30 shadow-sm bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Misi Nagari</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Existing misi items */}
                    <div className="space-y-2">
                      {misiItems.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-6">
                          Belum ada misi. Tambahkan misi di bawah.
                        </p>
                      )}
                      {misiItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-gold/20 text-gold font-bold"
                          >
                            {index + 1}
                          </Badge>
                          <Input
                            value={item}
                            onChange={(e) => updateMisi(index, e.target.value)}
                            className="flex-1 h-10"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 shrink-0 hover:bg-red-500/10 hover:text-red-500"
                            onClick={() => removeMisi(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {/* Add new misi */}
                    {misiItems.length < 15 && (
                      <div className="flex items-center gap-2">
                        <div className="shrink-0 w-7 h-7 flex items-center justify-center">
                          <Badge variant="outline" className="h-7 w-7 flex items-center justify-center rounded-full">
                            <Plus className="w-3 h-3" />
                          </Badge>
                        </div>
                        <Input
                          value={newMisi}
                          onChange={(e) => setNewMisi(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addMisi();
                            }
                          }}
                          placeholder="Tambah misi baru..."
                          className="flex-1 h-10"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={addMisi}
                          disabled={!newMisi.trim()}
                          className="shrink-0"
                        >
                          Tambah
                        </Button>
                      </div>
                    )}

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

export default function VisiMisiManagementPage() {
  return <VisiMisiContent />;
}
