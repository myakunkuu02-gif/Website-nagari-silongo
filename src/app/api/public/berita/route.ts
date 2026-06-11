import { NextResponse } from "next/server";
import { getBeritaList } from "@/services/site-content";

export async function GET() {
  const data = await getBeritaList();
  return NextResponse.json(data);
}
