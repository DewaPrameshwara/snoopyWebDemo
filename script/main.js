// spinner loading
(function () {
  "use strict";

  var hideSpinner = function () {
    setTimeout(function () {
      var spinner = document.getElementById("spinner");
      if (spinner) {
        spinner.classList.add("hide");
      }
    }, 50);
  };

  window.onload = function () {
    hideSpinner();
  };
})();

// close offcanvas when link clicked
const myOffCanvas = document.querySelector(".offcanvas");
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((e) => {
  e.addEventListener("click", function () {
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(myOffCanvas);
    if (offcanvasInstance) {
      offcanvasInstance.hide();
    }
  });
});

// load navbar
fetch("nav.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelector("nav").innerHTML = data;
  });
