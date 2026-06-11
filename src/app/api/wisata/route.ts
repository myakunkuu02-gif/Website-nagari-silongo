import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const list = await db.wisata.findMany({ orderBy: { created_at: "desc" } });
    return NextResponse.json(list);
  } catch {
    return NextResponse.json({ error: "Failed to fetch wisata" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, created_at, updated_at, ...data } = body;
    const created = await db.wisata.create({ data });
    return NextResponse.json(created);
  } catch {
    return NextResponse.json({ error: "Failed to create wisata" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, created_at, updated_at, ...data } = body;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const updated = await db.wisata.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update wisata" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await db.wisata.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete wisata" }, { status: 500 });
  }
}
