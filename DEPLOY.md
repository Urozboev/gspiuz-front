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

> **Nega serverda `npm install` qilinmaydi.** Shared hostingda u
> **442 MB va 25 000 fayl** talab qiladi — ahost kvotasi bunga yetmaydi
> (`npm error Unknown system error -122` = disk kvotasi tugadi).
>
> Buning o'rniga build mahalliy kompyuterda qilinadi va serverga faqat
> kerakli qismi yuklanadi: **~28 MB, ~2 500 fayl**. Next.js'ning
> `output: "standalone"` rejimi qaysi modullar haqiqatan kerakligini
> aniqlab, faqat o'shalarni ko'chiradi.

### 1. Mahalliy kompyuterda paket tayyorlash

```bash
BACKEND_URL=https://admin.gspi.uz BACKEND_API_PREFIX=<maxfiy prefiks> NEXT_PUBLIC_SITE_URL=https://gspi.uz ./deploy.sh
```

Skript quyidagilarni qiladi:
- `BACKEND_URL` berilmagan yoki `https` emasligini **tekshiradi va to'xtaydi**
- Build qiladi (manzil shu paytda muhrlanadi)
- `.next/static` va `public` ni standalone ichiga ko'chiradi
  (Next buni o'zi qilmaydi — hujjatlashtirilgan xatti-harakat)
- `gspi-front-deploy.tar.gz` arxivini yaratadi

### 2. Serverga yuklash

cPanel → **File Manager** → `~/gspiuz-front/` papkasiga arxivni yuklang va
**Extract** qiling. Natijada shunday tuzilma bo'ladi:

```
~/gspiuz-front/
  server.js        ← Next o'zi yaratgan ishga tushirish fayli
  package.json
  node_modules/    ← faqat kerakli modullar (~20 MB)
  .next/
  public/
```

### 3. Node.js ilovasini yaratish

cPanel → Software → **Setup Node.js App** → Create Application:

| Maydon | Qiymat |
|---|---|
| Node.js version | 20 yoki yuqori |
| Application mode | Production |
| Application root | `gspiuz-front` |
| Application URL | `gspi.uz` |
| Application startup file | `server.js` |

**"Run NPM Install" tugmasini bosmang** — modullar allaqachon arxiv ichida
kelgan, bosilsa kvota yana tugaydi.

Environment variables bo'limiga `NEXT_PUBLIC_SITE_URL` va
`NEXT_PUBLIC_API_URL` ni qo'shing. `BACKEND_URL` va `BACKEND_API_PREFIX`
build ichida muhrlangan, lekin bir xillik uchun ularni ham kiritib qo'ying.

### 4. Ishga tushirish

**Restart** tugmasi.

## Yangilash

Kod o'zgargach, 1-qadamni takrorlab yangi arxiv yarating va serverdagi
fayllar ustiga yozing, so'ng **Restart**.

Agar `admin.gspi.uz` manzili o'zgarsa — **albatta qayta build qiling**,
faqat env'ni o'zgartirish yetarli emas.

## Xavfsizlik sarlavhalari

`next.config.ts` da qo'shilgan: `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy`, prodda `Strict-Transport-Security`.
`poweredByHeader` o'chirilgan.

cPanel `.htaccess` orqali ham sarlavha qo'shsa, **takrorlamang** — ikki marta
qo'yilgan sarlavha brauzerni chalkashtiradi.

## Chiqishdan oldin tekshiriladiganlar

- [ ] `./deploy.sh` xatosiz o'tadi va arxiv yaratiladi
- [ ] Arxiv `~/gspiuz-front/` ga ochilgan, `server.js` ildizda turibdi
- [ ] cPanel'da "Run NPM Install" **bosilmagan**
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
