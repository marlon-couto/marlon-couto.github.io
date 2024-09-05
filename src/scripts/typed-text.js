import Typed from "typed.js";

// Exibe o texto animado com efeito de máquina de escrever.
export const showTypedText = () => {
  const typed = new Typed("#typed-text", {
    strings: [
      ".NET",
      "Angular",
      "C#",
      "JavaScript",
      "Node.js",
      "React",
      "TypeScript",
    ],
    typeSpeed: 100,
    loop: true,
    backDelay: 1000,
    backSpeed: 75,
  });
  typed.start();
};
