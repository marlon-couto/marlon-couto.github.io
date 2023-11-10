import $ from "jquery";
import Typed from "typed.js";
import "../styles/index.scss";

$(window).on("scroll", function () {
  if (window.scrollY > 50) {
    $(".navbar").addClass("navbar-sticky");
  } else {
    $(".navbar").removeClass("navbar-sticky");
  }
});

function getTheme() {
  const theme = localStorage.getItem("theme");
  if (theme) {
    return theme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function showToggleThemeIcons() {
  if (getTheme() === "dark") {
    $("i.fa-sun").show();
    $("i.fa-sun").addClass("animated-icon");
    $("i.fa-moon").hide();
  } else {
    $("i.fa-sun").hide();
    $("i.fa-moon").show();
    $("i.fa-moon").addClass("animated-icon");
  }
}

$(function () {
  if (getTheme() === "dark") {
    $("#themeToggle").prop("checked", true);
    localStorage.setItem("theme", "dark");
    showToggleThemeIcons();
  } else {
    $("#themeToggle").prop("checked", false);
    localStorage.setItem("theme", "light");
    showToggleThemeIcons();
  }
});

$("#themeToggle").on("click", function () {
  if (getTheme() === "dark") {
    localStorage.setItem("theme", "light");
    showToggleThemeIcons();
  } else {
    localStorage.setItem("theme", "dark");
    showToggleThemeIcons();
  }

  $("html").attr("data-bs-theme", getTheme());
});

$("#navbarNavOverlay").on("click", function () {
  $("#navbarLinks").toggleClass("navbar__overlay");
});

$(function () {
  $("#navbarNavOverlay > input").prop("checked", false);
});

$("#navbarLinks > .nav-item").on("click", function () {
  $("#navbarNavOverlay > input").prop("checked", false);
  $("#navbarLinks").removeClass("navbar__overlay");
});

$(function () {
  const typed = new Typed("#typedText", {
    strings: [
      "Angular",
      "ASP.NET",
      "Bootstrap",
      "C#",
      "JavaScript",
      "jQuery",
      "Node.js",
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

function getWindowPosition() {
  const windowHeight = $(window).height();
  const scrollPosition = $(window).scrollTop();
  return windowHeight + scrollPosition;
}

$(window).on("scroll", function () {
  const aboutMePosition = $("#aboutMe").offset().top;
  if (getWindowPosition() > aboutMePosition) {
    $("#aboutMe").addClass("about-me--animated");
  }
});

$(window).on("scroll", function () {
  const skillsPosition = $("#skills").offset().top;
  if (getWindowPosition() > skillsPosition) {
    $("#skills").addClass("skills--animated");
  }
});
