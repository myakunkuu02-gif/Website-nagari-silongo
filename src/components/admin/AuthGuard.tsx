'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ShieldAlert } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

interface AuthState {
  authenticated: boolean;
  loading: boolean;
  admin?: { id: string; name: string } | null;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    authenticated: false,
    loading: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check');
        const data = await res.json();

        if (data.authenticated) {
          setAuthState({
            authenticated: true,
            loading: false,
            admin: data.admin,
          });
        } else {
          setAuthState({ authenticated: false, loading: false });
          router.push('/admin/login');
        }
      } catch {
        setAuthState({ authenticated: false, loading: false });
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  if (authState.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-navy-light to-primary">
        <div


          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-lg glow-gold">
              <span className="text-2xl font-bold text-navy">NS</span>
            </div>
            <div className="absolute -inset-2 rounded-2xl border-2 border-gold/20 animate-pulse" />
          </div>
          <div className="flex items-center gap-3 text-white/80">
            <Loader2 className="w-5 h-5 animate-spin text-gold" />
            <span className="text-sm font-medium">Memverifikasi autentikasi...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!authState.authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-navy-light to-primary">
        <div


          className="flex flex-col items-center gap-4 text-white"
        >
          <ShieldAlert className="w-12 h-12 text-gold" />
          <p className="text-sm text-white/60">Akses ditolak. Mengalihkan...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
