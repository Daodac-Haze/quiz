const colorChanger = document.querySelector(".dark-mode-btn");
let darkmode = false;

colorChanger.addEventListener("click", (event) => {
  toggleMode();
});

function toggleMode() {
  document.querySelectorAll(".dark-mode-selector").forEach(function (item) {
    item.classList.toggle("dark-colors");
  });
  if (darkmode === true) {
    document.getElementById("imageSelector").src = "/images/moon.png";
  } else {
    document.getElementById("imageSelector").src = "/images/sun.png";
  }
  darkmode = !darkmode;
}
