import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stats = await db.statistik.findMany({ orderBy: { created_at: "asc" } });
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Failed to fetch statistik" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, created_at, updated_at, ...data } = body;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const updated = await db.statistik.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update statistik" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, created_at, updated_at, ...data } = body;
    const created = await db.statistik.create({ data });
    return NextResponse.json(created);
  } catch {
    return NextResponse.json({ error: "Failed to create statistik" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await db.statistik.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete statistik" }, { status: 500 });
  }
}
