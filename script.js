const thumbs = Array.from(document.querySelectorAll(".g-img"));
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const leftBtn = document.querySelector(".nav.left");
const rightBtn = document.querySelector(".nav.right");

let current = 0;
let open = false;

function show(idx) {
  current = idx;
  lightboxImg.src = thumbs[current].src;
  lightbox.style.display = "flex";
  open = true;
}

thumbs.forEach((img, i) => {
  img.dataset.index = i;
  img.addEventListener("click", () => show(i));
});

closeBtn.onclick = () => {
  lightbox.style.display = "none";
  open = false;
};

rightBtn.onclick = (e) => {
  e.stopPropagation();
  current = (current + 1) % thumbs.length;
  show(current);
};

leftBtn.onclick = (e) => {
  e.stopPropagation();
  current = (current - 1 + thumbs.length) % thumbs.length;
  show(current);
};

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

document.addEventListener("keydown", (e) => {
  if (!open) return;

  if (e.key === "ArrowRight") rightBtn.onclick(e);
  if (e.key === "ArrowLeft") leftBtn.onclick(e);
  if (e.key === "Escape") closeBtn.onclick();
});

/* Swipe für Handy */
let startX = 0;
lightbox.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
},{passive:true});

lightbox.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) rightBtn.onclick(e);
  if (endX - startX > 50) leftBtn.onclick(e);
});
