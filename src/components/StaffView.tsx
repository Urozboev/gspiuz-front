"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { localized } from "@/lib/format";
import { normalizeStaff } from "@/lib/normalize";
import { sectionPages } from "@/locales/sections";
import type { Department, DepartmentStaff } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section, PendingNotice } from "@/components/ui/InfoBlocks";
import EmployeeCard from "@/components/cards/EmployeeCard";
import { Spinner, ErrorState } from "@/components/ui/States";

interface StaffViewProps {
  slug: string;
  /** Barcha bo'limlar ro'yxati endpointi (nomni topish uchun). */
  listEndpoint: string;
  /** Xodimlar endpointi (department_boss + simple_employee). */
  detailEndpoint: string;
  backHref: string;
  backLabel: string;
  crumbTitle: string;
  icon: React.ReactNode;
}

/** Fakultet va kafedra xodimlarini ko'rsatuvchi umumiy komponent. */
export default function StaffView({
  slug,
  listEndpoint,
  detailEndpoint,
  backHref,
  backLabel,
  crumbTitle,
  icon,
}: StaffViewProps) {

  const { language } = useApp();
  const sp = sectionPages[language];

  const { data: list } = useApi<Department[]>(listEndpoint);
  const { data, loading, error, notFound, refetch } =
    useApi<DepartmentStaff>(detailEndpoint);

  const current = (list ?? []).find((d) => d.slug === slug);
  const title = current ? localized(current.name, language) : crumbTitle;

  const { boss, staff } = normalizeStaff(data, language);
  const hasStaff = Boolean(boss) || staff.length > 0;

  return (
    <>
      <PageHero
        title={title}
        crumbs={[{ label: crumbTitle, href: backHref }, { label: title }]}
        icon={icon}
      />

      <Section tone="mist">
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || !hasStaff ? (
          <PendingNotice text={sp.pending} />
        ) : (
          <div className="flex flex-col gap-16">
            {boss && (
              <div>
                <h2 className="display-3 text-ink-900 dark:text-white mb-8">
                  {sp.labels.head}
                </h2>
                <div className="max-w-3xl">
                  <EmployeeCard employee={boss} featured />
                </div>
              </div>
            )}

            {staff.length > 0 && (
              <div>
                <h2 className="display-3 text-ink-900 dark:text-white mb-8">
                  {sp.labels.staff}
                </h2>
                <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {staff.map((employee) => (
                    <EmployeeCard key={employee.id} employee={employee} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Section>

      <Section>
        <Link
          href={backHref}
          className="group inline-flex items-center gap-2 text-base font-semibold text-brand-900 dark:text-brand-300"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {backLabel}
        </Link>
      </Section>
    </>
  );
}
