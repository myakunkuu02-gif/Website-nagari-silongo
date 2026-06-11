import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { siteUrl } from "@/lib/supabase/config";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nagari Silongo | Portal Resmi Pemerintahan Nagari",
    template: "%s | Nagari Silongo",
  },
  description:
    "Website resmi Nagari Silongo, Kecamatan Lubuk Tarok, Kabupaten Sijunjung, Sumatera Barat. Portal premium untuk profil nagari, berita, wisata, galeri, pemerintahan, dan layanan informasi publik.",
  keywords: [
    "Nagari Silongo",
    "Lubuk Tarok",
    "Sijunjung",
    "Sumatera Barat",
    "Pemerintahan Nagari",
    "Minangkabau",
    "Wisata Silongo",
  ],
  openGraph: {
    title: "Nagari Silongo | Portal Resmi Pemerintahan Nagari",
    description:
      "Portal pemerintahan digital modern Nagari Silongo dengan nuansa Minangkabau premium, berita dinamis, galeri, wisata, dan dashboard admin Supabase.",
    type: "website",
    locale: "id_ID",
    siteName: "Nagari Silongo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nagari Silongo | Portal Resmi Pemerintahan Nagari",
    description:
      "Portal resmi Nagari Silongo dengan desain premium, informasi publik, budaya, wisata, dan CMS admin modern.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} bg-background text-foreground antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
