import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    name: "Noventitre",
    description:
      "E-commerce desarrollado para una marca de bolsos personalizados.",
    image: "/clients/client1.webp",
    logo: "",
    url: "https://noventitre.com",
  },
  {
    number: "02",
    name: "Sophie Art Tattoo",
    description:
      "Sitio web diseñado para presentar el trabajo artístico, servicios y diseños de Sophie Art Tattoo.",
    image: "/clients/client2.webp",
    logo: "",
    url: "https://sophiearttattoo.com",
  },
];

export function Clients() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const context = gsap.context(() => {
      const projects = gsap.utils.toArray<HTMLElement>(".portfolio-project");

      gsap.fromTo(
        ".intro-content",
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
            trigger: ".intro-content",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.set(projects, {
        opacity: 0,
        y: 100,
      });

      projects.forEach((project) => {
        ScrollTrigger.create({
          trigger: project,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => {
            gsap.to(project, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(project, {
              opacity: 0,
              y: 100,
              duration: 0.5,
              ease: "power3.in",
            });
          },
        });
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative bg-white text-[#102A43]"
    >
      <div className="mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-40 lg:px-16">
        <div className="intro-content mb-20 max-w-4xl md:mb-28">
          <span className="section-eyebrow section-eyebrow-dark">
            Nuestros clientes
          </span>

          <h2 className="section-header section-header-dark mt-6">
            Marcas que ya confiaron en{" "}
            <span className="text-violet">nosotros.</span>
            <br />
          </h2>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[#102A43]/60 md:text-2xl">
            Una selección de proyectos desarrollados para distintas
            necesidades y negocios. Diseño, desarrollo y tecnología trabajando
            juntos para crear productos digitales sólidos.
          </p>
        </div>

        <div className="space-y-24 md:space-y-36">
          {projects.map((project, index) => (
            <a
              key={project.number}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-project group block"
            >
              <div className="relative">
                <div
                  className={`relative overflow-hidden bg-white ${
                    index % 2 === 1
                      ? "md:ml-16 lg:ml-24"
                      : "md:mr-16 lg:mr-24"
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden md:aspect-[16/9]">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                <div
                  className={`relative z-10 -mt-8 w-full bg-[#102A43] p-8 text-[#F5F3EE] shadow-2xl md:absolute md:bottom-[-32px] md:mt-0 md:w-[42%] md:p-10 lg:w-[38%] lg:p-12 ${
                    index % 2 === 1
                      ? "md:left-0"
                      : "md:right-0"
                  }`}
                >
{/*                   <div className="flex min-h-12 items-center">
                    {project.logo ? (
                      <img
                        src={project.logo}
                        alt={`${project.name} logo`}
                        className="max-h-12 max-w-[180px] object-contain"
                      />
                    ) : (
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#F5F3EE]/45">
                        {project.name}
                      </span>
                    )}
                  </div> */}

                  <h3 className="mt-8 font-momo text-4xl leading-[0.9] tracking-[-0.04em] md:text-5xl">
                    {project.name}
                  </h3>

                  <p className="mt-6 text-lg leading-relaxed text-[#F5F3EE]/60">
                    {project.description}
                  </p>

                  <div className="mt-10 border-t border-[#F5F3EE]/15 pt-6">
                    <span className="flex w-full items-center justify-center border border-[#55D6FF]/40 px-5 py-4 font-mono text-base uppercase tracking-[0.15em] text-[#F5F3EE]/70 transition-all duration-300 group-hover:border-[#55D6FF] group-hover:bg-[#55D6FF] group-hover:text-[#102A43]">
                      Visitar sitio
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#55D6FF] transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}