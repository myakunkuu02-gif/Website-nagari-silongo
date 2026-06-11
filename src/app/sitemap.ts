import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/supabase/config";
import { getBeritaList, getWisataList } from "@/services/site-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [berita, wisata] = await Promise.all([getBeritaList(), getWisataList()]);
  const baseRoutes = ["", "/profil", "/pemerintahan", "/statistik", "/wisata", "/berita", "/galeri", "/kontak"];

  return [
    ...baseRoutes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: route === "" ? 1 : 0.8 })),
    ...berita.map((item) => ({ url: `${siteUrl}/berita/${item.slug}`, lastModified: new Date(item.published_at), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...wisata.map((item) => ({ url: `${siteUrl}/wisata/${item.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
