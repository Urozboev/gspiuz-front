import { API_BASE } from "./config";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export interface FetchOptions {
  /** Joriy til (Accept-Language headeriga yuboriladi). */
  lang?: string;
  /** Abort signal (komponent unmount bo'lganda so'rovni bekor qilish). */
  signal?: AbortSignal;
  /** Query parametrlar. */
  params?: Record<string, string | number | undefined | null>;
}

function buildUrl(endpoint: string, params?: FetchOptions["params"]): string {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE}${path}`;
  if (!params) return url;
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      qs.append(key, String(value));
    }
  }
  const query = qs.toString();
  return query ? `${url}?${query}` : url;
}

/**
 * Backend API'ga GET so'rov yuboradi va JSON qaytaradi.
 * 404 ("ma'lumot topilmadi") holatlarini chaqiruvchi tutib oladi.
 */
export async function apiFetch<T>(
  endpoint: string,
  { lang = "uz", signal, params }: FetchOptions = {},
): Promise<T> {
  const res = await fetch(buildUrl(endpoint, params), {
    signal,
    headers: {
      Accept: "application/json",
      "Accept-Language": lang,
    },
  });

  if (!res.ok) {
    let message = `So'rov xatosi (${res.status})`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      /* JSON emas — standart xabar qoladi */
    }
    throw new ApiError(message, res.status);
  }

  return (await res.json()) as T;
}

/**
 * Backend API'ga POST so'rov yuboradi.
 *
 * `FormData` berilsa Content-Type brauzer tomonidan (boundary bilan)
 * o'rnatiladi — shuning uchun uni qo'lda qo'ymaymiz. Aks holda JSON yuboriladi.
 */
export async function apiPost<T>(
  endpoint: string,
  body: FormData | Record<string, unknown>,
  { lang = "uz", signal }: Omit<FetchOptions, "params"> = {},
): Promise<T> {
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;

  const res = await fetch(buildUrl(endpoint), {
    method: "POST",
    signal,
    headers: {
      Accept: "application/json",
      "Accept-Language": lang,
      ...(isForm ? {} : { "Content-Type": "application/json" }),
    },
    body: isForm ? body : JSON.stringify(body),
  });

  if (!res.ok) {
    let message = `So'rov xatosi (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
      // Laravel validatsiya xatolari: {errors: {maydon: [xabar]}}
      else if (data?.errors) {
        const first = Object.values(data.errors)[0];
        if (Array.isArray(first) && first[0]) message = String(first[0]);
      }
    } catch {
      /* JSON emas — standart xabar qoladi */
    }
    throw new ApiError(message, res.status);
  }

  return (await res.json()) as T;
}
