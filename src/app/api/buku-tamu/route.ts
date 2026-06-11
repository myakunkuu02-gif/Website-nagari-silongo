import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/lib/db';

// GET: Return entries. If admin=true, return all. Otherwise, only visible.
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';

    const where = isAdmin ? {} : { is_visible: true };

    const entries = await db.bukuTamu.findMany({
      where,
      orderBy: { created_at: 'desc' },
      take: isAdmin ? 100 : 50,
    });

    return NextResponse.json(entries);
  } catch {
    return NextResponse.json(
      { error: 'Gagal memuat data buku tamu' },
      { status: 500 }
    );
  }
}

// POST: Create a new guest book entry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, email, pesan } = body;

    // Trim inputs
    const trimmedNama = (nama || '').trim();
    const trimmedEmail = (email || '').trim() || null;
    const trimmedPesan = (pesan || '').trim();

    // Validate nama
    if (!trimmedNama || trimmedNama.length < 2) {
      return NextResponse.json(
        { error: 'Nama wajib diisi (minimal 2 karakter)' },
        { status: 422 }
      );
    }

    // Validate pesan
    if (!trimmedPesan || trimmedPesan.length < 5) {
      return NextResponse.json(
        { error: 'Pesan wajib diisi (minimal 5 karakter)' },
        { status: 422 }
      );
    }

    // Validate email format if provided
    if (trimmedEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        return NextResponse.json(
          { error: 'Format email tidak valid' },
          { status: 422 }
        );
      }
    }

    const entry = await db.bukuTamu.create({
      data: {
        nama: trimmedNama,
        email: trimmedEmail,
        pesan: trimmedPesan,
        is_visible: true,
      },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Gagal menyimpan pesan' },
      { status: 400 }
    );
  }
}

// PUT: Update visibility of a guest book entry
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, is_visible } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID diperlukan' }, { status: 422 });
    }

    const existing = await db.bukuTamu.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Pesan tidak ditemukan' }, { status: 404 });
    }

    const updated = await db.bukuTamu.update({
      where: { id },
      data: {
        is_visible: is_visible !== undefined ? is_visible : existing.is_visible,
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Gagal memperbarui pesan' }, { status: 500 });
  }
}

// DELETE: Delete a guest book entry by id (query param)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID diperlukan' }, { status: 422 });
    }

    await db.bukuTamu.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Gagal menghapus pesan' }, { status: 500 });
  }
}
