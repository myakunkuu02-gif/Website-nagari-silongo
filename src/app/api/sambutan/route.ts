import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// GET: Fetch sambutan data (single record)
export async function GET() {
  try {
    const sambutan = await db.sambutan.findFirst();
    if (!sambutan) {
      return NextResponse.json({});
    }
    return NextResponse.json(sambutan);
  } catch {
    return NextResponse.json({ error: 'Gagal memuat data sambutan' }, { status: 500 });
  }
}

// PUT: Create or update sambutan data
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    // Strip readonly fields to prevent Prisma errors
    const { id, created_at, updated_at, ...data } = body;

    const existing = await db.sambutan.findFirst();

    if (existing) {
      const updated = await db.sambutan.update({
        where: { id: existing.id },
        data: {
          nama: data.nama ?? existing.nama,
          jabatan: data.jabatan ?? existing.jabatan,
          isi_sambutan: data.isi_sambutan ?? existing.isi_sambutan,
          bio: data.bio ?? existing.bio,
          masa_jabatan: data.masa_jabatan ?? existing.masa_jabatan,
          jml_jorong: data.jml_jorong ?? existing.jml_jorong,
          foto_url: data.foto_url ?? existing.foto_url,
        },
      });
      return NextResponse.json(updated);
    }

    const created = await db.sambutan.create({
      data: {
        nama: data.nama || '',
        jabatan: data.jabatan || '',
        isi_sambutan: data.isi_sambutan || '',
        bio: data.bio || '',
        masa_jabatan: data.masa_jabatan || '',
        jml_jorong: data.jml_jorong || '',
        foto_url: data.foto_url || null,
      },
    });
    return NextResponse.json(created);
  } catch (error) {
    console.error('Sambutan PUT error:', error);
    return NextResponse.json({ error: 'Gagal menyimpan data sambutan' }, { status: 500 });
  }
}