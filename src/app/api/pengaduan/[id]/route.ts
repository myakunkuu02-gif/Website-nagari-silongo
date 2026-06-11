import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// PUT: Update status field (and optionally other fields)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await db.pengaduan.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Pengaduan tidak ditemukan' },
        { status: 404 }
      );
    }

    const validStatuses = ['Diterima', 'Diproses', 'Selesai', 'Ditolak'];
    if (body.status !== undefined && !validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: `Status harus salah satu dari: ${validStatuses.join(', ')}` },
        { status: 422 }
      );
    }

    const updated = await db.pengaduan.update({
      where: { id },
      data: {
        ...(body.status !== undefined && { status: body.status }),
        ...(body.nama !== undefined && { nama: body.nama.trim() }),
        ...(body.email !== undefined && { email: body.email?.trim() || null }),
        ...(body.telepon !== undefined && { telepon: body.telepon?.trim() || null }),
        ...(body.kategori !== undefined && { kategori: body.kategori.trim() }),
        ...(body.judul !== undefined && { judul: body.judul.trim() }),
        ...(body.pesan !== undefined && { pesan: body.pesan.trim() }),
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: 'Gagal memperbarui pengaduan' },
      { status: 500 }
    );
  }
}
