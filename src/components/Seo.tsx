import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { normalizeLanguage, type Language } from "../i18n";

const openGraphLocales: Record<Language, string> = {
  es: "es_ES",
  en: "en_US",
  it: "it_IT",
};

function setMetaContent(selector: string, content: string) {
  document.head
    .querySelector<HTMLMetaElement>(selector)
    ?.setAttribute("content", content);
}

export function Seo() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const language = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language);
    const title = t("seo.title");
    const description = t("seo.description");
    const imageAlt = t("seo.ogImageAlt");

    document.title = title;

    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[name="keywords"]', t("seo.keywords"));
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent(
      'meta[property="og:locale"]',
      openGraphLocales[language],
    );
    setMetaContent('meta[property="og:image:alt"]', imageAlt);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
  }, [t, i18n.language, i18n.resolvedLanguage]);

  return null;
}
