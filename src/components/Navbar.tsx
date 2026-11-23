
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMenu, FiX } from "react-icons/fi";
import { ButtonCTA } from "./ui/ButtonCTA";
import { LanguageSwitcher } from "./ui/LanguageSwitcher";

export default function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { key: "home", href: "#inicio" },
    { key: "services", href: "#introduction" },
    { key: "process", href: "#proceso" },
    { key: "packs", href: "#packs" },
    { key: "projects", href: "#portfolio" },
    { key: "contact", href: "#contacto" },
  ] as const;

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="animate-[slideDown_0.7s_ease-out] fixed top-0 left-0 z-50 w-full bg-navy">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10 lg:px-16">
        <a
          href="#inicio"
          onClick={closeMenu}
          className="font-momo text-xl tracking-[-0.04em] text-cream"
        >
          tuchi<span className="text-[#55D6FF]">digital</span>
        </a>
        <div className="hidden items-center gap-2 md:flex lg:gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
                inline-flex items-center justify-center
                px-2 py-3
                text-[1rem] font-bold text-cream
                transition-all duration-200
                hover:bg-cream/10
                hover:text-[#55D6FF]
              "
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden md:block">
            <ButtonCTA href="#contacto">{t("common.cta.askWeb")}</ButtonCTA>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center text-cream transition-colors hover:text-[#55D6FF] md:hidden"
          >
            {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
        <div
          id="mobile-menu"
          className={`absolute top-full right-0 left-0 border-t border-whicreamte/10 bg-navy px-6 transition-all duration-300 md:hidden ${
            isOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
          aria-hidden={!isOpen}
        >
          <div className="flex flex-col py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                tabIndex={isOpen ? 0 : -1}
                className="border-b border-cream/10 py-4 text-base text-cream transition-colors hover:text-[#55D6FF]"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}

            <div className="mt-6 flex justify-start pb-4">
              <ButtonCTA
                href="#contacto"
                className="w-full justify-center sm:w-auto"
              >
                {t("common.cta.askWeb")}
              </ButtonCTA>
            </div>
          </div>
        </div>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
