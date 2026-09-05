"use client";

import { Trophy } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { sectionPages } from "@/locales/sections";
import { pickImage, stripHtml } from "@/lib/format";
import type { Paginated, Student } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section, PendingNotice, PageBody } from "@/components/ui/InfoBlocks";
import RemoteImage from "@/components/ui/RemoteImage";
import { ErrorState, StaffGridSkeleton } from "@/components/ui/States";
import { usePageBlocks } from "@/hooks/usePageBlocks";

/** Iqtidorli talabalar — tanlov va olimpiada g'oliblari. */
export default function TalentedStudentsPage() {
  const { language } = useApp();
  // Sahifa matni admin paneldan keladi (GET /pages/talented-students).
  const { page } = usePageBlocks("talented-students");

  const dict = sectionPages[language];

  const { data, loading, error, notFound, refetch } =
    useApi<Paginated<Student>>("/students");
  const students = data?.data ?? [];

  return (
    <>
      <PageHero
        title={dict.talented.title}
        subtitle={dict.talented.subtitle}
        crumbs={[{ label: dict.talented.title }]}
        icon={<Trophy className="w-6 h-6" />}
      />

      {/* Sahifa matni — admin panelning "Sahifa matni" maydonidan. */}
      <PageBody html={page?.body} />

      <Section tone="mist">
        {loading ? (
          <StaffGridSkeleton />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || students.length === 0 ? (
          <PendingNotice text={dict.pending} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {students.map((student) => (
              <div
                key={student.id}
                className="lift bg-white dark:bg-slate-900 rounded-xl overflow-hidden"
              >
                <div className="h-64 w-full overflow-hidden bg-mist-100 dark:bg-slate-800">
                  <RemoteImage
                    src={pickImage(student.photo, "md")}
                    alt={student.name || ""}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-semibold text-ink-900 dark:text-white leading-snug">
                    {student.name}
                  </h3>
                  {student.dec && (
                    <p className="mt-3 text-base text-ink-600 dark:text-slate-400 line-clamp-3">
                      {stripHtml(student.dec)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
