import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const profil = await db.profil.findFirst();
    return NextResponse.json(profil);
  } catch {
    return NextResponse.json({ error: "Failed to fetch profil" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, created_at, updated_at, ...data } = body;
    const existing = await db.profil.findFirst();
    if (existing) {
      const updated = await db.profil.update({ where: { id: existing.id }, data });
      return NextResponse.json(updated);
    }
    const created = await db.profil.create({ data });
    return NextResponse.json(created);
  } catch {
    return NextResponse.json({ error: "Failed to update profil" }, { status: 500 });
  }
}
