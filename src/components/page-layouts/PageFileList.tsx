"use client";

import { useMemo, useState } from "react";
import { FileText, FileDown, ChevronDown } from "lucide-react";
import { useT } from "@/hooks/useT";
import { formatDate, normalizeMediaUrl, pickImage, stripHtml } from "@/lib/format";
import RemoteImage from "@/components/ui/RemoteImage";
import type { ImageSet, PageFile } from "@/lib/types";

/** Bayt hajmini o'qishga qulay ko'rinishga keltiradi. */
function formatSize(size: number | string | null): string | null {
  const bytes = typeof size === "string" ? Number(size) : size;
  if (!bytes || Number.isNaN(bytes)) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Fayl kengaytmasini nomidan yoki MIME turidan aniqlaydi. */
function fileKind(file: PageFile): string | null {
  const fromUrl = file.url?.split("?")[0].split(".").pop()?.toUpperCase();
  if (fromUrl && fromUrl.length <= 4) return fromUrl;
  if (file.mime) return file.mime.split("/").pop()?.toUpperCase() ?? null;
  return null;
}

function fileImage(image: PageFile["image"]): string | null {
  if (!image) return null;
  if (typeof image === "string") return normalizeMediaUrl(image);
  // Ro'yxatdagi muqova 64x64 da ko'rinadi — eng kichik o'lcham yetarli.
  return pickImage(image as ImageSet, "sm");
}

/** Sanadan yilni ajratadi; sana bo'lmasa `null`. */
function yearOf(file: PageFile): number | null {
  if (!file.date) return null;
  const year = Number(String(file.date).slice(0, 4));
  return Number.isFinite(year) && year > 1900 ? year : null;
}

/** Yil ochiq holda chiziladigan guruhlar soni — qolganlari yopiq keladi. */
const OPEN_YEARS = 1;

/**
 * `layout: "files"` — yuklab olinadigan fayllar ro'yxati.
 *
 * Bunday sahifalarga fayl muntazam qo'shiladi (masalan har kuni yangi
 * hujjat), shuning uchun ro'yxat **yillar bo'yicha guruhlanadi**: eng
 * yangi yil ochiq, qolganlari yig'ilgan holda keladi. Sanasi yo'q
 * fayllar oxirida alohida guruhda chiqadi.
 */
export default function PageFileList({ files }: { files: PageFile[] }) {
  const { p, lang } = useT();

  /** Yil → shu yildagi fayllar, yangi yildan eskiga qarab. */
  const groups = useMemo(() => {
    const byYear = new Map<number | null, PageFile[]>();
    for (const file of files) {
      const year = yearOf(file);
      const list = byYear.get(year) ?? [];
      list.push(file);
      byYear.set(year, list);
    }

    // Har bir yil ichida yangi sana yuqorida tursin.
    for (const list of byYear.values()) {
      list.sort((a, b) => String(b.date ?? "").localeCompare(String(a.date ?? "")));
    }

    return [...byYear.entries()].sort(([a], [b]) => {
      // Sanasiz guruh doim oxirida.
      if (a === null) return 1;
      if (b === null) return -1;
      return b - a;
    });
  }, [files]);

  const [collapsed, setCollapsed] = useState<Set<number | null>>(
    () => new Set(groups.slice(OPEN_YEARS).map(([year]) => year)),
  );

  if (files.length === 0) return null;

  const toggle = (year: number | null) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });

  /*
   * Fayllar bitta yilga tegishli bo'lsa (yoki sanasi umuman yo'q bo'lsa)
   * guruh sarlavhasi keraksiz — shunchaki ro'yxat chiziladi.
   */
  const showGroups = groups.length > 1;

  return (
    <div className="flex flex-col gap-10">
      {groups.map(([year, list]) => {
        const isCollapsed = showGroups && collapsed.has(year);

        return (
          <section key={year ?? "sanasiz"}>
            {showGroups && (
              <button
                type="button"
                onClick={() => toggle(year)}
                aria-expanded={!isCollapsed}
                className="group mb-6 flex w-full items-center gap-4 text-left"
              >
                <h3 className="text-xl font-semibold text-ink-900 dark:text-white tabular-nums">
                  {year ?? "—"}
                </h3>
                <span className="text-sm text-ink-400 tabular-nums">
                  {list.length}
                </span>
                <span className="h-px flex-grow bg-mist-200 dark:bg-slate-800" />
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-brand-900 dark:text-brand-300 transition-transform ${
                    isCollapsed ? "" : "rotate-180"
                  }`}
                />
              </button>
            )}

            {!isCollapsed && (
              <ul className="flex flex-col gap-3">
                {list.map((file, index) => (
                  <li key={file.id ?? file.url ?? file.title ?? index}>
                    <FileRow file={file} lang={lang} download={p.common.download} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}

/** Bitta fayl qatori — muqova rasmi, nomi, izohi va yuklab olish havolasi. */
function FileRow({
  file,
  lang,
  download,
}: {
  file: PageFile;
  lang: Parameters<typeof formatDate>[1];
  download: string;
}) {
  const href = normalizeMediaUrl(file.url);
  const kind = fileKind(file);
  const size = formatSize(file.size);
  const image = fileImage(file.image);
  const desc = file.desc ? stripHtml(file.desc) : null;

  const inner = (
    <>
      {/* Muqova rasmi bo'lsa o'sha, aks holda hujjat ikonkasi. */}
      {image ? (
        <span className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-mist-200 dark:bg-slate-800">
          <RemoteImage
            src={image}
            alt={file.title || ""}
            className="h-full w-full object-cover"
            iconClassName="w-5 h-5"
          />
        </span>
      ) : (
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-brand-900/8 dark:bg-brand-400/15 text-brand-900 dark:text-brand-300 group-hover:bg-brand-900 group-hover:text-white transition-colors">
          <FileText className="w-6 h-6" />
        </span>
      )}

      <span className="min-w-0 flex-grow">
        <span className="block text-lg text-ink-900 dark:text-slate-100 leading-snug">
          {file.title}
        </span>

        {desc && (
          <span className="mt-1.5 block text-base text-ink-600 dark:text-slate-400 line-clamp-2">
            {desc}
          </span>
        )}

        <span className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-400">
          {file.date && <span>{formatDate(file.date, lang)}</span>}
          {kind && <span className="tabular-nums">{kind}</span>}
          {size && <span className="tabular-nums">{size}</span>}
        </span>
      </span>

      {href && (
        <span className="hidden sm:inline-flex items-center gap-2 shrink-0 text-sm font-semibold text-brand-900 dark:text-brand-300">
          <FileDown className="w-4 h-4" />
          {download}
        </span>
      )}
    </>
  );

  const cls =
    "group bg-white dark:bg-slate-900 rounded-xl p-6 flex items-start gap-5 transition-colors hover:bg-mist-50 dark:hover:bg-slate-800/60";

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" download className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
