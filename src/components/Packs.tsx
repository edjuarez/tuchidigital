import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const packs = [
  {
    number: "01",
    name: "Starter",
    description:
      "Una landing simple para empezar a tener presencia online de forma rápida.",
    price: "250 €",
    duration: "Lista en 3 días",
    items: [
      "Diseño personalizado",
      "Hasta 3 secciones",
      "Diseño responsive",
      "Botones a redes sociales",
      "SEO inicial",
      "Hosting incluido",
      "Dominio gratis",
    ],
    note: "Ideal para profesionales, servicios y pequeños proyectos.",
    button: "Pedir pack",
  },
  {
    number: "02",
    name: "Landing",
    description:
      "Un sitio web completo, profesional y preparado para presentar tu negocio.",
    price: "450 €",
    duration: "Lista en 7 días",
    items: [
      "Diseño personalizado",
      "Secciones adaptadas a tu negocio",
      "Diseño responsive",
      "Botones a redes sociales",
      "SEO inicial",
      "Hosting incluido",
      "Dominio gratis",
      "Panel de administración",
      "Formulario de contacto",
      "Integración con Google Analytics",
    ],
    note: "Una solución completa para negocios y profesionales.",
    button: "Pedir pack",
  },
  {
    number: "03",
    name: "E-commerce",
    description:
      "Una tienda online completa para mostrar, gestionar y vender tus productos.",
    price: "850 €",
    duration: "Lista en 15 días",
    items: [
      "Todo lo incluido en Landing",
      "Catálogo de productos",
      "Carrito de compras",
      "Gestión de productos",
      "Gestión de pedidos",
      "Proceso de compra",
      "Integración de pagos",
      "Panel de administración",
      "Diseño responsive",
      "SEO inicial",
    ],
    note: "Pensado para negocios que necesitan vender online.",
    button: "Pedir pack",
  },
];

const maintenance = {
  price: "30 €",
  items: [
    "Nuevas funcionalidades",
    "Carga y actualización de contenido",
    "Cambios y ajustes en el sitio",
    "Mejoras de diseño",
    "Revisión técnica",
    "Actualizaciones",
    "Recomendaciones de mejora",
    "Soporte y seguimiento",
  ],
};

export function Packs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const context = gsap.context(() => {
      gsap.from(".packs-header", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".packs-header",
          start: "top 80%",
        },
      });

      gsap.from(".pack-card", {
        y: 100,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".packs-grid",
          start: "top 75%",
        },
      });

      gsap.from(".maintenance-card", {
        x: 100,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".maintenance-card",
          start: "top 80%",
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="packs"
      className="relative overflow-hidden section-dark-start bg-[#102A43] text-[#F5F3EE] py-20 section-dark-end "
    >
      <div className="mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-40 lg:px-16">
        <div className="packs-header mb-20 max-w-4xl md:mb-28">
          <span className="section-eyebrow section-eyebrow-light">
            Nuestros Packs
          </span>

          <h2 className="section-header section-header-light mt-6">
            Elegí cómo
            <br />
            empezar.
          </h2>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/60 md:text-2xl">
            Soluciones pensadas para diferentes necesidades. Sin complicaciones
            y con todo lo necesario para poner tu proyecto online.
          </p>
        </div>

        <div className="packs-grid grid gap-6 lg:grid-cols-3">
          {packs.map((pack, index) => (
            <article
              key={pack.name}
              className={`pack-card flex flex-col border p-7 md:p-8 ${
                index === 1
                  ? "border-[#55D6FF] bg-[#55D6FF] text-[#102A43]"
                  : "border-white/15 bg-white/[0.03]"
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`font-mono text-xs tracking-[0.2em] ${
                    index === 1 ? "text-[#102A43]/50" : "text-white/40"
                  }`}
                >
                  {pack.number}
                </span>

                {index === 1 && (
                  <span className="font-mono text-xs uppercase tracking-[0.15em]">
                    Recomendado
                  </span>
                )}
              </div>

              <h3 className="mt-12 font-momo text-4xl tracking-[-0.04em] md:text-5xl">
                {pack.name}
              </h3>

              <p
                className={`mt-5 min-h-20 text-base leading-relaxed ${
                  index === 1 ? "text-[#102A43]/65" : "text-white/60"
                }`}
              >
                {pack.description}
              </p>

              <div
                className={`my-8 border-y py-6 ${
                  index === 1 ? "border-[#102A43]/20" : "border-white/10"
                }`}
              >
                <span className="font-momo text-5xl tracking-[-0.04em] md:text-6xl">
                  {pack.price}
                </span>

                <p
                  className={`mt-2 font-mono text-xs uppercase tracking-[0.15em] ${
                    index === 1 ? "text-[#102A43]/50" : "text-white/40"
                  }`}
                >
                  {pack.duration}
                </p>
              </div>

              <ul className="flex flex-1 flex-col gap-4">
                {pack.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                  >
                    <span
                      className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px] ${
                        index === 1
                          ? "border-[#102A43]/40"
                          : "border-[#55D6FF]/60 text-[#55D6FF]"
                      }`}
                    >
                      ✓
                    </span>

                    <span
                      className={
                        index === 1 ? "text-[#102A43]/75" : "text-white/75"
                      }
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <p
                className={`mt-8 min-h-12 text-xs leading-relaxed ${
                  index === 1 ? "text-[#102A43]/50" : "text-white/40"
                }`}
              >
                {pack.note}
              </p>

              <a
                href="#contacto"
                className={`mt-8 flex items-center justify-between border px-5 py-4 text-sm font-medium uppercase tracking-[0.12em] transition-all duration-300 ${
                  index === 1
                    ? "border-[#102A43] bg-[#102A43] text-[#55D6FF] hover:bg-transparent hover:text-[#102A43]"
                    : "border-[#55D6FF] text-[#55D6FF] hover:bg-[#55D6FF] hover:text-[#102A43]"
                }`}
              >
                <span>{pack.button}</span>
                <span>→</span>
              </a>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <article className="maintenance-card border border-white/15 bg-white/[0.03] p-7 md:p-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#55D6FF]">
                    Extra
                  </span>

                  <span className="h-px w-12 bg-white/20" />

                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/40">
                    Mantenimiento mensual
                  </span>
                </div>

                <h3 className="mt-6 font-momo text-4xl tracking-[-0.04em] md:text-5xl">
                  Tu sitio sigue creciendo.
                </h3>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
                  Seguimos trabajando en tu sitio después de publicarlo.
                  Agregamos contenido, nuevas funcionalidades, mejoras y
                  realizamos revisiones técnicas para mantenerlo actualizado.
                </p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {maintenance.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/70"
                    >
                      <span className="text-[#55D6FF]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:min-w-64">
                <div className="border border-[#55D6FF]/40 p-6">
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/40">
                    Desde
                  </span>

                  <div className="mt-2 font-momo text-5xl tracking-[-0.04em]">
                    {maintenance.price}
                    <span className="font-mono text-sm tracking-normal text-white/40">
                      /mes
                    </span>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-white/40">
                    Servicio opcional. El alcance de cada trabajo se acuerda
                    según las necesidades del proyecto.
                  </p>

                  <a
                    href="#contacto"
                    className="mt-6 flex items-center justify-between border border-[#55D6FF] bg-[#55D6FF] px-5 py-4 text-sm font-medium uppercase tracking-[0.12em] text-[#102A43] transition-all duration-300 hover:bg-transparent hover:text-[#55D6FF]"
                  >
                    <span>Contratar</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}