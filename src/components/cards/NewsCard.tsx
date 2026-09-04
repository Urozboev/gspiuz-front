"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Eye } from "lucide-react";
import RemoteImage from "@/components/ui/RemoteImage";
import { firstImage, formatDate, truncate } from "@/lib/format";
import { useApp } from "@/context/AppContext";
import { translations } from "@/locales/translations";
import type { Post } from "@/lib/types";

/** Yangilik kartasi (yangiliklar ro'yxati va bosh sahifa uchun). */
export default function NewsCard({ post }: { post: Post }) {
  const { language } = useApp();
  const t = translations[language];
  const img = firstImage(post.images, "md");
  const category = post.categories?.[0]?.name || post.categories?.[0]?.title;

  return (
    <article className="lift group bg-white dark:bg-slate-900 rounded-xl overflow-hidden flex flex-col h-full">
      <Link href={`/news/${post.slug}`} className="relative h-52 w-full overflow-hidden block">
        <RemoteImage
          src={img}
          alt={post.title || ""}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {category && (
          <span className="absolute top-4 left-4 bg-brand-950/85 text-white text-xs font-medium py-1.5 px-3 rounded-md backdrop-blur-sm">
            {category}
          </span>
        )}
      </Link>

      <div className="p-7 flex flex-col flex-grow gap-4">
        <div className="flex items-center gap-4 text-xs text-ink-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.date, language)}
          </span>
          {post.views_count != null && (
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {post.views_count}
            </span>
          )}
        </div>

        <h3 className="font-display font-semibold text-lg text-ink-900 dark:text-white leading-snug line-clamp-2">
          <Link href={`/news/${post.slug}`} className="hover:text-brand-900 dark:hover:text-brand-300 transition-colors">
            {post.title}
          </Link>
        </h3>

        {post.desc && (
          <p className="text-base text-ink-600 dark:text-slate-400 line-clamp-3">
            {truncate(post.desc, 130)}
          </p>
        )}

        <div className="mt-auto pt-5 border-t border-mist-200 dark:border-slate-800/60">
          <Link
            href={`/news/${post.slug}`}
            className="text-sm font-semibold text-brand-900 dark:text-brand-300 hover:text-accent-500 inline-flex items-center gap-2 group/link"
          >
            <span>{t.readMore}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
