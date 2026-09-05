"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  GraduationCap,
  Hash,
  Clock,
  ChevronDown,
  Users,
  PlayCircle,
} from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApp } from "@/context/AppContext";
import { admissions } from "@/locales/sections";
import { useApi } from "@/hooks/useApi";
import type { EducationalProgram } from "@/lib/types";
import { pickImage, youtubeId, stripHtml } from "@/lib/format";
import Container from "@/components/ui/Container";
import RemoteImage from "@/components/ui/RemoteImage";
import { Spinner, EmptyState, ErrorState } from "@/components/ui/States";

interface ProgramDetail extends EducationalProgram {
  first_descriptionv?: string | null;
  faq?: { id: number; question: string | null; answer: string | null }[];
  employs?: { id: number; name: string; position?: string | null; dec?: string | null; photo?: { lg: string | null; md: string | null; sm: string | null } }[];
}

export default function ProgramDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { p, t } = useT();
  const { language } = useApp();
  const adm = admissions[language];
  const { data: prog, loading, error, notFound, refetch } = useApi<ProgramDetail>(
    `/educational-programs/${id}`,
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const descriptions = prog
    ? [
        prog.first_description || prog.first_descriptionv,
        prog.second_description,
        prog.third_description,
      ].filter(Boolean)
    : [];

  const facts = prog
    ? [
        prog.code && { icon: Hash, label: p.programs.code, value: prog.code },
        prog.education_years && {
          icon: Clock,
          label: p.programs.duration,
          value: `${prog.education_years} ${p.programs.years}`,
        },
        prog.form_education && { icon: GraduationCap, label: "Ta'lim shakli", value: prog.form_education },
      ].filter(Boolean) as { icon: typeof Hash; label: string; value: string }[]
    : [];

  const ytId = youtubeId(prog?.yt_link);
  const employs = prog?.employs ?? [];
  const faq = prog?.faq ?? [];

  return (
    <div className="bg-mist-100 dark:bg-slate-950 py-20 lg:py-28">
      <Container>
        <Link href="/educational-programs" className="group inline-flex items-center gap-2 text-base font-semibold text-brand-900 dark:text-brand-300 hover:text-accent-500 mb-10 transition-colors">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {p.titles.programs}
        </Link>

        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || !prog ? (
          <EmptyState title={p.common.notFound} description={p.common.notFoundDesc} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Title card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-10">
                <div className="h-14 w-14 rounded-lg bg-brand-900/8 text-brand-900 dark:text-brand-300 flex items-center justify-center mb-5">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h1 className="display-2 text-ink-900 dark:text-white">
                  {prog.name}
                </h1>
                {facts.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-6">
                    {facts.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 bg-mist-100 dark:bg-slate-800/60 rounded-xl px-4 py-2.5">
                        <f.icon className="w-4 h-4 text-accent-500" />
                        <div>
                          <span className="block text-sm text-ink-400">{f.label}</span>
                          <span className="text-sm font-semibold text-ink-900 dark:text-slate-100">{f.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Descriptions */}
              {descriptions.map((d, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-8 article-content text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: d as string }} />
              ))}

              {/* Video */}
              {ytId && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-ink-900 dark:text-white mb-4 flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-accent-500" />
                    Video
                  </h2>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${ytId}`} title="Video" allowFullScreen />
                  </div>
                </div>
              )}

              {/* FAQ */}
              {faq.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-ink-900 dark:text-white mb-4">{p.titles.faq}</h2>
                  <div className="flex flex-col gap-2">
                    {faq.map((item) => {
                      const isOpen = openFaq === item.id;
                      return (
                        <div key={item.id} className="border border-slate-200/60 dark:border-slate-800 rounded-xl overflow-hidden">
                          <button onClick={() => setOpenFaq(isOpen ? null : item.id)} className="w-full flex items-center justify-between gap-3 p-4 text-left">
                            <span className="font-semibold text-sm text-ink-900 dark:text-white">{item.question}</span>
                            <ChevronDown className={`w-4 h-4 text-accent-500 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                          </button>
                          {isOpen && item.answer && (
                            <div className="article-content text-sm px-4 pb-4" dangerouslySetInnerHTML={{ __html: item.answer }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar: teachers */}
            <aside className="lg:col-span-4 flex flex-col gap-6">
              {employs.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-xl p-6">
                  <h3 className="font-semibold text-sm text-ink-900 dark:text-white uppercase tracking-wider mb-5 pb-3 border-b border-mist-200 dark:border-slate-800 flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent-500" />
                    O'qituvchilar
                  </h3>
                  <ul className="space-y-4">
                    {employs.map((emp) => (
                      <li key={emp.id} className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden bg-mist-200 dark:bg-slate-800">
                          <RemoteImage src={pickImage(emp.photo, "sm")} alt={emp.name} className="h-full w-full object-cover" iconClassName="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-ink-900 dark:text-slate-100 truncate">{emp.name}</p>
                          {emp.position && (
                            <p className="text-sm text-ink-400 truncate">
                              {stripHtml(emp.position)}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                href="/admissions"
                className="bg-brand-900 hover:bg-brand-800 text-white rounded-xl p-6 text-center transition-colors"
              >
                <p className="font-semibold text-base">{t.nav.admissions}</p>
                <p className="text-xs text-brand-100/75 mt-1">{adm.tabs.commission}</p>
              </Link>
            </aside>
          </div>
        )}
      </Container>
    </div>
  );
}
