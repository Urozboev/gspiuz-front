#!/usr/bin/env bash
#
# Serverga yuklanadigan paketni tayyorlaydi.
#
# Shared hostingda `npm install` disk kvotasiga sig'maydi (442 MB, 25 000 fayl),
# shuning uchun build shu yerda qilinadi va serverga faqat kerakli qismi
# (~28 MB, ~2 500 fayl) yuklanadi.
#
# Ishlatish:
#   BACKEND_URL=https://admin.gspi.uz BACKEND_API_PREFIX=<maxfiy> ./deploy.sh
#
set -euo pipefail

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

echo "▸ Build (BACKEND_URL=$BACKEND_URL)"
NODE_ENV=production npm run build

echo "▸ Statik fayllarni standalone ichiga ko'chirish"
# Next bularni standalone ichiga o'zi ko'chirmaydi — hujjatlashtirilgan xatti-harakat.
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

echo "▸ Arxivlash"
rm -f gspi-front-deploy.tar.gz
tar -czf gspi-front-deploy.tar.gz -C .next/standalone .

SIZE=$(du -h gspi-front-deploy.tar.gz | cut -f1)
echo
echo "Tayyor: gspi-front-deploy.tar.gz ($SIZE)"
echo
echo "Keyingi qadamlar:"
echo "  1. Arxivni cPanel File Manager orqali ~/gspiuz-front/ ga yuklang"
echo "  2. O'sha yerda oching (Extract)"
echo "  3. Setup Node.js App → Restart"
