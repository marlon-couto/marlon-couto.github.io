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
    strings: ["Bootstrap", "JavaScript", "Angular", "C#", "ASP.NET"],
    typeSpeed: 75,
    loop: "infinite",
    backDelay: 1000,
    backSpeed: 75,
    showCursor: true,
  });
  typed.start();
});
