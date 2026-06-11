"use client";

import { useState } from "react";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { AuthNotice } from "@/components/admin/AuthNotice";
import { createClient } from "@/lib/supabase/browser";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#07111f_0%,#091525_55%,#07111f_100%)] px-4 py-10">
      <div className="container-shell flex min-h-[calc(100vh-80px)] items-center justify-center">
        <div className="glass-panel w-full max-w-xl rounded-[36px] p-8 md:p-10">
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-[#63c9a5]/20 bg-[#63c9a5]/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#7ad7b5]">Password Baru</span>
            <h1 className="font-display text-5xl text-white">Perbarui password admin</h1>
            <p className="text-sm leading-7 text-slate-300">Masukkan password baru untuk akun admin Anda. Halaman ini bekerja dengan session recovery dari Supabase Auth.</p>
          </div>
          <div className="mt-8 space-y-5">
            {!isSupabaseConfigured() ? <AuthNotice /> : null}
            <label className="glass-soft flex items-center gap-3 rounded-[24px] px-5 py-4 text-sm text-slate-300">
              <LockKeyhole className="h-4 w-4 text-[#f0c86e]" />
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password baru" className="w-full bg-transparent outline-none placeholder:text-slate-500" />
            </label>
            <button
              type="button"
              onClick={async () => {
                const supabase = createClient();
                if (!supabase) {
                  toast.error("Supabase belum dikonfigurasi.");
                  return;
                }
                setLoading(true);
                const { error } = await supabase.auth.updateUser({ password });
                setLoading(false);
                if (error) {
                  toast.error(error.message);
                  return;
                }
                toast.success("Password berhasil diperbarui.");
              }}
              className="rounded-full bg-[#f0c86e] px-6 py-4 text-sm font-extrabold text-slate-950"
            >
              {loading ? "Menyimpan..." : "Simpan password baru"}
            </button>
            <Link href="/admin/login" className="block text-sm text-slate-400 transition hover:text-[#f0c86e]">Kembali ke login admin</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
