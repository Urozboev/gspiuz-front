import Container from "@/components/ui/Container";
import { Bar } from "@/components/ui/States";

/**
 * Sahifaga o'tishdagi yuklanish holati.
 *
 * Next.js buni marshrut tayyorlanayotganda ko'rsatadi. Shakli har bir
 * ichki sahifaning umumiy tuzilishiga mos: sarlavha bloki (hero) va
 * uning ostidagi kontent maydoni. Shu sababli kontent kelganda sahifa
 * "sakramaydi" — bo'sh ekran yoki aylanuvchi spinner o'rniga
 * foydalanuvchi sahifaning kelayotgan shaklini ko'radi.
 */
export default function Loading() {
  return (
    <>
      {/* Sarlavha bloki — ichki sahifalardagi PageHero o'lchamida. */}
      <div className="bg-brand-950 py-16 lg:py-20">
        <Container>
          <div className="animate-pulse">
            <Bar className="h-3.5 w-40 bg-white/15" />
            <Bar className="mt-6 h-10 w-2/3 max-w-lg bg-white/20" />
            <Bar className="mt-5 h-4 w-full max-w-xl bg-white/10" />
          </div>
        </Container>
      </div>

      <div className="bg-mist-100 dark:bg-slate-950 py-20 lg:py-28">
        <Container>
          <div className="animate-pulse bg-white dark:bg-slate-900 rounded-xl p-8 sm:p-12">
            <Bar className="h-7 w-1/2 max-w-sm" />
            <div className="mt-8 space-y-3.5 max-w-3xl">
              <Bar className="h-4 w-full" />
              <Bar className="h-4 w-11/12" />
              <Bar className="h-4 w-full" />
              <Bar className="h-4 w-3/5" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
