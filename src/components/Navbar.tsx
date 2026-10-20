
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { ButtonCTA } from "./ui/ButtonCTA";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicios", href: "#introduction" },
    { label: "Proceso", href: "#proceso" },
    { label: "Packs", href: "#packs" },
    { label: "Proyectos", href: "#portfolio" },
    { label: "Contacto", href: "#contacto" },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="animate-[slideDown_0.7s_ease-out] fixed top-0 left-0 z-50 w-full bg-navy">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10 lg:px-16">
        <a
          href="#inicio"
          onClick={closeMenu}
          className="font-momo text-xl tracking-[-0.04em] text-white"
        >
          tuchi<span className="text-[#55D6FF]">digital</span>
        </a>

        <div className="hidden gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[1rem] font-bold text-white transition-colors hover:text-[#55D6FF]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <ButtonCTA href="#contacto">Quiero mi web</ButtonCTA>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-[#55D6FF] md:hidden"
        >
          {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>

        <div
          id="mobile-menu"
          className={`absolute top-full right-0 left-0 border-t border-white/10 bg-navy px-6 transition-all duration-300 md:hidden ${
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
                className="border-b border-white/10 py-4 text-base text-white transition-colors hover:text-[#55D6FF]"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-6 flex justify-start pb-4">
              <ButtonCTA
                href="#contacto"
                className="w-full justify-center sm:w-auto"
              >
                Quiero mi web
              </ButtonCTA>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
