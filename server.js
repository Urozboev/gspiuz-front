/*
 * cPanel (Phusion Passenger) uchun ishga tushirish fayli.
 *
 * cPanel'ning "Setup Node.js App" bo'limi `npm start` ni emas, aynan
 * bitta JS faylni ishga tushiradi. Portni Passenger o'zi beradi (`PORT`).
 *
 * MUHIM: bundan oldin `npm run build` bajarilgan bo'lishi kerak — bu yerda
 * faqat tayyor build ishga tushiriladi.
 */

const { createServer } = require("http");
const next = require("next");

const port = Number(process.env.PORT) || 3000;
const hostname = process.env.HOSTNAME || "0.0.0.0";

const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res).catch((err) => {
        // Bitta so'rovdagi xato butun serverni yiqitmasligi kerak.
        console.error("So'rovni bajarishda xato:", req.url, err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      });
    }).listen(port, hostname, () => {
      console.log(`GulDPI frontend tayyor: http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Next.js ishga tushmadi:", err);
    process.exit(1);
  });
