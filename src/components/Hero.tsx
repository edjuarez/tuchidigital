"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCheckCircle } from "react-icons/fa";
import { WebsiteMockup } from "./ui/WebsiteMockup";
import { ActionButton } from "./ui/ActionButton";

gsap.registerPlugin(ScrollTrigger);

/* const benefits = [
  "Sitios web a medida",
  "SEO",
  "Sin costo de mantenimiento",
  "Adaptados",
  "Enlaces a redes sociales",
  "Garantía de satisfacción",
]; */

const services = ["SITIOS WEB", "LANDINGS", "TIENDAS ONLINE", "MARKETING DIGITAL"];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const background = backgroundRef.current;
    const mockup = mockupRef.current;
    const benefitsContainer = benefitsRef.current;

    if (!hero || !background || !mockup || !benefitsContainer) return;

    const context = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      intro
        .from(
          ".hero-title",
          {
            yPercent: 100,
            opacity: 0,
            duration: 1,
          },
          "-=0.25",
        )
        .from(
          ".hero-description",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.45",
        )
        .from(
          ".hero-services",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          ".hero-actions",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.25",
        );

      gsap.fromTo(
        mockup,
        {
          y: 180,
          opacity: 0,
          rotate: 2,
        },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.4,
          delay: 0.25,
          ease: "power4.out",
        },
      );

      gsap.to(mockup, {
        y: -10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.7,
      });

      gsap.from(".hero-benefit", {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        stagger: 0.1,
        delay: 0.8,
        ease: "power3.out",
      });

      gsap.to(background, {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-content", {
        yPercent: -10,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, hero);

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      gsap.to(background, {
        x: x * 30,
        y: y * 30,
        duration: 1.4,
        ease: "power3.out",
      });

      gsap.to(mockup, {
        x: x * -18,
        y: y * -12,
        rotateY: x * -2,
        rotateX: y * 2,
        duration: 1.5,
        ease: "power3.out",
      });

      gsap.to(".hero-benefit", {
        x: (_, target) => {
          const intensity = Number(target.dataset.intensity || 1);
          return x * -12 * intensity;
        },
        y: (_, target) => {
          const intensity = Number(target.dataset.intensity || 1);
          return y * -8 * intensity;
        },
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.02,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      context.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative min-h-svh overflow-hidden bg-[#102A43] py-20 pt-18 text-[#F5F3EE] section-dark-end"
    >
      <div
        ref={backgroundRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-10%]"
      >
        <div className="absolute left-[55%] top-[15%] h-[45vw] w-[45vw] rounded-full border border-white/[0.09]" />
        <div className="absolute left-[60%] top-[20%] h-[32vw] w-[32vw] rounded-full border border-white/[0.07]" />
        <div className="absolute left-[66%] top-[26%] h-[20vw] w-[20vw] rounded-full border border-white/[0.06]" />
        <div className="absolute left-[70%] top-[30%] h-[10vw] w-[10vw] rounded-full bg-[#55D6FF]/10 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(255,255,255,0.09),transparent_32%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(85,214,255,0.12),transparent_28%)]" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36 lg:px-16">
        <main className="hero-content mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.20fr_0.85fr] lg:gap-12 xl:gap-20">
          <div className="w-full text-center lg:text-left">
            <h1 className="hero-title font-momo text-[5.75rem] leading-[0.85] tracking-[-0.055em] md:text-[7rem]">
              <span className="block md:inline">tuchi</span>

              <span
                className="block text-[#55D6FF] md:inline"
                style={{
                  textShadow:
                    "0 0 10px rgba(85,214,255,0.7), 0 0 30px rgba(85,214,255,0.4), 0 0 60px rgba(85,214,255,0.2)",
                }}
              >
                digital
              </span>
            </h1>

            <div className="hero-description mt-10 max-w-4xl">
              <br />

              <p className="text-[2.2rem] font-medium leading-[0.92] tracking-[-0.045em] md:text-[2.8rem] xl:text-[3rem]">
                Creamos sitios web modernos,{" "}
                <br className="hidden md:block" />
                profesionales y de alto{" "}
                <span className="text-[3.2rem] font-bold text-violet md:text-[4rem]">
                  impacto.
                </span>
              </p>
            </div>

            <div className="hero-services mt-10 flex max-w-3xl flex-wrap justify-center lg:justify-start gap-x-8 gap-y-3 border-y border-white/15 py-5 md:gap-x-10">
              {services.map((service) => (
                <span
                  key={service}
                  className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-white/80 md:text-base"
                >
                  {service}
                </span>
              ))}
            </div>
            <div className="hero-actions mt-10">
              <ActionButton href="#contacto" variant="light">
                Pedir mi sitio ahora
              </ActionButton>
            </div>
          </div>

          <div className="relative flex w-full items-center justify-center lg:justify-end">
            <div
              ref={mockupRef}
              className="relative z-10 flex w-full items-center justify-center"
              style={{ perspective: "1200px" }}
            >
              <WebsiteMockup />
            </div>

            <ul
              ref={benefitsRef}
              className="pointer-events-none absolute inset-0 z-20 block"
            >
              <li
                data-intensity="0.8"
                className="hero-benefit absolute left-[-4%] top-[15%] flex items-center gap-2 rounded-xl border border-[#55D6FF]/40 bg-[#102A43]/90 px-4 py-3 text-sm text-[#F5F3EE] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm"
              >
                <FaCheckCircle className="h-5 w-5 shrink-0 text-[#55D6FF]" />
                <span>Sitios web a medida</span>
              </li>

              <li
                data-intensity="1.1"
                className="hero-benefit absolute right-[-5%] top-[10%] flex items-center gap-2 rounded-xl border border-[#55D6FF]/40 bg-[#102A43]/90 px-4 py-3 text-sm text-[#F5F3EE] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm"
              >
                <FaCheckCircle className="h-5 w-5 shrink-0 text-[#55D6FF]" />
                <span>SEO</span>
              </li>

              <li
                data-intensity="0.7"
                className="hero-benefit absolute bottom-[15%] left-[-6%] flex items-center gap-2 rounded-xl border border-[#55D6FF]/40 bg-[#102A43]/90 px-4 py-3 text-sm text-[#F5F3EE] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm"
              >
                <FaCheckCircle className="h-5 w-5 shrink-0 text-[#55D6FF]" />
                <span>Sin costo de mantenimiento</span>
              </li>

              <li
                data-intensity="1.2"
                className="hero-benefit absolute right-[-7%] top-[38%] flex items-center gap-2 rounded-xl border border-[#55D6FF]/40 bg-[#102A43]/90 px-4 py-3 text-sm text-[#F5F3EE] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm"
              >
                <FaCheckCircle className="h-5 w-5 shrink-0 text-[#55D6FF]" />
                <span>Adaptados</span>
              </li>

              <li
                data-intensity="0.9"
                className="hero-benefit absolute bottom-[24%] right-[-5%] flex items-center gap-2 rounded-xl border border-[#55D6FF]/40 bg-[#102A43]/90 px-4 py-3 text-sm text-[#F5F3EE] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm"
              >
                <FaCheckCircle className="h-5 w-5 shrink-0 text-[#55D6FF]" />
                <span>Enlaces a redes sociales</span>
              </li>

              <li
                data-intensity="1"
                className="hero-benefit absolute bottom-[0%] right-[22%] flex items-center gap-2 rounded-xl border border-[#55D6FF]/40 bg-[#102A43]/90 px-4 py-3 text-sm text-[#F5F3EE] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm"
              >
                <FaCheckCircle className="h-5 w-5 shrink-0 text-[#55D6FF]" />
                <span>Garantía de satisfacción</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </section>
  );
}