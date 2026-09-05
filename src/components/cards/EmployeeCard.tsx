"use client";

import Link from "next/link";
import { Phone, Mail, ArrowUpRight } from "lucide-react";
import RemoteImage from "@/components/ui/RemoteImage";
import { fullName, localized, normalizeMediaUrl, stripHtml } from "@/lib/format";
import { useApp } from "@/context/AppContext";
import type { Employee, StaffMember } from "@/lib/types";

interface EmployeeCardProps {
  /**
   * Xodim — `/leaderships` (ichma-ich) yoki `/department`, `/tutors` (tekis)
   * shaklidagi obyekt bo'lishi mumkin.
   */
  employee: Employee | StaffMember;
  /** Profil sahifasiga havola (slug bo'lsa). */
  href?: string;
  featured?: boolean;
}

/** Xodim / o'qituvchi kartasi (rahbariyat, kafedra, fakultet sahifalari uchun). */
export default function EmployeeCard({ employee, href, featured }: EmployeeCardProps) {
  const { language } = useApp();

  // Ikki xil javob shaklini bitta ko'rinishga keltiramiz.
  const name =
    ("full_name" in employee && employee.full_name) ||
    fullName(employee.first_name, employee.last_name, employee.surname);

  /*
   * Lavozim eski saytdan HTML bilan keladi (`<p><strong>…</strong></p>`).
   * Kartochkada bu bitta qator yozuv — teglar kerak emas, tozalanadi.
   */
  const position = stripHtml(
    typeof employee.position === "string"
      ? employee.position
      : employee.position
        ? localized(employee.position.name, language)
        : "",
  );

  const inner = (
    <div
      className={`lift group bg-white dark:bg-slate-900 rounded-xl overflow-hidden flex flex-col h-full ${
        featured ? "sm:flex-row" : ""
      }`}
    >
      <div
        className={`relative bg-mist-200 dark:bg-slate-800 ${
          featured ? "sm:w-60 h-72 sm:h-auto shrink-0" : "h-72 w-full"
        }`}
      >
        <RemoteImage
          // Backend absolyut URL qaytaradi; uni same-origin /upload yo'liga keltiramiz.
          src={normalizeMediaUrl(employee.photo)}
          alt={name}
          className="h-full w-full object-cover object-top"
          iconClassName="w-10 h-10"
        />
      </div>

      <div className="p-7 flex flex-col flex-grow">
        {position && (
          <span className="text-sm font-semibold text-brand-900 dark:text-brand-300">
            {position}
          </span>
        )}
        <h3 className="mt-2 font-display text-xl font-semibold text-ink-900 dark:text-white leading-snug group-hover:text-brand-900 dark:group-hover:text-brand-300 transition-colors">
          {name}
        </h3>

        {"department" in employee && employee.department?.name && (
          <p className="mt-2 text-sm text-ink-400">{employee.department.name}</p>
        )}

        {featured && employee.dec && (
          <p className="mt-4 text-base text-ink-600 dark:text-slate-400 line-clamp-3">
            {stripHtml(employee.dec)}
          </p>
        )}

        {(employee.phone || employee.email) && (
          <div className="mt-auto pt-6 flex flex-col gap-2.5 text-sm text-ink-600 dark:text-slate-400">
            {employee.phone && (
              <span className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent-500 shrink-0" />
                {employee.phone}
              </span>
            )}
            {employee.email && (
              <span className="flex items-center gap-2.5 truncate">
                <Mail className="w-4 h-4 text-accent-500 shrink-0" />
                {employee.email}
              </span>
            )}
          </div>
        )}

        {href && (
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-900 dark:text-brand-300">
            <span className="h-px w-8 bg-accent-500 group-hover:w-12 transition-all" />
            <ArrowUpRight className="w-4 h-4" />
          </span>
        )}
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="block h-full">
      {inner}
    </Link>
  ) : (
    inner
  );
}
