import { LoginPanel } from "@/components/admin/LoginPanel";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(103,168,255,0.16),transparent_22%),radial-gradient(circle_at_80%_10%,rgba(240,200,110,0.14),transparent_18%),linear-gradient(180deg,#07111f_0%,#091525_55%,#07111f_100%)] px-4 py-10">
      <div className="container-shell flex min-h-[calc(100vh-80px)] items-center justify-center">
        <LoginPanel />
      </div>
    </main>
  );
}
