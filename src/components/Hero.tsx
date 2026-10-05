"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  "Sitios web a medida",
  "SEO inicial",
  "Sin costo de mantenimiento",
  "Adaptados a dispositivos móviles",
  "Enlaces a tus redes sociales",
  "Garantía de satisfacción",
];

const services = ["WEB", "LANDINGS", "E-COMMERCE"];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const background = backgroundRef.current;

    if (!hero || !background) return;

    const context = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      intro
        .from(".hero-brand", {
          y: 20,
          opacity: 0,
          duration: 0.7,
        })
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
          ".hero-benefit",
          {
            x: -20,
            opacity: 0,
            duration: 0.45,
            stagger: 0.07,
          },
          "-=0.25",
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
      className="relative min-h-svh overflow-hidden bg-[#102A43] text-[#F5F3EE] pb-50 section-dark-end"
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

      <div className="relative z-10 flex min-h-svh flex-col px-6 py-6 md:px-10 md:py-8 lg:px-16">
        <main className="hero-content flex flex-1 items-center justify-center">
          <div className="w-full max-w-6xl text-center">
            <h1 className="hero-title font-momo text-[7rem] leading-[0.85] tracking-[-0.055em]">
              <span>tuchi </span>
              <span
                className="text-[#55D6FF]"
                style={{
                  textShadow:
                    "0 0 10px rgba(85,214,255,0.7), 0 0 30px rgba(85,214,255,0.4), 0 0 60px rgba(85,214,255,0.2)",
                }}
              >
                digital
              </span>
            </h1>

            <div className="hero-description mx-auto mt-10 max-w-4xl">
              <br />
              <p className="text-[3rem] font-medium leading-[0.92] tracking-[-0.045em]">
                Creamos sitios web modernos, <br />
                adaptados a tus necesidades.
              </p>
            </div>

            <div className="hero-services mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-10 gap-y-3 border-y border-white/15 py-5">
              {services.map((service) => (
                <span
                  key={service}
                  className="font-mono text-sm uppercase tracking-[0.2em] text-white/80 md:text-base"
                >
                  {service}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-10">
              <ul className="grid grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="hero-benefit flex items-center justify-center gap-4 text-base text-white/80 md:text-lg"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#55D6FF]/60 text-xs text-[#55D6FF]">
                      ✓
                    </span>

                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="hero-actions">
                <a
                  href="#contacto"
                  className="group inline-flex items-center gap-6 border border-[#55D6FF] bg-[#55D6FF] px-8 py-5 text-base font-medium uppercase tracking-[0.12em] text-[#102A43] transition-all duration-300 hover:bg-transparent hover:text-[#55D6FF]"
                >
                  <span>Pedir mi sitio ahora</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}