import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
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
            trigger: ".contact-content",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".contact-form",
        {
          opacity: 0,
          x: 80,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
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
      id="contact"
      className="relative overflow-hidden bg-[#F5F3EE] text-[#102A43]"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36 lg:px-16">
        <div className="grid gap-20 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div className="contact-content">
            <span className="section-eyebrow section-eyebrow-dark">
              Contacto
            </span>

            <h2 className="section-header section-header-dark mt-6">
              Hablemos de tu
              <br />
               <span className="text-violet">proyecto.</span>
            </h2>

            <p className="section-description section-description-dark mt-8">
              Cuéntanos qué tienes en mente, qué necesitas y qué objetivos
              quieres conseguir. Analizaremos tu proyecto y nos pondremos en
              contacto contigo para hablar de los próximos pasos.
            </p>

            <div className="mt-12 border-t border-[#102A43]/15 pt-6">
              <p className="font-mono text-base uppercase tracking-[0.15em] text-[#102A43]/45">
                ¿Tienes una idea?
              </p>

              <p className="mt-2 text-base text-[#102A43]/70">
                Estamos preparados para llevarla a la web.
              </p>
            </div>
          </div>

          <form className="contact-form border-[5px] border-[#102A43] bg-[#102A43] p-6 md:p-8 lg:p-10 text-white/80">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="group">
                <label
                  htmlFor="name"
                  className="font-mono text-base uppercase tracking-[0.15em]"
                >
                  Nombre
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-3 w-full border-b border-cream/20 bg-transparent py-4 text-2xl text-cream outline-none transition-colors duration-300 placeholder:text-cream/25 focus:border-cyan"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="group">
                <label
                  htmlFor="email"
                  className="font-mono text-base uppercase tracking-[0.15em]"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-3 w-full border-b border-cream/20 bg-transparent py-4 text-2xl text-cream outline-none transition-colors duration-300 placeholder:text-cream/25 focus:border-cyan"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="mt-8">
              <label
                htmlFor="phone"
                className="font-mono text-base uppercase tracking-[0.15em]"
              >
                Teléfono
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                className="mt-3 w-full border-b border-cream/20 bg-transparent py-4 text-2xl text-cream outline-none transition-colors duration-300 placeholder:text-cream/25 focus:border-cyan"
                placeholder="+34 600 000 000"
              />
            </div>

            <div className="mt-8">
              <label
                htmlFor="company"
                className="font-mono text-base uppercase tracking-[0.15em]"
              >
                Empresa
              </label>

              <input
                id="company"
                name="company"
                type="text"
                className="mt-3 w-full border-b border-cream/20 bg-transparent py-4 text-2xl text-cream outline-none transition-colors duration-300 placeholder:text-cream/25 focus:border-cyan"
                placeholder="Nombre de tu empresa"
              />
            </div>

            <div className="mt-8">
              <label
                htmlFor="project"
                className="font-mono text-base uppercase tracking-[0.15em]"
              >
                Tipo de proyecto
              </label>

              <select
                id="project"
                name="project"
                required
                defaultValue=""
                className="mt-3 w-full border-b border-cream/20 bg-navy py-4 text-2xl outline-none transition-colors duration-300 focus:border-cyan"
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="web">Página web</option>
                <option value="landing">Landing page</option>
                <option value="ecommerce">E-commerce</option>
                <option value="other">Otro proyecto</option>
              </select>
            </div>

            <div className="mt-8">
              <label
                htmlFor="message"
                className="font-mono text-base uppercase tracking-[0.15em]"
              >
                Cuéntanos sobre tu proyecto
              </label>

              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-3 w-full resize-none border-b border-cream/20 bg-transparent py-4 text-2xl leading-relaxed text-cream outline-none transition-colors duration-300 placeholder:text-cream/25 focus:border-cyan"
                placeholder="¿Qué necesitas? ¿Qué tienes en mente?"
              />
            </div>

            <button
              type="submit"
              className="group mt-10 inline-flex items-center gap-4 bg-cyan px-7 py-4 font-mono text-xs uppercase tracking-[0.15em] text-navy transition-all duration-300 hover:bg-cream"
            >
              Enviar consulta
              <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}