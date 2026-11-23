
import { useTranslation } from "react-i18next";
import {
  normalizeLanguage,
  SUPPORTED_LANGUAGES,
  type Language,
} from "../../i18n";

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();

  const currentLanguage = normalizeLanguage(
    i18n.resolvedLanguage ?? i18n.language,
  );

  const changeLanguage = (language: Language) => {
    if (language === currentLanguage) return;
    void i18n.changeLanguage(language);
  };

  return (
    <div
      role="group"
      aria-label={t("language.label")}
      className={`flex items-stretch ${className}`}
    >
      {SUPPORTED_LANGUAGES.map((language, index) => {
        const languageName = t(`language.names.${language}`);
        const isActive = language === currentLanguage;

        return (
          <button
            key={language}
            type="button"
            onClick={() => changeLanguage(language)}
            aria-pressed={isActive}
            aria-label={t("language.switchTo", { language: languageName })}
            title={languageName}
            className={`
              flex items-center justify-center
              px-3 py-3
              font-mono text-base font-bold tracking-wide
              transition-all duration-200
              focus-visible:z-10 focus-visible:outline-2
              focus-visible:outline-offset-[-2px]
              focus-visible:outline-[#55D6FF]
              ${
                isActive
                  ? "bg-[#55D6FF]/15 text-[#55D6FF]"
                  : "text-cream/70 hover:bg-cream/10 hover:text-[#55D6FF]"
              }
              ${index > 0 ? "border-l border-cream/20" : ""}
            `}
          >
            {language.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
