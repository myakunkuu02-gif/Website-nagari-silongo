import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const footer = await db.footerSettings.findFirst();
    return NextResponse.json(footer);
  } catch {
    return NextResponse.json({ error: "Failed to fetch footer" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, created_at, updated_at, ...data } = body;
    const existing = await db.footerSettings.findFirst();
    if (existing) {
      const updated = await db.footerSettings.update({ where: { id: existing.id }, data });
      return NextResponse.json(updated);
    }
    const created = await db.footerSettings.create({ data });
    return NextResponse.json(created);
  } catch {
    return NextResponse.json({ error: "Failed to update footer" }, { status: 500 });
  }
}
