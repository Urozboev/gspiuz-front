# GSPI frontend — production'ga chiqarish

Next.js 16 (App Router). Backend — Laravel (`gspi-backend`), API maxfiy prefiks ostida.

## Arxitektura

Bitta serverda:

```
Internet → nginx (443)
             ├── /upload/, /storage/  → Laravel public/ (nginx to'g'ridan-to'g'ri diskdan)
             ├── /admin/, /login      → php-fpm (admin panel)
             └── /                    → 127.0.0.1:3000 (Next.js)
                                          └── /api/* ni ichkaridan
                                              127.0.0.1:8000/<maxfiy-prefiks>/* ga uzatadi
```

API tashqariga umuman ochilmaydi — Next server tomonda proxy qiladi.
Brauzer faqat `/api/*` ni ko'radi, haqiqiy prefiks hech qachon chiqmaydi.
Shu sababli CORS sozlash ham kerak emas.

## Talablar

- Node.js 20 yoki undan yuqori
- PHP 8.4 + MariaDB (backend uchun, `gspi-backend/DEPLOY.md` ga qarang)
- nginx, certbot

## Muhit o'zgaruvchilari

Serverda `.env.production.local` (git'ga tushmaydi):

```
BACKEND_URL=http://127.0.0.1:8000
BACKEND_API_PREFIX=<Laravel RouteServiceProvider'dagi maxfiy prefiks>
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_SITE_URL=https://gspi.uz
```

`BACKEND_API_PREFIX` — maxfiy. Faqat server tomonda o'qiladi,
`NEXT_PUBLIC_` prefiksi yo'q, ya'ni brauzer bundlega tushmaydi.

`NEXT_PUBLIC_SITE_URL` sitemap, robots.txt, Open Graph va JSON-LD uchun
ishlatiladi — noto'g'ri bo'lsa qidiruv tizimlari xato manzillarni indekslaydi.

## Build va ishga tushirish

```bash
npm ci
npm run build
npm start          # 3000-portda
```

Doimiy ishlashi uchun systemd xizmati:

```ini
# /etc/systemd/system/gspi-front.service
[Unit]
Description=GSPI frontend (Next.js)
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/gspi-front
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now gspi-front
```

## Yangilash

```bash
git pull            # yoki fayllarni yuklash
npm ci
npm run build
sudo systemctl restart gspi-front
```

Next.js `.next/` papkasini build paytida to'liq qayta yaratadi.
Build muvaffaqiyatli tugamaguncha eski versiya ishlab turaveradi.

## nginx

Namuna `gspi-backend/deploy/nginx.conf.example` da (backend bilan umumiy,
chunki bitta server bloki ikkalasiga ham xizmat qiladi).

Muhim nuqtalar:
- `/upload/` va `/storage/` ni Node orqali o'tkazmang — nginx diskdan bersin, tezroq
- `client_max_body_size` kamida 20M (admin paneldagi fayl yuklash uchun)
- Laravel API prefiksini tashqaridan ochmang

## Xavfsizlik sarlavhalari

`next.config.ts` da qo'shilgan: `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy`, prodda `Strict-Transport-Security`.
`poweredByHeader` o'chirilgan.

nginx darajasida takrorlamang — ikki marta qo'yilsa brauzer chalkashadi.

## Chiqishdan oldin tekshiriladiganlar

- [ ] `npm run build` xatosiz o'tadi
- [ ] `.env.production.local` da to'rtala o'zgaruvchi to'ldirilgan
- [ ] Backend `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL=https://gspi.uz`
- [ ] `https://gspi.uz/sitemap.xml` va `/robots.txt` to'g'ri domenni ko'rsatadi
- [ ] Admin panelda "Sayt ma'lumotlari" to'ldirilgan: logo, favicon, manzil,
      telefon, ijtimoiy tarmoqlar, rekvizitlar — bo'sh maydonlar saytda
      ko'rinmaydi, lekin davlat portali uchun ular majburiy
- [ ] Yandex/Google Search Console ga sayt qo'shilgan
