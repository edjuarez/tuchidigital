
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Trans, useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMail } from "react-icons/fi";
import { FaLocationArrow } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const extras = ["seo", "analytics", "maintenance", "marketing"] as const;
const projectOptions = ["web", "landing", "ecommerce", "unsure"] as const;

export function Contact() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

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

  const handleInvalid = (event: FormEvent<HTMLFormElement>) => {
    const field = event.target as HTMLInputElement | HTMLTextAreaElement;

    if (field.validity.valueMissing) {
      field.setCustomValidity(t("contact.form.validation.required"));
    } else if (field.validity.typeMismatch) {
      field.setCustomValidity(t("contact.form.validation.email"));
    }
  };

  const clearValidation = (event: FormEvent<HTMLFormElement>) => {
    (event.target as HTMLInputElement | HTMLTextAreaElement).setCustomValidity(
      "",
    );
  };

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
      locale: i18n.language,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative overflow-hidden bg-cream text-[#102A43]"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-36 lg:px-16">
        <div className="grid gap-20 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div className="contact-content">
            <span className="section-eyebrow section-eyebrow-dark">
              {t("contact.eyebrow")}
            </span>

            <h2 className="section-header section-header-dark mt-6">
              <Trans
                i18nKey="contact.heading"
                components={{
                  br: <br />,
                  accent: <span className="text-violet" />,
                }}
              />
            </h2>

            <p className="section-description section-description-dark mt-8">
              {t("contact.description")}
            </p>


<div className="mt-12 border-t border-[#102A43]/15 pt-6">
  <p className="font-mono text-base uppercase tracking-[0.15em] text-[#102A43]/45">
    {t("contact.ideaTitle")}
  </p>

  <p className="mt-2 text-base text-[#102A43]/70">
    {t("contact.ideaText")}
  </p>

  <div className="mt-8 flex flex-wrap gap-4">
    <a
      href={`https://wa.me/+34617913802?text=${encodeURIComponent(
      t("contact.whatsappMessage")
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("contact.whatsappAria")}
      className="inline-flex items-center gap-3 border border-[#102A43] bg-[#102A43] px-5 py-4 text-sm text-cream transition-colors duration-300 hover:bg-[#183D5C]"
    >
      <FaWhatsapp className="text-xl" />
      <span>+34 617 913 802</span>
    </a>

    <a
      href="mailto:hola@tuchidigital.com"
      aria-label={t("contact.emailAria")}
      className="inline-flex items-center gap-3 border border-[#102A43]/20 px-5 py-4 text-sm text-[#102A43] transition-colors duration-300 hover:border-[#102A43] hover:bg-[#102A43]/5"
    >
      <FiMail className="text-xl" />
      <span>hola@tuchidigital.com</span>
    </a>
  </div>
</div>
          </div>

          <form
            onSubmit={handleSubmit}
            onInvalid={handleInvalid}
            onInput={clearValidation}
            className="contact-form border-[5px] border-[#102A43] bg-[#102A43] p-6 text-cream/80 md:p-8 lg:p-10"
          >
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="font-mono text-base uppercase tracking-[0.15em]">
                  {t("contact.form.labels.name")}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  required
                  className="mt-3 w-full border-b border-cream/20 bg-transparent py-4 text-xl text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-cyan md:text-2xl"
                  placeholder={t("contact.form.placeholders.name")}
                />
              </div>

              <div>
                <label htmlFor="email" className="font-mono text-base uppercase tracking-[0.15em]">
                  {t("contact.form.labels.email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  className="mt-3 w-full border-b border-cream/20 bg-transparent py-4 text-xl text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-cyan md:text-2xl"
                  placeholder={t("contact.form.placeholders.email")}
                />
              </div>
            </div>

            <div className="mt-8">
              <label htmlFor="phone" className="font-mono text-base uppercase tracking-[0.15em]">
                {t("contact.form.labels.phone")}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={30}
                className="mt-3 w-full border-b border-cream/20 bg-transparent py-4 text-xl text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-cyan md:text-2xl"
                placeholder={t("contact.form.placeholders.phone")}
              />
            </div>

            <div className="mt-8">
              <label htmlFor="company" className="font-mono text-base uppercase tracking-[0.15em]">
                {t("contact.form.labels.company")}
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                maxLength={150}
                className="mt-3 w-full border-b border-cream/20 bg-transparent py-4 text-xl text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-cyan md:text-2xl"
                placeholder={t("contact.form.placeholders.company")}
              />
            </div>

            <fieldset className="mt-10">
              <legend className="font-mono text-base uppercase tracking-[0.15em]">
                {t("contact.form.project.legend")}
              </legend>
              <p className="mt-2 text-sm text-cream/55">
                {t("contact.form.project.help")}
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {projectOptions.map((option) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-center gap-3 border border-cream/15 p-4 transition-colors has-[:checked]:border-cyan has-[:checked]:bg-cyan/10"
                  >
                    <input
                      type="radio"
                      name="project"
                      value={option}
                      required
                      className="h-4 w-4 accent-[#55D6FF]"
                    />
                    <span className="text-base text-cream">
                      {t(`contact.form.project.options.${option}`)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-10">
              <legend className="font-mono text-base uppercase tracking-[0.15em]">
                {t("contact.form.extras.legend")}
              </legend>
              <p className="mt-2 text-sm text-cream/55">
                {t("contact.form.extras.help")}
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {extras.map((extra) => (
                  <label
                    key={extra}
                    className="flex cursor-pointer items-start gap-3 border border-cream/15 p-4 transition-colors has-[:checked]:border-cyan has-[:checked]:bg-cyan/10"
                  >
                    <input
                      type="checkbox"
                      name="extras"
                      value={extra}
                      className="mt-1 h-4 w-4 accent-[#55D6FF]"
                    />
                    <span className="text-base text-cream">
                      {t(`contact.form.extras.options.${extra}`)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-10">
              <label htmlFor="message" className="font-mono text-base uppercase tracking-[0.15em]">
                {t("contact.form.labels.message")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={5000}
                required
                className="mt-3 w-full resize-y border-b border-cream/20 bg-transparent py-4 text-lg leading-relaxed text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-cyan md:text-xl"
                placeholder={t("contact.form.placeholders.message")}
              />
            </div>

            <div
              aria-hidden="true"
              className="absolute -left-[10000px] h-px w-px overflow-hidden"
            >
              <label htmlFor="website">{t("contact.form.labels.honeypot")}</label>
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
                role={status === "success" ? "status" : "alert"}
                aria-live="polite"
                className={`mt-6 text-sm ${
                  status === "success" ? "text-[#55D6FF]" : "text-red-300"
                }`}
              >
                {status === "success"
                  ? t("contact.form.success")
                  : t("contact.form.error")}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-10 inline-flex items-center gap-4 bg-cyan px-7 py-4 font-mono text-base uppercase tracking-[0.15em] text-navy transition-all duration-300 hover:bg-cream disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting
                ? t("contact.form.submitting")
                : t("contact.form.submit")}
              <FaLocationArrow size={20} className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <p className="mt-4 text-xs leading-relaxed text-cream/45">
              {t("contact.form.privacy")}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
