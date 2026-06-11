'use client';

import { useEffect, useState, useCallback } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
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

interface PengaduanData {
  id: string;
  nama: string;
  email?: string;
  telepon?: string;
  kategori: string;
  judul: string;
  pesan: string;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS = ['Diterima', 'Diproses', 'Selesai', 'Ditolak'];

const statusColorMap: Record<string, string> = {
  Diterima: 'bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20',
  Diproses: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20',
  Selesai: 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20',
  Ditolak: 'bg-red-500/10 text-red-600 hover:bg-red-500/20',
};

const kategoriColorMap: Record<string, string> = {
  Infrastruktur: 'bg-orange-500/10 text-orange-600',
  'Pelayanan Publik': 'bg-purple-500/10 text-purple-600',
  Sosial: 'bg-pink-500/10 text-pink-600',
  Kebersihan: 'bg-teal-500/10 text-teal-600',
  Keamanan: 'bg-indigo-500/10 text-indigo-600',
  Umum: 'bg-gray-500/10 text-gray-600',
};

function PengaduanContent() {
  const [items, setItems] = useState<PengaduanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchPengaduan = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/pengaduan?admin=true', { cache: 'no-store' });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Gagal memuat data pengaduan');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPengaduan();
  }, [fetchPengaduan]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/pengaduan', {
        cache: 'no-store',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        toast.success(`Status diubah menjadi "${newStatus}"`);
        fetchPengaduan();
      } else {
        toast.error('Gagal mengubah status');
      }
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
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
          <div>
            <h1 className="text-2xl font-bold text-foreground">Kelola Pengaduan</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Pantau dan kelola pengaduan masyarakat
            </p>
          </div>

          {/* Stats */}
          {!loading && items.length > 0 && (
            <div

              className="flex flex-wrap items-center gap-3"
            >
              <Badge variant="secondary" className="text-sm">{items.length} total</Badge>
              <Badge variant="outline" className="text-sm">
                {items.filter((i) => i.status === 'Diterima').length} diterima
              </Badge>
              <Badge variant="outline" className="text-sm">
                {items.filter((i) => i.status === 'Diproses').length} diproses
              </Badge>
              <Badge variant="outline" className="text-sm">
                {items.filter((i) => i.status === 'Selesai').length} selesai
              </Badge>
              <Badge variant="outline" className="text-sm">
                {items.filter((i) => i.status === 'Ditolak').length} ditolak
              </Badge>
            </div>
          )}

          {/* Table */}
          <div

            className="rounded-xl border border-border/30 shadow-sm overflow-hidden bg-card"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="w-10">No</TableHead>
                    <TableHead>Pelapor</TableHead>
                    <TableHead className="hidden md:table-cell">Kategori</TableHead>
                    <TableHead>Judul</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-6" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                        <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell className="hidden sm:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                      </TableRow>
                    ))
                  ) : items.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                        <AlertTriangle className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">Belum ada pengaduan masuk</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    items.map((item, idx) => (
                      <TableRow key={item.id} className="group">
                        <TableCell className="text-muted-foreground text-sm">{idx + 1}</TableCell>
                        <TableCell>
                          <div className="space-y-0.5">
                            <span className="text-sm font-medium text-foreground block">{item.nama}</span>
                            {item.email && (
                              <span className="text-xs text-muted-foreground block">{item.email}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            variant="secondary"
                            className={kategoriColorMap[item.kategori] || ''}
                          >
                            {item.kategori}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium text-foreground">{item.judul}</span>
                        </TableCell>
                        <TableCell>
                          {updatingId === item.id ? (
                            <div className="flex items-center gap-1">
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />
                            </div>
                          ) : (
                            <Select
                              value={item.status}
                              onValueChange={(value) => handleStatusChange(item.id, value)}
                            >
                              <SelectTrigger className="h-7 w-[120px] text-xs">
                                <SelectValue>
                                  <Badge
                                    variant="secondary"
                                    className={statusColorMap[item.status] || ''}
                                  >
                                    {item.status}
                                  </Badge>
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {STATUS_OPTIONS.map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {status}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDate(item.created_at)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </AdminLayout>
    </AuthGuard>
  );
}

export default function PengaduanManagementPage() {
  return <PengaduanContent />;
}
