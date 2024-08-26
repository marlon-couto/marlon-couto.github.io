import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { v4 as uuid } from "uuid";
import "react-vertical-timeline-component/style.min.css";
import { useEffect, useState } from "react";

const experiences = [
  {
    src: "trybe.jpg",
    alt: "Trybe",
    link: "https://betrybe.com",
    date: "Julho de 2023 a Novembro de 2023",
    title: "Summer Student",
    subtitle: "Remoto",
    description:
      "Realização de monitorias para resolução de dúvidas, abordando tecnologias de back-end.",
  },
  {
    src: "freelancer.svg",
    alt: "Freelancing",
    link: "",
    date: "Agosto de 2023 a Janeiro de 2024",
    title: "Desenvolvedor Web Full-Stack",
    subtitle: "Remoto",
    description:
      "Criação e manutenção de sites e APIs usando soluções personalizadas para cada cliente.",
  },
  {
    src: "trieduc.png",
    alt: "TRIEduc",
    link: "https://trieduc.com.br",
    date: "Janeiro de 2024 a Agosto de 2024",
    title: "Desenvolvedor C# Júnior",
    subtitle: "Remoto",
    description:
      "Desenvolvimento e manutenção dos sistemas e bancos de dados da empresa.",
  },
];
const defaultTheme = {
  color: "var(--bs-emphasis-color)",
  backgroundColor: "var(--bs-secondary-bg)",
};

const ExperienceTimeline = () => {
  const [lineColor, setLineColor] = useState("");
  useEffect(() => {
    const getThemeColor = () => {
      const theme = document.documentElement.getAttribute("data-bs-theme");
      if (theme === "dark") {
        return "#dee2e6";
      } else {
        return "#212529";
      }
    };

    setLineColor(getThemeColor());
    const observer = new MutationObserver(() => setLineColor(getThemeColor()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-bs-theme"],
    });
    return () => observer.disconnect();
  }, []);
  return (
    <VerticalTimeline className="experience__timeline" lineColor={lineColor}>
      {experiences.map((experience) => (
        <VerticalTimelineElement
          key={uuid()}
          className="vertical-timeline-element--work"
          contentStyle={{
            backgroundColor: defaultTheme.backgroundColor,
            color: defaultTheme.color,
          }}
          contentArrowStyle={{
            borderRight: `7px solid ${defaultTheme.backgroundColor}`,
          }}
          date={experience.date}
          iconStyle={{
            backgroundColor: defaultTheme.backgroundColor,
            color: defaultTheme.color,
          }}
          icon={
            <div className="experience__icon">
              <a href={experience.link}>
                <img src={`assets/${experience.src}`} alt={experience.alt} />
              </a>
            </div>
          }
        >
          <h3 className="vertical-timeline-element-title">
            {experience.title}
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            {experience.subtitle}
          </h4>
          <p>{experience.description}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default ExperienceTimeline;
