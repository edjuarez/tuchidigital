import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Auditoría inicial",
    description:
      "Analizamos tu negocio, objetivos y presencia digital actual para definir qué necesita realmente tu sitio.",
  },
  {
    number: "02",
    title: "Recopilación de información",
    description:
      "Reunimos contenidos, imágenes, referencias y toda la información necesaria para construir una propuesta alineada con tu negocio.",
  },
  {
    number: "03",
    title: "Desarrollo",
    description:
      "Diseñamos y desarrollamos el sitio con una estructura clara, responsive y adaptada a tus necesidades.",
  },
  {
    number: "04",
    title: "Revisión con el cliente",
    description:
      "Te mostramos el resultado, recibimos tus comentarios y realizamos los ajustes necesarios antes de publicarlo.",
  },
  {
    number: "05",
    title: "Publicación!",
    description:
      "Dejamos todo listo para que tu sitio esté online, funcionando correctamente y preparado para recibir a tus visitantes.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".process-card");

      gsap.set(cards, {
        y: 80,
        opacity: 0,
        scale: 0.96,
      });

      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          end: "bottom 15%",
          onEnter: () => {
            gsap.to(card, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: index * 0.08,
              ease: "power3.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              y: 80,
              opacity: 0,
              scale: 0.96,
              duration: 0.5,
              ease: "power3.in",
            });
          },
        });
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proceso"
      className="relative bg-white text-[#102A43]"
    >
      <div className="mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-40 lg:px-16">
        <div className="mb-20 max-w-3xl md:mb-28">
          <span className="section-eyebrow section-eyebrow-dark">
            Cómo trabajamos
          </span>

          <h2 className="section-header section-header-dark mt-6">
            Del primer
            <br />
            contacto al sitio <span className="text-[#55D6FF]">online.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className={`process-card group relative min-h-[360px] overflow-hidden border border-[#F5F3EE]/15 bg-[#102A43] p-8 text-[#F5F3EE] transition-colors duration-300 hover:border-[#55D6FF] md:p-10 ${
                index === 4
                  ? "md:col-span-2 md:mx-auto md:w-[calc(50%-0.75rem)]"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="process-number font-mono text-[5rem] leading-none tracking-[-0.08em] text-[#55D6FF] transition-colors duration-300 group-hover:text-[#F5F3EE] md:text-[6rem]">
                  {step.number}.
                </span>
              </div>

              <div className="mt-16">
                <h3 className="process-title font-momo text-4xl leading-[0.9] tracking-[-0.04em] text-[#F5F3EE] md:text-5xl">
                  {step.title}
                </h3>

                <p className="process-description mt-6 max-w-xl text-lg leading-relaxed text-[#F5F3EE]/65 md:text-xl">
                  {step.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#55D6FF] transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}