import { useEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiGlobe,
  FiShoppingBag,
  FiLayers,
  FiHeadphones,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: "websites",
    icon: FiGlobe,
  },
  {
    id: "ecommerce",
    icon: FiShoppingBag,
  },
  {
    id: "marketing",
    icon: FiLayers,
  },
  {
    id: "support",
    icon: FiHeadphones,
  },
] as const;

export function Intro() {
  const { t } = useTranslation();
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
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.35,
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
          delay: cards.length * 0.35,
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
      className="relative overflow-hidden bg-cream text-[#102A43]"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36 lg:px-16">
        <div className="intro-content max-w-5xl">
          <span className="section-eyebrow section-eyebrow-dark">
            {t("intro.eyebrow")}
          </span>

          <h2 className="section-header section-header-dark mt-6">
            <Trans
              i18nKey="intro.heading"
              components={{
                br: <br />,
                accent: <span className="text-cyan" />,
              }}
            />
          </h2>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#102A43]/65 md:text-xl">
            {t("intro.description")}
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.id} className="intro-feature relative flex h-full">
                <div className="absolute -bottom-1 -right-1 h-full w-full bg-cyan" />

                <article
                  className="group relative z-10 flex h-full w-full flex-col border-1 border-cyan hover:bg-cream p-7 transition-colors duration-300 bg-[#102A43] hover:text-navy text-[#F5F3EE] md:p-8"
                >
                  <div className="flex items-start justify-between">
                    <Icon
                      className="text-4xl hover:text-cream transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={2}
                    />
                  </div>

                  <h3 className="mt-16 font-momo text-2xl leading-none tracking-[-0.03em]">
                    {t(`intro.features.${feature.id}.title`)}
                  </h3>

                  <p className="mt-4 text-base transition-colors duration-300">
                    {t(`intro.features.${feature.id}.description`)}
                  </p>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#55D6FF] transition-all duration-500 group-hover:w-full" />
                </article>
              </div>
            );
          })}
        </div>

        <div className="intro-cta mt-12">
          <a
            href="#contacto"
            className="group inline-flex items-center gap-6 border border-[#55D6FF] hover:border-navy bg-navy px-8 py-5 text-base font-medium uppercase tracking-[0.12em] text-cream transition-all duration-300 hover:bg-[#55D6FF] hover:text-navy"
          >
            <span>{t("intro.cta")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
