import { atom } from "nanostores";

const siteTitle = atom("Marlon Couto | Desenvolvedor Web");
const sections = atom([
  { constant: "HEADER", id: "header", description: "Início" },
  { constant: "ABOUTME", id: "about-me", description: "Sobre Mim" },
  { constant: "EXPERIENCE", id: "experience", description: "Experiência" },
  { constant: "SKILLS", id: "skills", description: "Skills" },
  { constant: "CONTACT", id: "contact", description: "Contato" },
]);
const curriculumLink = atom(
  "https://docs.google.com/document/d/1DCS6AFAudTjnK_K3m4E8oaipls8IqB3kUgOomCyx0qI/edit?usp=sharing",
);
const experiences = atom([
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
]);
const defaultTheme = atom({
  color: "var(--bs-emphasis-color)",
  backgroundColor: "var(--bs-secondary-bg)",
});

// Métodos auxiliares
const getSectionId = (constant: string) =>
  sections.get().find((x) => x.constant === constant)?.id;

export {
  siteTitle,
  sections,
  curriculumLink,
  experiences,
  defaultTheme,
  getSectionId,
};
