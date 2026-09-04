# GulDPI — Guliston Davlat Pedagogika Instituti (Frontend)

`gspi-backend` (Laravel 10 + Sanctum) ustiga qurilgan ko'p tilli (o'zbek / rus /
ingliz) rasmiy veb-sayt frontendi.

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · lucide-react
- **Dizayn:** bir rangli ko'k palitra (institut gerbidan olingan), oq va ochiq
  kulrang fon, dark mode. Davlat OTM saytlari (samdpi.uz, jdpu.uz) uslubiga yaqin.
- **i18n:** `AppContext` + `localStorage` (til o'zgarganda API qayta yuklanadi, `Accept-Language` headeri orqali)

## Ishga tushirish

1. Bog'liqliklarni o'rnatish:
   ```bash
   npm install
   ```
2. `.env.example` dan nusxa olib `.env.local` yarating va to'ldiring:
   ```bash
   cp .env.example .env.local
   ```
   `BACKEND_API_PREFIX` — Laravel'ning maxfiy API prefiksi
   (backenddagi `.env` dagi `API_PREFIX` bilan **bir xil** bo'lishi shart).
   U faqat server tomonda o'qiladi va brauzer bundle'iga tushmaydi.
3. Backendni ishga tushiring (alohida terminalda, `gspi-backend` ichida):
   ```bash
   php artisan serve
   ```
4. Frontend dev serveri:
   ```bash
   npm run dev
   ```
   → http://localhost:3000

## API ulanishi (CORS'siz)

Brauzerdan kelgan `/api/*` so'rovlari Next rewrite-proxy orqali `BACKEND_URL` ga
uzatiladi (`next.config.ts`). Backend rasmlari uchun `/upload/*` ham proxy
qilinadi. Shu sababli CORS sozlash shart emas — dev va prodda bir xil ishlaydi.

## Tuzilma

```
src/
  app/                 # Sahifalar (App Router)
    page.tsx           # Bosh sahifa
    news/, news/[slug], news/video
    categories/[slug]
    leadership/, leadership/[slug]
    faculties/, faculties/[slug]
    kafedralar/, kafedralar/[slug]
    educational-programs/, educational-programs/[id]
    kampus/, kampus/[slug]
    journals/, journals/[slug]
    vacancies/, vacancies/[id]
    documents/, certificates/, partners/, faq/
    about/, structure/, admissions/, apply/, students/, contact/
  components/          # Header, Footer, ContactForm, StaffView, ui/, cards/
  context/             # AppContext (til/kontrast/shrift), SiteInfoContext
  hooks/               # useApi, useT
  lib/                 # api, endpoints, types, format, normalize, config
  locales/             # translations.ts, pages.ts
```

## Asosiy konvensiyalar

- **Ma'lumot olish:** `useApi<T>(endpoint, params?)` — joriy tilga bog'langan,
  `{ data, loading, error, notFound, refetch }` qaytaradi.
- **Rasmlar:** backend rasmlari uchun `RemoteImage` (oddiy `<img>`), lokal
  `/public` rasmlari uchun `next/image`.
- **Matnlar:** `useT()` → `{ t, p, lang }` (asosiy + sahifa tarjimalari).
- **Brend ikonkalari:** lucide-react 1.x da yo'q — `components/ui/SocialIcons.tsx`.

## Buyruqlar

```bash
npm run dev      # development
npm run build    # production build
npm run start    # production server
npm run lint     # eslint
```
