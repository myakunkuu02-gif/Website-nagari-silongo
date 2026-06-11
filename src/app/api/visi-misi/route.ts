import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const vm = await db.visiMisi.findFirst();
    return NextResponse.json(vm);
  } catch {
    return NextResponse.json({ error: "Failed to fetch visi misi" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, created_at, updated_at, ...data } = body;
    const existing = await db.visiMisi.findFirst();
    if (existing) {
      const updated = await db.visiMisi.update({ where: { id: existing.id }, data });
      return NextResponse.json(updated);
    }
    const created = await db.visiMisi.create({ data });
    return NextResponse.json(created);
  } catch {
    return NextResponse.json({ error: "Failed to update visi misi" }, { status: 500 });
  }
}
