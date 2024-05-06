import Typed from "typed.js";

const navbar = document.querySelector(".navbar") as HTMLElement;
const navLinksInactive = document.querySelectorAll(
  "#navbarLinks .nav-link.inactive",
) as NodeListOf<HTMLElement>;

// Adiciona efeito de transição à barra de navegação quando a pessoa usuária rola a tela a partir do topo.
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-sticky");
  } else {
    navbar.classList.remove("navbar-sticky");
    navLinksInactive.forEach((link) => {
      link.classList.remove("inactive");
    });
  }
});

const sections = document.querySelectorAll(
  "#header, #aboutMe, #skills, #contact",
) as NodeListOf<HTMLElement>;

const linkAtivo = document.querySelector("nav .nav-link.active") as HTMLElement;

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
  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        intersectionHandler(entrada);
      }
    });
  }, config);

  // Observa cada elemento com os IDs especificados.
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Função para lidar com a interseção de elementos.
  // 1. Obtém o ID da seção intersectada.
  // 2. Seleciona o elemento de navegação atualmente ativo
  // 3. Seleciona o elemento de navegação que deve estar ativo com base no ID da seção.
  // 4. Remove a classe 'active' do elemento de navegação atualmente ativo, se existir.
  // 5. Adiciona a classe 'active' ao elemento de navegação que deve estar ativo, se existir.
  const intersectionHandler = (entrada: IntersectionObserverEntry) => {
    const sectionId = entrada.target.id;
    const deveriaEstarAtivo = document.querySelector(
      `nav .nav-link[href="#${sectionId}"]`,
    );

    if (linkAtivo && deveriaEstarAtivo && linkAtivo != deveriaEstarAtivo) {
      linkAtivo.classList.remove("active");
      deveriaEstarAtivo.classList.add("active");
    }
  };
});

// Retorna o tema de cores atual (light ou dark).
const obterTema = () => {
  const tema = localStorage.getItem("tema");
  if (tema) {
    return tema;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const iconeDeSol = document.querySelector("i.fa-sun") as HTMLElement;
const iconeDeLua = document.querySelector("i.fa-moon") as HTMLElement;

// Muda o ícone para combinar com o tema atual.
const mostrarIconesDeTema = () => {
  if (obterTema() === "dark") {
    iconeDeSol.style.display = "block";
    iconeDeLua.style.display = "none";
  } else {
    iconeDeSol.style.display = "none";
    iconeDeLua.style.display = "block";
  }
};

const themeToggle = document.querySelector("#themeToggle") as HTMLInputElement;

// Marca/desmarca a caixa de seleção que indica o tema atual,
// salva o tema no armazenamento local do navegador
// e adiciona um efeito de transição ao ícone.
(() => {
  if (obterTema() === "dark") {
    themeToggle.checked = true;
    localStorage.setItem("tema", "dark");
    iconeDeLua.classList.add("animated-icon");
    mostrarIconesDeTema();
  } else {
    themeToggle.checked = false;
    localStorage.setItem("tema", "light");
    iconeDeSol.classList.add("animated-icon");
    mostrarIconesDeTema();
  }
})();

// Muda o tema de cores do Bootstrap se o switch for clicado
// e salva o novo tema no armazenamento local.
themeToggle.addEventListener("click", () => {
  if (obterTema() == "dark") {
    localStorage.setItem("tema", "light");
    mostrarIconesDeTema();
  } else {
    localStorage.setItem("tema", "dark");
    mostrarIconesDeTema();
  }

  document.documentElement.setAttribute("data-bs-theme", obterTema());
});

const navbarNavOverlay = document.querySelector(
  "#navbarNavOverlay",
) as HTMLElement;
const navbarLinks = document.querySelector("#navbarLinks") as HTMLElement;

// Exibe o overlay ao clicar no menu hambúrguer.
navbarNavOverlay.addEventListener("click", () => {
  navbarLinks.classList.toggle("navbar__overlay");
});

const navbarNavOverlayInput = document.querySelector(
  "#navbarNavOverlay > input",
) as HTMLInputElement;

// Garante que o menu hambúrguer esteja fechado ao carregar a página.
(() => {
  if (navbarNavOverlayInput) {
    navbarNavOverlayInput.checked = false;
  }
})();

const navItems = document.querySelectorAll(
  "#navbarLinks > .nav-item",
) as NodeListOf<HTMLInputElement>;

// Fecha o menu overlay ao clicar em algum link.
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navbarNavOverlayInput.checked = false;
    navbarLinks.classList.remove("navbar__overlay");
  });
});

// Exibe o texto animado com efeito de máquina de escrever.
(() => {
  const typed = new Typed("#typedText", {
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
const obterPosicaoDaJanela = () => {
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

const aboutMe = document.querySelector("#aboutMe") as HTMLElement;

// Sobre Mim
window.addEventListener("scroll", () => {
  const aboutMeTop = aboutMe.getBoundingClientRect().top + window.scrollY;
  if (obterPosicaoDaJanela() > aboutMeTop) {
    aboutMe.classList.add("about-me--animated");
  }
});

const skills = document.querySelector("#skills") as HTMLElement;

// Skills
window.addEventListener("scroll", () => {
  const skillsTop = skills.getBoundingClientRect().top + window.scrollY;
  if (obterPosicaoDaJanela() > skillsTop) {
    skills.classList.add("skills--animated");
  }
});

const contact = document.querySelector("#contact") as HTMLElement;

// Contato
window.addEventListener("scroll", () => {
  const contactTop = contact.getBoundingClientRect().top + window.scrollY;
  if (obterPosicaoDaJanela() > contactTop) {
    contact.classList.add("contact--animated");
  }
});

const formInputs = document.querySelectorAll("#inputName, #inputEmail, #inputMessage") as NodeListOf<HTMLInputElement>;
const inputName = document.querySelector('#inputName') as HTMLInputElement;
const inputEmail = document.querySelector('#inputEmail') as HTMLInputElement;
const inputMessage = document.querySelector('#inputMessage') as HTMLInputElement;
const contactBtn = document.querySelector('#contactBtn') as HTMLButtonElement;

// Habilita o botão de envio apenas se o formulário for válido.
formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    const inputNameText = inputName.value.toString();
    const nameRegex = new RegExp(/^[a-zA-Z]+$/);
    const isValidName = nameRegex.test(inputNameText) && inputNameText.length >= 2;
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

const contactForm = document.querySelector('#contactForm') as HTMLElement;

// Mostra mensagens de validação no formulário.
inputMessage.addEventListener("change", () => {
  contactForm.classList.add("was-validated");
});
