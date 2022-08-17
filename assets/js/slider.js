let qpSlider = document.querySelectorAll(".qp-slider")
let innerSlider = document.querySelectorAll(".inner-slider")
let pressed = false;
let startX;
let x;

console.log(qpSlider, innerSlider)

for(let i=0; i<qpSlider.length; i++) {
    qpSlider[i].addEventListener("mousedown", (e) => {
        pressed = true;
        startX = e.offsetX - innerSlider[i].offsetLeft;
        qpSlider[i].getElementsByClassName.cursor = "grabbing"
    })
    qpSlider[i].addEventListener("mouseenter", (e) => {
        qpSlider[i].getElementsByClassName.cursor = "grabbing"
    })
    window.addEventListener("mouseup", (e) => {
        qpSlider[i].getElementsByClassName.cursor = "grab";
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