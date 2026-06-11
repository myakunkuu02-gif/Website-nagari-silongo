import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    total: 12458,
    today: 147,
  });
}