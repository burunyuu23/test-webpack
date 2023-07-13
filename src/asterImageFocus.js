
document.addEventListener("DOMContentLoaded", onStart);

let counter_1 = 0;
function handleClick(event, id) {
    counter_1 += 1;
    document.getElementById(id).innerText = counter_1;
}

let color;
function onStart() {
    let imgs = document.getElementsByClassName("aster__img")
    color = Array(imgs.length).fill(getRandomColor())
    for (let i = 0;i<imgs.length;i++) {
        imgs[i].addEventListener("touchstart", (event) => handleMouseEnter(event, "aster__img"), false);
        imgs[i].addEventListener("touchend", (event) => handleMouseLeave(event, "aster__img"), false);
        imgs[i].addEventListener("touchcancel", (event) => handleMouseLeave(event, "aster__img"), false);
        imgs[i].addEventListener("touchmove", (event) => handleMouseMove(event, "aster__img"), false);
        
        imgs[i].addEventListener("mousemove", (event) => handleMouseMove(event, "aster__img"), false);
        imgs[i].addEventListener("mouseenter", (event) => handleMouseEnter(event, "aster__img"), false);
        imgs[i].addEventListener("mouseleave", (event) => handleMouseLeave(event, "aster__img"), false);
        }
        imgs[1].style.filter = `blur(15px) drop-shadow(0 0 50px black)`
    }
    

let mousePoint;
let imgCenter;
let max;
let started = false;

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function handleMouseMove(event, id) {
    const img = document.getElementsByClassName(id)
    console.log(img);
    imgCenter = {
        x: img[0].x + img[0].width/2, 
        y: img[0].y + img[0].height/2
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

    for (let i = 0; i<img.length;i++) {
        img[i].style.boxShadow  = `${Math.pow(-1, i)*(imgCenter.x-mousePoint.x)/5}px ${Math.pow(-1, (i+1)%3)*(imgCenter.y-mousePoint.y)/5}px ${max}px ${color[i]}ff`
        if (started)
            img[i].style.transition = `box-shadow 0s ease`
        img[1].style.filter = `blur(25px) drop-shadow(0 0 50px black)`
    }
}

let lastCall = Date.now()
let previousCall = lastCall
let lastCallTimer = null
let colorChanger = null
const timerMs = 500

function handleMouseLeave(event, id) {
    const img = document.getElementsByClassName(id)

    clearInterval(colorChanger);

    if (previousCall && lastCall - previousCall <= timerMs) {
        clearTimeout(lastCallTimer)
    }

    imgCenter = {
        x: img[0].x + img[0].width/2, 
        y: img[0].y + img[0].height/2
    }
    let mousePoint = {
        x: event.type === "touchend"? event.changedTouches[0].clientX : event.clientX,
        y:  event.type === "touchend"? event.changedTouches[0].clientY : event.clientY
    }

    for (let i = 0; i<img.length;i++) {
        img[i].style.transition  = ` box-shadow 0.5s ease, scale 0.5s ease, filter 1s ease`
        img[i].style.scale = `100%`
        img[i].style.boxShadow  = `${Math.pow(-1, i)*(imgCenter.x-mousePoint.x)/5}px ${Math.pow(-1, (i+1)%3)*(imgCenter.y-mousePoint.y)/5}px 20px transparent`
    }
    img[1].style.filter = `blur(25px) drop-shadow(0 0 50px black)`
    lastCallTimer = setTimeout(() => {
        img[0].style.filter = `blur(0px)`
        img[0].style.transition  = `box-shadow 0s ease` 
        img[1].style.transition  = `box-shadow 0s ease`
    }
    , timerMs);
}

function handleMouseEnter(event, id) {
    const img = document.getElementsByClassName(id)
    console.log(img);

    imgCenter = {
        x: img[0].x + img[0].width/2, 
        y: img[0].y + img[0].height/2
    }
    mousePoint = {
        x: event.type === "touchstart"? event.touches[0].clientX : event.clientX,
        y:  event.type === "touchstart"? event.touches[0].clientY : event.clientY,
    }

    colorChanger = setInterval(() => {    
        for (let i = 0; i<img.length;i++) {
            img[1].style.filter = `blur(25px) drop-shadow(0 0 2px black)`
            if (started)
                img[i].style.transition  = `box-shadow 0.6s ease`
            color[i] = getRandomColor()
            img[i].style.boxShadow  = `${Math.pow(-1, i+1)*(imgCenter.x-mousePoint.x)/5}px ${Math.pow(-1, (i+1)%3)*(imgCenter.y-mousePoint.y)/5}px ${max}px ${color[i]}66`
        }
    }, 1000)

    if (previousCall && lastCall - previousCall <= timerMs) {
        clearTimeout(lastCallTimer)
    }
    
    started = false

    for (let i = 0; i<img.length;i++) {
        img[i].style.scale = `150%`
        img[i].style.transition = `scale 0.5s ease, filter 0.5s ease`
        img[i].style.boxShadow = `${Math.pow(-1, i+1)*(imgCenter.x-mousePoint.x)/10}px ${Math.pow(-1, i+1)*(imgCenter.y-mousePoint.y)/10}px 20px transparent`
    }
    img[1].style.scale = `175%`
    img[1].style.filter  = `blur(25px) drop-shadow(0 0 25px black)`

    lastCallTimer = setTimeout(() => {
        for (let i = 0; i<img.length;i++) {
            img[i].style.transition  = `scale 0s ease`
        }
        started = true
    }
    , timerMs);
}

