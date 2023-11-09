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

$("#navbarNavOverlay").on("click", function () {
  $("#navbarLinks").toggleClass("overlay");
});

$(function () {
  const typed = new Typed("#typed", {
    strings: [
      "Angular",
      "ASP.NET",
      "Bootstrap",
      "C#",
      "JavaScript",
      "Node.js",
      "Sass",
      "TypeScript",
    ],
    typeSpeed: 100,
    loopCount: 5,
    loop: true,
    backDelay: 1000,
    backSpeed: 75,
  });
  typed.start();
});

$(function () {
  $("#navbarNavOverlay > input").prop("checked", false);
});
