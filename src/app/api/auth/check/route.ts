import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const adminId = request.cookies.get("admin_id")?.value;
    const adminName = request.cookies.get("admin_name")?.value;
    const adminToken = request.cookies.get("admin_token")?.value;

    if (adminId && adminToken) {
      return NextResponse.json({
        authenticated: true,
        admin: { id: adminId, name: adminName || "Admin" },
      });
    }

    return NextResponse.json({ authenticated: false });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
