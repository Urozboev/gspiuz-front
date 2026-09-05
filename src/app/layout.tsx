import type { Metadata } from "next";
import { DM_Sans, Red_Hat_Display } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, INSTITUTE } from "@/lib/config";
import { AppProvider } from "@/context/AppContext";
import { SiteInfoProvider } from "@/context/SiteInfoContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AiAssistant from "@/components/AiAssistant";
import ScrollToTop from "@/components/ScrollToTop";
import PopupNotices from "@/components/PopupNotices";

// Matn shrifti — DM Sans (samdpi.uz dagi kabi: keng, ochiq, o'qishga juda qulay).
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Sarlavha shrifti — Red Hat Display (yirik sarlavhalarda tiniq va jiddiy ko'rinadi).
const redHat = Red_Hat_Display({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_DESC =
  "Guliston davlat pedagogika instituti (GulDPI) rasmiy sayti — Sirdaryo viloyatidagi davlat oliy ta'lim muassasasi. Qabul, ta'lim yo'nalishlari, fakultetlar, yangiliklar va murojaat.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — rasmiy sayt`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: [
    "GulDPI",
    "GSPI",
    "Guliston davlat pedagogika instituti",
    "Guliston pedagogika instituti",
    "Sirdaryo oliy ta'lim",
    "pedagogika instituti",
    "qabul",
    "bakalavriat",
    "magistratura",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  // Qidiruv tizimlari sahifani indekslashi va havolalarni kuzatishi kerak.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      uz: "/",
      ru: "/",
      en: "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — rasmiy sayt`,
    description: SITE_DESC,
    url: SITE_URL,
    locale: "uz_UZ",
    alternateLocale: ["ru_RU", "en_US"],
    images: [
      {
        url: "/brand/logo.png",
        width: 600,
        height: 600,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — rasmiy sayt`,
    description: SITE_DESC,
    images: ["/brand/logo.png"],
  },
};

/**
 * Schema.org tarkibi — qidiruv tizimlari institutni ta'lim muassasasi
 * sifatida tanishi va bilim panelida to'g'ri ko'rsatishi uchun.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  name: SITE_NAME,
  alternateName: ["GulDPI", "GSPI"],
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo.png`,
  description: SITE_DESC,
  foundingDate: String(INSTITUTE.foundedYear),
  email: INSTITUTE.email,
  telephone: INSTITUTE.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Talabalar ko'chasi, 49-uy",
    addressLocality: "Guliston",
    addressRegion: "Sirdaryo viloyati",
    postalCode: "120101",
    addressCountry: "UZ",
  },
  sameAs: [
    INSTITUTE.telegram,
    "https://instagram.com/guliston_pedagogika_instituti",
    "https://facebook.com/gulistonpedagogikainstituti",
    "https://youtube.com/@gspi",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${redHat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-mist-100 dark:bg-ink-950 text-ink-600 dark:text-ink-300 transition-colors duration-200">
        <script
          type="application/ld+json"
          // Schema.org ma'lumotlari o'zimiz tuzgan obyektdan keladi, tashqi kirish yo'q.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Klaviatura bilan yuriladigan foydalanuvchilar uchun kontentga o'tish havolasi */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-brand-900 focus:px-5 focus:py-3 focus:text-white"
        >
          Asosiy kontentga o&apos;tish
        </a>
        <AppProvider>
          <SiteInfoProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main id="main" className="flex-grow">{children}</main>
              <Footer />
              <AiAssistant />
              <ScrollToTop />
              <PopupNotices />
            </div>
          </SiteInfoProvider>
        </AppProvider>
      </body>
    </html>
  );
}
