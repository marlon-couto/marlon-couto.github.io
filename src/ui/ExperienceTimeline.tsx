import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const experiences = [
  {
    key: "trybe",
    src: "trybe.jpg",
    alt: "Trybe",
    link: "https://betrybe.com",
    backgroundColor: "rgb(33, 150, 243)",
    color: "#fff",
    date: "Julho de 2023 a Novembro de 2023",
    title: "Summer Student",
    subtitle: "Remoto",
    description:
      "Realização de monitorias para resolução de dúvidas, abordando tecnologias de back-end.",
  },
  {
    key: "freelancer",
    src: "freelancer.svg",
    alt: "Freelancing",
    link: "",
    backgroundColor: "rgb(33, 150, 243)",
    color: "#fff",
    date: "Agosto de 2023 a Janeiro de 2024",
    title: "Desenvolvedor Web Full-Stack",
    subtitle: "Remoto",
    description:
      "Criação e manutenção de sites e APIs usando soluções personalizadas para cada cliente.",
  },
  {
    key: "trieduc",
    src: "trieduc.png",
    alt: "TRIEduc",
    link: "https://trieduc.com.br",
    backgroundColor: "rgb(33, 150, 243)",
    color: "#fff",
    date: "Janeiro de 2024 a Agosto de 2024",
    title: "Desenvolvedor C# Júnior",
    subtitle: "Remoto",
    description:
      "Desenvolvimento e manutenção dos sistemas e bancos de dados da empresa.",
  },
];

const ExperienceTimeline = () => {
  return (
    <VerticalTimeline className="experience__timeline">
      {experiences.map((experience) => (
        <VerticalTimelineElement
          key={experience.key}
          className="vertical-timeline-element--work"
          contentStyle={{
            background: experience.backgroundColor,
            color: experience.color,
          }}
          contentArrowStyle={{
            borderRight: `7px solid ${experience.backgroundColor}`,
          }}
          date={experience.date}
          iconStyle={{
            background: experience.backgroundColor,
            color: experience.color,
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
