
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

export function WhatsAppFloat() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const label = labelRef.current;

    if (!button || !label) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        button,
        {
          opacity: 0,
          y: 30,
          scale: 0.85,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 1,
          ease: "back.out(1.7)",
        },
      );

      gsap.to(button, {
        y: -4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.8,
      });

      gsap.set(label, {
        opacity: 0,
        x: 8,
        pointerEvents: "none",
      });

      const showLabel = () => {
        gsap.to(label, {
          opacity: 1,
          x: 0,
          duration: 0.25,
          ease: "power2.out",
        });
      };

      const hideLabel = () => {
        gsap.to(label, {
          opacity: 0,
          x: 8,
          duration: 0.2,
          ease: "power2.out",
        });
      };

      button.addEventListener("mouseenter", showLabel);
      button.addEventListener("mouseleave", hideLabel);
      button.addEventListener("focus", showLabel);
      button.addEventListener("blur", hideLabel);

      return () => {
        button.removeEventListener("mouseenter", showLabel);
        button.removeEventListener("mouseleave", hideLabel);
        button.removeEventListener("focus", showLabel);
        button.removeEventListener("blur", hideLabel);
      };
    });

    return () => context.revert();
  }, []);

  const phoneNumber = "+34617913802";
  const message = encodeURIComponent(
    "Hola, me gustaría recibir información sobre vuestros servicios web.",
  );

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 md:bottom-8 md:right-8">
      <span
        ref={labelRef}
        className="pointer-events-none absolute right-[calc(100%+12px)] whitespace-nowrap border border-[#55D6FF]/30 bg-[#102A43] px-4 py-3 font-mono text-[1.20rem] uppercase tracking-[0.15em] text-[#F5F3EE] shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
      >
        ¡Hablemos!
      </span>

      <a
        ref={buttonRef}
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar con Tuchi Digital por WhatsApp"
        className="group relative flex h-16 w-16 items-center justify-center border border-[#55D6FF] bg-[#102A43] text-[#55D6FF] shadow-[0_8px_30px_rgba(16,42,67,0.25)] transition-colors duration-300 hover:bg-[#55D6FF] hover:text-[#102A43] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#55D6FF] md:h-[72px] md:w-[72px]"
      >
        <FaWhatsapp className="text-[30px] transition-transform duration-300 group-hover:scale-110 md:text-[34px]" />
      </a>
    </div>
  );
}
