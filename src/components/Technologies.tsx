import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiGsap,
  SiTailwindcss,
  SiNodedotjs,
  SiSupabase,
  SiPostgresql,
  SiVercel,
  SiCloudflare,
  SiGit,
  SiGithub,
  SiResend,
  SiStripe,
} from "react-icons/si";
import { FaAws, FaCss3Alt } from "react-icons/fa";

import { PiOpenAiLogoLight } from "react-icons/pi";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  {
    name: "Next.js",
    icon: SiNextdotjs,
    size: "large",
    color: "#000000",
  },
  {
    name: "React",
    icon: SiReact,
    size: "medium",
    color: "#61DAFB",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    size: "large",
    color: "#3178C6",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    size: "medium",
    color: "#F7DF1E",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    size: "large",
    color: "#06B6D4",
  },
  {
    name: "HTML5",
    icon: SiHtml5,
    size: "small",
    color: "#E34F26",
  },
  {
    name: "CSS3",
    icon: FaCss3Alt,
    size: "medium",
    color: "#1572B6",
  },
  {
    name: "Vercel",
    icon: SiVercel,
    size: "medium",
    color: "#000000",
  },
  {
    name: "Cloudflare",
    icon: SiCloudflare,
    size: "medium",
    color: "#F38020",
  },
  {
    name: "AWS",
    icon: FaAws,
    size: "large",
    color: "#FF9900",
  },
  {
    name: "GSAP",
    icon: SiGsap,
    size: "medium",
    color: "#88CE02",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    size: "medium",
    color: "#339933",
  },
  {
    name: "Supabase",
    icon: SiSupabase,
    size: "large",
    color: "#3ECF8E",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    size: "medium",
    color: "#4169E1",
  },
  {
    name: "Git",
    icon: SiGit,
    size: "small",
    color: "#F05032",
  },
  {
    name: "GitHub",
    icon: SiGithub,
    size: "medium",
    color: "#181717",
  },
  {
    name: "Resend",
    icon: SiResend,
    size: "small",
    color: "#000000",
  },
  {
    name: "Stripe",
    icon: SiStripe,
    size: "medium",
    color: "#635BFF",
  },
  {
    name: "OpenAI",
    icon: PiOpenAiLogoLight,
    size: "large",
    color: "#000000",
  },
];

const sizeClasses = {
  small: {
    icon: "text-3xl md:text-4xl",
    text: "text-sm",
  },
  medium: {
    icon: "text-4xl md:text-5xl",
    text: "text-base",
  },
  large: {
    icon: "text-5xl md:text-6xl",
    text: "text-lg",
  },
};

export function Technologies() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".technologies-content",
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
            trigger: ".technologies-content",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const items = gsap.utils.toArray<HTMLElement>(".technology-item");

      gsap.set(items, {
        opacity: 0,
        y: 30,
        scale: 0.9,
      });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.07,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".technology-wall",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="technologies"
      className="relative overflow-hidden bg-white text-navy"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36 lg:px-16">
        <div className="technologies-content max-w-5xl">
          <span className="section-eyebrow section-eyebrow-dark">
            Tecnología
          </span>

          <h2 className="section-header section-header-dark mt-6">
            Construimos con las <span className="text-coral">herramientas</span>
            <br />
            de la web moderna.
          </h2>

          <p className="section-description section-description-dark mt-8">
            Cada proyecto se desarrolla desde cero utilizando tecnologías
            profesionales y actuales. Elegimos las herramientas adecuadas para
            cada necesidad, buscando rendimiento, seguridad, escalabilidad y
            una experiencia sólida en cualquier dispositivo.
          </p>
        </div>

        <div className="technology-wall mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-12 md:gap-x-14 md:gap-y-14">
          {technologies.map((technology) => {
            const Icon = technology.icon;
            const size = sizeClasses[technology.size as keyof typeof sizeClasses];

            return (
              <div
                key={technology.name}
                className="technology-item group flex min-w-[110px] flex-col items-center justify-center gap-3 text-center"
                style={
                  {
                    "--technology-color": technology.color,
                  } as React.CSSProperties
                }
              >
                <Icon
                  className={`${size.icon} transition-all duration-300 group-hover:scale-110`}
                  style={{ color: technology.color }}
                />

                <span
                  className={`${size.text} font-medium tracking-[-0.02em] text-navy/60 transition-all duration-300 group-hover:scale-105 group-hover:text-[var(--technology-color)]`}
                >
                  {technology.name}
                </span>

                <span className="pointer-events-none absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}