import { NextResponse } from "next/server";
import { getGalleryList } from "@/services/site-content";

export async function GET() {
  const data = await getGalleryList();
  return NextResponse.json(data);
}
