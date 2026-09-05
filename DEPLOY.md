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

## Chiqarish tartibi

Qadamlar **shu ketma-ketlikda** bajarilishi kerak:

| # | Qadam | Kim bajaradi |
|---|---|---|
| 1 | Backendni institut serveriga chiqarish | backend |
| 2 | Kerio Control'da 80/443 portlarini o'tkazish | **tarmoq admini** |
| 3 | `admin.gspi.uz` uchun Let's Encrypt sertifikati | backend |
| 4 | **API tashqaridan tekshiriladi — o'tish nuqtasi** | ikkalasi |
| 5 | Frontend build va ahost'ga yuklash | frontend |
| 6 | Ahost IP → backend nginx `allow` ro'yxatiga | backend |

> ⚠️ **4-qadamgacha frontendni build qilmang.** `BACKEND_URL` build ichiga
> muhrlanadi; `https://admin.gspi.uz` javob bermayotgan bo'lsa, muhrlangan
> manzil ham ishlamaydi va hammasini qaytadan qilish kerak bo'ladi.

**2-qadam nima uchun kerak.** `admin.gspi.uz` DNS'i to'g'ri
(`198.163.204.233`), lekin o'sha manzilda **Kerio Control xavfsizlik devori**
turibdi va 80/443 ni ichkariga o'tkazmaydi:
```
$ curl -sI http://admin.gspi.uz/
HTTP/1.0 403 Forbidden
… Kerio Control Proxy
```
443-portdagi sertifikat ham Kerio'niki — o'zi imzolagan va **2026-yil martda
muddati tugagan**. SSH (52200) o'tkaziladi, ya'ni server ichkarida ishlayapti.

80-port **majburiy** — usiz Let's Encrypt domenni tasdiqlay olmaydi.

Tekshirish (istalgan kompyuterdan):
```bash
curl -sI http://admin.gspi.uz/ | head -1
```
`Kerio` yoki `403` o'rniga nginx javobi (`200`, `301`, `404`) kelsa —
o'tkazish ishlayapti.

## Talablar

- **Node.js 20 yoki undan yuqori** — cPanel → Software → *Setup Node.js App*
- Backend `admin.gspi.uz` da ishlab turgan bo'lishi va HTTPS bo'lishi
- Serverda **~40 MB bo'sh joy** va **~3 000 ta bo'sh inode**
  (build mahalliy kompyuterda qilinadi, pastga qarang)

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

Serverda **~500 MB bo'sh joy** va **~30 000 bo'sh inode** bo'lsa, kod
to'g'ridan-to'g'ri GitHub'dan olinadi va serverning o'zida quriladi.
Bu afzalroq: yangilash bitta buyruq bo'ladi va manzillar cPanel'dagi
muhit o'zgaruvchilaridan olinadi.

Joy yetmasa — pastdagi "Kvota yetmaganda" bo'limiga qarang.

### 1. Repozitoriyani klonlash

cPanel → **Git™ Version Control** → Create:

```
Clone URL:        https://github.com/Urozboev/gspiuz-front.git
Repository Path:  /home/<user>/gspiuz-front
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

**Environment variables** bo'limiga to'rttasini ham qo'shing:

```ini
BACKEND_URL=https://admin.gspi.uz
BACKEND_API_PREFIX=<maxfiy prefiks>
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_SITE_URL=https://gspi.uz
```

> `BACKEND_URL` va `BACKEND_API_PREFIX` **ikki joyda** kerak: build paytida
> (`/api/*` proksisi uchun) va **server ishlab turganda** (`sitemap.xml`,
> sahifa sarlavhalari uchun). Ikkinchisi ularni har so'rovda jonli o'qiydi —
> shuning uchun faqat build paytida berish yetarli emas.
>
> Ular bo'lmasa sayt ochiladi, lekin `sitemap.xml` da yangiliklar va
> xodimlar yo'qoladi, yangilik sahifalari esa o'z sarlavhasi va rasmisiz
> qoladi — ijtimoiy tarmoqda ulashilganda ko'rinmaydi.

### 3. O'rnatish va build

cPanel ekranidagi **"Run NPM Install"** tugmasini bosing, so'ng terminal
(yoki SSH) orqali:

```bash
cd ~/gspiuz-front
npm run build
```

### Build xotiraga sig'masa (shared hosting)

CloudLinux LVE chegarasi ostida Turbopack WASM uchun xotira ajrata olmaydi:

```
RangeError: WebAssembly.instantiate(): Out of memory
Max address space  4294967296  (4 GB)
```

Yechim — Webpack bilan qurish, u WASM ishlatmaydi:

```bash
npm run build:webpack
```

cPanel'da terminal bo'lmasa: **Setup Node.js App** → *Run JS Script* →
ro'yxatdan **`build:webpack`** ni tanlang.

Natija bir xil — faqat qurish usuli boshqacha, sayt ishlashiga ta'sir
qilmaydi. Sekinroq quriladi (Turbopack tezroq), lekin chegaraga urilmaydi.

Bu ham yordam bermasa, **Environment variables** ga qo'shing:

```
NODE_OPTIONS=--max-old-space-size=2048
```

### 4. Ishga tushirish

cPanel ekranida **Restart**.

## Yangilash

**`git pull` yetarli emas — build qilish shart.** Repozitoriyada faqat
manba kod bor; saytni Next.js `.next/` papkasidagi tayyor build'dan chizadi.

```bash
cd ~/gspiuz-front
git pull
npm ci          # faqat package.json o'zgarganda kerak
npm run build
```

so'ng cPanel'da **Restart**.

Build muvaffaqiyatli tugamaguncha eski versiya ishlab turaveradi.

**Manzil o'zgarsa** (masalan `BACKEND_URL`) — cPanel'da o'zgaruvchini
to'g'rilab, **qayta build qiling**. Faqat Restart yetarli emas: proxy
manzili build ichiga yoziladi.

## Kvota yetmaganda — arxiv yo'li

Serverda `npm install` **442 MB va 25 000 fayl** talab qiladi
(`npm error Unknown system error -122` = disk kvotasi tugadi). Kvota
yetmasa, build mahalliy kompyuterda qilinadi va serverga faqat kerakli
qismi yuklanadi — **~28 MB, ~2 500 fayl**.

```bash
BACKEND_URL=https://admin.gspi.uz BACKEND_API_PREFIX=<maxfiy> NEXT_PUBLIC_SITE_URL=https://gspi.uz ./deploy.sh
```

Skript `BACKEND_URL` ni tekshiradi (berilmagan yoki `https` bo'lmasa
to'xtaydi), build qiladi va `gspi-front-deploy.tar.gz` yaratadi.

Arxivni `~/gspiuz-front/` ichida Extract qiling, so'ng **Stop → Start**.
Bu yo'lda **"Run NPM Install" bosilmaydi** — modullar arxiv ichida keladi.

## Xavfsizlik sarlavhalari

`next.config.ts` da qo'shilgan: `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy`, prodda `Strict-Transport-Security`.
`poweredByHeader` o'chirilgan.

cPanel `.htaccess` orqali ham sarlavha qo'shsa, **takrorlamang** — ikki marta
qo'yilgan sarlavha brauzerni chalkashtiradi.

## Chiqishdan oldin tekshiriladiganlar

- [ ] Serverda `npm run build` xatosiz o'tadi
- [ ] cPanel'da to'rtala env o'zgaruvchisi kiritilgan (build'dan OLDIN)
- [ ] Application startup file = `server.js`
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
