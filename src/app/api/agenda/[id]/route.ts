import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// PUT: Update Agenda by id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await db.agenda.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Agenda tidak ditemukan' },
        { status: 404 }
      );
    }

    const updated = await db.agenda.update({
      where: { id },
      data: {
        ...(body.tanggal !== undefined && { tanggal: body.tanggal.trim() }),
        ...(body.judul !== undefined && { judul: body.judul.trim() }),
        ...(body.lokasi !== undefined && { lokasi: body.lokasi.trim() }),
        ...(body.kategori !== undefined && { kategori: body.kategori.trim() }),
        ...(body.deskripsi !== undefined && { deskripsi: body.deskripsi?.trim() || null }),
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: 'Gagal memperbarui agenda' },
      { status: 500 }
    );
  }
}

// DELETE: Delete Agenda by id
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await db.agenda.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Agenda tidak ditemukan' },
        { status: 404 }
      );
    }

    await db.agenda.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Gagal menghapus agenda' },
      { status: 500 }
    );
  }
}
