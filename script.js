// Elemente sammeln
const thumbs = Array.from(document.querySelectorAll(".g-img"));
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const leftBtn = document.querySelector(".nav.left");
const rightBtn = document.querySelector(".nav.right");
const lbInner = document.querySelector(".lb-inner");

let current = 0;
let isOpen = false;

// Öffnen
function openLightbox(index){
  current = index;
  updateImage();
  lightbox.style.display = "flex";
  lightbox.setAttribute("aria-hidden","false");
  isOpen = true;
}

// Bild setzen
function updateImage(){
  const src = thumbs[current].getAttribute("src");
  lightboxImg.src = src;
}

// Navigation
function nextImg(){
  current = (current + 1) % thumbs.length;
  updateImage();
}
function prevImg(){
  current = (current - 1 + thumbs.length) % thumbs.length;
  updateImage();
}

// Thumbnails anklickbar machen
thumbs.forEach((img, idx) => {
  // Falls data-index fehlt, setzen wir es dynamisch
  if (!img.dataset.index) img.dataset.index = String(idx);
  img.addEventListener("click", () => openLightbox(idx));
});

// Schließen
function closeLightbox(){
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden","true");
  isOpen = false;
}
closeBtn.addEventListener("click", closeLightbox);

// Pfeile
rightBtn.addEventListener("click", (e)=>{ e.stopPropagation(); nextImg(); });
leftBtn .addEventListener("click", (e)=>{ e.stopPropagation(); prevImg(); });

// Klick auf den dunklen Hintergrund schließt (aber nicht auf das Bild/Buttons)
lightbox.addEventListener("click", (e) => {
  // Wenn außerhalb der inneren Box geklickt wurde -> schließen
  if (!lbInner.contains(e.target)) closeLightbox();
});

// Keyboard
document.addEventListener("keydown", (e) => {
  if(!isOpen) return;
  if(e.key === "ArrowRight") nextImg();
  else if(e.key === "ArrowLeft") prevImg();
  else if(e.key === "Escape") closeLightbox();
});

// Touch-Swipe
let startX = 0, startY = 0, isSwiping = false;

lightbox.addEventListener("touchstart", (e) => {
  if (!isOpen) return;
  const t = e.touches[0];
  startX = t.clientX;
  startY = t.clientY;
  isSwiping = true;
}, {passive:true});

lightbox.addEventListener("touchend", (e) => {
  if (!isOpen || !isSwiping) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - startX;
  const dy = t.clientY - startY;
  // horizontaler Wisch dominiert
  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) nextImg();
    else prevImg();
  }
  isSwiping = false;
});
``
