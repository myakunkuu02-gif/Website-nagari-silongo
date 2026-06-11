'use client';

import { useEffect, useState, useCallback } from 'react';
import { Phone, Footprints, Loader2, Save } from 'lucide-react';
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
import type { KontakData, FooterData } from '@/types';

function KontakContent() {
  const [activeTab, setActiveTab] = useState('kontak');

  // Kontak
  const [kontak, setKontak] = useState<Partial<KontakData> | null>(null);
  const [kontakLoading, setKontakLoading] = useState(true);
  const [kontakSaving, setKontakSaving] = useState(false);

  // Footer
  const [footer, setFooter] = useState<Partial<FooterData> | null>(null);
  const [footerLoading, setFooterLoading] = useState(true);
  const [footerSaving, setFooterSaving] = useState(false);

  const fetchKontak = useCallback(async () => {
    setKontakLoading(true);
    try {
      const res = await fetch('/api/kontak', { cache: 'no-store' });
      const data = await res.json();
      setKontak(data || null);
    } catch {
      toast.error('Gagal memuat data kontak');
    } finally {
      setKontakLoading(false);
    }
  }, []);

  const fetchFooter = useCallback(async () => {
    setFooterLoading(true);
    try {
      const res = await fetch('/api/footer', { cache: 'no-store' });
      const data = await res.json();
      setFooter(data || null);
    } catch {
      toast.error('Gagal memuat data footer');
    } finally {
      setFooterLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKontak();
    fetchFooter();
  }, [fetchKontak, fetchFooter]);

  const saveKontak = async () => {
    if (!kontak?.alamat?.trim()) {
      toast.error('Alamat wajib diisi');
      return;
    }
    setKontakSaving(true);
    try {
      const res = await fetch('/api/kontak', {
        cache: 'no-store',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(kontak),
      });
      if (res.ok) {
        toast.success('Data Kontak berhasil disimpan');
      } else {
        toast.error('Gagal menyimpan data Kontak');
      }
    } catch {
      toast.error('Terjadi kesalahan koneksi');
    } finally {
      setKontakSaving(false);
    }
  };

  const saveFooter = async () => {
    setFooterSaving(true);
    try {
      const res = await fetch('/api/footer', {
        cache: 'no-store',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(footer),
      });
      if (res.ok) {
        toast.success('Data Footer berhasil disimpan');
      } else {
        toast.error('Gagal menyimpan data Footer');
      }
    } catch {
      toast.error('Terjadi kesalahan koneksi');
    } finally {
      setFooterSaving(false);
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
            <h1 className="text-2xl font-bold text-foreground">Kelola Kontak</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Atur informasi kontak dan footer website
            </p>
          </div>

          {/* Tabs */}
          <div

          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="w-full overflow-x-auto flex-wrap gap-1 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger value="kontak" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Phone className="w-3.5 h-3.5 mr-1.5" />
                  Kontak
                </TabsTrigger>
                <TabsTrigger value="footer" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Footprints className="w-3.5 h-3.5 mr-1.5" />
                  Footer
                </TabsTrigger>
              </TabsList>

              {/* Kontak Tab */}
              <TabsContent value="kontak">
                <div className="rounded-xl border border-border/30 shadow-sm p-6 bg-card">
                  <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
                    <Phone className="w-5 h-5 text-gold" />
                    Informasi Kontak
                  </h2>
                  {kontakLoading ? <LoadingForm /> : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="kontak-alamat">Alamat *</Label>
                        <Textarea
                          id="kontak-alamat"
                          value={kontak?.alamat || ''}
                          onChange={(e) => setKontak((prev) => prev ? { ...prev, alamat: e.target.value } : null)}
                          className="min-h-[80px] resize-y"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="kontak-pos">Kode Pos</Label>
                          <Input
                            id="kontak-pos"
                            value={kontak?.kode_pos || ''}
                            onChange={(e) => setKontak((prev) => prev ? { ...prev, kode_pos: e.target.value } : null)}
                            className="h-10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="kontak-phone">Telepon</Label>
                          <Input
                            id="kontak-phone"
                            value={kontak?.phone || ''}
                            onChange={(e) => setKontak((prev) => prev ? { ...prev, phone: e.target.value || null } : null)}
                            className="h-10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="kontak-wa">WhatsApp</Label>
                          <Input
                            id="kontak-wa"
                            value={kontak?.whatsapp || ''}
                            onChange={(e) => setKontak((prev) => prev ? { ...prev, whatsapp: e.target.value || null } : null)}
                            className="h-10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="kontak-email">Email</Label>
                          <Input
                            id="kontak-email"
                            value={kontak?.email || ''}
                            onChange={(e) => setKontak((prev) => prev ? { ...prev, email: e.target.value || null } : null)}
                            className="h-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="kontak-maps">Maps Embed URL</Label>
                        <Input
                          id="kontak-maps"
                          value={kontak?.maps_embed || ''}
                          onChange={(e) => setKontak((prev) => prev ? { ...prev, maps_embed: e.target.value || null } : null)}
                          className="h-10"
                          placeholder="https://www.google.com/maps/embed?..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="kontak-jam">Jam Layanan</Label>
                        <Input
                          id="kontak-jam"
                          value={kontak?.jam_layanan || ''}
                          onChange={(e) => setKontak((prev) => prev ? { ...prev, jam_layanan: e.target.value || null } : null)}
                          className="h-10"
                          placeholder="Senin - Jumat: 08:00 - 16:00 WIB"
                        />
                      </div>
                      <Separator />
                      <div className="flex justify-end">
                        <SaveButton loading={kontakSaving} onClick={saveKontak} label="Simpan Kontak" />
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Footer Tab */}
              <TabsContent value="footer">
                <div className="rounded-xl border border-border/30 shadow-sm p-6 bg-card">
                  <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
                    <Footprints className="w-5 h-5 text-gold" />
                    Footer Website
                  </h2>
                  {footerLoading ? <LoadingForm /> : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="footer-desc">Deskripsi</Label>
                        <Textarea
                          id="footer-desc"
                          value={footer?.description || ''}
                          onChange={(e) => setFooter((prev) => prev ? { ...prev, description: e.target.value || null } : null)}
                          className="min-h-[80px] resize-y"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="footer-fb">Facebook URL</Label>
                          <Input
                            id="footer-fb"
                            value={footer?.facebook || ''}
                            onChange={(e) => setFooter((prev) => prev ? { ...prev, facebook: e.target.value || null } : null)}
                            className="h-10"
                            placeholder="https://facebook.com/..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="footer-ig">Instagram URL</Label>
                          <Input
                            id="footer-ig"
                            value={footer?.instagram || ''}
                            onChange={(e) => setFooter((prev) => prev ? { ...prev, instagram: e.target.value || null } : null)}
                            className="h-10"
                            placeholder="https://instagram.com/..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="footer-yt">YouTube URL</Label>
                          <Input
                            id="footer-yt"
                            value={footer?.youtube || ''}
                            onChange={(e) => setFooter((prev) => prev ? { ...prev, youtube: e.target.value || null } : null)}
                            className="h-10"
                            placeholder="https://youtube.com/..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="footer-tt">TikTok URL</Label>
                          <Input
                            id="footer-tt"
                            value={footer?.tiktok || ''}
                            onChange={(e) => setFooter((prev) => prev ? { ...prev, tiktok: e.target.value || null } : null)}
                            className="h-10"
                            placeholder="https://tiktok.com/..."
                          />
                        </div>
                      </div>
                      <Separator />
                      <div className="flex justify-end">
                        <SaveButton loading={footerSaving} onClick={saveFooter} label="Simpan Footer" />
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

export default function KontakManagementPage() {
  return <KontakContent />;
}
