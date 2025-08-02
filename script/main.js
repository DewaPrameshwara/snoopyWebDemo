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
    const myOffCanvas = new bootstrap.Offcanvas(document.getElementById("offcanvasNavbar"));
    body.insertAdjacentHTML("beforeend", loginData); // tempel login form

    const userBtn = document.querySelectorAll("a.user");
    const loginPlaceholder = document.getElementById("account-offcanvas");
    const loginBtn = document.getElementById("login-btn");
    const closeBtn = document.getElementById("btn-close");
    const warningUN = document.getElementById("warning-username");

    restoreUsername();

    userBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        loginPlaceholder.classList.toggle("d-none");
        myOffCanvas.hide();
        warningUN.innerText = "";
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
  const usernameDisplay = document.querySelectorAll(".username-display");
  const loginBtn = document.getElementById("login-btn");
  const headerH2 = document.querySelector(".header h2");

  if (storedUsername && loginBtn) {
    usernameDisplay.forEach((el) => {
      el.innerHTML = `<i class="fa-solid fa-circle-user fa-2xl me-2"></i>${storedUsername}`;
    });
    loginBtn.innerHTML = "Log Out";
    headerH2.innerHTML = "Log Out";
    loginBtn.setAttribute("data-logged", "true");
    loginBtn.setAttribute("type", "button");
  }
}

function loginForm(loginPlaceholder, loginBtn) {
  loginBtn.addEventListener("click", () => {
    const emailInput = document.getElementById("login-email");
    const usernameInput = document.getElementById("login-username");
    const passwordInput = document.getElementById("login-password");

    const email = emailInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const warningUN = document.getElementById("warning-username");
    const usernameDisplay = document.querySelectorAll(".username-display");
    const headerH2 = document.querySelector(".header h2");

    const isLogged = loginBtn.dataset.logged === "true";

    // Jika belum login
    if (!isLogged) {
      if (!email || !username || !password) {
        warningUN.innerText = "Semua data wajib diisi.";
        return; // Tidak ubah isi input
      }

      // Simpan username ke localStorage dan tampilkan
      localStorage.setItem("username", username);

      usernameDisplay.forEach((el) => {
        el.innerHTML = `<i class="fa-solid fa-circle-user fa-2xl me-2"></i>${username}`;
      });

      loginBtn.innerHTML = "Log Out";
      headerH2.innerHTML = "Log Out";
      loginBtn.setAttribute("data-logged", "true");
      loginBtn.setAttribute("type", "button");

      // Reset semua input setelah login berhasil
      emailInput.value = "";
      usernameInput.value = "";
      passwordInput.value = "";

      loginPlaceholder.classList.add("d-none");
      warningUN.innerText = "";
      alertBerhasilLoginLogout("login", username);
    } else {
      // Jika username tidak sesuai
      if (username !== localStorage.getItem("username")) {
        warningUN.innerText = "Username anda tidak sesuai.";
        return;
      }

      localStorage.removeItem("username");

      usernameDisplay.forEach((el) => {
        el.innerHTML = `<i class="fa-solid fa-circle-user fa-2xl me-2"></i>ACCOUNT`;
      });

      loginBtn.innerHTML = "Log In";
      headerH2.innerHTML = "Log In";
      loginBtn.setAttribute("data-logged", "false");
      loginBtn.setAttribute("type", "reset");

      // Kosongkan input saat logout
      emailInput.value = "";
      usernameInput.value = "";
      passwordInput.value = "";

      loginPlaceholder.classList.add("d-none");
      warningUN.innerText = "";
      alertBerhasilLoginLogout("logout", username);
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

function alertBerhasilLoginLogout(info, name) {
  const alertHTML = `
    <div class="alert alert-berhasil-login-logout alert-warning ing alert-dismissible fixed-top mt-3" role="alert">
      <div>
        <strong>Anda telah berhasil ${info} sebagai ${name}</strong>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", alertHTML);

  // Hilangkan otomatis setelah 4 detik
  setTimeout(() => {
    const alertEl = document.querySelector(".alert-berhasil-login-logout");
    if (alertEl) alertEl.remove();
  }, 2500);
}
