import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // Mock endpoint - just return success without actually sending
    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dikirim",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Gagal mengirim pesan" },
      { status: 500 }
    );
  }
}