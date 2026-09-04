# GulDPI frontend — production'ga chiqarish

Next.js 16 (App Router). Backend — Laravel (`gspi-backend`), **boshqa serverda**,
API maxfiy prefiks ostida.

## Arxitektura

Frontend va backend **ikki xil mashinada**:

```
                    ┌─────────────────────────────────────┐
gspi.uz     ──────► │ ahost (shared hosting, cPanel)      │
                    │ Node.js App → Next.js (server.js)   │
                    └──────────────┬──────────────────────┘
                                   │ HTTPS
                                   │ /<maxfiy-prefiks>/*
                                   ▼
                    ┌─────────────────────────────────────┐
admin.gspi.uz ────► │ institut serveri                    │
                    │ nginx + php-fpm → Laravel           │
                    │ API · admin panel · yuklangan fayllar│
                    └─────────────────────────────────────┘
```

Brauzer faqat `gspi.uz/api/*` ni ko'radi. Next server bu so'rovlarni
`admin.gspi.uz/<maxfiy-prefiks>/*` ga uzatadi — **maxfiy prefiks brauzerga
hech qachon chiqmaydi** va CORS sozlash kerak emas.

> **Ilgari** ikkalasi bitta serverda deb rejalashtirilgandi va API tashqi
> internetga umuman ochilmasdi. Endi so'rovlar ochiq internet orqali o'tadi,
> shuning uchun `BACKEND_URL` **majburiy `https://`** bo'lishi va backend
> tomonida API ahost IP'si bilan cheklanishi kerak
> (`gspi-backend/DEPLOY.md` ga qarang).

## Talablar

- **Node.js 20 yoki undan yuqori** — cPanel → Software → *Setup Node.js App*
- Backend `admin.gspi.uz` da ishlab turgan bo'lishi va HTTPS bo'lishi

## Muhit o'zgaruvchilari

cPanel'dagi Node.js App sozlamalarida (yoki serverdagi `.env.local` faylida):

```ini
# Backend manzili — MAJBURIY https, aks holda prefiks va kontent yo'lda ko'rinadi
BACKEND_URL=https://admin.gspi.uz

# Laravel'ning maxfiy API prefiksi.
# Backenddagi .env dagi API_PREFIX bilan AYNAN bir xil bo'lishi shart.
BACKEND_API_PREFIX=<maxfiy prefiks>

# Brauzer tomonidagi API bazasi — "/api" qoldiriladi (proxy orqali)
NEXT_PUBLIC_API_URL=/api

# Kanonik manzil — sitemap, robots.txt, Open Graph va JSON-LD uchun
NEXT_PUBLIC_SITE_URL=https://gspi.uz
```

`BACKEND_API_PREFIX` da `NEXT_PUBLIC_` prefiksi **yo'q** — demak u faqat
server tomonda o'qiladi va brauzer bundle'iga tushmaydi.

> ⚠️ **Bu o'zgaruvchilar `npm run build` dan OLDIN o'rnatilgan bo'lishi kerak.**
>
> Bu amalda tekshirilgan: build `127.0.0.1:8000` bilan qilinib, server boshqa
> manzil bilan ishga tushirilganda **build'dagi qiymat ishlatildi**, ishga
> tushirishdagisi e'tiborsiz qoldi.
> `/api/*` proksisi `next.config.ts` dagi `rewrites()` orqali ishlaydi va
> uning manzili build paytida `.next/` ichiga yoziladi. Agar noutbukda
> `BACKEND_URL=http://127.0.0.1:8000` bilan build qilib, natijani serverga
> yuklasangiz — sayt localhost'ga murojaat qiladi va hech narsa ishlamaydi.
> **Buildni serverning o'zida qiling** yoki build oldidan env'ni to'g'rilang.
>
> Himoya sifatida: prod rejimida `BACKEND_URL` localhost'ga qaragan bo'lsa,
> build paytida ekranda ogohlantirish chiqadi. Uni ko'rsangiz — to'xtang.

## cPanel'ga o'rnatish

### 1. Kodni serverga olib chiqish

cPanel → **Git™ Version Control** → Create:
```
Clone URL:  https://github.com/Urozboev/gspiuz-front.git
Repository Path:  /home/<user>/gspiuz-front
```
SSH bo'lsa qo'lda ham bo'ladi:
```bash
git clone https://github.com/Urozboev/gspiuz-front.git
```

### 2. Node.js ilovasini yaratish

cPanel → Software → **Setup Node.js App** → Create Application:

| Maydon | Qiymat |
|---|---|
| Node.js version | 20 yoki yuqori |
| Application mode | Production |
| Application root | `gspiuz-front` |
| Application URL | `gspi.uz` |
| Application startup file | `server.js` |

Shu ekranda **Environment variables** bo'limiga yuqoridagi to'rtta
o'zgaruvchini qo'shing.

### 3. O'rnatish va build

cPanel ekranidagi **"Run NPM Install"** tugmasini bosing, so'ng shu yerdagi
terminal (yoki SSH) orqali:

```bash
npm run build
```

Build ~1–2 daqiqa oladi va ~1 GB xotira talab qiladi. Shared hostingda
xotira yetmasa, buildni mahalliy kompyuterda (yuqoridagi env'lar bilan)
qilib, `.next/` papkasini serverga yuklang.

### 4. Ishga tushirish

cPanel ekranida **Restart** tugmasi. `server.js` Passenger bergan portda
Next.js'ni ko'taradi.

## Yangilash

```bash
cd ~/gspiuz-front
git pull
npm ci
npm run build
```
so'ng cPanel'da **Restart**.

Build muvaffaqiyatli tugamaguncha eski versiya ishlab turaveradi.

## Xavfsizlik sarlavhalari

`next.config.ts` da qo'shilgan: `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy`, prodda `Strict-Transport-Security`.
`poweredByHeader` o'chirilgan.

cPanel `.htaccess` orqali ham sarlavha qo'shsa, **takrorlamang** — ikki marta
qo'yilgan sarlavha brauzerni chalkashtiradi.

## Chiqishdan oldin tekshiriladiganlar

- [ ] `npm run build` xatosiz o'tadi
- [ ] To'rtala env o'zgaruvchisi cPanel'da kiritilgan
- [ ] `BACKEND_URL` **`https://`** bilan boshlanadi
- [ ] `BACKEND_API_PREFIX` backenddagi `API_PREFIX` bilan aynan bir xil
- [ ] Backend `admin.gspi.uz` da ishlayapti va HTTPS sertifikati bor
- [ ] Backend nginx'ida API ahost IP'si bilan cheklangan
- [ ] `https://gspi.uz/sitemap.xml` va `/robots.txt` to'g'ri domenni ko'rsatadi
- [ ] Admin panelda "Sayt ma'lumotlari" to'ldirilgan: logo, favicon, manzil,
      telefon, ijtimoiy tarmoqlar, rekvizitlar
- [ ] Yandex/Google Search Console ga sayt qo'shilgan

## Tez tekshirish

```bash
# Proxy ishlayaptimi (JSON qaytishi kerak, HTML emas)
curl -s https://gspi.uz/api/siteinfo | head -c 200

# Maxfiy prefiks brauzerga chiqmayaptimi (natija bo'sh bo'lishi kerak)
curl -s https://gspi.uz/ | grep -o "<maxfiy-prefiks>"
```
