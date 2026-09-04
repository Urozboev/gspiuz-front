"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "uz" | "ru" | "en";
export type ContrastMode = "normal" | "grayscale" | "dark";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  contrastMode: ContrastMode;
  setContrastMode: (mode: ContrastMode) => void;
  fontSize: number; // percentage, e.g., 100 for 100%
  setFontSize: (size: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("uz");
  const [contrastMode, setContrastModeState] = useState<ContrastMode>("normal");
  const [fontSize, setFontSizeState] = useState<number>(100);

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("gspi_lang") as Language;
      if (savedLang) setLanguageState(savedLang);

      const savedContrast = localStorage.getItem("gspi_contrast") as ContrastMode;
      if (savedContrast) setContrastModeState(savedContrast);

      const savedFontSize = localStorage.getItem("gspi_font_size");
      if (savedFontSize) setFontSizeState(Number(savedFontSize));
    }
  }, []);

  // Update DOM and localStorage on changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("gspi_lang", lang);
    }
  };

  const setContrastMode = (mode: ContrastMode) => {
    setContrastModeState(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("gspi_contrast", mode);
      
      const html = document.documentElement;
      
      // Reset modes
      html.classList.remove("dark", "grayscale-mode");
      html.style.filter = "";
      
      if (mode === "dark") {
        html.classList.add("dark");
      } else if (mode === "grayscale") {
        html.classList.add("grayscale-mode");
        html.style.filter = "grayscale(100%)";
      }
    }
  };

  const setFontSize = (size: number) => {
    // Limit bounds (80% to 150%)
    const clampedSize = Math.max(80, Math.min(150, size));
    setFontSizeState(clampedSize);
    if (typeof window !== "undefined") {
      localStorage.setItem("gspi_font_size", String(clampedSize));
      document.documentElement.style.fontSize = `${clampedSize}%`;
    }
  };

  // Sync contrast mode and font size to DOM on initial render/context load
  useEffect(() => {
    setContrastMode(contrastMode);
    setFontSize(fontSize);
  }, [contrastMode, fontSize]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        contrastMode,
        setContrastMode,
        fontSize,
        setFontSize,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
