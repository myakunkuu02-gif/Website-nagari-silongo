import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// PUT: Update Layanan by id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await db.layanan.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Layanan tidak ditemukan' },
        { status: 404 }
      );
    }

    const updated = await db.layanan.update({
      where: { id },
      data: {
        ...(body.nama !== undefined && { nama: body.nama.trim() }),
        ...(body.deskripsi !== undefined && { deskripsi: body.deskripsi.trim() }),
        ...(body.icon !== undefined && { icon: body.icon }),
        ...(body.tag !== undefined && { tag: body.tag?.trim() || null }),
        ...(body.urutan !== undefined && { urutan: body.urutan }),
        ...(body.aktif !== undefined && { aktif: body.aktif }),
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: 'Gagal memperbarui layanan' },
      { status: 500 }
    );
  }
}

// DELETE: Delete Layanan by id
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await db.layanan.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Layanan tidak ditemukan' },
        { status: 404 }
      );
    }

    await db.layanan.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Gagal menghapus layanan' },
      { status: 500 }
    );
  }
}
