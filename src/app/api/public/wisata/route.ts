import { NextResponse } from "next/server";
import { getWisataList } from "@/services/site-content";

export async function GET() {
  const data = await getWisataList();
  return NextResponse.json(data);
}
