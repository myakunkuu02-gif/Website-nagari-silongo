'use client';

import { useEffect, useState, useCallback } from 'react';
import { CalendarDays, Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
import { toast } from 'sonner';

interface AgendaData {
  id: string;
  tanggal: string;
  judul: string;
  lokasi: string;
  kategori: string;
  deskripsi?: string;
}

interface AgendaFormData {
  id?: string;
  tanggal: string;
  judul: string;
  lokasi: string;
  kategori: string;
  deskripsi: string;
}

const KATEGORI_OPTIONS = ['Pemerintahan', 'Sosial', 'Ekonomi', 'Budaya', 'Kesehatan', 'Pembangunan'];

const emptyForm: AgendaFormData = {
  tanggal: '',
  judul: '',
  lokasi: '',
  kategori: 'Pemerintahan',
  deskripsi: '',
};

const kategoriColorMap: Record<string, string> = {
  Pemerintahan: 'bg-blue-500/10 text-blue-600',
  Sosial: 'bg-pink-500/10 text-pink-600',
  Ekonomi: 'bg-emerald-500/10 text-emerald-600',
  Budaya: 'bg-amber-500/10 text-amber-600',
  Kesehatan: 'bg-red-500/10 text-red-600',
  Pembangunan: 'bg-violet-500/10 text-violet-600',
};

function AgendaContent() {
  const [items, setItems] = useState<AgendaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<AgendaFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAgenda = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/agenda', { cache: 'no-store' });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Gagal memuat data agenda');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgenda();
  }, [fetchAgenda]);

  const openCreateModal = () => {
    setFormData(emptyForm);
    setIsEditing(false);
    setModalOpen(true);
  };

  const openEditModal = (item: AgendaData) => {
    setFormData({
      id: item.id,
      tanggal: item.tanggal,
      judul: item.judul,
      lokasi: item.lokasi,
      kategori: item.kategori,
      deskripsi: item.deskripsi || '',
    });
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.judul.trim() || !formData.tanggal) {
      toast.error('Judul dan tanggal wajib diisi');
      return;
    }

    setSaving(true);
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const res = await fetch('/api/agenda', {
        cache: 'no-store',
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(isEditing ? 'Agenda berhasil diperbarui' : 'Agenda berhasil ditambahkan');
        setModalOpen(false);
        fetchAgenda();
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
      const res = await fetch(`/api/agenda?id=${deleteId}`, { cache: 'no-store', method: 'DELETE' });
      if (res.ok) {
        toast.success('Agenda berhasil dihapus');
        fetchAgenda();
      } else {
        toast.error('Gagal menghapus agenda');
      }
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
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
              <h1 className="text-2xl font-bold text-foreground">Kelola Agenda</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Agenda kegiatan Nagari Silongo
              </p>
            </div>
            <Button
              onClick={openCreateModal}
              className="bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Agenda
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
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Judul</TableHead>
                    <TableHead className="hidden sm:table-cell">Lokasi</TableHead>
                    <TableHead className="hidden md:table-cell">Kategori</TableHead>
                    <TableHead className="w-24 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-6" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                        <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      </TableRow>
                    ))
                  ) : items.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                        <CalendarDays className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">Belum ada data agenda</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    items.map((item, idx) => (
                      <TableRow key={item.id} className="group">
                        <TableCell className="text-muted-foreground text-sm">{idx + 1}</TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {formatDate(item.tanggal)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium text-foreground">{item.judul}</span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span className="text-sm text-muted-foreground">{item.lokasi}</span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            variant="secondary"
                            className={kategoriColorMap[item.kategori] || ''}
                          >
                            {item.kategori}
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
                <CalendarDays className="w-5 h-5 text-gold" />
                {isEditing ? 'Edit Agenda' : 'Tambah Agenda Baru'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="agenda-tanggal">Tanggal *</Label>
                  <Input
                    id="agenda-tanggal"
                    type="date"
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agenda-kategori">Kategori</Label>
                  <Select
                    value={formData.kategori}
                    onValueChange={(value) => setFormData({ ...formData, kategori: value })}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {KATEGORI_OPTIONS.map((kat) => (
                        <SelectItem key={kat} value={kat}>
                          {kat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="agenda-judul">Judul *</Label>
                <Input
                  id="agenda-judul"
                  placeholder="Judul kegiatan"
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agenda-lokasi">Lokasi</Label>
                <Input
                  id="agenda-lokasi"
                  placeholder="Lokasi kegiatan"
                  value={formData.lokasi}
                  onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agenda-deskripsi">Deskripsi</Label>
                <Textarea
                  id="agenda-deskripsi"
                  placeholder="Deskripsi kegiatan..."
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  rows={3}
                  className="resize-y"
                />
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
                ) : isEditing ? 'Simpan Perubahan' : 'Tambah Agenda'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Agenda?</AlertDialogTitle>
              <AlertDialogDescription>
                Agenda yang dihapus tidak dapat dikembalikan. Lanjutkan menghapus?
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

export default function AgendaManagementPage() {
  return <AgendaContent />;
}
