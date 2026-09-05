"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, Building2, Briefcase } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import { fullName, localized, normalizeMediaUrl, stripHtml } from "@/lib/format";
import { useApp } from "@/context/AppContext";
import Container from "@/components/ui/Container";
import RemoteImage from "@/components/ui/RemoteImage";
import { EmptyState, ErrorState, DetailSkeleton } from "@/components/ui/States";

interface EmployeeDetail {
  id: number;
  first_name: string | null;
  last_name: string | null;
  surname: string | null;
  email: string | null;
  address: string | null;
  phone: string | null;
  photo: string | null;
  dec: string | null;
  department?: { name: Record<string, string> | string | null } | null;
  position?: { name: Record<string, string> | string | null } | null;
  /**
   * Xodim bir nechta bo'limda lavozim egallashi mumkin (masalan prorektor
   * ayni paytda kengash a'zosi). `current: true` — ochilgan tayinlov.
   */
  assignments?: {
    slug?: string | null;
    position?: string | null;
    department?: string | null;
    current?: boolean;
  }[];
  employ_form?: string | null;
  employ_staff?: string | null;
  employ_type?: string | null;
}

export default function LeadershipDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { p } = useT();
  const { language } = useApp();
  const { data: emp, loading, error, notFound, refetch } = useApi<EmployeeDetail>(
    `/leaderships/${slug}`,
  );

  const name = emp ? fullName(emp.first_name, emp.last_name, emp.surname) : "";
  // Lavozim HTML bilan kelishi mumkin — sarlavha ostida bitta qator sifatida chiziladi.
  const position = emp ? stripHtml(localized(emp.position?.name, language)) : "";
  const department = emp ? localized(emp.department?.name, language) : "";

  // Joriy tayinlovdan boshqa lavozimlar — "yana" ro'yxati uchun.
  const otherRoles = (emp?.assignments ?? []).filter(
    (a) => !a.current && (a.position || a.department),
  );

  const contacts = emp
    ? [
        emp.phone && { icon: Phone, label: p.common.phone, value: emp.phone, href: `tel:${emp.phone}` },
        emp.email && { icon: Mail, label: p.common.email, value: emp.email, href: `mailto:${emp.email}` },
        emp.address && { icon: MapPin, label: p.common.address, value: emp.address },
        department && { icon: Building2, label: p.titles.departments, value: department },
      ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; href?: string }[]
    : [];

  return (
    <div className="bg-mist-100 dark:bg-slate-950 py-20 lg:py-28">
      <Container className="max-w-5xl">
        <Link href="/leadership" className="group inline-flex items-center gap-2 text-base font-semibold text-brand-900 dark:text-brand-300 hover:text-accent-500 mb-10 transition-colors">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {p.titles.leadership}
        </Link>

        {loading ? (
          <DetailSkeleton />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || !emp ? (
          <EmptyState title={p.common.notFound} description={p.common.notFoundDesc} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm">
                <div className="relative h-80 bg-mist-200 dark:bg-slate-800">
                  <RemoteImage src={normalizeMediaUrl(emp.photo)} alt={name} className="h-full w-full object-cover object-top" iconClassName="w-12 h-12" />
                </div>
                <div className="p-6 text-center">
                  {position && (
                    <span className="text-sm font-semibold text-brand-900 dark:text-brand-300">
                      {position}
                    </span>
                  )}
                  <h1 className="text-xl font-semibold text-ink-900 dark:text-white mt-1">{name}</h1>

                  {otherRoles.length > 0 && (
                    <ul className="mt-5 pt-5 border-t border-mist-200 dark:border-slate-800 flex flex-col gap-2 text-left">
                      {otherRoles.map((role, i) => (
                        <li key={i} className="text-sm text-ink-600 dark:text-slate-400">
                          <span className="font-semibold text-ink-900 dark:text-slate-200">
                            {role.position}
                          </span>
                          {role.department && ` · ${role.department}`}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6">
              {contacts.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-8">
                  <h2 className="text-base font-semibold text-ink-900 dark:text-white mb-5 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-accent-500" />
                    {p.leadershipPage.contactInfo}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contacts.map((c, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <c.icon className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-sm text-ink-400">{c.label}</p>
                          {c.href ? (
                            <a href={c.href} className="text-sm font-semibold text-ink-900 dark:text-slate-100 hover:text-accent-500 break-words">
                              {c.value}
                            </a>
                          ) : (
                            <p className="text-sm font-semibold text-ink-900 dark:text-slate-100 break-words">{c.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {emp.dec && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-8">
                  <h2 className="text-base font-semibold text-ink-900 dark:text-white mb-4">
                    {p.leadershipPage.bio}
                  </h2>
                  <div className="article-content text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: emp.dec }} />
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
