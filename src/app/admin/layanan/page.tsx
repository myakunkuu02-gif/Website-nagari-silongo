'use client';

import { useEffect, useState, useCallback } from 'react';
import { FileText, Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AdminLayout from '@/components/admin/AdminLayout';
import AuthGuard from '@/components/admin/AuthGuard';
import { toast } from 'sonner';

interface LayananData {
  id: string;
  nama: string;
  deskripsi: string;
  icon: string;
  tag?: string;
  urutan: number;
  aktif: boolean;
}

interface LayananFormData {
  id?: string;
  nama: string;
  deskripsi: string;
  icon: string;
  tag: string;
  urutan: number;
  aktif: boolean;
}

const ICON_SUGGESTIONS = ['FileText', 'Shield', 'Heart', 'Scale', 'UserPlus', 'GraduationCap', 'Building', 'Landmark'];

const emptyForm: LayananFormData = {
  nama: '',
  deskripsi: '',
  icon: 'FileText',
  tag: '',
  urutan: 0,
  aktif: true,
};

function LayananContent() {
  const [items, setItems] = useState<LayananData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<LayananFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchLayanan = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/layanan', { cache: 'no-store' });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Gagal memuat data layanan');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLayanan();
  }, [fetchLayanan]);

  const openCreateModal = () => {
    setFormData(emptyForm);
    setIsEditing(false);
    setModalOpen(true);
  };

  const openEditModal = (item: LayananData) => {
    setFormData({
      id: item.id,
      nama: item.nama,
      deskripsi: item.deskripsi,
      icon: item.icon,
      tag: item.tag || '',
      urutan: item.urutan,
      aktif: item.aktif,
    });
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.nama.trim() || !formData.deskripsi.trim()) {
      toast.error('Nama dan deskripsi layanan wajib diisi');
      return;
    }

    setSaving(true);
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const body = isEditing ? { ...formData } : formData;

      const res = await fetch('/api/layanan', {
        cache: 'no-store',
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(isEditing ? 'Layanan berhasil diperbarui' : 'Layanan berhasil ditambahkan');
        setModalOpen(false);
        fetchLayanan();
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

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/layanan?id=${deleteId}`, { cache: 'no-store', method: 'DELETE' });
      if (res.ok) {
        toast.success('Layanan berhasil dihapus');
        fetchLayanan();
      } else {
        toast.error('Gagal menghapus layanan');
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
              <h1 className="text-2xl font-bold text-foreground">Kelola Layanan</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Layanan publik Nagari Silongo
              </p>
            </div>
            <Button
              onClick={openCreateModal}
              className="bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Layanan
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
                    <TableHead>Nama</TableHead>
                    <TableHead className="hidden md:table-cell">Icon</TableHead>
                    <TableHead className="hidden lg:table-cell">Tag</TableHead>
                    <TableHead className="hidden sm:table-cell">Urutan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-24 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-6" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                        <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
                        <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
                        <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-10" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-14" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      </TableRow>
                    ))
                  ) : items.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                        <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">Belum ada data layanan</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    items
                      .sort((a, b) => a.urutan - b.urutan)
                      .map((item, idx) => (
                        <TableRow key={item.id} className="group">
                          <TableCell className="text-muted-foreground text-sm">{idx + 1}</TableCell>
                          <TableCell>
                            <span className="text-sm font-medium text-foreground">{item.nama}</span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className="text-xs text-muted-foreground font-mono">{item.icon}</span>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {item.tag ? (
                              <Badge variant="secondary" className="text-xs">{item.tag}</Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <span className="text-sm text-muted-foreground">{item.urutan}</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant={item.aktif ? 'default' : 'outline'} className={
                              item.aktif
                                ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20'
                                : 'text-muted-foreground'
                            }>
                              {item.aktif ? 'Aktif' : 'Nonaktif'}
                            </Badge>
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
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5 text-gold" />
                {isEditing ? 'Edit Layanan' : 'Tambah Layanan Baru'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="layanan-nama">Nama Layanan *</Label>
                <Input
                  id="layanan-nama"
                  placeholder="Contoh: SK Domisili"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="layanan-deskripsi">Deskripsi *</Label>
                <Textarea
                  id="layanan-deskripsi"
                  placeholder="Deskripsi layanan..."
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  rows={3}
                  className="resize-y"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="layanan-icon">Icon</Label>
                  <Input
                    id="layanan-icon"
                    placeholder="FileText"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="h-10"
                    list="icon-suggestions"
                  />
                  <datalist id="icon-suggestions">
                    {ICON_SUGGESTIONS.map((icon) => (
                      <option key={icon} value={icon} />
                    ))}
                  </datalist>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {ICON_SUGGESTIONS.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon })}
                        className={`text-xs px-2 py-0.5 rounded border transition-colors ${
                          formData.icon === icon
                            ? 'bg-gold/20 border-gold/40 text-gold'
                            : 'border-border/50 text-muted-foreground hover:border-gold/30 hover:text-gold'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="layanan-tag">Tag</Label>
                  <Input
                    id="layanan-tag"
                    placeholder="Contoh: Populer"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="h-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="layanan-urutan">Urutan</Label>
                  <Input
                    id="layanan-urutan"
                    type="number"
                    value={formData.urutan}
                    onChange={(e) => setFormData({ ...formData, urutan: parseInt(e.target.value) || 0 })}
                    className="h-10"
                  />
                </div>
                <div className="flex items-end gap-2 pb-0.5">
                  <Switch
                    checked={formData.aktif}
                    onCheckedChange={(checked) => setFormData({ ...formData, aktif: checked })}
                  />
                  <Label className="text-sm">Aktif</Label>
                </div>
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
                ) : isEditing ? 'Simpan Perubahan' : 'Tambah Layanan'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Layanan?</AlertDialogTitle>
              <AlertDialogDescription>
                Layanan yang dihapus tidak dapat dikembalikan. Lanjutkan menghapus?
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

export default function LayananManagementPage() {
  return <LayananContent />;
}
