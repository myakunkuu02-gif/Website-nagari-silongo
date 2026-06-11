'use client';

import { useEffect, useState, useCallback } from 'react';
import { MapPin, Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AdminLayout from '@/components/admin/AdminLayout';
import AuthGuard from '@/components/admin/AuthGuard';
import ImageUploader from '@/components/admin/ImageUploader';
import { toast } from 'sonner';
import type { WisataData } from '@/types';

interface WisataFormData {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
}

const emptyForm: WisataFormData = {
  title: '',
  description: '',
  image_url: '',
  category: '',
};

function WisataContent() {
  const [wisata, setWisata] = useState<WisataData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<WisataFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchWisata = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/wisata', { cache: 'no-store' });
      const data = await res.json();
      setWisata(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Gagal memuat data wisata');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWisata();
  }, [fetchWisata]);

  const openCreateModal = () => {
    setFormData(emptyForm);
    setIsEditing(false);
    setModalOpen(true);
  };

  const openEditModal = (item: WisataData) => {
    setFormData({
      id: item.id,
      title: item.title,
      description: item.description || '',
      image_url: item.image_url || '',
      category: item.category || '',
    });
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error('Judul wisata wajib diisi');
      return;
    }

    setSaving(true);
    try {
      const url = '/api/wisata';
      const method = isEditing ? 'PUT' : 'POST';
      const body = isEditing
        ? { ...formData, id: formData.id }
        : formData;

      const res = await fetch(url, {
        cache: 'no-store',
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(isEditing ? 'Wisata berhasil diperbarui' : 'Wisata berhasil ditambahkan');
        setModalOpen(false);
        fetchWisata();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Gagal menyimpan data');
      }
    } catch {
      toast.error('Terjadi kesalahan koneksi');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/wisata?id=${deleteId}`, { cache: 'no-store', method: 'DELETE' });
      if (res.ok) {
        toast.success('Wisata berhasil dihapus');
        fetchWisata();
      } else {
        toast.error('Gagal menghapus wisata');
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
              <h1 className="text-2xl font-bold text-foreground">Kelola Wisata</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Data destinasi wisata Nagari Silongo
              </p>
            </div>
            <Button
              onClick={openCreateModal}
              className="bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Wisata
            </Button>
          </div>

          {/* Table */}
          <div

            className="rounded-xl border border-border/30 shadow-sm overflow-hidden bg-card"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="w-10">No</TableHead>
                    <TableHead>Nama Wisata</TableHead>
                    <TableHead className="hidden md:table-cell">Kategori</TableHead>
                    <TableHead className="hidden lg:table-cell">Deskripsi</TableHead>
                    <TableHead className="w-24 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-6" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                        <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                        <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-48" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      </TableRow>
                    ))
                  ) : wisata.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                        <MapPin className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">Belum ada data wisata</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    wisata.map((item, idx) => (
                      <TableRow key={item.id} className="group">
                        <TableCell className="text-muted-foreground text-sm">{idx + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {item.image_url ? (
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                                <img
                                  src={item.image_url}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    (target.parentElement as HTMLDivElement).style.display = 'none';
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <MapPin className="w-4 h-4" />
                              </div>
                            )}
                            <span className="text-sm font-medium text-foreground">{item.title}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {item.category ? (
                            <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-xs text-muted-foreground line-clamp-2">{item.description || '-'}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-gold/10 hover:text-gold"
                              onClick={() => openEditModal(item)}
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-red-500/10 hover:text-red-500"
                              onClick={() => setDeleteId(item.id)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Create/Edit Modal */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5 text-gold" />
                {isEditing ? 'Edit Wisata' : 'Tambah Wisata Baru'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wisata-title">Nama Wisata *</Label>
                <Input
                  id="wisata-title"
                  placeholder="Nama destinasi wisata"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wisata-desc">Deskripsi</Label>
                <Textarea
                  id="wisata-desc"
                  placeholder="Deskripsi singkat destinasi wisata"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[100px] resize-y"
                />
              </div>
              <ImageUploader
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                folder="wisata"
                label="Gambar Wisata"
                maxHeight="180px"
              />
              <div className="space-y-2">
                <Label htmlFor="wisata-category">Kategori</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => setFormData({ ...formData, category: v })}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alam">Alam</SelectItem>
                    <SelectItem value="Budaya">Budaya</SelectItem>
                    <SelectItem value="Kuliner">Kuliner</SelectItem>
                    <SelectItem value="Sejarah">Sejarah</SelectItem>
                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setModalOpen(false)}>Batal</Button>
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
                ) : isEditing ? 'Simpan Perubahan' : 'Tambah Wisata'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Wisata?</AlertDialogTitle>
              <AlertDialogDescription>
                Data wisata yang dihapus tidak dapat dikembalikan. Lanjutkan menghapus?
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
                ) : 'Hapus'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </AuthGuard>
  );
}

export default function WisataManagementPage() {
  return <WisataContent />;
}
