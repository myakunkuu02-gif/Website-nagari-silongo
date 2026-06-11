'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Plus,
  Trash2,
  Camera,
  Loader2,
  ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AdminLayout from '@/components/admin/AdminLayout';
import AuthGuard from '@/components/admin/AuthGuard';
import ImageUploader from '@/components/admin/ImageUploader';
import { toast } from 'sonner';
import type { GaleriData } from '@/types';

interface GaleriFormData {
  title: string;
  description: string;
  image_url: string;
  category: string;
}

const emptyForm: GaleriFormData = {
  title: '',
  description: '',
  image_url: '',
  category: '',
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

function GaleriContent() {
  const [galeri, setGaleri] = useState<GaleriData[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [filtered, setFiltered] = useState<GaleriData[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<GaleriFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchGaleri = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/galeri', { cache: 'no-store' });
      const data = await res.json();
      setGaleri(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Gagal memuat data galeri');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGaleri();
  }, [fetchGaleri]);

  useEffect(() => {
    if (categoryFilter) {
      setFiltered(galeri.filter((g) => g.category === categoryFilter));
    } else {
      setFiltered(galeri);
    }
  }, [categoryFilter, galeri]);

  const categories = [...new Set(galeri.map((g) => g.category).filter(Boolean))];

  const handleSave = async () => {
    if (!formData.image_url.trim()) {
      toast.error('URL gambar wajib diisi');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/galeri', {
        cache: 'no-store',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Foto berhasil ditambahkan');
        setModalOpen(false);
        setFormData(emptyForm);
        fetchGaleri();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Gagal menambahkan foto');
      }
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/galeri?id=${deleteId}`, { cache: 'no-store', method: 'DELETE' });
      if (res.ok) {
        toast.success('Foto berhasil dihapus');
        fetchGaleri();
      } else {
        toast.error('Gagal menghapus foto');
      }
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
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
              <h1 className="text-2xl font-bold text-foreground">Kelola Galeri</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {galeri.length} foto dalam galeri
              </p>
            </div>
            <Button
              onClick={() => {
                setFormData(emptyForm);
                setModalOpen(true);
              }}
              className="bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Foto
            </Button>
          </div>

          {/* Category Filter */}
          {categories.length > 1 && (
            <div

              className="flex flex-wrap gap-2"
            >
              <Button
                variant={categoryFilter === '' ? 'default' : 'outline'}
                size="sm"
                className="text-xs"
                onClick={() => setCategoryFilter('')}
              >
                Semua
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={categoryFilter === cat ? 'default' : 'outline'}
                  size="sm"
                  className="text-xs"
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-border/30">
                  <Skeleton className="aspect-[4/3] w-full" />
                  <div className="p-3 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div


              className="flex flex-col items-center justify-center py-20 text-muted-foreground"
            >
              <Camera className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium">Belum ada foto galeri</p>
              <p className="text-sm mt-1">Klik &quot;Tambah Foto&quot; untuk menambahkan</p>
            </div>
          ) : (
            <div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    variants={fadeUp}
                    layout

                    className="group rounded-xl overflow-hidden border border-border/30 shadow-sm hover:shadow-md transition-all duration-300 bg-card"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={item.image_url}
                        alt={item.title || 'Galeri'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmMWY1ZjkiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk0YTNiOCIgZm9udC1zaXplPSIxNiI+SW1hZ2Ugbm90IGZvdW5kPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Category badge */}
                      {item.category && (
                        <Badge className="absolute top-2 left-2 text-[10px] bg-black/50 text-white backdrop-blur-sm border-0">
                          {item.category}
                        </Badge>
                      )}

                      {/* Delete button */}
                      <button
                        onClick={() => setDeleteId(item.id)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.title || 'Tanpa Judul'}
                      </p>
                      {item.description && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              
            </div>
          )}
        </div>

        {/* Add Modal */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg">
                <ImageIcon className="w-5 h-5 text-gold" />
                Tambah Foto Baru
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="galeri-title">Judul</Label>
                <Input
                  id="galeri-title"
                  placeholder="Judul foto"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="galeri-desc">Deskripsi</Label>
                <Textarea
                  id="galeri-desc"
                  placeholder="Deskripsi singkat foto"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[80px] resize-y"
                />
              </div>

              <ImageUploader
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                folder="galeri"
                label="Gambar *"
                maxHeight="192px"
              />

              <div className="space-y-2">
                <Label htmlFor="galeri-category">Kategori</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => setFormData({ ...formData, category: v })}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Budaya">Budaya</SelectItem>
                    <SelectItem value="Alam">Alam</SelectItem>
                    <SelectItem value="Fasilitas">Fasilitas</SelectItem>
                    <SelectItem value="Kegiatan">Kegiatan</SelectItem>
                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Batal
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy font-semibold"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Menyimpan...
                  </span>
                ) : (
                  'Tambah Foto'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Foto?</AlertDialogTitle>
              <AlertDialogDescription>
                Foto yang dihapus tidak dapat dikembalikan. Lanjutkan menghapus?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                {deleting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Menghapus...
                  </span>
                ) : (
                  'Hapus'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </AuthGuard>
  );
}

export default function GaleriManagementPage() {
  return <GaleriContent />;
}
