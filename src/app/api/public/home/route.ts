import { NextResponse } from "next/server";
import { getHomeData } from "@/services/site-content";

export async function GET() {
  const data = await getHomeData();
  return NextResponse.json(data);
}
