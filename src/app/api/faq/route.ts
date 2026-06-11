import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// GET: Fetch all FAQ ordered by urutan
export async function GET() {
  try {
    const faq = await db.fAQ.findMany({
      orderBy: { urutan: 'asc' },
    });
    return NextResponse.json(faq);
  } catch {
    return NextResponse.json({ error: 'Gagal memuat data FAQ' }, { status: 500 });
  }
}

// POST: Create a new FAQ
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pertanyaan, jawaban, urutan, aktif } = body;

    if (!pertanyaan || pertanyaan.trim().length < 2) {
      return NextResponse.json({ error: 'Pertanyaan minimal 2 karakter' }, { status: 422 });
    }
    if (!jawaban || jawaban.trim().length < 2) {
      return NextResponse.json({ error: 'Jawaban minimal 2 karakter' }, { status: 422 });
    }

    const faq = await db.fAQ.create({
      data: {
        pertanyaan: pertanyaan.trim(),
        jawaban: jawaban.trim(),
        urutan: parseInt(urutan) || 0,
        aktif: aktif !== false,
      },
    });

    return NextResponse.json(faq, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Gagal menambahkan FAQ' }, { status: 500 });
  }
}

// PUT: Update a FAQ
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, pertanyaan, jawaban, urutan, aktif } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID FAQ diperlukan' }, { status: 422 });
    }

    const existing = await db.fAQ.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'FAQ tidak ditemukan' }, { status: 404 });
    }

    const updated = await db.fAQ.update({
      where: { id },
      data: {
        pertanyaan: pertanyaan !== undefined ? pertanyaan.trim() : existing.pertanyaan,
        jawaban: jawaban !== undefined ? jawaban.trim() : existing.jawaban,
        urutan: urutan !== undefined ? parseInt(urutan) || 0 : existing.urutan,
        aktif: aktif !== undefined ? aktif : existing.aktif,
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Gagal memperbarui FAQ' }, { status: 500 });
  }
}

// DELETE: Delete a FAQ by id (query param)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID FAQ diperlukan' }, { status: 422 });
    }

    await db.fAQ.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Gagal menghapus FAQ' }, { status: 500 });
  }
}
