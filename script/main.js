// spinner loading
fetch("./partials/spinner.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("spinner").innerHTML = data;
    hideSpinner();
  });

function hideSpinner() {
  setTimeout(() => {
    let spinner = document.getElementById("spinner");
    if (spinner) {
      spinner.classList.add("hide");
    }
  }, 100);
}

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
fetch("./partials/nav.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelector("nav").innerHTML = data;
  });

// load head
fetch("./partials/head.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelector("head").innerHTML += data;
  });
