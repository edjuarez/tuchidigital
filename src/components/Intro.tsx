import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiGlobe,
  FiShoppingBag,
  FiLayers,
  FiHeadphones,
  FiArrowUpRight,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Páginas web",
    description:
      "Sitios corporativos, portfolios y páginas para presentar tu negocio.",
    icon: FiGlobe,
  },
  {
    title: "Tiendas online",
    description:
      "E-commerce preparados para mostrar productos y recibir ventas.",
    icon: FiShoppingBag,
  },
  {
    title: "Diseño a medida",
    description:
      "Una experiencia pensada específicamente para tu marca y tus necesidades.",
    icon: FiLayers,
  },
  {
    title: "Soporte & evolución",
    description:
      "Acompañamiento, mejoras y soporte para que tu web siga funcionando y creciendo.",
    icon: FiHeadphones,
  },
];

export function Intro() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".intro-content",
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
            trigger: ".intro-content",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const cards = gsap.utils.toArray<HTMLElement>(".intro-feature");

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: 120,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.fromTo(
        ".intro-cta",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".intro-cta",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="introduction"
      className="relative overflow-hidden bg-white text-[#102A43]"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36 lg:px-16">
        <div className="intro-content max-w-5xl">
          <span className="section-eyebrow section-eyebrow-dark">
            Lo que hacemos
          </span>

          <h2 className="section-header section-header-dark mt-6">
            Creamos tu presencia
            <br />
            digital de manera <span className="text-[#55D6FF]">profesional.</span>
          </h2>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#102A43]/65 md:text-xl">
            Creamos sitios web modernos utilizando las últimas tecnologías,
            desarrollados a medida para cubrir las necesidades de cada cliente
            e impulsar su negocio. Porque tener una web es solo el comienzo:
            también te ayudamos a trabajar su visibilidad y presencia digital
            para que llegue a las personas que realmente importan.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 border-l border-t border-[#102A43]/15 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="intro-feature group relative border-b border-r border-[#102A43]/15 bg-white p-7 transition-colors duration-300 hover:bg-[#102A43] hover:text-[#F5F3EE] md:p-8"
              >
                <div className="flex items-start justify-between">
                  <Icon
                    className="text-3xl text-[#55D6FF] transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />

                  <FiArrowUpRight className="text-xl opacity-30 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                </div>

                <h3 className="mt-16 font-momo text-2xl leading-none tracking-[-0.03em]">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-[#102A43]/55 transition-colors duration-300 group-hover:text-[#F5F3EE]/60">
                  {feature.description}
                </p>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#55D6FF] transition-all duration-500 group-hover:w-full" />
              </article>
            );
          })}
        </div>

        <div className="intro-cta mt-12">
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 border border-[#102A43] bg-[#102A43] px-7 py-4 font-mono text-xs uppercase tracking-[0.15em] text-[#F5F3EE] transition-all duration-300 hover:bg-[#55D6FF] hover:text-[#102A43]"
          >
            Consulta tu proyecto

            <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}