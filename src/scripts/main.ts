import $ from "jquery";
import Typed from "typed.js";

// Adiciona efeito de transição à barra de navegação quando a pessoa usuária rola a tela a partir do topo.
$(window).on("scroll", () => {
  if (window.scrollY > 50) {
    $(".navbar").addClass("navbar-sticky");
  } else {
    $(".navbar").removeClass("navbar-sticky");
    $("#navbarLinks .nav-link.inactive").removeClass("inactive");
  }
});

// Realça na barra de navegação qual a seção atual da página que a pessoa usuária está.
// https://codepen.io/mishunov/pen/opeRdL?editors=0010
$(() => {
  // Configuração para o IntersectionObserver.
  const config = {
    rootMargin: "-50px 0px -55%", // Define as margens para detecção de interseção
  };

  // Criação de um IntersectionObserver com a função de callback para lidar com as entradas observadas.
  // 1. Itera sobre as entradas observadas.
  // 2. Verifica se a entrada está intersectando.
  // 3. Chama a função de tratamento de interseção.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        intersectionHandler(entry);
      }
    });
  }, config);

  // Observa cada elemento com os IDs especificados.
  $("#header, #aboutMe, #skills, #contact").each(function () {
    observer.observe(this);
  });

  // Função para lidar com a interseção de elementos.
  // 1. Obtém o ID da seção intersectada.
  // 2. Seleciona o elemento de navegação atualmente ativo
  // 3. Seleciona o elemento de navegação que deve estar ativo com base no ID da seção.
  // 4. Remove a classe 'active' do elemento de navegação atualmente ativo, se existir.
  // 5. Adiciona a classe 'active' ao elemento de navegação que deve estar ativo, se existir.
  const intersectionHandler = (entry: IntersectionObserverEntry) => {
    const sectionId = entry.target.id;
    const currentlyActive = $("nav .nav-link.active");
    const shouldBeActive = $(`nav .nav-link[href="#${sectionId}"]`);

    if (!currentlyActive.is(shouldBeActive)) {
      currentlyActive.removeClass("active");
      shouldBeActive.addClass("active");
    }
  };
});

// Retorna o tema de cores atual (light ou dark).
const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (theme) {
    return theme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// Muda o ícone para combinar com o tema atual.
const showToggleThemeIcons = () => {
  if (getTheme() === "dark") {
    $("i.fa-sun").show();
    $("i.fa-moon").hide();
  } else {
    $("i.fa-sun").hide();
    $("i.fa-moon").show();
  }
};

// Marca/desmarca a caixa de seleção que indica o tema atual,
// salva o tema no armazenamento local do navegador
// e adiciona um efeito de transição ao ícone.
$(() => {
  if (getTheme() === "dark") {
    $("#themeToggle").prop("checked", true);
    localStorage.setItem("theme", "dark");
    $("i.fa-moon").addClass("animated-icon");
    showToggleThemeIcons();
  } else {
    $("#themeToggle").prop("checked", false);
    localStorage.setItem("theme", "light");
    $("i.fa-sun").addClass("animated-icon");
    showToggleThemeIcons();
  }
});

// Muda o tema de cores do Bootstrap se o switch for clicado
// e salva o novo tema no armazenamento local.
$("#themeToggle").on("click", () => {
  if (getTheme() === "dark") {
    localStorage.setItem("theme", "light");
    showToggleThemeIcons();
  } else {
    localStorage.setItem("theme", "dark");
    showToggleThemeIcons();
  }

  $("html").attr("data-bs-theme", getTheme());
});

// Exibe o overlay ao clicar no menu hambúrguer.
$("#navbarNavOverlay").on("click", () => {
  $("#navbarLinks").toggleClass("navbar__overlay");
});

// Garante que o menu hambúrguer esteja fechado ao carregar a página.
$(() => {
  $("#navbarNavOverlay > input").prop("checked", false);
});

// Fecha o menu overlay ao clicar em algum link.
$("#navbarLinks > .nav-item").on("click", () => {
  $("#navbarNavOverlay > input").prop("checked", false);
  $("#navbarLinks").removeClass("navbar__overlay");
});

// Exibe o texto animado com efeito de máquina de escrever.
$(() => {
  const typed = new Typed("#typedText", {
    strings: [
      "Angular",
      "ASP.NET",
      "Bootstrap",
      "C#",
      "JavaScript",
      "jQuery",
      "Node.js",
      "React",
      "Sass",
      "TypeScript",
    ],
    typeSpeed: 100,
    loop: true,
    backDelay: 1000,
    backSpeed: 75,
  });
  typed.start();
});

// Calcula a posição atual da tela no navegador da pessoa usuária.
const getWindowPosition = () => {
  const windowHeight = $(window).height() ?? 0;
  const scrollPosition = $(window).scrollTop() ?? 0;
  return windowHeight + scrollPosition;
};

// As funções abaixo adicionam um efeito de animação ao conteúdo
// quando a pessoa usuária rola a tela até a seção referida.

// Sobre Mim
$(window).on("scroll", () => {
  const aboutMe = $("#aboutMe");
  if (getWindowPosition() > aboutMe.offset()!.top) {
    aboutMe.addClass("about-me--animated");
  }
});

// Skills
$(window).on("scroll", () => {
  const skills = $("#skills");
  if (getWindowPosition() > skills.offset()!.top) {
    skills.addClass("skills--animated");
  }
});

// Contato
$(window).on("scroll", () => {
  const contact = $("#contact");
  if (getWindowPosition() > contact.offset()!.top) {
    contact.addClass("contact--animated");
  }
});

// Habilita o botão de envio apenas se o formulário for válido.
$("#inputName, #inputEmail, #inputMessage").on("input", () => {
  const inputName = ($("#inputName").val() ?? "").toString();
  const nameRegex = new RegExp(/^[a-zA-Z]+$/);
  const isValidName = nameRegex.test(inputName) && inputName.length >= 2;

  const emailRegex = new RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
  );
  const isValidEmail = emailRegex.test(
    ($("#inputEmail").val() ?? "").toString(),
  );

  const isValidMessage =
    ($("#inputMessage").val() ?? "").toString().length >= 10;

  if (isValidEmail && isValidMessage && isValidName) {
    $("#contactBtn").attr("disabled", "false");
  } else {
    $("#contactBtn").attr("disabled", "true");
  }
});

// Mostra mensagens de validação no formulário.
$("#inputMessage").on("change", () => {
  $("#contactForm").addClass("was-validated");
});
