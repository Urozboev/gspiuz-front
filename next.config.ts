import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL ?? "http://127.0.0.1:8000";

// Laravel backend API'ni maxfiy prefiks ostida beradi (RouteServiceProvider
// routes/api.php ni shu prefiks bilan ro'yxatdan o'tkazadi).
// Brauzer faqat "/api" ni ko'radi — haqiqiy prefiks server tomonda qoladi.
const backendApiPrefix = (process.env.BACKEND_API_PREFIX ?? "api").replace(
  /^\/+|\/+$/g,
  ""
);

/*
 * `rewrites()` manzili build paytida `.next/routes-manifest.json` ga
 * yoziladi va serverni ishga tushirishdagi `BACKEND_URL` uni almashtirmaydi
 * (tekshirilgan). Ya'ni dev qiymatlari bilan qurilgan build serverga
 * yuklansa, sayt localhost'ga murojaat qiladi va sabab hech qayerda
 * ko'rinmaydi. Shuning uchun build paytida ogohlantiramiz.
 */
if (
  process.env.NODE_ENV === "production" &&
  /(localhost|127\.0\.0\.1)/.test(backendUrl)
) {
  console.warn(
    [
      "",
      "  ⚠  BACKEND_URL = " + backendUrl,
      "",
      "  Bu manzil build ichiga yoziladi va keyin o'zgartirib bo'lmaydi.",
      "  Agar bu build serverga yuklanadigan bo'lsa, sayt ishlamaydi.",
      "  Prod uchun: BACKEND_URL=https://admin.gspi.uz",
      "",
    ].join("\n"),
  );
}

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
  /*
   * Odatda serverda `git pull` + `npm run build` qilinadi — bunda oddiy
   * build kerak va ishga tushirish fayli ildizdagi `server.js`.
   *
   * Serverda kvota yetmaganda esa build mahalliy qilinadi va faqat kerakli
   * modullar ko'chiriladi: `BUILD_STANDALONE=1` (deploy.sh shuni qo'yadi).
   */
  ...(process.env.BUILD_STANDALONE === "1"
    ? { output: "standalone" as const }
    : {}),

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
    return [
      { source: "/:path*", headers: securityHeaders },

      /*
       * Sahifa HTML'i uchun keshni cheklash.
       *
       * Next statik sahifalarga `s-maxage=31536000` (bir yil) qo'yadi.
       * Hosting oldidagi nginx buni bajarib, HTML'ni saqlab qoladi va
       * yangi build chiqarilgandan keyin ham eski sahifani ko'rsataveradi.
       * Bu amalda kuzatildi: `?nocache=1` bilan yangi sahifa kelardi,
       * oddiy manzil esa eskisini qaytarardi.
       *
       * Sahifalar baribir ma'lumotni brauzerda yuklaydi, ya'ni HTML'ni
       * uzoq keshlashdan foyda yo'q. `must-revalidate` bilan proksi
       * har safar tekshirib oladi (o'zgarmagan bo'lsa 304, arzon).
       *
       * `_next/static` va `_next/image` chetlab o'tiladi — ular
       * nomida xesh bor va abadiy keshlanishi kerak.
       */
      {
        source: "/:path((?!_next/static|_next/image).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
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
