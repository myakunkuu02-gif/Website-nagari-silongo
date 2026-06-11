import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const hero = await db.hero.findFirst();
    return NextResponse.json(hero);
  } catch {
    return NextResponse.json({ error: "Failed to fetch hero" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, created_at, updated_at, ...data } = body;
    const existing = await db.hero.findFirst();
    if (existing) {
      const updated = await db.hero.update({ where: { id: existing.id }, data });
      return NextResponse.json(updated);
    }
    const created = await db.hero.create({ data });
    return NextResponse.json(created);
  } catch {
    return NextResponse.json({ error: "Failed to update hero" }, { status: 500 });
  }
}
