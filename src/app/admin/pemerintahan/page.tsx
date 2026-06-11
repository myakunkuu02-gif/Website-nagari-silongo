'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Users,
  Loader2,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import ImageUploader from '@/components/admin/ImageUploader';
import { toast } from 'sonner';
import type { PemerintahanData } from '@/types';

interface PemerintahanFormData {
  id?: string;
  nama: string;
  jabatan: string;
  deskripsi: string;
  foto_url: string;
  urutan: number;
  status_aktif: boolean;
}

const emptyForm: PemerintahanFormData = {
  nama: '',
  jabatan: '',
  deskripsi: '',
  foto_url: '',
  urutan: 0,
  status_aktif: true,
};

function PemerintahanContent() {
  const [officials, setOfficials] = useState<PemerintahanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<PemerintahanData[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<PemerintahanFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchOfficials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/pemerintahan?all=true', { cache: 'no-store' });
      const data = await res.json();
      setOfficials(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Gagal memuat data pemerintahan');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOfficials();
  }, [fetchOfficials]);

  useEffect(() => {
    if (search.trim()) {
      setFiltered(officials.filter((o) => o.nama.toLowerCase().includes(search.toLowerCase())));
    } else {
      setFiltered(officials);
    }
  }, [search, officials]);

  const openCreateModal = () => {
    setFormData(emptyForm);
    setIsEditing(false);
    setModalOpen(true);
  };

  const openEditModal = (item: PemerintahanData) => {
    setFormData({
      id: item.id,
      nama: item.nama,
      jabatan: item.jabatan,
      deskripsi: item.deskripsi || '',
      foto_url: item.foto_url || '',
      urutan: item.urutan,
      status_aktif: item.status_aktif,
    });
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.nama.trim() || !formData.jabatan.trim()) {
      toast.error('Nama dan jabatan wajib diisi');
      return;
    }

    setSaving(true);
    try {
      const url = '/api/pemerintahan';
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
        toast.success(isEditing ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan');
        setModalOpen(false);
        fetchOfficials();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Gagal menyimpan data');
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
      const res = await fetch(`/api/pemerintahan?id=${deleteId}`, { cache: 'no-store', method: 'DELETE' });
      if (res.ok) {
        toast.success('Data berhasil dihapus');
        fetchOfficials();
      } else {
        toast.error('Gagal menghapus data');
      }
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const toggleStatus = async (item: PemerintahanData) => {
    try {
      const res = await fetch('/api/pemerintahan', {
        cache: 'no-store',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, status_aktif: !item.status_aktif }),
      });

      if (res.ok) {
        toast.success(`Status ${item.nama} berhasil diperbarui`);
        fetchOfficials();
      } else {
        toast.error('Gagal memperbarui status');
      }
    } catch {
      toast.error('Terjadi kesalahan');
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
              <h1 className="text-2xl font-bold text-foreground">Kelola Pemerintahan</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Data perangkat pemerintahan Nagari Silongo
              </p>
            </div>
            <Button
              onClick={openCreateModal}
              className="bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Pejabat
            </Button>
          </div>

          {/* Search */}
          <div

          >
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama pejabat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-10 bg-card border-border/50"
              />
            </div>
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
                    <TableHead>Jabatan</TableHead>
                    <TableHead className="hidden md:table-cell">Urutan</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="w-24 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-6" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                        <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-10" /></TableCell>
                        <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      </TableRow>
                    ))
                  ) : filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                        <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">Belum ada data pemerintahan</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((item, idx) => (
                      <TableRow key={item.id} className="group">
                        <TableCell className="text-muted-foreground text-sm">
                          {idx + 1}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {item.foto_url ? (
                              <div className="w-9 h-9 rounded-lg overflow-hidden bg-muted shrink-0">
                                <img
                                  src={item.foto_url}
                                  alt={item.nama}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <span className="text-xs font-bold">
                                  {item.nama.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                </span>
                              </div>
                            )}
                            <span className="text-sm font-medium text-foreground">{item.nama}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{item.jabatan}</span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline" className="text-xs font-mono">
                            {item.urutan}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <button
                            onClick={() => toggleStatus(item)}
                            className="flex items-center gap-1.5 text-sm transition-colors"
                          >
                            {item.status_aktif ? (
                              <>
                                <ToggleRight className="w-5 h-5 text-emerald-500" />
                                <span className="text-emerald-600 text-xs font-medium">Aktif</span>
                              </>
                            ) : (
                              <>
                                <ToggleLeft className="w-5 h-5 text-muted-foreground" />
                                <span className="text-muted-foreground text-xs">Nonaktif</span>
                              </>
                            )}
                          </button>
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
                <Users className="w-5 h-5 text-gold" />
                {isEditing ? 'Edit Pejabat' : 'Tambah Pejabat Baru'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pem-nama">Nama Lengkap *</Label>
                <Input
                  id="pem-nama"
                  placeholder="Nama lengkap pejabat"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pem-jabatan">Jabatan *</Label>
                <Input
                  id="pem-jabatan"
                  placeholder="Jabatan di pemerintahan nagari"
                  value={formData.jabatan}
                  onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pem-deskripsi">Deskripsi</Label>
                <Textarea
                  id="pem-deskripsi"
                  placeholder="Deskripsi tugas dan tanggung jawab"
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  className="min-h-[80px] resize-y"
                />
              </div>

              <ImageUploader
                value={formData.foto_url}
                onChange={(url) => setFormData({ ...formData, foto_url: url })}
                folder="pemerintahan"
                label="Foto Pejabat"
                maxHeight="180px"
              />

              <div className="space-y-2">
                <Label htmlFor="pem-urutan">Urutan</Label>
                <Input
                  id="pem-urutan"
                  type="number"
                  min={0}
                  value={formData.urutan}
                  onChange={(e) => setFormData({ ...formData, urutan: parseInt(e.target.value) || 0 })}
                  className="h-10"
                />
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Switch
                  checked={formData.status_aktif}
                  onCheckedChange={(checked) => setFormData({ ...formData, status_aktif: checked })}
                />
                <div>
                  <p className="text-sm font-medium text-foreground">Status Aktif</p>
                  <p className="text-xs text-muted-foreground">
                    Nonaktifkan untuk menyembunyikan dari halaman publik
                  </p>
                </div>
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
                ) : isEditing ? (
                  'Simpan Perubahan'
                ) : (
                  'Tambah Pejabat'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Data Pejabat?</AlertDialogTitle>
              <AlertDialogDescription>
                Data yang dihapus tidak dapat dikembalikan. Lanjutkan menghapus?
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

export default function PemerintahanManagementPage() {
  return <PemerintahanContent />;
}
