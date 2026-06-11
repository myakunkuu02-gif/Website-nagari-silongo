'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, Loader2, Eye, EyeOff, ArrowLeft, KeyRound, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<'login' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        cache: 'no-store',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(`Selamat datang, ${data.admin.name}!`, {
          description: 'Anda akan dialihkan ke dashboard...',
        });
        setTimeout(() => {
          router.push('/admin');
        }, 800);
      } else {
        setError(data.error || 'Login gagal. Silakan coba lagi.');
        toast.error(data.error || 'Login gagal');
      }
    } catch {
      setError('Terjadi kesalahan koneksi. Silakan coba lagi.');
      toast.error('Terjadi kesalahan koneksi');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Masukkan email terlebih dahulu.');
      toast.error('Email wajib diisi');
      return;
    }

    setLoading(true);
    try {
      // Check if admin exists
      const res = await fetch('/api/auth/login', {
        cache: 'no-store',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: '__check__' }),
      });

      if (res.status === 401) {
        // Admin doesn't exist
        setError('Email tidak ditemukan dalam sistem.');
        toast.error('Email tidak terdaftar');
      } else {
        toast.success('Petunjuk reset password telah dikirim ke email Anda.', {
          description: 'Hubungi Wali Nagari untuk reset password.',
        });
        setMode('login');
      }
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Back button */}
      <a
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm font-medium text-white/60 hover:text-[var(--gold)] transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Kembali ke Halaman Utama
      </a>

      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-primary" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-custom/10 rounded-full blur-3xl animate-float-slow" />
      </div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6bTAtMzBWMkgydjJoMzR6TTIgMjJoMzR2LTJIMHYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

      {/* Rumah Gadang SVG silhouette */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-[0.03]"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,200 L0,160 Q60,100 120,120 Q180,60 240,100 Q300,40 360,80 Q420,20 480,60 Q540,10 600,50 Q660,0 720,40 Q780,0 840,40 Q900,10 960,50 Q1020,20 1080,60 Q1140,30 1200,70 Q1260,40 1320,80 Q1380,60 1440,80 L1440,200 Z"
          fill="rgba(212, 168, 67, 1)"
        />
      </svg>

      {/* Login Card */}
      <div

        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="glass-card rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div

            className="flex flex-col items-center mb-8"
          >
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-lg glow-gold">
                <span className="text-2xl font-bold text-navy">NS</span>
              </div>
              <div className="absolute -inset-3 rounded-3xl border border-gold/20 animate-pulse" />
            </div>
            <h1 className="text-xl font-bold text-primary">
              {mode === 'login' ? 'Login' : 'Reset Password'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Website Resmi Nagari Silongo
            </p>
          </div>

          {/* Form */}
          
            {mode === 'login' ? (
              <form
                key="login-form"


                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Error Message */}
                
                  {error && (
                    <div



                      className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center"
                    >
                      {error}
                    </div>
                  )}
                

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Masukkan email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 bg-background/50 border-border/50 focus:border-gold/50 focus:ring-gold/20"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-11 bg-background/50 border-border/50 focus:border-gold/50 focus:ring-gold/20"
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Memproses...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      Masuk ke Dashboard
                    </span>
                  )}
                </Button>

                {/* Forgot Password */}
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot');
                    setError('');
                  }}
                  className="w-full text-center text-sm text-muted-foreground hover:text-gold transition-colors cursor-pointer"
                >
                  Lupa password?
                </button>

                
              </form>
            ) : (
              <form
                key="forgot-form"


                onSubmit={handleForgotPassword}
                className="space-y-5"
              >
                {/* Error Message */}
                
                  {error && (
                    <div



                      className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center"
                    >
                      {error}
                    </div>
                  )}
                

                <div className="flex items-center gap-3 p-3 rounded-xl bg-gold/10 border border-gold/20 mb-2">
                  <KeyRound className="w-5 h-5 text-gold shrink-0" />
                  <p className="text-sm text-foreground">
                    Masukkan email untuk reset password.
                  </p>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="forgot-email" className="text-sm font-medium text-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="Masukkan email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 bg-background/50 border-border/50 focus:border-gold/50 focus:ring-gold/20"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-gradient-to-r from-gold to-gold-light hover:from-gold-light hover:to-gold text-navy font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Memproses...
                    </span>
                  ) : (
                    'Kirim Petunjuk Reset'
                  )}
                </Button>

                {/* Back to Login */}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                  }}
                  className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Login
                </button>
              </form>
            )}
          

          {/* Footer */}
          <div

            className="mt-6 pt-4 border-t border-border/30"
          >
            <p className="text-center text-xs text-muted-foreground">
              Pemerintahan Nagari Silongo &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-navy-light to-primary">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    }>
      <AdminLoginContent />
    </Suspense>
  );
}
