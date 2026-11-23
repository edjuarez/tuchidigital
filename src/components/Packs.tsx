
import { useEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCheckCircle } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const packs = [
  {
    id: "basic",
    number: "01",
    name: "Web Básica",
    price: "350 €",
    features: [
      "customDesign",
      "sections4",
      "responsive",
      "images",
      "social",
      "contactFormSimple",
      "seo",
      "hosting",
    ],
  },
  {
    id: "landing",
    number: "02",
    name: "Landing Pro",
    price: "650 €",
    features: [
      "customDesign",
      "sections10",
      "responsive",
      "gallery",
      "adminPanel",
      "social",
      "contactFormFull",
      "seo",
      "analytics",
      "hosting",
    ],
  },
  {
    id: "ecommerce",
    number: "03",
    name: "E-commerce",
    price: "850 €",
    features: [
      "landingIncluded",
      "customDesign",
      "catalog",
      "cart",
      "checkout",
      "payments",
      "orders",
      "adminPanel",
      "responsive",
      "hosting",
    ],
  },
] as const;

const maintenance = {
  price: "30 €",
  features: [
    "newFeatures",
    "content",
    "changes",
    "design",
    "technical",
    "updates",
    "recommendations",
    "support",
  ],
} as const;

const marketing = {
  price: "250 €",
  features: [
    "planning",
    "posts",
    "copy",
    "profiles",
    "calendar",
    "results",
  ],
} as const;

