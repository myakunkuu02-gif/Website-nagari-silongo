import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Preloader from "@/components/layout/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nagari Silongo - Website Resmi Pemerintahan Nagari",
  description:
    "Website resmi Pemerintahan Nagari Silongo, Kecamatan Lubuk Tarok, Kabupaten Sijunjung, Sumatera Barat. Portal informasi, layanan publik, wisata budaya, dan berita terkini.",
  keywords: [
    "Nagari Silongo",
    "Sijunjung",
    "Sumatera Barat",
    "Minangkabau",
    "Pemerintahan Nagari",
    "Wisata Alam",
    "Budaya Minang",
  ],
  authors: [{ name: "Pemerintahan Nagari Silongo" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Nagari Silongo - Website Resmi Pemerintahan Nagari",
    description:
      "Portal informasi resmi Nagari Silongo, Kecamatan Lubuk Tarok, Kabupaten Sijunjung, Sumatera Barat.",
    siteName: "Nagari Silongo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nagari Silongo - Website Resmi Pemerintahan Nagari",
    description:
      "Portal informasi resmi Nagari Silongo, Kecamatan Lubuk Tarok, Kabupaten Sijunjung, Sumatera Barat.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Preloader />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}