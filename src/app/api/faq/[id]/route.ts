import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// PUT: Update FAQ by id (also accept toggle: { aktif: boolean })
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await db.faq.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'FAQ tidak ditemukan' },
        { status: 404 }
      );
    }

    const updated = await db.faq.update({
      where: { id },
      data: {
        ...(body.pertanyaan !== undefined && { pertanyaan: body.pertanyaan.trim() }),
        ...(body.jawaban !== undefined && { jawaban: body.jawaban.trim() }),
        ...(body.urutan !== undefined && { urutan: body.urutan }),
        ...(body.aktif !== undefined && { aktif: body.aktif }),
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: 'Gagal memperbarui FAQ' },
      { status: 500 }
    );
  }
}

// DELETE: Delete FAQ by id
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await db.faq.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'FAQ tidak ditemukan' },
        { status: 404 }
      );
    }

    await db.faq.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Gagal menghapus FAQ' },
      { status: 500 }
    );
  }
}
