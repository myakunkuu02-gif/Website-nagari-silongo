import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const kontak = await db.kontak.findFirst();
    return NextResponse.json(kontak);
  } catch {
    return NextResponse.json({ error: "Failed to fetch kontak" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, created_at, updated_at, ...data } = body;
    const existing = await db.kontak.findFirst();
    if (existing) {
      const updated = await db.kontak.update({ where: { id: existing.id }, data });
      return NextResponse.json(updated);
    }
    const created = await db.kontak.create({ data });
    return NextResponse.json(created);
  } catch {
    return NextResponse.json({ error: "Failed to update kontak" }, { status: 500 });
  }
}
