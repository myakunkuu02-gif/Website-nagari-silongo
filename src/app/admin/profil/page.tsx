'use client';

import { useEffect, useState, useCallback } from 'react';
import { FileText, Target, Loader2, Save, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/admin/AdminLayout';
import AuthGuard from '@/components/admin/AuthGuard';
import { toast } from 'sonner';
import type { ProfilData, VisiMisiData } from '@/types';

function ProfilContent() {
  const [activeTab, setActiveTab] = useState('profil');

  // Profil
  const [profil, setProfil] = useState<Partial<ProfilData> | null>(null);
  const [profilLoading, setProfilLoading] = useState(true);
  const [profilSaving, setProfilSaving] = useState(false);

  // Visi Misi
  const [visiMisi, setVisiMisi] = useState<Partial<VisiMisiData> | null>(null);
  const [visiMisiLoading, setVisiMisiLoading] = useState(true);
  const [visiMisiSaving, setVisiMisiSaving] = useState(false);
  const [misiItems, setMisiItems] = useState<string[]>([]);

  const fetchProfil = useCallback(async () => {
    setProfilLoading(true);
    try {
      const res = await fetch('/api/profil', { cache: 'no-store' });
      const data = await res.json();
      setProfil(data || null);
    } catch {
      toast.error('Gagal memuat data Profil');
    } finally {
      setProfilLoading(false);
    }
  }, []);

  const fetchVisiMisi = useCallback(async () => {
    setVisiMisiLoading(true);
    try {
      const res = await fetch('/api/visi-misi', { cache: 'no-store' });
      const data = await res.json();
      setVisiMisi(data || null);
    } catch {
      toast.error('Gagal memuat data Visi Misi');
    } finally {
      setVisiMisiLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfil();
    fetchVisiMisi();
  }, [fetchProfil, fetchVisiMisi]);

  useEffect(() => {
    if (visiMisi?.misi) {
      try {
        const parsed = JSON.parse(visiMisi.misi);
        setMisiItems(Array.isArray(parsed) ? parsed : []);
      } catch {
        setMisiItems(visiMisi.misi.split('\n').filter(Boolean));
      }
    }
  }, [visiMisi?.misi]);

  const updateMisiItems = (items: string[]) => {
    setMisiItems(items);
    setVisiMisi((prev) => prev ? { ...prev, misi: JSON.stringify(items) } : prev);
  };

  const addMisiItem = () => updateMisiItems([...misiItems, '']);
  const removeMisiItem = (idx: number) => updateMisiItems(misiItems.filter((_, i) => i !== idx));
  const updateMisiItem = (idx: number, value: string) => {
    const updated = [...misiItems];
    updated[idx] = value;
    updateMisiItems(updated);
  };

  const saveProfil = async () => {
    if (!profil?.title?.trim()) {
      toast.error('Judul Profil wajib diisi');
      return;
    }
    setProfilSaving(true);
    try {
      const res = await fetch('/api/profil', {
        cache: 'no-store',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profil),
      });
      if (res.ok) {
        toast.success('Data Profil berhasil disimpan');
      } else {
        toast.error('Gagal menyimpan data Profil');
      }
    } catch {
      toast.error('Terjadi kesalahan koneksi');
    } finally {
      setProfilSaving(false);
    }
  };

  const saveVisiMisi = async () => {
    if (!visiMisi?.visi?.trim()) {
      toast.error('Visi wajib diisi');
      return;
    }
    setVisiMisiSaving(true);
    try {
      const res = await fetch('/api/visi-misi', {
        cache: 'no-store',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visiMisi),
      });
      if (res.ok) {
        toast.success('Data Visi Misi berhasil disimpan');
      } else {
        toast.error('Gagal menyimpan data Visi Misi');
      }
    } catch {
      toast.error('Terjadi kesalahan koneksi');
    } finally {
      setVisiMisiSaving(false);
    }
  };

  const LoadingForm = () => (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );

  const SaveButton = ({ loading, onClick, label }: { loading: boolean; onClick: () => void; label: string }) => (
    <Button
      onClick={onClick}
      disabled={loading}
      className="bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy font-semibold shadow-md hover:shadow-lg transition-all"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Menyimpan...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          {label}
        </span>
      )}
    </Button>
  );

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div


          >
            <h1 className="text-2xl font-bold text-foreground">Kelola Profil Nagari</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Atur informasi profil dan visi misi Nagari Silongo
            </p>
          </div>

          {/* Tabs */}
          <div

          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="w-full overflow-x-auto flex-wrap gap-1 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger value="profil" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <FileText className="w-3.5 h-3.5 mr-1.5" />
                  Profil
                </TabsTrigger>
                <TabsTrigger value="visi-misi" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Target className="w-3.5 h-3.5 mr-1.5" />
                  Visi Misi
                </TabsTrigger>
              </TabsList>

              {/* Profil Tab */}
              <TabsContent value="profil">
                <div className="rounded-xl border border-border/30 shadow-sm p-6 bg-card">
                  <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
                    <FileText className="w-5 h-5 text-gold" />
                    Profil Nagari
                  </h2>
                  {profilLoading ? <LoadingForm /> : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="profil-title">Judul *</Label>
                        <Input
                          id="profil-title"
                          value={profil?.title || ''}
                          onChange={(e) => setProfil((prev) => prev ? { ...prev, title: e.target.value } : null)}
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profil-desc">Deskripsi</Label>
                        <Textarea
                          id="profil-desc"
                          value={profil?.description || ''}
                          onChange={(e) => setProfil((prev) => prev ? { ...prev, description: e.target.value } : null)}
                          className="min-h-[200px] resize-y"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profil-image">URL Gambar</Label>
                        <Input
                          id="profil-image"
                          value={profil?.image_url || ''}
                          onChange={(e) => setProfil((prev) => prev ? { ...prev, image_url: e.target.value || null } : null)}
                          className="h-10"
                          placeholder="https://example.com/profil.jpg"
                        />
                        {profil?.image_url && (
                          <div className="rounded-lg overflow-hidden border border-border/30 max-h-48 mt-2">
                            <img
                              src={profil.image_url}
                              alt="Preview Profil"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                (target.parentElement as HTMLDivElement).style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <Separator />
                      <div className="flex justify-end">
                        <SaveButton loading={profilSaving} onClick={saveProfil} label="Simpan Profil" />
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Visi Misi Tab */}
              <TabsContent value="visi-misi">
                <div className="rounded-xl border border-border/30 shadow-sm p-6 bg-card">
                  <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
                    <Target className="w-5 h-5 text-gold" />
                    Visi & Misi
                  </h2>
                  {visiMisiLoading ? <LoadingForm /> : (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="vm-visi">Visi *</Label>
                        <Textarea
                          id="vm-visi"
                          value={visiMisi?.visi || ''}
                          onChange={(e) => setVisiMisi((prev) => prev ? { ...prev, visi: e.target.value } : null)}
                          className="min-h-[80px] resize-y"
                        />
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Misi</Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={addMisiItem}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Tambah Misi
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {misiItems.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground w-6 text-center shrink-0">{idx + 1}</span>
                              <Input
                                value={item}
                                onChange={(e) => updateMisiItem(idx, e.target.value)}
                                className="h-10"
                                placeholder={`Misi ke-${idx + 1}`}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 shrink-0 hover:bg-red-500/10 hover:text-red-500"
                                onClick={() => removeMisiItem(idx)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                          {misiItems.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">
                              Belum ada misi. Klik &quot;Tambah Misi&quot; untuk menambahkan.
                            </p>
                          )}
                        </div>
                      </div>

                      <Separator />
                      <div className="flex justify-end">
                        <SaveButton loading={visiMisiSaving} onClick={saveVisiMisi} label="Simpan Visi Misi" />
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}

export default function ProfilManagementPage() {
  return <ProfilContent />;
}
