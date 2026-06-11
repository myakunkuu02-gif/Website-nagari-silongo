import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';

    const take = isAdmin ? 100 : 10;

    const pengaduan = await db.pengaduan.findMany({
      orderBy: { created_at: 'desc' },
      take,
    });
    return NextResponse.json(pengaduan);
  } catch {
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, email, telepon, kategori, judul, pesan } = body;

    if (!nama || nama.trim().length < 2) {
      return NextResponse.json({ error: 'Nama minimal 2 karakter' }, { status: 422 });
    }
    if (!judul || judul.trim().length < 3) {
      return NextResponse.json({ error: 'Judul minimal 3 karakter' }, { status: 422 });
    }
    if (!pesan || pesan.trim().length < 10) {
      return NextResponse.json({ error: 'Pesan minimal 10 karakter' }, { status: 422 });
    }

    const validKategori = ['Infrastruktur', 'Pelayanan Publik', 'Sosial', 'Kebersihan', 'Keamanan', 'Umum'];
    const finalKategori = validKategori.includes(kategori) ? kategori : 'Umum';

    const pengaduan = await db.pengaduan.create({
      data: {
        nama: nama.trim(),
        email: email?.trim() || null,
        telepon: telepon?.trim() || null,
        kategori: finalKategori,
        judul: judul.trim(),
        pesan: pesan.trim(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Pengaduan berhasil dikirim! Tim kami akan segera menindaklanjuti.',
        data: pengaduan,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Terjadi kesalahan saat mengirim pengaduan' }, { status: 500 });
  }
}

// PUT: Update status of a pengaduan
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID diperlukan' }, { status: 422 });
    }

    const validStatus = ['Diterima', 'Diproses', 'Selesai', 'Ditolak'];
    if (status && !validStatus.includes(status)) {
      return NextResponse.json({ error: 'Status tidak valid' }, { status: 422 });
    }

    const existing = await db.pengaduan.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Pengaduan tidak ditemukan' }, { status: 404 });
    }

    const updated = await db.pengaduan.update({
      where: { id },
      data: {
        status: status || existing.status,
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Gagal memperbarui pengaduan' }, { status: 500 });
  }
}
