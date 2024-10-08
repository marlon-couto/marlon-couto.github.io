import { getToken } from "./api-services";
import {
  sendFormData,
  showFormValidationMessages,
  validateForm,
} from "./forms-utils";
import {
  animateSections,
  closeHamburgerMenu,
  closeOverlay,
  highlightNavbar,
  setInitialTheme,
  toggleOverlayLinks,
  toggleTheme,
  transitionNavbar,
} from "./theme-utils";
import { showTypedText } from "./typed-text";

// Inicia ao carregar a página.
document.addEventListener("DOMContentLoaded", showTypedText);
document.addEventListener("DOMContentLoaded", getToken);
document.addEventListener("DOMContentLoaded", highlightNavbar);
document.addEventListener("DOMContentLoaded", setInitialTheme);
document.addEventListener("DOMContentLoaded", closeHamburgerMenu);

// Switch de tema.
const themeToggle = document.querySelector("#theme-toggle");
themeToggle.addEventListener("click", toggleTheme);

// Barra de navegação.
window.addEventListener("scroll", transitionNavbar);
const navbarOverlay = document.querySelector("#navbar-overlay");
navbarOverlay.addEventListener("click", toggleOverlayLinks);
const navItems = document.querySelectorAll("#navbar-links > .nav-item");
navItems.forEach((item) => {
  item.addEventListener("click", closeOverlay);
});

// Animação de seções.
window.addEventListener("scroll", animateSections);

// Validação do formulário de contato.
const formInputs = document.querySelectorAll(
  "#input-name, #input-email, #input-message",
);
formInputs.forEach((input) => {
  input.addEventListener("input", validateForm);
});

// Envia um e-mail ao clicar no botão de envio.
const contactBtn = document.querySelector("#contact-btn");
contactBtn.addEventListener("click", (e) => sendFormData(e.target));

// Mostra mensagens de validação no formulário.
const inputMessage = document.querySelector("#input-message");
inputMessage.addEventListener("change", showFormValidationMessages);
