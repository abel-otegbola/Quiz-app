let qpSlider = document.querySelectorAll(".qp-slider")
let innerSlider = document.querySelectorAll(".inner-slider")
let pressed = false;
let startX;
let x;


for(let i=0; i<qpSlider.length; i++) {

    let left = qpSlider[i].querySelector("#left");
    let right = qpSlider[i].querySelector("#right");

    qpSlider[i].addEventListener("mousedown", (e) => {
        pressed = true;
        startX = e.offsetX - innerSlider[i].offsetLeft;
    })
    window.addEventListener("mouseup", (e) => {
        pressed = false;
    })
    qpSlider[i].addEventListener("mousemove", (e) => {
        if(!pressed) {
            return false
        }
        else {
            e.preventDefault();

            x = e.offsetX

            innerSlider[i].style.left = `${x - startX}px`
            checkBoundary();
        }
    })
    let index = 0;
    left.addEventListener("click", () => {
        innerSlider[i].style.left = `${index + 100}px`;
        index += 100;
        checkBoundary();
    })
    right.addEventListener("click", () => {
        innerSlider[i].style.left = `${index - 100}px`;
        index -= 100;
        checkBoundary();
    })


    // Slide event for mobile phones 
    qpSlider[i].addEventListener("touchstart", (e) => {
        pressed = true;
        startX = e.touches[0].screenX - innerSlider[i].offsetLeft;
    })
    qpSlider[i].addEventListener("touchmove", (e) => {
        if(!pressed) {
            return false
        }
        else {
            e.preventDefault();

            let x = e.touches[0].screenX

            innerSlider[i].style.left = `${x - startX}px`
            checkBoundary();
        }
    })
    window.addEventListener("touchend", (e) => {
        pressed = false;
    })

    // Keep slide between parent boundary
    const checkBoundary = () => {
        let outer = qpSlider[i].getBoundingClientRect();
        let inner = innerSlider[i].getBoundingClientRect();

        if(parseInt(innerSlider[i].style.left) > 0) {
            innerSlider[i].style.left = "0px";
        }

        if(inner.right < outer.right) {
            innerSlider[i].style.left = `-${inner.width - outer.width}px`;
            index =  outer.width - inner.width;
        }
    }

}