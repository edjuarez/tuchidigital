import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  DEFAULT_LANGUAGE,
  normalizeLanguage,
  saveLanguage,
  type Language,
} from "../i18n";

function syncLanguageInUrl(language: Language) {
  const url = new URL(window.location.href);

  if (language === DEFAULT_LANGUAGE) {
    url.searchParams.delete("lang");
  } else {
    url.searchParams.set("lang", language);
  }

  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (nextUrl !== currentUrl) {
    window.history.replaceState(window.history.state, "", nextUrl);
  }
}

export function LanguageSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    let refreshFrame: number | null = null;

    const handleLanguageChanged = (languageValue: string) => {
      const language = normalizeLanguage(languageValue);

      document.documentElement.lang = language;
      saveLanguage(language);
      syncLanguageInUrl(language);

      if (refreshFrame !== null) {
        window.cancelAnimationFrame(refreshFrame);
      }

      refreshFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        refreshFrame = null;
      });
    };

    handleLanguageChanged(i18n.resolvedLanguage ?? i18n.language);
    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);

      if (refreshFrame !== null) {
        window.cancelAnimationFrame(refreshFrame);
      }
    };
  }, [i18n]);

  return null;
}
