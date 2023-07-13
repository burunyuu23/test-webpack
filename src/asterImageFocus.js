
let counter_1 = 0;
function handleClick(event, id) {
    counter_1 += 1;
    document.getElementById(id).innerText = counter_1;
}

function onStart() {
    let img = document.getElementById("aster__img")
    img.addEventListener("touchstart", (event) => handleMouseEnter(event, "aster__img"), false);
    img.addEventListener("touchend", (event) => handleMouseLeave(event, "aster__img"), false);
    img.addEventListener("touchcancel", (event) => handleMouseLeave(event, "aster__img"), false);
    img.addEventListener("touchmove", (event) => handleMouseMove(event, "aster__img"), false);
}

let mousePoint;
let imgCenter;
let max;

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function handleMouseMove(event, id) {
    const img = document.getElementById(id)
    imgCenter = {
        x: img.getBoundingClientRect().x + img.getBoundingClientRect().width/2, 
        y: img.getBoundingClientRect().y + img.getBoundingClientRect().height/2
    }

    if (event.type === "touchmove") {
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    mousePoint = {
        x: event.type === "touchmove"? event.touches[0].clientX : event.clientX,
        y:  event.type === "touchmove"? event.touches[0].clientY : event.clientY,
    }
    
    max = Math.max(Math.abs((imgCenter.x-mousePoint.x)/2), Math.abs((imgCenter.y-mousePoint.y)/2));

    img.style.boxShadow  = `${(imgCenter.x-mousePoint.x)/5}px ${(imgCenter.y-mousePoint.y)/5}px ${max}px ${color}`
}

let color = getRandomColor();
let lastCall = Date.now()
let previousCall = lastCall
let lastCallTimer = null
let colorChanger = null
const timerMs = 500

function handleMouseLeave(event, id) {
    const img = document.getElementById(id)

    clearInterval(colorChanger);

    if (previousCall && lastCall - previousCall <= timerMs) {
        clearTimeout(lastCallTimer)
    }

    let imgCenter = {
        x: img.getBoundingClientRect().x + img.getBoundingClientRect().width/2, 
        y: img.getBoundingClientRect().y + img.getBoundingClientRect().height/2
    }
    let mousePoint = {
        x: event.type === "touchend"? event.changedTouches[0].clientX : event.clientX,
        y:  event.type === "touchend"? event.changedTouches[0].clientY : event.clientY
    }

    img.style.transition  = `box-shadow 0.5s ease, scale 0.5s ease`
    img.style.scale = `100%`
    img.style.boxShadow  = `${(imgCenter.x-mousePoint.x)/10}px ${(imgCenter.y-mousePoint.y)/10}px 20px transparent`
    lastCallTimer = setTimeout(() => {
        img.style.transition  = `all 0s ease`
    }
    , timerMs);
}

function handleMouseEnter(event, id) {
    const img = document.getElementById(id)

    colorChanger = setInterval(() => {
        color = getRandomColor()
        img.style.boxShadow = `${(imgCenter.x-mousePoint.x)/10}px ${(imgCenter.y-mousePoint.y)/10}px ${max}px ${color}`
    }, 500)

    if (previousCall && lastCall - previousCall <= timerMs) {
        clearTimeout(lastCallTimer)
    }
    console.log(event);

    img.style.transition  = ` scale 0.5s ease`
    img.style.scale = `150%`

    lastCallTimer = setTimeout(() =>
        img.style.transition  = `all 0s ease`
    , timerMs);
}

