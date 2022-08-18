function openMode() {
    document.querySelector("#mode__selector").classList.toggle("active")
}


let body = document.querySelector("body")
let activeMode = document.querySelectorAll("#mode__selector p")

function toggleMode(mode) {

    for(let i=0; i<activeMode.length; i++) {
        activeMode[i].classList.remove("active")
    }
    if(mode === "light") {
        body.classList.remove("dark")
        activeMode[1].classList.add("active")
    }
    else if(mode === "dark") {
        body.classList.add("dark")
        activeMode[2].classList.add("active")
    }
    else if(mode === "default") {
        if(theme.matches || theme.media === "not all") {
            body.classList.add("dark")
        }
        else{
            body.classList.remove("dark")
        }
        activeMode[0].classList.add("active")
    }
}

let theme = window.matchMedia("(prefers-color-scheme: dark)")


function getDeviceMode() {
    if(activeMode[0].classList.contains("active")) {
        window.addEventListener("load", () => {
            if(theme.matches || theme.media === "not all") {
                darkTheme()
            }
            else {
                lightTheme()
            }
        })
        theme.addEventListener("change", () => {
            if(theme.matches || theme.media === "not all") {
                darkTheme()
            }
            else {
                lightTheme()
            }
        })
    }

}
getDeviceMode();

const lightTheme = () => {
    body.classList.remove("dark")
    body.classList.remove("light")
}
const darkTheme = () => {
    body.classList.add("dark")
}