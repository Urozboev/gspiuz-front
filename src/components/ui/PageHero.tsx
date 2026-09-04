import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import Container from "./Container";

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  icon?: React.ReactNode;
}

/** Ichki sahifalar uchun sarlavha bloki + non ushatish (breadcrumb). */
export default function PageHero({ title, subtitle, crumbs = [], icon }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      {/* Dekorativ fon — yumshoq yorug'lik */}
      <div className="absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_top_right,rgb(47_111_237/0.28),transparent_58%)]" />

      <Container className="relative z-10 py-20 lg:py-24">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-brand-200/60 mb-10">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-accent-300 transition-colors"
          >
            <Home className="w-4 h-4" />
          </Link>
          {crumbs.map((crumb, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-brand-200/30" />
              {crumb.href && idx < crumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="hover:text-accent-300 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-accent-300">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="flex items-start gap-6">
          {icon && (
            <span className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent-300">
              {icon}
            </span>
          )}
          <div>
            <h1 className="display-2 text-white">{title}</h1>
            {subtitle && (
              <p className="mt-6 text-lg text-brand-100/70 max-w-2xl">{subtitle}</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
