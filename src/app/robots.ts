import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/supabase/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
