"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch, ApiError, type FetchOptions } from "@/lib/api";
import { useApp } from "@/context/AppContext";

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  /** 404 — "ma'lumot topilmadi" — alohida bayroq sifatida. */
  notFound: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Backend API'dan ma'lumot oladigan asosiy hook.
 * Joriy tilga (AppContext) bog'langan — til o'zgarganda avtomatik qayta yuklaydi.
 */
export function useApi<T>(
  endpoint: string | null,
  params?: FetchOptions["params"],
): ApiState<T> {
  const { language } = useApp();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!!endpoint);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  const paramsKey = params ? JSON.stringify(params) : "";

  const refetch = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    if (!endpoint) {
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setNotFound(false);

    apiFetch<T>(endpoint, {
      lang: language,
      signal: controller.signal,
      params,
    })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        if (err instanceof ApiError && err.status === 404) {
          setData(null);
          setNotFound(true);
          setLoading(false);
          return;
        }
        setError(err instanceof Error ? err.message : "Noma'lum xatolik");
        setLoading(false);
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, language, paramsKey, nonce]);

  return { data, loading, notFound, error, refetch };
}
