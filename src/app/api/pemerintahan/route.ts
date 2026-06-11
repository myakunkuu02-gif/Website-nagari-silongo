import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all") === "true";
    const where = all ? {} : { status_aktif: true };
    const list = await db.pemerintahan.findMany({ where, orderBy: { urutan: "asc" } });
    return NextResponse.json(list);
  } catch {
    return NextResponse.json({ error: "Failed to fetch pemerintahan" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, created_at, updated_at, ...data } = body;
    const created = await db.pemerintahan.create({ data });
    return NextResponse.json(created);
  } catch {
    return NextResponse.json({ error: "Failed to create pemerintahan" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, created_at, updated_at, ...data } = body;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    const updated = await db.pemerintahan.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update pemerintahan" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await db.pemerintahan.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete pemerintahan" }, { status: 500 });
  }
}
