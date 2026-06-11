import { NextResponse } from "next/server";
import { getBeritaBySlug } from "@/services/site-content";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getBeritaBySlug(slug);
  if (!data) {
    return NextResponse.json({ message: "Berita tidak ditemukan." }, { status: 404 });
  }
  return NextResponse.json(data);
}
