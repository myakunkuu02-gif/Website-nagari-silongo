"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { AuthNotice } from "@/components/admin/AuthNotice";
import { createClient } from "@/lib/supabase/browser";
import { isSupabaseConfigured, siteUrl } from "@/lib/supabase/config";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#07111f_0%,#091525_55%,#07111f_100%)] px-4 py-10">
      <div className="container-shell flex min-h-[calc(100vh-80px)] items-center justify-center">
        <div className="glass-panel w-full max-w-xl rounded-[36px] p-8 md:p-10">
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-[#67a8ff]/20 bg-[#67a8ff]/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#8fc0ff]">Reset Password</span>
            <h1 className="font-display text-5xl text-white">Lupa password admin</h1>
            <p className="text-sm leading-7 text-slate-300">Masukkan email admin. Sistem akan mengirim tautan reset password melalui Supabase Auth.</p>
          </div>
          <div className="mt-8 space-y-5">
            {!isSupabaseConfigured() ? <AuthNotice /> : null}
            <label className="glass-soft flex items-center gap-3 rounded-[24px] px-5 py-4 text-sm text-slate-300">
              <Mail className="h-4 w-4 text-[#67a8ff]" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email admin" className="w-full bg-transparent outline-none placeholder:text-slate-500" />
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
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                  redirectTo: `${siteUrl}/admin/reset-password`,
                });
                setLoading(false);
                if (error) {
                  toast.error(error.message);
                  return;
                }
                toast.success("Tautan reset password telah dikirim.");
              }}
              className="rounded-full bg-[#f0c86e] px-6 py-4 text-sm font-extrabold text-slate-950"
            >
              {loading ? "Mengirim..." : "Kirim tautan reset"}
            </button>
            <Link href="/admin/login" className="block text-sm text-slate-400 transition hover:text-[#f0c86e]">Kembali ke login admin</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
