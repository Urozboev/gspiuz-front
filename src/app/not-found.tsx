"use client";

import Link from "next/link";
import { Home, Compass } from "lucide-react";
import { useT } from "@/hooks/useT";
import Container from "@/components/ui/Container";

export default function NotFound() {
  const { p } = useT();
  return (
    <Container className="py-24 lg:py-32">
      <div className="flex flex-col items-center text-center">
        <div className="h-20 w-20 rounded-xl bg-brand-900/8 text-brand-900 dark:text-brand-300 flex items-center justify-center mb-6">
          <Compass className="w-10 h-10" />
        </div>
        <p className="text-6xl font-semibold text-ink-900 dark:text-white">404</p>
        <h1 className="mt-3 text-xl font-semibold text-ink-900 dark:text-slate-100">
          {p.common.notFound}
        </h1>
        <p className="mt-2 text-sm text-ink-600 dark:text-ink-400 max-w-sm">
          {p.common.notFoundDesc}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
        >
          <Home className="w-4 h-4" />
          {p.common.backHome}
        </Link>
      </div>
    </Container>
  );
}
