// spinner loading
fetch("./partials/spinner.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("spinner").innerHTML = data;
    hideSpinner();
  })
  .catch((err) => console.error("Gagal fetch spinner:", err));

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
  .then((navData) => {
    document.querySelector("nav").innerHTML = navData;

    return fetch("./partials/login.html");
  })
  .then((res) => res.text())
  .then((loginData) => {
    const body = document.querySelector("body");
    body.insertAdjacentHTML("beforeend", loginData); // tempel login form

    const userBtn = document.querySelectorAll("a.user");
    const loginPlaceholder = document.getElementById("account-offcanvas");
    const loginBtn = document.getElementById("login-btn");
    const closeBtn = document.getElementById("btn-close");

    // Tampilkan username kalau sudah tersimpan
    restoreUsername();

    userBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        loginPlaceholder.classList.toggle("d-none");
      });
    });

    closeBtn.addEventListener("click", () => {
      loginPlaceholder.classList.add("d-none");
    });

    loginForm(loginPlaceholder, loginBtn);
  })
  .catch((err) => console.error("Gagal memuat komponen:", err));

function restoreUsername() {
  const storedUsername = localStorage.getItem("username");
  const usernameDisplay = document.getElementById("username-display");
  const loginBtn = document.getElementById("login-btn");

  if (storedUsername && usernameDisplay && loginBtn) {
    usernameDisplay.innerHTML = `<i class="fa-solid fa-circle-user fa-2xl me-2"></i>${storedUsername}`;
    loginBtn.innerHTML = "Log Out";
    loginBtn.setAttribute("data-logged", "true");
    loginBtn.setAttribute("type", "button");
  }
}

function loginForm(loginPlaceholder, loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = document.getElementById("login-email").value.trim();
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const warningUN = document.getElementById("warning-username");
    const usernameDisplay = document.getElementById("username-display");

    const isLogged = loginBtn.dataset.logged === "true";

    if (!isLogged) {
      if (!email || !username || !password) {
        warningUN.innerText = "Semua data wajib diisi.";
        return;
      }

      warningUN.innerText = "";
      localStorage.setItem("username", username);
      usernameDisplay.innerHTML = `<i class="fa-solid fa-circle-user fa-2xl me-2"></i>${username}`;

      loginBtn.innerHTML = "Log Out";
      loginBtn.setAttribute("data-logged", "true");
      loginBtn.setAttribute("type", "button");

      loginPlaceholder.classList.add("d-none");
    } else {
      // Logout
      if (username != localStorage.getItem("username")) {
        warningUN.innerText = "Username anda tidak sesuai.";
        return;
      }
      localStorage.removeItem("username");
      usernameDisplay.innerHTML = `<i class="fa-solid fa-circle-user fa-2xl me-2"></i>ACCOUNT`;

      loginBtn.innerHTML = "Log In";
      loginBtn.setAttribute("data-logged", "false");
      loginBtn.setAttribute("type", "reset");

      loginPlaceholder.classList.add("d-none");
    }
  });
}

// load head
fetch("./partials/head.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelector("head").innerHTML += data;
  })
  .catch((err) => console.error("Gagal fetch head:", err));
