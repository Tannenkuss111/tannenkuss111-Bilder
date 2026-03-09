// Elemente
const thumbs = Array.from(document.querySelectorAll(".g-img"));
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const leftBtn  = document.querySelector(".nav.left");
const rightBtn = document.querySelector(".nav.right");

let current = 0;
let isOpen = false;

// Öffnen
function openLightbox(index){
  current = index;
  updateImage();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden","false");
  isOpen = true;
}

// Schließen
function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  isOpen = false;
}

// Bild aktualisieren (immer mittig durch CSS)
function updateImage(){
  lightboxImg.src = thumbs[current].src;
}

// Navigation
function nextImg(){ current = (current + 1) % thumbs.length; updateImage(); }
function prevImg(){ current = (current - 1 + thumbs.length) % thumbs.length; updateImage(); }

// Thumbnails anklickbar
thumbs.forEach((img, i) => {
  img.addEventListener("click", () => openLightbox(i));
});

// Buttons
closeBtn.addEventListener("click", closeLightbox);
rightBtn.addEventListener("click", (e)=>{ e.stopPropagation(); nextImg(); });
leftBtn .addEventListener("click", (e)=>{ e.stopPropagation(); prevImg(); });

// Klick außerhalb des Bildes schließt
lightbox.addEventListener("click", (e) => {
  const clickedInsideImageOrButton =
    e.target === lightboxImg ||
    e.target === rightBtn ||
    e.target === leftBtn ||
    e.target === closeBtn;
  if (!clickedInsideImageOrButton) closeLightbox();
});

// Tastatur
document.addEventListener("keydown", (e) => {
  if(!isOpen) return;
  if(e.key === "ArrowRight") nextImg();
  else if(e.key === "ArrowLeft") prevImg();
  else if(e.key === "Escape") closeLightbox();
});

// Touch-Swipe
let startX = 0, startY = 0;
lightbox.addEventListener("touchstart", (e) => {
  const t = e.touches[0];
  startX = t.clientX; startY = t.clientY;
}, {passive:true});

lightbox.addEventListener("touchend", (e) => {
  const t = e.changedTouches[0];
  const dx = t.clientX - startX;
  const dy = t.clientY - startY;
  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) nextImg(); else prevImg();
  }
});