export function Packs() {
  const { t } = useTranslation();
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
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".maintenance-card",
          start: "top 85%",
        },
      });

      gsap.from(".marketing-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".marketing-card",
          start: "top 85%",
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="packs"
      className="relative overflow-hidden section-dark-start bg-navy text-[#F5F3EE] section-dark-end"
    >
      <div className="mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-40 lg:px-16">
        <div className="packs-header mb-20 max-w-4xl md:mb-28">
          <span className="section-eyebrow section-eyebrow-light">
            {t("packs.eyebrow")}
          </span>

          <h2 className="section-header section-header-light mt-6">
            <Trans
              i18nKey="packs.heading"
              components={{
                br: <br />,
                accent: <span className="text-yellow" />,
              }}
            />
          </h2>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-cream/60 md:text-2xl">
            {t("packs.description")}
          </p>
        </div>

        <div className="packs-grid grid gap-6 lg:grid-cols-3">
          {packs.map((pack, index) => {
            const isRecommended = index === 1;

            return (
              <article
                key={pack.number}
                className={`pack-card relative flex flex-col border p-7 md:p-8 ${
                  isRecommended
                    ? "border-[#55D6FF] bg-[#55D6FF] text-[#102A43]"
                    : "border-cream/15 bg-cream/[0.03]"
                }`}
              >
                <div className="relative flex items-start justify-between">
                  <span
                    className={`font-mono text-5xl ${
                      isRecommended
                        ? "text-[#102A43]/50"
                        : "text-cream/40"
                    }`}
                  >
                    {pack.number}.
                  </span>

                  {isRecommended && (
                    <span
                      className="absolute -right-11 -top-11 z-10 border border-[#A57932] bg-[linear-gradient(160deg,#B88938_0%,#EBD59B_22%,#FFF1BD_38%,#D6B77A_55%,#B88938_78%,#E8CB83_100%)] px-5 py-2.5 font-mono text-sm font-bold uppercase tracking-[0.16em] text-[#102A43] shadow-[0_4px_8px_rgba(0,0,0,0.2),0_3px_8px_rgba(165,121,50,0.25),inset_0_-2px_4px_rgba(139,93,30,0.55),inset_0_1px_2px_rgba(255,245,205,0.95)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.22),0_5px_12px_rgba(165,121,50,0.35),inset_0_-2px_4px_rgba(139,93,30,0.4),inset_0_1px_2px_rgba(255,245,205,0.95)]"
                    >
                      {t("packs.recommended")}
                    </span>
                  )}
                </div>

                <h3 className="mt-12 font-momo text-4xl tracking-[-0.04em] md:text-5xl">
                  {pack.name}
                </h3>

                <p
                  className={`mt-5 min-h-20 text-base leading-relaxed ${
                    isRecommended
                      ? "text-[#102A43]/65"
                      : "text-cream/60"
                  }`}
                >
                  {t(`packs.items.${pack.id}.description`)}
                </p>

                <div
                  className={`my-8 border-y py-6 ${
                    isRecommended
                      ? "border-[#102A43]/20"
                      : "border-cream/10"
                  }`}
                >
                  <span className="font-momo text-5xl tracking-[-0.04em] md:text-6xl">
                    {pack.price}
                  </span>

                  <p
                    className={`mt-2 font-mono text-base uppercase tracking-[0.15em] ${
                      isRecommended
                        ? "text-[#102A43]/50"
                        : "text-cream/40"
                    }`}
                  >
                    {t(`packs.items.${pack.id}.duration`)}
                  </p>
                </div>

                <ul className="flex flex-1 flex-col gap-4">
                  {pack.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-base leading-relaxed"
                    >
                      <FaCheckCircle
                        className={`mt-1 shrink-0 ${
                          isRecommended
                            ? "text-[#102A43]"
                            : "text-[#55D6FF]"
                        }`}
                        size={20}
                      />

                      <span
                        className={
                          isRecommended
                            ? "text-[#102A43]/75"
                            : "text-cream/75"
                        }
                      >
                        {t(`packs.features.${feature}`)}
                      </span>
                    </li>
                  ))}
                </ul>

                <p
                  className={`mt-8 min-h-12 text-base leading-relaxed ${
                    isRecommended
                      ? "text-[#102A43]/50"
                      : "text-cream/40"
                  }`}
                >
                  {t(`packs.items.${pack.id}.note`)}
                </p>

                <p className={`mt-4 text-xs leading-relaxed ${
                    isRecommended
                      ? "text-[#102A43]/50"
                      : "text-cream/40"
                  }`}>
                  {t("packs.vatNote")}
                </p>

                <a
                  href="#contacto"
                  className={`mt-8 flex items-center justify-center border px-5 py-4 text-sm font-medium uppercase tracking-[0.12em] transition-all duration-300 ${
                    isRecommended
                      ? "border-[#102A43] bg-[#102A43] text-[#55D6FF] hover:bg-transparent hover:text-[#102A43]"
                      : "border-[#55D6FF] text-[#55D6FF] hover:bg-[#55D6FF] hover:text-[#102A43]"
                  }`}
                >
                  {t(`packs.items.${pack.id}.button`)}
                </a>
              </article>
            );
          })}
        </div>

        <article className="maintenance-card mt-8 border border-[#55D6FF]/40 bg-cream/[0.03] p-7 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-4 w-full">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#55D6FF]">
                  {t("packs.additionalService")}
                </span>

                <span className="h-px w-12 bg-cream/20" />

                <span className="font-mono text-xl font-bold uppercase tracking-[0.15em] text-lime">
                  {t("packs.maintenance.name")}
                </span>
              </div>

              <h3 className="mt-6 font-momo text-4xl tracking-[-0.04em] md:text-5xl">
                {t("packs.maintenance.title")}
              </h3>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/60 md:text-lg">
                {t("packs.maintenance.description")}
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {maintenance.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-relaxed text-cream/75"
                  >
                    <span className="text-[#55D6FF]">✓</span>
                    <span>{t(`packs.maintenance.features.${feature}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:min-w-64">
              <div className="border border-[#55D6FF]/40 p-6">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-cream/40">
                  {t("packs.maintenance.from")}
                </span>

                <div className="mt-2 font-momo text-5xl tracking-[-0.04em]">
                  {maintenance.price}
                  <span className="font-mono text-sm tracking-normal text-cream/40">
                    {t("packs.maintenance.perMonth")}
                  </span>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-cream/40">
                  {t("packs.maintenance.note")}
                </p>

                <a
                  href="#contacto"
                  className="mt-6 flex items-center justify-between border border-[#55D6FF] bg-[#55D6FF] px-5 py-4 text-sm font-medium uppercase tracking-[0.12em] text-[#102A43] transition-all duration-300 hover:bg-transparent hover:text-[#55D6FF]"
                >
                  <span>{t("packs.maintenance.button")}</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </article>

        <article className="marketing-card mt-8 border border-[#55D6FF]/40 bg-cream/[0.03] p-7 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#55D6FF]">
                  {t("packs.additionalService")}
                </span>

                <span className="h-px w-12 bg-cream/20" />

                <span className="font-mono text-xl font-bold uppercase tracking-[0.15em] text-coral">
                  {t("packs.marketing.name")}
                </span>
              </div>

              <h3 className="mt-6 font-momo text-4xl tracking-[-0.04em] md:text-5xl">
                <Trans
                  i18nKey="packs.marketing.title"
                  components={{
                    br: <br />,
                    accent: <span className="text-[#55D6FF]" />,
                  }}
                />
              </h3>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/60 md:text-lg">
                {t("packs.marketing.description")}
              </p>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {marketing.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-relaxed text-cream/75"
                  >
                    <span className="text-[#55D6FF]">✓</span>
                    <span>{t(`packs.marketing.features.${feature}`)}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs leading-relaxed text-cream/40">
                {t("packs.marketing.footnote")}
              </p>
            </div>

            <div className="lg:min-w-64">
              <div className="border border-[#55D6FF]/40 p-6">
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-cream/40">
                  {t("packs.marketing.from")}
                </span>

                <div className="mt-2 font-momo text-5xl tracking-[-0.04em]">
                  {marketing.price}
                  <span className="font-mono text-sm tracking-normal text-cream/40">
                    {t("packs.marketing.perMonth")}
                  </span>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-cream/40">
                  {t("packs.marketing.note")}
                </p>

                <a
                  href="#contacto"
                  className="mt-6 flex items-center justify-between border border-[#55D6FF] bg-[#55D6FF] px-5 py-4 text-sm font-medium uppercase tracking-[0.12em] text-[#102A43] transition-all duration-300 hover:bg-transparent hover:text-[#55D6FF]"
                >
                  <span>{t("packs.marketing.button")}</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
