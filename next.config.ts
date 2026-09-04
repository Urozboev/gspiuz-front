import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL ?? "http://127.0.0.1:8000";

// Laravel backend API'ni maxfiy prefiks ostida beradi (RouteServiceProvider
// routes/api.php ni shu prefiks bilan ro'yxatdan o'tkazadi).
// Brauzer faqat "/api" ni ko'radi — haqiqiy prefiks server tomonda qoladi.
const backendApiPrefix = (process.env.BACKEND_API_PREFIX ?? "api").replace(
  /^\/+|\/+$/g,
  ""
);

const backendHost = (() => {
  try {
    return new URL(backendUrl).hostname;
  } catch {
    return "127.0.0.1";
  }
})();

const isProd = process.env.NODE_ENV === "production";

/*
 * Xavfsizlik sarlavhalari. Sayt ommaviy davlat portali bo'lgani uchun
 * minimal talablar: klikjaking, MIME-sniffing va referrer oqishidan himoya.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // HSTS faqat HTTPS ostida ma'noga ega — dev serverni buzmasligi uchun shart.
  ...(isProd
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  // Server versiyasini oshkor qilmaymiz.
  poweredByHeader: false,
  compress: true,

  // Backend rasmlari odatda <img> orqali ko'rsatiladi (RemoteImage komponenti),
  // ammo next/image ishlatilsa quyidagi hostlarga ruxsat beriladi.
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "127.0.0.1" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: backendHost },
      { protocol: "https", hostname: "gspi.uz" },
      { protocol: "https", hostname: "*.gspi.uz" },
    ],
  },

  // Brauzerdan kelgan /api/* so'rovlarini Laravel backendga uzatamiz.
  // Bu CORS muammosini butunlay yo'q qiladi (dev va prod uchun).
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/${backendApiPrefix}/:path*`,
      },
      // Backend yuklamalari (rasm/fayl) ham bir xil domendan xizmat qilsin.
      {
        source: "/upload/:path*",
        destination: `${backendUrl}/upload/:path*`,
      },
    ];
  },
};

export default nextConfig;
