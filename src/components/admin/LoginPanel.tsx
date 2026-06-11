"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/browser";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AuthNotice } from "@/components/admin/AuthNotice";

export function LoginPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const supabase = createClient();
    if (!supabase) {
      toast.error("Supabase belum dikonfigurasi.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    router.replace(searchParams.get("redirectedFrom") ?? "/admin");
    router.refresh();
  };

  return (
    <div className="glass-panel w-full max-w-xl rounded-[36px] p-8 md:p-10">
      <div className="space-y-4">
        <span className="inline-flex rounded-full border border-[#f0c86e]/20 bg-[#f0c86e]/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#f0c86e]">
          Supabase Auth Login
        </span>
        <h1 className="font-display text-5xl text-white">Masuk ke dashboard admin</h1>
        <p className="text-sm leading-7 text-slate-300">Gunakan akun admin yang telah dibuat di Supabase Authentication untuk mengelola seluruh konten website resmi Nagari Silongo.</p>
      </div>
      <div className="mt-8 space-y-5">
        {!isSupabaseConfigured() ? <AuthNotice /> : null}
        <form onSubmit={submit} className="space-y-4">
          <label className="glass-soft flex items-center gap-3 rounded-[24px] px-5 py-4 text-sm text-slate-300">
            <Mail className="h-4 w-4 text-[#67a8ff]" />
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="Email admin" className="w-full bg-transparent outline-none placeholder:text-slate-500" />
          </label>
          <label className="glass-soft flex items-center gap-3 rounded-[24px] px-5 py-4 text-sm text-slate-300">
            <LockKeyhole className="h-4 w-4 text-[#f0c86e]" />
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required placeholder="Password" className="w-full bg-transparent outline-none placeholder:text-slate-500" />
          </label>
          <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f0c86e] px-6 py-4 text-sm font-extrabold text-slate-950" disabled={loading}>
            {loading ? "Memproses..." : "Login Admin"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <div className="flex items-center justify-between text-sm text-slate-400">
          <Link href="/admin/forgot-password" className="transition hover:text-[#67a8ff]">Lupa password?</Link>
          <Link href="/" className="transition hover:text-[#f0c86e]">Kembali ke website</Link>
        </div>
      </div>
    </div>
  );
}
