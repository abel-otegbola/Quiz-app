let qpSlider = document.querySelectorAll(".qp-slider")
let innerSlider = document.querySelectorAll(".inner-slider")
let pressed = false;
let startX;
let x;


for(let i=0; i<qpSlider.length; i++) {
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

    const checkBoundary = () => {
        let outer = qpSlider[i].getBoundingClientRect();
        let inner = innerSlider[i].getBoundingClientRect();

        if(parseInt(innerSlider[i].style.left) > 0) {
            innerSlider[i].style.left = "0px";
        }

        if(inner.right < outer.right) {
            innerSlider[i].style.left = `-${inner.width - outer.width}px`;
        }
    }

}