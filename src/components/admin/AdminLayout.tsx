'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ImageIcon,
  FileText,
  Users,
  Camera,
  LogOut,
  Menu,
  Newspaper,
  BarChart3,
  MapPin,
  Phone,
  ChevronLeft,
  Crown,
  Eye,
  Shield,
  CalendarDays,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { toast } from 'sonner';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Kelola Hero', href: '/admin/hero', icon: <ImageIcon className="w-4 h-4" /> },
  { label: 'Kelola Profil', href: '/admin/profil', icon: <FileText className="w-4 h-4" /> },
  { label: 'Kelola Sambutan', href: '/admin/sambutan', icon: <Crown className="w-4 h-4" /> },
  { label: 'Kelola Visi Misi', href: '/admin/visi-misi', icon: <Eye className="w-4 h-4" /> },
  { label: 'Kelola Statistik', href: '/admin/statistik', icon: <BarChart3 className="w-4 h-4" /> },
  { label: 'Kelola Layanan', href: '/admin/layanan', icon: <Shield className="w-4 h-4" /> },
  { label: 'Kelola Agenda', href: '/admin/agenda', icon: <CalendarDays className="w-4 h-4" /> },
  { label: 'Kelola Pemerintahan', href: '/admin/pemerintahan', icon: <Users className="w-4 h-4" /> },
  { label: 'Kelola Wisata', href: '/admin/wisata', icon: <MapPin className="w-4 h-4" /> },
  { label: 'Kelola Berita', href: '/admin/berita', icon: <Newspaper className="w-4 h-4" /> },
  { label: 'Kelola Galeri', href: '/admin/galeri', icon: <Camera className="w-4 h-4" /> },
  { label: 'Kelola Kontak', href: '/admin/kontak', icon: <Phone className="w-4 h-4" /> },
  { label: 'Kelola FAQ', href: '/admin/faq', icon: <HelpCircle className="w-4 h-4" /> },
  { label: 'Kelola Pengaduan', href: '/admin/pengaduan', icon: <AlertTriangle className="w-4 h-4" /> },
];

interface SidebarNavProps {
  collapsed: boolean;
  adminName: string;
  pathname: string;
  onNavigate: (href: string) => void;
}

function SidebarNav({ collapsed, adminName, pathname, onNavigate }: SidebarNavProps) {
  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-lg glow-gold shrink-0">
          <span className="text-lg font-bold text-navy">NS</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h2 className="text-sm font-bold text-primary leading-tight">Nagari Silongo</h2>
            <p className="text-[10px] text-muted-foreground leading-tight">Admin Panel</p>
          </div>
        )}
      </div>

      <Separator className="bg-border/50 shrink-0" />

      {/* Navigation - scrollable */}
      <ScrollArea className="flex-1 min-h-0 px-3 py-3">
        <nav className="space-y-1">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(item.href)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive(item.href)
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              {item.icon}
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          ))}
        </nav>
      </ScrollArea>

      <Separator className="bg-border/50 shrink-0" />

      {/* Admin Info (no logout here - logout moved to top bar) */}
      <div className="px-3 py-3 shrink-0">
        {!collapsed && (
          <div className="px-3 py-2 rounded-lg bg-muted/30">
            <p className="text-xs font-semibold text-foreground truncate">{adminName}</p>
            <p className="text-[10px] text-muted-foreground">Administrator</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [adminName, setAdminName] = useState<string>('Admin');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check', { cache: 'no-store' });
        const data = await res.json();
        if (data.authenticated && data.admin?.name) {
          setAdminName(data.admin.name);
        } else if (!data.authenticated) {
          router.push('/admin/login');
        }
      } catch {
        // ignore
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Berhasil logout');
      router.push('/admin/login');
    } catch {
      toast.error('Gagal logout');
    }
  };

  const handleNavigate = (href: string) => {
    router.push(href);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 flex-col border-r border-border/50 bg-card/80 backdrop-blur-xl shadow-sm overflow-hidden">
        <SidebarNav
          collapsed={collapsed}
          adminName={adminName}
          pathname={pathname}
          onNavigate={handleNavigate}
        />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors z-50"
        >
          <ChevronLeft className={cn('w-3 h-3 transition-transform duration-300', collapsed && 'rotate-180')} />
        </button>
      </aside>

      {/* Top Bar - visible on all screens with logout on right */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6 py-3 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 bg-card">
              <SheetTitle className="sr-only">Navigasi Admin</SheetTitle>
              <SidebarNav
                collapsed={false}
                adminName={adminName}
                pathname={pathname}
                onNavigate={handleNavigate}
              />
            </SheetContent>
          </Sheet>

          {/* Logo - mobile only */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
              <span className="text-xs font-bold text-navy">NS</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground leading-tight">Admin Panel</h1>
              <p className="text-[10px] text-muted-foreground">Nagari Silongo</p>
            </div>
          </div>

          {/* Breadcrumb - desktop only */}
          <div className="hidden lg:flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Admin</span>
            <span className="text-muted-foreground/50">/</span>
            <span className="font-medium text-foreground">
              {pathname === '/admin' ? 'Dashboard' : navItems.find(i => i.href !== '/admin' && pathname.startsWith(i.href))?.label || 'Halaman'}
            </span>
          </div>
        </div>

        {/* Right side - admin name + logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
              <span className="text-[10px] font-bold text-navy">{adminName.charAt(0).toUpperCase()}</span>
            </div>
            <span className="text-xs text-muted-foreground hidden md:inline">{adminName}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 hover:bg-red-500/10 gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Logout</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main
        className={cn(
          'min-h-screen transition-all duration-300',
          collapsed ? 'lg:pl-[72px]' : 'lg:pl-64'
        )}
      >
        <div
          key={pathname}
          className="p-4 md:p-6 lg:p-8"
        >
          {children}
        </div>
      </main>
    </div>
  );
}