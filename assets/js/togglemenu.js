const toggleButton = document.getElementById("toggleMenu")
const menu = document.getElementById("sidebar")

toggleButton.addEventListener("click", () => {
    menu.classList.toggle("hide")
})