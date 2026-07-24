document.getElementById("year").textContent = new Date().getFullYear();

function setHeaderHeightVar() {
  var header = document.querySelector("header");
  if (header) {
    document.documentElement.style.setProperty("--header-height", header.offsetHeight + "px");
  }
}
setHeaderHeightVar();
window.addEventListener("resize", setHeaderHeightVar);
