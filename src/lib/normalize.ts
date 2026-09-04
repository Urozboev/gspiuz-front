import type { Language } from "@/context/AppContext";
import type { Employee } from "./types";
import { localized, uploadUrl } from "./format";

/**
 * Backendning ba'zi endpointlari (fakultet/kafedra detali) xom Eloquent
 * modellarini qaytaradi: ism maydonlari {uz,ru,en} obyekt, photo esa fayl nomi.
 * Bu funksiya ularni bir xil `Employee` shakliga keltiradi.
 */
export function normalizeEmployee(raw: unknown, lang: Language): Employee | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;

  // employMeta massiv yoki obyekt bo'lishi mumkin
  const metaRaw = r.employMeta ?? r.employ_meta;
  const meta = Array.isArray(metaRaw) ? metaRaw[0] : metaRaw;
  const metaObj = (meta && typeof meta === "object" ? meta : {}) as Record<string, unknown>;

  /*
   * Lavozim ikki xil joyda kelishi mumkin:
   *  - xodimning o'zida: position: {uz,ru,en}   (fakultet/kafedra detali)
   *  - employ_meta ichida: position: {id, name} (boshqa endpointlar)
   */
  const rawPosition = r.position ?? metaObj.position;
  const positionObj =
    rawPosition && typeof rawPosition === "object"
      ? "name" in (rawPosition as Record<string, unknown>)
        ? (rawPosition as { id?: number; name: Record<string, string> | string })
        : { id: 0, name: rawPosition as Record<string, string> }
      : typeof rawPosition === "string"
        ? { id: 0, name: rawPosition }
        : undefined;

  const nameField = (v: unknown): string | null => {
    if (v == null) return null;
    if (typeof v === "string") return v;
    if (typeof v === "object") return localized(v as Record<string, string>, lang) || null;
    return null;
  };

  return {
    id: Number(r.id) || 0,
    slug: (metaObj.slug as string) || (r.slug as string) || null,
    first_name: nameField(r.first_name),
    last_name: nameField(r.last_name),
    surname: nameField(r.surname),
    email: (r.email as string) || null,
    phone: (r.phone as string) || null,
    // Rasm to'g'ridan-to'g'ri `photo` da yoki o'lchamli maydonlarda kelishi mumkin.
    photo: uploadUrl((r.photo ?? r.md_img ?? r.lg_img ?? r.sm_img) as string),
    dec: nameField(r.dec),
    position: positionObj
      ? { id: Number(positionObj.id) || 0, name: positionObj.name ?? "" }
      : null,
  };
}

/** department_boss + simple_employee javobini normallashtiradi. */
export function normalizeStaff(
  data: { department_boss?: unknown; simple_employee?: unknown[] } | null | undefined,
  lang: Language,
): { boss: Employee | null; staff: Employee[] } {
  if (!data) return { boss: null, staff: [] };
  const boss = normalizeEmployee(data.department_boss, lang);
  const staff = (data.simple_employee ?? [])
    .map((e) => normalizeEmployee(e, lang))
    .filter((e): e is Employee => e !== null);
  return { boss, staff };
}
