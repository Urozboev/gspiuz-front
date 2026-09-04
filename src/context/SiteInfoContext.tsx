"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import type { MenuItem, PopupNotice, SiteInfo } from "@/lib/types";
import { useApp } from "./AppContext";

/** `GET /bootstrap` javobi — har sahifada kerak bo'ladigan uchta ma'lumot. */
interface Bootstrap {
  siteinfo: SiteInfo | null;
  menu: MenuItem[];
  popups: PopupNotice[];
}

interface SiteInfoContextType {
  siteInfo: SiteInfo | null;
  menu: MenuItem[];
  popups: PopupNotice[];
  loading: boolean;
}

const SiteInfoContext = createContext<SiteInfoContextType>({
  siteInfo: null,
  menu: [],
  popups: [],
  loading: true,
});

/**
 * Sayt ma'lumotlari, menyu va modal xabarlarni **bitta so'rovda** yuklaydi.
 *
 * Uchalasi ham har bir sahifada kerak bo'ladi, shuning uchun backend ularni
 * `GET /bootstrap` da birga qaytaradi — sahifa boshiga uchta so'rov o'rniga
 * bitta. Til o'zgarganda qayta yuklanadi.
 */
export function SiteInfoProvider({ children }: { children: React.ReactNode }) {
  const { language } = useApp();
  const [data, setData] = useState<Bootstrap | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    apiFetch<{ data?: Bootstrap } & Partial<Bootstrap>>(endpoints.bootstrap, {
      lang: language,
      signal: controller.signal,
    })
      .then((res) => {
        // Backend ba'zi endpointlarda javobni `data` ga o'raydi.
        const body = (res.data ?? res) as Bootstrap;
        setData({
          siteinfo: body.siteinfo ?? null,
          menu: body.menu ?? [],
          popups: body.popups ?? [],
        });
        setLoading(false);
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [language]);

  return (
    <SiteInfoContext.Provider
      value={{
        siteInfo: data?.siteinfo ?? null,
        menu: data?.menu ?? [],
        popups: data?.popups ?? [],
        loading,
      }}
    >
      {children}
    </SiteInfoContext.Provider>
  );
}

export function useSiteInfo() {
  return useContext(SiteInfoContext);
}
