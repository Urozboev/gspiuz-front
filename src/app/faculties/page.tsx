"use client";

import Link from "next/link";
import {
  Layers,
  ArrowRight,
  BookOpen,
  Languages,
  Atom,
  Dumbbell,
  Music,
  Calculator,
  Palette,
  GraduationCap,
  Award,
  Globe,
  Lightbulb,
  Briefcase,
} from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { localized } from "@/lib/format";
import type { Department } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Spinner, EmptyState, ErrorState } from "@/components/ui/States";

/*
 * Fakultet kartochkalari uchun ikonkalar.
 * Rang bitta — brend ko'ki; ilgarigi rangbarang gradientlar rasmiy uslubga mos kelmaydi.
 */
const ICONS = [BookOpen, Languages, Atom, Dumbbell, Music, Calculator, Palette, GraduationCap];

const WHY = [
  { icon: Award, title: "Sifatli ta'lim", desc: "Malakali professor-o'qituvchilar tarkibi" },
  { icon: Lightbulb, title: "Zamonaviy infratuzilma", desc: "Zamonaviy laboratoriya va resurslar" },
  { icon: Globe, title: "Xalqaro aloqalar", desc: "Yetakchi universitetlar bilan hamkorlik" },
  { icon: Briefcase, title: "Amaliyot va ishga joylashish", desc: "Real amaliyot va karyera imkoniyatlari" },
];

export default function FacultiesPage() {
  const { p } = useT();
  const { language } = useApp();
  const { data, loading, error, notFound, refetch } = useApi<Department[]>("/fakultet");
  const items = data ?? [];

  return (
    <>
      <PageHero
        title={p.titles.faculties}
        subtitle={p.subtitles.faculties}
        crumbs={[{ label: p.titles.faculties }]}
        icon={<Layers className="w-7 h-7" />}
      />

      <Container className="py-20 lg:py-28">
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((fac, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <Link
                  key={fac.id}
                  href={`/faculties/${fac.slug}`}
                  className="group relative bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:border-accent-500 rounded-xl p-7 flex flex-col gap-4 transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                >
                  <div className="relative h-14 w-14 rounded-lg bg-brand-900/8 dark:bg-brand-400/15 text-brand-900 dark:text-brand-300 flex items-center justify-center group-hover:bg-brand-900 group-hover:text-white transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="relative font-semibold text-base text-ink-900 dark:text-white group-hover:text-brand-900 dark:group-hover:text-brand-300 leading-snug">
                    {localized(fac.name, language)}
                  </h3>
                  <span className="relative mt-auto text-xs font-semibold text-brand-900 dark:text-brand-300 inline-flex items-center gap-1">
                    {p.common.details}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </Container>

      {/* Nega GSPI? */}
      <section className="bg-mist-100 dark:bg-slate-950 py-20 lg:py-24 border-t border-mist-200 dark:border-slate-800">
        <Container>
          <SectionHeading title="Nega GSPI?" align="center" className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY.map((w, i) => (
              <div key={i} className="flex flex-col items-start gap-3">
                <div className="h-12 w-12 rounded-lg bg-brand-900/8 text-brand-900 dark:text-brand-300 flex items-center justify-center">
                  <w.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-sm text-ink-900 dark:text-white">{w.title}</h3>
                <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
