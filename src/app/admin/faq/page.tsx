'use client';

import { useEffect, useState, useCallback } from 'react';
import { HelpCircle, Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
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

interface FAQData {
  id: string;
  pertanyaan: string;
  jawaban: string;
  urutan: number;
  aktif: boolean;
}

interface FAQFormData {
  id?: string;
  pertanyaan: string;
  jawaban: string;
  urutan: number;
  aktif: boolean;
}

const emptyForm: FAQFormData = {
  pertanyaan: '',
  jawaban: '',
  urutan: 0,
  aktif: true,
};

function FAQContent() {
  const [items, setItems] = useState<FAQData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<FAQFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchFAQ = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/faq', { cache: 'no-store' });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Gagal memuat data FAQ');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFAQ();
  }, [fetchFAQ]);

  const openCreateModal = () => {
    setFormData(emptyForm);
    setIsEditing(false);
    setModalOpen(true);
  };

  const openEditModal = (item: FAQData) => {
    setFormData({
      id: item.id,
      pertanyaan: item.pertanyaan,
      jawaban: item.jawaban,
      urutan: item.urutan,
      aktif: item.aktif,
    });
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.pertanyaan.trim() || !formData.jawaban.trim()) {
      toast.error('Pertanyaan dan jawaban wajib diisi');
      return;
    }

    setSaving(true);
    try {
      const method = isEditing ? 'PUT' : 'POST';
      const res = await fetch('/api/faq', {
        cache: 'no-store',
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(isEditing ? 'FAQ berhasil diperbarui' : 'FAQ berhasil ditambahkan');
        setModalOpen(false);
        fetchFAQ();
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
      const res = await fetch(`/api/faq?id=${deleteId}`, { cache: 'no-store', method: 'DELETE' });
      if (res.ok) {
        toast.success('FAQ berhasil dihapus');
        fetchFAQ();
      } else {
        toast.error('Gagal menghapus FAQ');
      }
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const sortedItems = [...items].sort((a, b) => a.urutan - b.urutan);

  return (
    <AuthGuard>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div


            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl font-bold text-foreground">Kelola FAQ</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Pertanyaan yang sering diajukan
              </p>
            </div>
            <Button
              onClick={openCreateModal}
              className="bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah FAQ
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
                    <TableHead>Pertanyaan</TableHead>
                    <TableHead className="hidden lg:table-cell">Jawaban</TableHead>
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
                        <TableCell><Skeleton className="h-4 w-60" /></TableCell>
                        <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-48" /></TableCell>
                        <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-10" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-14" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      </TableRow>
                    ))
                  ) : sortedItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                        <HelpCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">Belum ada data FAQ</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedItems.map((item, idx) => (
                      <TableRow key={item.id} className="group">
                        <TableCell className="text-muted-foreground text-sm">{idx + 1}</TableCell>
                        <TableCell>
                          <span className="text-sm font-medium text-foreground">{item.pertanyaan}</span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-sm text-muted-foreground line-clamp-2">{item.jawaban}</span>
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
                <HelpCircle className="w-5 h-5 text-gold" />
                {isEditing ? 'Edit FAQ' : 'Tambah FAQ Baru'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="faq-pertanyaan">Pertanyaan *</Label>
                <Input
                  id="faq-pertanyaan"
                  placeholder="Tulis pertanyaan..."
                  value={formData.pertanyaan}
                  onChange={(e) => setFormData({ ...formData, pertanyaan: e.target.value })}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="faq-jawaban">Jawaban *</Label>
                <Textarea
                  id="faq-jawaban"
                  placeholder="Tulis jawaban..."
                  value={formData.jawaban}
                  onChange={(e) => setFormData({ ...formData, jawaban: e.target.value })}
                  rows={4}
                  className="resize-y"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="faq-urutan">Urutan</Label>
                  <Input
                    id="faq-urutan"
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
                ) : isEditing ? 'Simpan Perubahan' : 'Tambah FAQ'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus FAQ?</AlertDialogTitle>
              <AlertDialogDescription>
                FAQ yang dihapus tidak dapat dikembalikan. Lanjutkan menghapus?
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

export default function FAQManagementPage() {
  return <FAQContent />;
}
