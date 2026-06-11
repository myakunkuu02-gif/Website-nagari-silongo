import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// GET: Fetch all agenda ordered by tanggal DESC
export async function GET() {
  try {
    const agenda = await db.agenda.findMany({
      orderBy: { tanggal: 'desc' },
    });
    return NextResponse.json(agenda);
  } catch {
    return NextResponse.json({ error: 'Gagal memuat data agenda' }, { status: 500 });
  }
}

// POST: Create a new agenda
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tanggal, judul, lokasi, kategori, deskripsi } = body;

    if (!judul || judul.trim().length < 2) {
      return NextResponse.json({ error: 'Judul agenda minimal 2 karakter' }, { status: 422 });
    }
    if (!tanggal) {
      return NextResponse.json({ error: 'Tanggal wajib diisi' }, { status: 422 });
    }

    const agenda = await db.agenda.create({
      data: {
        tanggal,
        judul: judul.trim(),
        lokasi: lokasi?.trim() || '',
        kategori: kategori || 'Pemerintahan',
        deskripsi: deskripsi?.trim() || null,
      },
    });

    return NextResponse.json(agenda, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Gagal menambahkan agenda' }, { status: 500 });
  }
}

// PUT: Update an agenda
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, tanggal, judul, lokasi, kategori, deskripsi } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID agenda diperlukan' }, { status: 422 });
    }

    const existing = await db.agenda.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Agenda tidak ditemukan' }, { status: 404 });
    }

    const updated = await db.agenda.update({
      where: { id },
      data: {
        tanggal: tanggal !== undefined ? tanggal : existing.tanggal,
        judul: judul !== undefined ? judul.trim() : existing.judul,
        lokasi: lokasi !== undefined ? (lokasi?.trim() || '') : existing.lokasi,
        kategori: kategori !== undefined ? kategori : existing.kategori,
        deskripsi: deskripsi !== undefined ? (deskripsi?.trim() || null) : existing.deskripsi,
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Gagal memperbarui agenda' }, { status: 500 });
  }
}

// DELETE: Delete an agenda by id (query param)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID agenda diperlukan' }, { status: 422 });
    }

    await db.agenda.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Gagal menghapus agenda' }, { status: 500 });
  }
}
