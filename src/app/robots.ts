import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

/**
 * robots.txt.
 * API proxy va yuklamalar indekslanmaydi — ular sahifa emas.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/upload/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
