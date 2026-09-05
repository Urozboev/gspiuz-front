#!/usr/bin/env bash
#
# Serverga yuklanadigan paketni tayyorlaydi.
#
# Nega kerak: ahost'da `next build` CloudLinux LVE chegarasi ostida
# yiqiladi (Next.js WASM uchun xotira ajrata olmaydi) — Turbopack bilan
# ham, `--webpack` bilan ham. Shuning uchun build shu yerda qilinadi.
#
# Ikki rejim:
#   ./deploy.sh            → faqat `.next` (12 MB). Serverda `npm install`
#                            ishlagan bo'lsa shu yetarli — tavsiya etiladi.
#   FULL=1 ./deploy.sh     → o'zini o'zi ta'minlaydigan paket (25 MB),
#                            `node_modules` ham ichida. Serverda `npm
#                            install` ham imkonsiz bo'lsa.
#
# Ishlatish:
#   BACKEND_URL=https://admin.gspi.uz BACKEND_API_PREFIX=<maxfiy> ./deploy.sh
#
set -euo pipefail

# Git Bash (MSYS) "/api" kabi qiymatlarni Windows yo'liga aylantirib yuboradi
# ("C:/Program Files/Git/api"). Bu qiymat build ichiga muhrlanib, brauzer
# API o'rniga mahalliy faylga murojaat qilardi. Konvertatsiyani o'chiramiz.
export MSYS_NO_PATHCONV=1
export MSYS2_ARG_CONV_EXCL="*"

if [ -z "${BACKEND_URL:-}" ]; then
  echo "XATO: BACKEND_URL ko'rsatilmagan." >&2
  echo "Bu manzil build ichiga muhrlanadi — keyin o'zgartirib bo'lmaydi." >&2
  exit 1
fi

case "$BACKEND_URL" in
  https://*) ;;
  *)
    echo "XATO: BACKEND_URL https bilan boshlanishi kerak (hozir: $BACKEND_URL)" >&2
    exit 1
    ;;
esac

# Yo'l konvertatsiyasi baribir sodir bo'lsa, buni build'dan OLDIN ushlaymiz.
for v in NEXT_PUBLIC_API_URL BACKEND_URL; do
  val="${!v:-}"
  case "$val" in
    *:/*|*"Program Files"*|*"Git/api"*)
      case "$val" in
        https://*|http://*) ;;
        *)
          echo "XATO: $v buzilgan — '$val'" >&2
          echo "Git Bash yo'lni o'zgartirib yuborgan. MSYS_NO_PATHCONV=1 qo'ying," >&2
          echo "yoki $v ni umuman bermang (standart qiymat ishlatiladi)." >&2
          exit 1
          ;;
      esac
      ;;
  esac
done

FULL="${FULL:-0}"

if [ "$FULL" = "1" ]; then
  echo "▸ Build — to'liq paket (BACKEND_URL=$BACKEND_URL)"
  BUILD_STANDALONE=1 NODE_ENV=production npm run build

  echo "▸ Statik fayllarni standalone ichiga ko'chirish"
  # Next bularni standalone ichiga o'zi ko'chirmaydi — hujjatlashtirilgan xatti-harakat.
  cp -r .next/static .next/standalone/.next/static
  cp -r public .next/standalone/public

  echo "▸ Arxivlash"
  rm -f gspi-front-full.tar.gz
  tar -czf gspi-front-full.tar.gz -C .next/standalone $(cd .next/standalone && ls -A)
  ARCHIVE=gspi-front-full.tar.gz
  JOY="~/gspiuz-front/ (hamma narsa ustiga yoziladi)"
else
  echo "▸ Build — faqat .next (BACKEND_URL=$BACKEND_URL)"
  NODE_ENV=production npm run build

  echo "▸ Arxivlash"
  rm -f gspi-front-next.tar.gz
  # `cache` va `dev` — faqat qayta qurish/dev uchun, serverda kerak emas
  # va o'nlab megabayt joy egallaydi.
  tar -czf gspi-front-next.tar.gz --exclude=".next/cache" --exclude=".next/dev" .next
  ARCHIVE=gspi-front-next.tar.gz
  JOY="~/gspiuz-front/ (mavjud .next ustiga)"
fi

SIZE=$(du -h "$ARCHIVE" | cut -f1)
echo
echo "Tayyor: $ARCHIVE ($SIZE)"
echo
echo "Keyingi qadamlar:"
echo "  1. Arxivni cPanel File Manager orqali $JOY ga yuklang"
echo "  2. O'sha papka ichida turib Extract qiling"
echo "  3. Setup Node.js App → Stop → Start"
