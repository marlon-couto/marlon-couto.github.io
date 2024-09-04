import axios from "axios";
import Typed from "typed.js";
import { setToken } from "./store";

const navbar = document.querySelector(".navbar");
const navLinksInactive = document.querySelectorAll(
  "#navbar-links .nav-link.inactive",
);

// Adiciona efeito de transição à barra de navegação quando a pessoa usuária rola a tela a partir do topo.
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-sticky");
  } else {
    navbar.classList.remove("navbar-sticky");
    navLinksInactive.forEach((link) => link.classList.remove("inactive"));
  }
});
const sections = document.querySelectorAll(
  "#header, #about-me, #skills, #contact",
);
const activeLink = document.querySelector(
  "nav .nav-link.active",
);

// Realça na barra de navegação qual a seção atual da página que a pessoa usuária está.
// https://codepen.io/mishunov/pen/opeRdL?editors=0010
document.addEventListener("DOMContentLoaded", () => {
  // Configuração para o IntersectionObserver.
  const config = {
    rootMargin: "-50px 0px -55%", // Define as margens para detecção de interseção
  };

  // Criação de um IntersectionObserver com a função de callback para lidar com as entradas observadas.
  // 1. Itera sobre as entradas observadas.
  // 2. Verifica se a entrada está intersectando.
  // 3. Chama a função de tratamento de interseção.
  const observer = new IntersectionObserver((x) => {
    x.forEach((y) => y.isIntersecting && intersectionHandler(y));
  }, config);

  // Observa cada elemento com os IDs especificados.
  sections.forEach((section) => observer.observe(section));

  // Função para lidar com a interseção de elementos.
  // 1. Obtém o ID da seção intersectada.
  // 2. Seleciona o elemento de navegação atualmente ativo
  // 3. Seleciona o elemento de navegação que deve estar ativo com base no ID da seção.
  // 4. Remove a classe 'active' do elemento de navegação atualmente ativo, se existir.
  // 5. Adiciona a classe 'active' ao elemento de navegação que deve estar ativo, se existir.
  const intersectionHandler = (entry) => {
    const sectionId = entry.target.id;
    const shouldBeActive = document.querySelector(
      `nav .nav-link[href="#${sectionId}"]`,
    );
    if (activeLink && shouldBeActive && activeLink != shouldBeActive) {
      activeLink.classList.remove("active");
      shouldBeActive.classList.add("active");
    }
  };
});

const themeString = "theme_464af48860c340f3ba99282860e21c7f";

// Retorna o tema de cores atual (light ou dark).
const getTheme = () => {
  const theme = localStorage.getItem(themeString);
  if (theme) return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const sunIcon = document.querySelector("i.fa-sun");
const moonIcon = document.querySelector("i.fa-moon");

// Muda o ícone para combinar com o tema atual.
const toggleThemeIcons = () => {
  if (getTheme() === "dark") {
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  } else {
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  }
};

const themeToggle = document.querySelector("#theme-toggle");

// Marca/desmarca a caixa de seleção que indica o tema atual,
// salva o tema no armazenamento local do navegador
// e adiciona um efeito de transição ao ícone.
(() => {
  if (getTheme() === "dark") {
    themeToggle.checked = true;
    localStorage.setItem(themeString, "dark");
    moonIcon.classList.add("animated-icon");
    toggleThemeIcons();
  } else {
    themeToggle.checked = false;
    localStorage.setItem(themeString, "light");
    sunIcon.classList.add("animated-icon");
    toggleThemeIcons();
  }
})();

// Muda o tema de cores do Bootstrap se o switch for clicado
// e salva o novo tema no armazenamento local.
themeToggle.addEventListener("click", () => {
  if (getTheme() == "dark") {
    localStorage.setItem(themeString, "light");
    toggleThemeIcons();
  } else {
    localStorage.setItem(themeString, "dark");
    toggleThemeIcons();
  }

  document.documentElement.setAttribute("data-bs-theme", getTheme());
});

const navbarOverlay = document.querySelector("#navbar-overlay");
const navbarLinks = document.querySelector("#navbar-links");

// Exibe o overlay ao clicar no menu hambúrguer.
navbarOverlay.addEventListener("click", () => {
  navbarLinks.classList.toggle("navbar__overlay");
});
const navbarOverlayInput = document.querySelector(
  "#navbar-overlay > input",
);

// Garante que o menu hambúrguer esteja fechado ao carregar a página.
(() => {
  if (navbarOverlayInput) {
    navbarOverlayInput.checked = false;
  }
})();
const navItems = document.querySelectorAll(
  "#navbar-links > .nav-item",
);

// Fecha o menu overlay ao clicar em algum link.
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navbarOverlayInput.checked = false;
    navbarLinks.classList.remove("navbar__overlay");
  });
});

