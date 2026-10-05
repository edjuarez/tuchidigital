import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiPlus } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "¿Qué tipo de sitios web desarrollan?",
    answer:
      "Desarrollamos páginas web corporativas, portfolios, landing pages y tiendas online. Cada proyecto se adapta a las necesidades, objetivos y características de cada negocio.",
  },
  {
    question: "¿Cuánto tiempo tarda en estar lista una web?",
    answer:
      "El tiempo depende del tipo y alcance del proyecto. Una web sencilla puede estar lista en pocos días, mientras que una tienda online o un proyecto más personalizado requiere más tiempo de desarrollo y revisión.",
  },
  {
    question: "¿El dominio y el hosting están incluidos?",
    answer:
      "Dependiendo del pack contratado, podemos incluir el dominio y el hosting inicial. También podemos trabajar con servicios que ya tengas contratados y ayudarte con su configuración.",
  },
  {
    question: "¿Puedo modificar el contenido de mi web después?",
    answer:
      "Sí. Dependiendo del proyecto, podemos incorporar un panel de administración para que puedas gestionar contenidos, productos u otra información sin necesidad de modificar el código.",
  },
  {
    question: "¿Ofrecen mantenimiento y soporte después de publicar la web?",
    answer:
      "Sí. Ofrecemos un servicio de mantenimiento y soporte para realizar cambios, actualizar contenidos, incorporar nuevas funcionalidades, revisar el funcionamiento técnico y seguir evolucionando el sitio.",
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".faq-content",
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-content",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const items = gsap.utils.toArray<HTMLElement>(".faq-item");

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-list",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    const currentAnswer = answerRefs.current[index];
    const currentIcon = iconRefs.current[index];

    if (!currentAnswer || !currentIcon) return;

    if (openIndex === index) {
      gsap.to(currentAnswer, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut",
      });

      gsap.to(currentIcon, {
        rotation: 0,
        duration: 0.3,
        ease: "power3.out",
      });

      setOpenIndex(null);
      return;
    }

    if (openIndex !== null) {
      const previousAnswer = answerRefs.current[openIndex];
      const previousIcon = iconRefs.current[openIndex];

      if (previousAnswer) {
        gsap.to(previousAnswer, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: "power3.inOut",
        });
      }

      if (previousIcon) {
        gsap.to(previousIcon, {
          rotation: 0,
          duration: 0.25,
          ease: "power3.out",
        });
      }
    }

    gsap.fromTo(
      currentAnswer,
      {
        height: 0,
        opacity: 0,
      },
      {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      },
    );

    gsap.to(currentIcon, {
      rotation: 45,
      duration: 0.3,
      ease: "power3.out",
    });

    setOpenIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden bg-navy text-cream section-dark-start pt-50 bottom-[-1px]"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36 lg:px-16">
        <div className="faq-content max-w-5xl">
          <span className="section-eyebrow section-eyebrow-light">
            Preguntas frecuentes
          </span>

          <h2 className="section-header section-header-light mt-6">
            Todo lo que necesitas
            <br />
            saber antes de empezar.
          </h2>

          <p className="section-description section-description-light mt-8">
            Algunas de las preguntas más habituales antes de comenzar un
            proyecto. Si necesitas saber algo más, podemos hablarlo
            directamente.
          </p>
        </div>

        <div className="faq-list mt-20 border-t border-cream/15">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="faq-item border-b border-cream/15"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="group flex w-full items-center gap-6 py-7 text-left md:py-9"
                aria-expanded={openIndex === index}
              >
                <span className="font-mono text-xs text-cyan">
                  0{index + 1}
                </span>

                <span className="flex-1 font-momo text-xl leading-tight tracking-[-0.03em] md:text-3xl">
                  {faq.question}
                </span>

                <div
                  ref={(element) => {
                    iconRefs.current[index] = element;
                  }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/20 text-cyan transition-colors duration-300 group-hover:border-cyan"
                >
                  <FiPlus className="text-xl" />
                </div>
              </button>

              <div
                ref={(element) => {
                  answerRefs.current[index] = element;
                }}
                className="h-0 overflow-hidden opacity-0"
              >
                <div className="pb-8 pl-12 pr-14 md:pb-10 md:pl-16 md:pr-20">
                  <p className="max-w-3xl text-base leading-relaxed text-cream/60 md:text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}