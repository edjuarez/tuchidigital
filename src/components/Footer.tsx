import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WebsiteMockup } from "./ui/WebsiteMockup";

gsap.registerPlugin(ScrollTrigger);

const navigation = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#introduction" },
  { label: "Proyectos", href: "#portfolio" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contact" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const background = backgroundRef.current;

    if (!footer || !background) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".footer-content",
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.to(background, {
        yPercent: -8,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, footer);

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      gsap.to(background, {
        x: x * 25,
        y: y * 25,
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
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#102A43] text-[#F5F3EE] pt-20"
    >
      <div
        ref={backgroundRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-10%]"
      >
        <div className="absolute left-[55%] top-[10%] h-[45vw] w-[45vw] rounded-full border border-white/[0.08]" />
        <div className="absolute left-[60%] top-[16%] h-[32vw] w-[32vw] rounded-full border border-white/[0.06]" />
        <div className="absolute left-[66%] top-[23%] h-[20vw] w-[20vw] rounded-full border border-white/[0.05]" />
        <div className="absolute left-[70%] top-[28%] h-[10vw] w-[10vw] rounded-full bg-[#55D6FF]/10 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(255,255,255,0.08),transparent_32%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(85,214,255,0.12),transparent_28%)]" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px]"
      />

      <div className="relative z-10 flex min-h-svh flex-col px-6 py-20 md:px-10 md:py-10 lg:px-16">
        <div className="footer-content flex flex-1 flex-col justify-between">
          <div className="grid gap-16 pt-10 md:grid-cols-[1.5fr_0.7fr_0.8fr] md:pt-16">
            <div>
              <a
                href="#inicio"
                className="group inline-block"
              >
                <div className="font-momo text-[5rem] leading-[0.8] md:text-[8rem] lg:text-[7rem]">
                  <span>tuchi</span>
                  <br />
                  <span
                    className="text-[#55D6FF] transition-all duration-500 group-hover:text-[#F5F3EE]"
                    style={{
                      textShadow:
                        "0 0 10px rgba(85,214,255,0.7), 0 0 30px rgba(85,214,255,0.4), 0 0 60px rgba(85,214,255,0.2)",
                    }}
                  >
                    digital
                  </span>
                </div>
              </a>
            </div>

            <div>
              <span className="font-mono text-[1rem] uppercase tracking-[0.2em] text-[#F5F3EE]/40">
                Navegación
              </span>

              <nav className="mt-6 flex flex-col items-start">
                {navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-3 py-6 font-momo text-2xl transition-colors duration-300 hover:text-[#55D6FF]"
                  >
                    <span className="h-px w-0 bg-[#55D6FF] transition-all duration-300 group-hover:w-5" />
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <span className="font-mono text-[1rem] uppercase tracking-[0.2em] text-[#F5F3EE]/40">
                Contacto
              </span>

              <div className="mt-6 flex flex-col gap-4">
                <a
                  href="tel:+34000000000"
                  className="text-lg text-[#F5F3EE]/75 transition-colors duration-300 hover:text-[#55D6FF]"
                >
                  +34 000 000 000
                </a>

                <a
                  href="mailto:hola@tuchidigital.com"
                  className="text-lg text-[#F5F3EE]/75 transition-colors duration-300 hover:text-[#55D6FF]"
                >
                  hola@tuchidigital.com
                </a>

                <span className="text-lg text-[#F5F3EE]/50">
                  Barcelona, España
                </span>
              </div>

              <a
                href="#"
                className="mt-8 inline-flex border border-[#F5F3EE]/20 px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#55D6FF] hover:bg-[#55D6FF] hover:text-[#102A43]"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="mt-20 border-t border-[#F5F3EE]/15 pt-6">
{/*             <div className="flex flex-col gap-4 font-mono text-[10px] uppercase tracking-[0.15em] text-[#F5F3EE]/35 md:flex-row md:items-center md:justify-between">
              <span>
                Tuchi Digital
              </span>

              <span>
                © 2026 Todos los derechos reservados
              </span>

              <div className="flex gap-6">
                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#55D6FF]"
                >
                  Privacidad
                </a>

                <a
                  href="#"
                  className="transition-colors duration-300 hover:text-[#55D6FF]"
                >
                  Legal
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}