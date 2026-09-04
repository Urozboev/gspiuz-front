"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays, FileText } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { useT } from "@/hooks/useT";
import { endpoints } from "@/lib/endpoints";
import { sectionPages } from "@/locales/sections";
import {
  formatDate,
  pickImage,
  normalizeMediaUrl,
  youtubeId,
} from "@/lib/format";
import type { DynamicPageItem, ImageSet } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/InfoBlocks";
import RemoteImage from "@/components/ui/RemoteImage";
import PageFileList from "./PageFileList";
import { Spinner, EmptyState, ErrorState } from "@/components/ui/States";

/** `layout: "cards"` sahifasidagi bitta element — alohida sahifa. */
export default function DynamicPageItemView({
  pageSlug,
  itemSlug,
  parentTitle,
}: {
  pageSlug: string;
  itemSlug: string;
  parentTitle: string;
}) {
  const { p, lang } = useT();
  const { language } = useApp();
  const sp = sectionPages[language];

  const { data, loading, error, notFound, refetch } = useApi<{
    data: DynamicPageItem;
  }>(endpoints.pageItem(pageSlug, itemSlug));
  const item = data?.data;

  const image = item?.image
    ? typeof item.image === "string"
      ? normalizeMediaUrl(item.image)
      : pickImage(item.image as ImageSet, "lg")
    : null;

  // Matn ostidagi qo'shimcha rasmlar.
  const gallery = (item?.images ?? [])
    .map((img) =>
      typeof img === "string" ? normalizeMediaUrl(img) : pickImage(img as ImageSet, "md"),
    )
    .filter((src): src is string => !!src);

  const video = youtubeId(item?.video);

  return (
    <>
      <PageHero
        title={item?.title || parentTitle}
        crumbs={[
          { label: parentTitle, href: `/${pageSlug}` },
          { label: item?.title || "" },
        ]}
        icon={<FileText className="w-6 h-6" />}
      />

      <Section tone="mist">
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || !item ? (
          <EmptyState description={p.common.notFoundDesc} />
        ) : (
          <article className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden">
            {image && (
              <div className="relative h-72 sm:h-96 w-full bg-mist-200 dark:bg-slate-800">
                <RemoteImage
                  src={image}
                  alt={item.title || ""}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="p-8 sm:p-12">
              {item.date && (
                <p className="flex items-center gap-2 text-sm text-ink-400">
                  <CalendarDays className="w-4 h-4" />
                  {formatDate(item.date, lang)}
                </p>
              )}

              <h1 className="mt-5 display-3 text-ink-900 dark:text-white">
                {item.title}
              </h1>

              {item.body && (
                <div
                  className="article-content mt-8 max-w-3xl"
                  // Matn admin panel muharriridan keladi.
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
              )}

              {/* Video — matndan keyin, galereyadan oldin. */}
              {video && (
                <div className="mt-10 relative aspect-video w-full overflow-hidden rounded-lg bg-brand-950">
                  <iframe
                    src={`https://www.youtube.com/embed/${video}`}
                    title={item.title || ""}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              )}

              {gallery.length > 0 && (
                <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gallery.map((src) => (
                    <div
                      key={src}
                      className="relative h-36 overflow-hidden rounded-lg bg-mist-200 dark:bg-slate-800"
                    >
                      <RemoteImage
                        src={src}
                        alt={item.title || ""}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {item.files && item.files.length > 0 && (
                <div className="mt-12 pt-12 border-t border-mist-200 dark:border-slate-800">
                  <h2 className="text-xl font-semibold text-ink-900 dark:text-white mb-8">
                    {sp.labels.documents}
                  </h2>
                  <PageFileList files={item.files} />
                </div>
              )}

              <div className="mt-12">
                <Link
                  href={`/${pageSlug}`}
                  className="group inline-flex items-center gap-2 text-base font-semibold text-brand-900 dark:text-brand-300"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  {parentTitle}
                </Link>
              </div>
            </div>
          </article>
        )}
      </Section>
    </>
  );
}
