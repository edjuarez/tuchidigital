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
      className="relative bg-[#F5F3EE] text-[#102A43]"
    >
      <div className="mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-40 lg:px-16">
        <div className="mb-20 max-w-4xl md:mb-28">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#102A43]/50">
            Portfolio
          </span>

          <h2 className="mt-6 font-momo text-6xl leading-[0.88] tracking-[-0.05em] md:text-8xl">
            Proyectos
            <br />
            reales.
          </h2>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[#102A43]/60 md:text-2xl">
            Sitios web que hemos diseñado y desarrollado para nuestros
            clientes.
          </p>
        </div>

        <div className="space-y-10 md:space-y-16">
          {projects.map((project) => (
            <a
              key={project.number}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-project group grid overflow-hidden border border-[#102A43]/15 bg-white/40 transition-colors duration-500 hover:border-[#55D6FF] md:grid-cols-[1.6fr_1fr]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#102A43] md:aspect-auto md:min-h-[520px]">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-[#102A43]/0 transition-colors duration-500 group-hover:bg-[#102A43]/10" />

                <span className="absolute left-6 top-6 font-mono text-xs tracking-[0.2em] text-white/70 md:left-8 md:top-8">
                  {project.number}
                </span>
              </div>

              <div className="flex flex-col justify-between p-8 md:p-10 lg:p-12">
                <div>
                  <div className="flex min-h-16 items-center">
                    {project.logo ? (
                      <img
                        src={project.logo}
                        alt={`${project.name} logo`}
                        className="max-h-12 max-w-[180px] object-contain"
                      />
                    ) : (
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#102A43]/40">
                        {project.name}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-8 font-momo text-4xl leading-[0.9] tracking-[-0.04em] md:text-5xl lg:text-6xl">
                    {project.name}
                  </h3>

                  <p className="mt-6 max-w-md text-lg leading-relaxed text-[#102A43]/60">
                    {project.description}
                  </p>
                </div>

                <div className="mt-12 flex items-center justify-between border-t border-[#102A43]/15 pt-6">
                  <span className="font-mono text-xs uppercase tracking-[0.15em]">
                    Visitar sitio
                  </span>

                  <span className="flex h-12 w-12 items-center justify-center border border-[#102A43]/20 text-xl transition-all duration-300 group-hover:border-[#55D6FF] group-hover:bg-[#55D6FF] group-hover:text-[#102A43]">
                    ↗
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}