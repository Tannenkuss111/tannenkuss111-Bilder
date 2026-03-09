const imgs = document.querySelectorAll(".g-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const leftBtn = document.querySelector(".nav.left");
const rightBtn = document.querySelector(".nav.right");

let current = 0;

function openLightbox(index) {
    current = index;
    lightboxImg.src = imgs[current].src;
    lightbox.style.display = "flex";
}

function nextImg() {
    current = (current + 1) % imgs.length;
    lightboxImg.src = imgs[current].src;
}

function prevImg() {
    current = (current - 1 + imgs.length) % imgs.length;
    lightboxImg.src = imgs[current].src;
}

/* Klick */
imgs.forEach(img => {
    img.addEventListener("click", () => {
        openLightbox(Number(img.dataset.index));
    });
});

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

rightBtn.addEventListener("click", nextImg);
leftBtn.addEventListener("click", prevImg);

/* Pfeiltasten */
document.addEventListener("keydown", e => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") nextImg();
        if (e.key === "ArrowLeft") prevImg();
        if (e.key === "Escape") lightbox.style.display = "none";
    }
});

/* Touch-Swipe */
let startX = 0;
lightbox.addEventListener("touchstart", e => startX = e.touches[0].clientX);
lightbox.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 40) nextImg();
    if (endX - startX > 40) prevImg();
});
