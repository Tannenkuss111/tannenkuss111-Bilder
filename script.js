const thumbs = Array.from(document.querySelectorAll(".g-img"));
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const leftBtn = document.querySelector(".nav.left");
const rightBtn = document.querySelector(".nav.right");
const lbInner = document.querySelector(".lb-inner");

let current = 0;
let isOpen = false;

function openLightbox(index){
  current = index;
  updateImage();
  lightbox.style.display = "flex";
  lightbox.setAttribute("aria-hidden","false");
  isOpen = true;
}
function closeLightbox(){
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden","true");
  isOpen = false;
}
function updateImage(){
  lightboxImg.src = thumbs[current].src;
}
function nextImg(){
  current = (current + 1) % thumbs.length;
  updateImage();
}
function prevImg(){
  current = (current - 1 + thumbs.length) % thumbs.length;
  updateImage();
}

thumbs.forEach((img, idx) => {
  img.addEventListener("click", () => openLightbox(idx));
});

closeBtn.addEventListener("click", closeLightbox);
rightBtn.addEventListener("click", (e)=>{ e.stopPropagation(); nextImg(); });
leftBtn .addEventListener("click", (e)=>{ e.stopPropagation(); prevImg(); });

// Außenklick schließt — aber Klicks innerhalb der Box nicht
lightbox.addEventListener("click", (e) => {
  if (!lbInner.contains(e.target)) closeLightbox();
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
``
