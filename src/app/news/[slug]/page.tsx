"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Eye, Clock, FileDown, Tag } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import type { Post, Paginated } from "@/lib/types";
import { firstImage, formatDate, pickImage, youtubeId } from "@/lib/format";
import Container from "@/components/ui/Container";
import RemoteImage from "@/components/ui/RemoteImage";
import { Spinner, EmptyState, ErrorState } from "@/components/ui/States";

export default function NewsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { p, lang } = useT();

  const { data: post, loading, error, notFound, refetch } = useApi<Post>(`/news/${slug}`);
  const { data: latestRes } = useApi<Paginated<Post>>("/news");
  const latest = (latestRes?.data ?? []).filter((n) => n.slug !== slug).slice(0, 5);

  return (
    <div className="bg-mist-100 dark:bg-slate-950 py-20 lg:py-28 transition-colors">
      <Container>
        <Link
          href="/news"
          className="group inline-flex items-center gap-2 text-base font-semibold text-brand-900 dark:text-brand-300 hover:text-accent-500 mb-10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {p.titles.news}
        </Link>

        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || !post ? (
          <EmptyState title={p.common.notFound} description={p.common.notFoundDesc} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <article className="lg:col-span-8 bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-xl">
              <div className="flex flex-wrap items-center gap-4 text-sm text-ink-400 mb-4">
                {post.categories?.[0] && (
                  <span className="px-2.5 py-1 bg-brand-50 dark:bg-brand-950/40 text-brand-900 dark:text-brand-300 rounded inline-flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {post.categories[0].name || post.categories[0].title}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(post.date, lang)}
                </span>
                {post.views_count != null && (
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {post.views_count} {p.common.views}
                  </span>
                )}
              </div>

              <h1 className="display-2 text-ink-900 dark:text-white mb-3">
                {post.title}
              </h1>
              {post.subtitle && (
                <p className="text-sm text-ink-600 dark:text-ink-400 mb-6 font-medium">
                  {post.subtitle}
                </p>
              )}

              {firstImage(post.images, "lg") && (
                <div className="relative h-[280px] sm:h-[420px] w-full rounded-lg overflow-hidden mb-8 border border-mist-200 dark:border-slate-800">
                  <RemoteImage
                    src={firstImage(post.images, "lg")}
                    alt={post.title || ""}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {youtubeId(post.video_link) && (
                <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-8 bg-brand-950">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId(post.video_link)}`}
                    title={post.title || ""}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              )}

              {post.desc && (
                <div
                  className="article-content text-sm sm:text-base"
                  dangerouslySetInnerHTML={{ __html: post.desc }}
                />
              )}

              {/* Qo'shimcha rasmlar */}
              {post.images && post.images.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
                  {post.images.slice(1).map((img, i) => (
                    <div key={i} className="relative h-32 rounded-xl overflow-hidden border border-mist-200 dark:border-slate-800">
                      <RemoteImage src={pickImage(img, "md")} alt="" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {post.file && (
                <a
                  href={post.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-900 hover:bg-brand-800 text-white text-sm font-semibold transition-colors"
                >
                  <FileDown className="w-4 h-4" />
                  {p.common.download}
                </a>
              )}
            </article>

            <aside className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-sm text-ink-900 dark:text-white uppercase tracking-wider mb-5 pb-3 border-b border-mist-200 dark:border-slate-800">
                  {p.titles.news}
                </h3>
                <ul className="space-y-5">
                  {latest.map((story) => (
                    <li key={story.id} className="flex gap-3 group">
                      <div className="relative h-14 w-16 shrink-0 rounded-lg overflow-hidden">
                        <RemoteImage
                          src={firstImage(story.images, "sm")}
                          alt={story.title || ""}
                          className="h-full w-full object-cover"
                          iconClassName="w-4 h-4"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm text-ink-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-accent-500" />
                          {formatDate(story.date, lang)}
                        </span>
                        <Link
                          href={`/news/${story.slug}`}
                          className="text-base text-ink-900 dark:text-slate-100 hover:text-accent-500 leading-snug transition-colors line-clamp-2 block mt-0.5"
                        >
                          {story.title}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        )}
      </Container>
    </div>
  );
}
