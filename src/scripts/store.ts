import { atom } from "nanostores";

const siteTitle = atom("Marlon Couto | Desenvolvedor Web");
const sections = atom([
  { constant: "HEADER", id: "header", description: "Início" },
  { constant: "ABOUTME", id: "about-me", description: "Sobre Mim" },
  { constant: "EXPERIENCE", id: "experience", description: "Experiência" },
  { constant: "SKILLS", id: "skills", description: "Skills" },
  { constant: "CONTACT", id: "contact", description: "Contato" },
]);
const getId = (constant: string) =>
  sections.get().find((x) => x.constant === constant)?.id;
const curriculumLink = atom(
  "https://docs.google.com/document/d/1DCS6AFAudTjnK_K3m4E8oaipls8IqB3kUgOomCyx0qI/edit?usp=sharing",
);

export default {
  siteTitle,
  sections,
  getId,
  curriculumLink,
};