// Exibe o texto animado com efeito de máquina de escrever.
(() => {
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
})();

// Calcula a posição atual da tela no navegador da pessoa usuária.
const getWindowPosition = () => {
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const scrollPosition =
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
  return windowHeight + scrollPosition;
};

// As funções abaixo adicionam um efeito de animação ao conteúdo
// quando a pessoa usuária rola a tela até a seção referida.
const aboutMe = document.querySelector("#about-me");

// Sobre Mim
window.addEventListener("scroll", () => {
  const aboutMeTop = aboutMe.getBoundingClientRect().top + window.scrollY;
  if (getWindowPosition() > aboutMeTop) {
    aboutMe.classList.add("about-me--animated");
  }
});
const skills = document.querySelector("#skills");

// Skills
window.addEventListener("scroll", () => {
  const skillsTop = skills.getBoundingClientRect().top + window.scrollY;
  if (getWindowPosition() > skillsTop) {
    skills.classList.add("skills--animated");
  }
});
const contact = document.querySelector("#contact");

// Contato
window.addEventListener("scroll", () => {
  const contactTop = contact.getBoundingClientRect().top + window.scrollY;
  if (getWindowPosition() > contactTop) {
    contact.classList.add("contact--animated");
  }
});
document.addEventListener("DOMContentLoaded", async () => {
  try {
    if (contact) {
      const res = await axios.post(
        `${import.meta.env.PUBLIC_FORMS_API_URL}/auth/login`,
        {
          username: import.meta.env.PUBLIC_FORMS_API_USERNAME,
          password: import.meta.env.PUBLIC_FORMS_API_PASSWORD,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.status !== 200) {
        throw new Error("Erro ao obter token.");
      }

      console.log(res.data);
      setToken(res.data);
    }
  } catch (error) {
    console.error(error);
  }
});
const formInputs = document.querySelectorAll(
  "#input-name, #input-email, #input-message",
);
const inputName = document.querySelector("#input-name");
const inputEmail = document.querySelector("#input-email");
const inputMessage = document.querySelector(
  "#input-message",
);
const contactBtn = document.querySelector("#contact-btn");

// Habilita o botão de envio apenas se o formulário for válido.
formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    const inputNameText = inputName.value.toString();
    const nameRegex = new RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/);
    const isValidName =
      nameRegex.test(inputNameText) && inputNameText.length >= 2;
    const emailRegex = new RegExp(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
    );
    const isValidEmail = emailRegex.test(inputEmail.value.toString());
    const isValidMessage = inputMessage.value.toString().length >= 10;
    if (isValidEmail && isValidMessage && isValidName) {
      contactBtn.disabled = false;
    } else {
      contactBtn.disabled = true;
    }
  });
});
contactBtn.addEventListener("click", async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.PUBLIC_FORMS_API_URL}/email/sendMe`,
      {
        name: inputName.value,
        email: inputEmail.value,
        message: inputMessage.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.PUBLIC_FORMS_API_KEY}`,
        },
      },
    );
    if (res.status !== 200) {
      throw new Error("Erro ao enviar e-mail.");
    }

    alert("Mensagem enviada com sucesso!");
    inputName.value = "";
    inputEmail.value = "";
    inputMessage.value = "";
    contactBtn.disabled = true;
  } catch (error) {
    console.error(error);
  }
});
const contactForm = document.querySelector("#contact-form");

// Mostra mensagens de validação no formulário.
inputMessage.addEventListener("change", () => {
  contactForm.classList.add("was-validated");
});
