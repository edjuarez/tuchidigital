import { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiPlus } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { id: "q1" },
  { id: "q2" },
  { id: "q3" },
  { id: "q4" },
  { id: "q5" },
  { id: "q6" },
  { id: "q7" },
  { id: "q8" },
  { id: "q9" },
] as const;

export function FAQ() {
  const { t } = useTranslation();
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
      className="relative overflow-hidden bg-navy text-cream section-dark-start bottom-[-1px]"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36 lg:px-16">
        <div className="faq-content max-w-5xl">
          <span className="section-eyebrow section-eyebrow-light">
            {t("faq.eyebrow")}
          </span>

          <h2 className="section-header section-header-light mt-6">
            <Trans
              i18nKey="faq.heading"
              components={{
                accent: <span className="text-yellow" />,
                br: <br />,
              }}
            />
          </h2>

          <p className="section-description section-description-light mt-8">
            {t("faq.description")}
          </p>
        </div>

        <div className="faq-list mt-20 border-t border-cream/15">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="faq-item border-b border-cream/15"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="group flex w-full items-center gap-6 py-7 text-left md:py-9"
                aria-expanded={openIndex === index}
              >
                <span className="font-mono text-4xl text-cyan">
                  0{index + 1}.
                </span>

                <span className="flex-1 font-momo text-xl leading-tight tracking-[-0.03em] md:text-3xl">
                  {t(`faq.items.${faq.id}.question`)}
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
                    {t(`faq.items.${faq.id}.answer`)}
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