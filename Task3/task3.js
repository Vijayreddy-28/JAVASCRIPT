const thumbnails = document.querySelectorAll(".thumb");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;

// open lightbox
thumbnails.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    lightbox.classList.add("show");
  });
});

// show image
function showImage() {
  lightboxImg.src = thumbnails[currentIndex].src;
}

// next image
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % thumbnails.length;
  showImage();
});

// previous image
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
  showImage();
});

// close lightbox
closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("show");
});
