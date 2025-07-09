const historyField = document.querySelector("main");
const demoBtn = document.querySelectorAll(".demo-btn");
const noData = document.querySelector(".no-data");
const data = historyField.querySelectorAll(".card");

demoBtn.forEach((e) => {
  e.addEventListener("click", () => {
    noData.classList.toggle("d-none");
    data.forEach((e) => {
      e.classList.toggle("d-none");
    });
  });
});
