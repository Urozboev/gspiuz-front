"use client";

import { FileText } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { useT } from "@/hooks/useT";
import { endpoints } from "@/lib/endpoints";
import { sectionPages } from "@/locales/sections";
import { normalizeMediaUrl, pickImage, youtubeId } from "@/lib/format";
import RemoteImage from "@/components/ui/RemoteImage";
import type { DynamicPage, ImageSet } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section, PendingNotice } from "@/components/ui/InfoBlocks";
import { EmptyState, ErrorState, ArticleSkeleton } from "@/components/ui/States";
import PageCardGrid from "./PageCardGrid";
import PageFileList from "./PageFileList";

/**
 * Admin paneldan boshqariladigan sahifa.
 *
 * Backend `GET /pages/{slug}` javobidagi `layout` maydoniga qarab uch xil
 * ko'rinishdan birini chizadi:
 *  - `single` — sarlavha + HTML matn (+ ixtiyoriy fayllar)
 *  - `cards`  — kartochkalar to'ri, har biri alohida sahifaga o'tadi
 *  - `files`  — yuklab olinadigan fayllar ro'yxati
 *
 * `fallback` — backendda sahifa hali yaratilmagan bo'lsa ishlatiladigan
 * sarlavha va tavsif (frontenddagi tarjimalar).
 */
export default function DynamicPageView({
  slug,
  fallback,
  icon,
}: {
  slug: string;
  fallback: { title: string; subtitle?: string };
  icon?: React.ReactNode;
}) {
  const { language } = useApp();
  const { p } = useT();
  const sp = sectionPages[language];

  const { data, loading, error, notFound, refetch } = useApi<{ data: DynamicPage }>(
    endpoints.page(slug),
  );
  const page = data?.data;

  const title = page?.title || fallback.title;
  const subtitle = page?.subtitle || fallback.subtitle;

  const files = page?.files ?? [];
  const blocks = page?.blocks ?? [];
  const hasBody = Boolean(page?.body && page.body.trim());

  // Matndan tashqari yuklangan rasmlar va video.
  const gallery = (page?.images ?? [])
    .map((img) =>
      typeof img === "string" ? normalizeMediaUrl(img) : pickImage(img as ImageSet, "md"),
    )
    .filter((src): src is string => !!src);
  const video = youtubeId(page?.video);

  /** Kontent hali kiritilmagan holat. */
  const isEmpty =
    !hasBody &&
    blocks.length === 0 &&
    files.length === 0 &&
    gallery.length === 0 &&
    !video;

  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        crumbs={[{ label: title }]}
        icon={icon ?? <FileText className="w-6 h-6" />}
      />

      <Section tone="mist">
        {loading ? (
          <ArticleSkeleton />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || isEmpty ? (
          <PendingNotice text={sp.pending} />
        ) : (
          <>
            {/* single — HTML matn */}
            {hasBody && (
              <div className="bg-white dark:bg-slate-900 rounded-xl p-8 sm:p-12">
                <div
                  className="article-content max-w-3xl"
                  // Matn admin panelning muharriridan keladi (CKEditor).
                  dangerouslySetInnerHTML={{ __html: page!.body! }}
                />
              </div>
            )}

            {/* Video — matndan keyin. */}
            {video && (
              <div className={hasBody ? "mt-8" : ""}>
                <div className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-xl bg-brand-950">
                  <iframe
                    src={`https://www.youtube.com/embed/${video}`}
                    title={title}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            )}

            {gallery.length > 0 && (
              <div className={hasBody || video ? "mt-8" : ""}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {gallery.map((src) => (
                    <div
                      key={src}
                      className="relative h-40 overflow-hidden rounded-lg bg-mist-200 dark:bg-slate-800"
                    >
                      <RemoteImage src={src} alt={title} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* cards — kartochkalar to'ri */}
            {blocks.length > 0 && (
              <div className={hasBody ? "mt-14" : ""}>
                <PageCardGrid pageSlug={slug} cards={blocks} />
              </div>
            )}

            {/* files — fayllar ro'yxati */}
            {files.length > 0 && (
              <div className={hasBody || blocks.length > 0 ? "mt-14" : ""}>
                {(hasBody || blocks.length > 0) && (
                  <h2 className="display-3 text-ink-900 dark:text-white mb-10">
                    {sp.labels.documents}
                  </h2>
                )}
                <PageFileList files={files} />
              </div>
            )}
          </>
        )}
      </Section>

      {/* Backend javob bermasa ham sahifa buzilmasin */}
      {!loading && !error && notFound && (
        <Section>
          <EmptyState description={p.common.notFoundDesc} />
        </Section>
      )}
    </>
  );
}
