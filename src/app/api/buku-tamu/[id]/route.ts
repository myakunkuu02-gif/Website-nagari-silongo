import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// PUT: Toggle is_visible or update entry
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await db.bukuTamu.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Entri buku tamu tidak ditemukan' },
        { status: 404 }
      );
    }

    const updated = await db.bukuTamu.update({
      where: { id },
      data: {
        ...(body.nama !== undefined && { nama: body.nama.trim() }),
        ...(body.email !== undefined && { email: body.email?.trim() || null }),
        ...(body.pesan !== undefined && { pesan: body.pesan.trim() }),
        ...(body.is_visible !== undefined && { is_visible: body.is_visible }),
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: 'Gagal memperbarui entri buku tamu' },
      { status: 500 }
    );
  }
}

// DELETE: Delete entry
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await db.bukuTamu.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Entri buku tamu tidak ditemukan' },
        { status: 404 }
      );
    }

    await db.bukuTamu.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Gagal menghapus entri buku tamu' },
      { status: 500 }
    );
  }
}
