export default function Navbar() {
  const links = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicios", href: "#servicios" },
    { label: "Proceso", href: "#proceso" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Packs", href: "#packs" }
  ];

  return (
    <header className="animate-[slideDown_0.7s_ease-out] fixed top-0 left-0 z-50 w-full bg-navy">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        <a
          href="#inicio"
          className="font-momo text-xl tracking-[-0.04em] text-white"
        >
          tuchi<span className="text-[#55D6FF]">digital</span>
        </a>

        <div className="hidden gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[1.2rem] text-white transition-colors hover:text-[#55D6FF] md:text-[1.2rem]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contacto"
          className="rounded-full bg-[#55D6FF] px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-105"
        >
          Hablemos
        </a>
      </nav>
    </header>
  );
}