
import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMail } from "react-icons/fi";
import { FaLocationArrow } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const extras = [
  { value: "seo", label: "SEO y posicionamiento" },
  { value: "analytics", label: "Google Analytics" },
  { value: "maintenance", label: "Mantenimiento web" },
  { value: "marketing", label: "Marketing digital" },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
        { opacity: 0, y: 60 },
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
        { opacity: 0, x: 80 },
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      company: String(formData.get("company") ?? ""),
      project: String(formData.get("project") ?? ""),
      extras: formData.getAll("extras").map(String),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "No se pudo enviar la consulta.");
      }

      form.reset();
      setStatus({
        type: "success",
        message: "¡Gracias! Hemos recibido tu consulta y nos pondremos en contacto contigo.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "No se pudo enviar el mensaje. Inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contacto"
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

  <div className="mt-8 flex flex-wrap gap-4">
    <a
      href={`https://wa.me/+34617913802?text=${encodeURIComponent(
      "¡Hola! Vi la web de Tuchi Digital y me gustaría consultar sobre un proyecto web."
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="inline-flex items-center gap-3 border border-[#102A43] bg-[#102A43] px-5 py-4 text-sm text-white transition-colors duration-300 hover:bg-[#183D5C]"
    >
      <FaWhatsapp className="text-xl" />
      <span>+34 617 913 802</span>
    </a>

    <a
      href="mailto:edujuarezcba@gmail.com"
      aria-label="Enviar un email"
      className="inline-flex items-center gap-3 border border-[#102A43]/20 px-5 py-4 text-sm text-[#102A43] transition-colors duration-300 hover:border-[#102A43] hover:bg-[#102A43]/5"
    >
      <FiMail className="text-xl" />
      <span>edujuarezcba@gmail.com</span>
    </a>
  </div>
</div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="contact-form border-[5px] border-[#102A43] bg-[#102A43] p-6 text-white/80 md:p-8 lg:p-10"
          >
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="font-mono text-base uppercase tracking-[0.15em]">
                  Nombre *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  required
                  className="mt-3 w-full border-b border-cream/20 bg-transparent py-4 text-xl text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-cyan md:text-2xl"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="font-mono text-base uppercase tracking-[0.15em]">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  className="mt-3 w-full border-b border-cream/20 bg-transparent py-4 text-xl text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-cyan md:text-2xl"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="mt-8">
              <label htmlFor="phone" className="font-mono text-base uppercase tracking-[0.15em]">
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={30}
                className="mt-3 w-full border-b border-cream/20 bg-transparent py-4 text-xl text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-cyan md:text-2xl"
                placeholder="+34 600 000 000"
              />
            </div>

            <div className="mt-8">
              <label htmlFor="company" className="font-mono text-base uppercase tracking-[0.15em]">
                Empresa
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                maxLength={150}
                className="mt-3 w-full border-b border-cream/20 bg-transparent py-4 text-xl text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-cyan md:text-2xl"
                placeholder="Nombre de tu empresa"
              />
            </div>

            <fieldset className="mt-10">
              <legend className="font-mono text-base uppercase tracking-[0.15em]">
                ¿Qué tipo de web necesitas? *
              </legend>
              <p className="mt-2 text-sm text-white/55">
                Elige la opción que mejor encaje con tu idea.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { value: "web", label: "Web básica" },
                  { value: "landing", label: "Landing page" },
                  { value: "ecommerce", label: "Tienda online" },
                  { value: "unsure", label: "No lo tengo claro" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-3 border border-white/15 p-4 transition-colors has-[:checked]:border-cyan has-[:checked]:bg-cyan/10"
                  >
                    <input
                      type="radio"
                      name="project"
                      value={option.value}
                      required
                      className="h-4 w-4 accent-[#55D6FF]"
                    />
                    <span className="text-base text-cream">{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-10">
              <legend className="font-mono text-base uppercase tracking-[0.15em]">
                ¿Necesitas algún extra?
              </legend>
              <p className="mt-2 text-sm text-white/55">
                Puedes seleccionar varias opciones o dejarlo para más adelante.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {extras.map((extra) => (
                  <label
                    key={extra.value}
                    className="flex cursor-pointer items-start gap-3 border border-white/15 p-4 transition-colors has-[:checked]:border-cyan has-[:checked]:bg-cyan/10"
                  >
                    <input
                      type="checkbox"
                      name="extras"
                      value={extra.value}
                      className="mt-1 h-4 w-4 accent-[#55D6FF]"
                    />
                    <span className="text-base text-cream">{extra.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-10">
              <label htmlFor="message" className="font-mono text-base uppercase tracking-[0.15em]">
                Cuéntanos sobre tu proyecto *
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={5000}
                required
                className="mt-3 w-full resize-y border-b border-cream/20 bg-transparent py-4 text-lg leading-relaxed text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-cyan md:text-xl"
                placeholder="¿Qué necesitas? ¿Qué tienes en mente?"
              />
            </div>

            <div
              aria-hidden="true"
              className="absolute -left-[10000px] h-px w-px overflow-hidden"
            >
              <label htmlFor="website">No rellenes este campo</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {status && (
              <p
                role={status.type === "success" ? "status" : "alert"}
                aria-live="polite"
                className={`mt-6 text-sm ${
                  status.type === "success" ? "text-[#55D6FF]" : "text-red-300"
                }`}
              >
                {status.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-10 inline-flex items-center gap-4 bg-cyan px-7 py-4 font-mono text-base uppercase tracking-[0.15em] text-navy transition-all duration-300 hover:bg-cream disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting ? "Enviando..." : "Enviar consulta"}
              <FaLocationArrow size={20} className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <p className="mt-4 text-xs leading-relaxed text-white/45">
              Utilizaremos tus datos únicamente para responder a tu consulta.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
