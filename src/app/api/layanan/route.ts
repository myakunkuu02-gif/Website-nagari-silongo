import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// GET: Fetch all layanan ordered by urutan
export async function GET() {
  try {
    const layanan = await db.layanan.findMany({
      orderBy: { urutan: 'asc' },
    });
    return NextResponse.json(layanan);
  } catch {
    return NextResponse.json({ error: 'Gagal memuat data layanan' }, { status: 500 });
  }
}

// POST: Create a new layanan
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, deskripsi, icon, tag, urutan, aktif } = body;

    if (!nama || nama.trim().length < 2) {
      return NextResponse.json({ error: 'Nama layanan minimal 2 karakter' }, { status: 422 });
    }
    if (!deskripsi || deskripsi.trim().length < 2) {
      return NextResponse.json({ error: 'Deskripsi layanan minimal 2 karakter' }, { status: 422 });
    }

    const layanan = await db.layanan.create({
      data: {
        nama: nama.trim(),
        deskripsi: deskripsi.trim(),
        icon: icon || 'FileText',
        tag: tag?.trim() || null,
        urutan: parseInt(urutan) || 0,
        aktif: aktif !== false,
      },
    });

    return NextResponse.json(layanan, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Gagal menambahkan layanan' }, { status: 500 });
  }
}

// PUT: Update a layanan
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, nama, deskripsi, icon, tag, urutan, aktif } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID layanan diperlukan' }, { status: 422 });
    }

    const existing = await db.layanan.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Layanan tidak ditemukan' }, { status: 404 });
    }

    const updated = await db.layanan.update({
      where: { id },
      data: {
        nama: nama !== undefined ? nama.trim() : existing.nama,
        deskripsi: deskripsi !== undefined ? deskripsi.trim() : existing.deskripsi,
        icon: icon !== undefined ? icon : existing.icon,
        tag: tag !== undefined ? (tag?.trim() || null) : existing.tag,
        urutan: urutan !== undefined ? parseInt(urutan) || 0 : existing.urutan,
        aktif: aktif !== undefined ? aktif : existing.aktif,
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Gagal memperbarui layanan' }, { status: 500 });
  }
}

// DELETE: Delete a layanan by id (query param)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID layanan diperlukan' }, { status: 422 });
    }

    await db.layanan.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Gagal menghapus layanan' }, { status: 500 });
  }
}
