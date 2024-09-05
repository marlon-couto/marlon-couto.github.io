// Realça na barra de navegação qual a seção atual da página que a pessoa usuária está.
// https://codepen.io/mishunov/pen/opeRdL?editors=0010
export const highlightNavbar = () => {
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
  const sections = document.querySelectorAll(
    "#header, #about-me, #skills, #contact",
  );

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
    const activeLink = document.querySelector("nav .nav-link.active");
    const shouldBeActive = document.querySelector(
      `nav .nav-link[href="#${sectionId}"]`,
    );
    if (activeLink && shouldBeActive && activeLink != shouldBeActive) {
      activeLink.classList.remove("active");
      shouldBeActive.classList.add("active");
    }
  };
};

// Adiciona efeito de transição à barra de navegação quando a pessoa usuária rola a tela a partir do topo.
export const transitionNavbar = () => {
  const navbar = document.querySelector(".navbar");
  const navLinksInactive = document.querySelectorAll(
    "#navbar-links .nav-link.inactive",
  );
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-sticky");
  } else {
    navbar.classList.remove("navbar-sticky");
    navLinksInactive.forEach((link) => link.classList.remove("inactive"));
  }
};

const themeString = "theme_464af48860c340f3ba99282860e21c7f";

// Retorna o tema de cores atual (light ou dark).
const getTheme = () => {
  const theme = localStorage.getItem(themeString);
  if (theme) return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// Muda o ícone para combinar com o tema atual.
const toggleThemeIcons = () => {
  const sunIcon = document.querySelector("i.fa-sun");
  const moonIcon = document.querySelector("i.fa-moon");
  if (getTheme() === "dark") {
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  } else {
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  }
};

// Marca/desmarca a caixa de seleção que indica o tema atual,
// salva o tema no armazenamento local do navegador
// e adiciona um efeito de transição ao ícone.
export const setInitialTheme = () => {
  const themeToggle = document.querySelector("#theme-toggle");
  const sunIcon = document.querySelector("i.fa-sun");
  const moonIcon = document.querySelector("i.fa-moon");
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
};

// Muda o tema de cores do Bootstrap se o switch for clicado
// e salva o novo tema no armazenamento local.
export const toggleTheme = () => {
  if (getTheme() == "dark") {
    localStorage.setItem(themeString, "light");
    toggleThemeIcons();
  } else {
    localStorage.setItem(themeString, "dark");
    toggleThemeIcons();
  }

  document.documentElement.setAttribute("data-bs-theme", getTheme());
};

// Garante que o menu hambúrguer esteja fechado ao carregar a página.
export const closeHamburgerMenu = () => {
  const navbarOverlayInput = document.querySelector("#navbar-overlay > input");
  if (navbarOverlayInput) {
    navbarOverlayInput.checked = false;
  }
};

// Fecha o menu overlay ao clicar em algum link.
export const closeOverlay = () => {
  const navbarLinks = document.querySelector("#navbar-links");
  const navbarOverlayInput = document.querySelector("#navbar-overlay > input");
  navbarOverlayInput.checked = false;
  navbarLinks.classList.remove("navbar__overlay");
};

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

// A função abaixo adiciona um efeito de animação ao conteúdo
// quando a pessoa usuária rola a tela até a seção referida.
const animateSectionHandler = (sectionId) => {
  const section = document.querySelector(sectionId);
  const sectionTop = section.getBoundingClientRect().top + window.scrollY;
  if (getWindowPosition() > sectionTop) {
    section.classList.add(`${sectionId.slice(1)}--animated`);
  }
};

export const animateSections = () => {
  const sectionsIds = ["#about-me", "#skills", "#contact"];
  sectionsIds.forEach((sectionId) => {
    animateSectionHandler(sectionId);
  });
};
