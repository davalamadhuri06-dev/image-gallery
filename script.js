const filterButtons = document.querySelectorAll(".filter-btn");
const galleryCards = Array.from(document.querySelectorAll(".gallery-card"));
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeButton = document.querySelector(".lightbox-close");
const previousButton = document.querySelector(".lightbox-nav.prev");
const nextButton = document.querySelector(".lightbox-nav.next");

let visibleCards = [...galleryCards];
let currentIndex = 0;

function updateVisibleCards(category) {
  visibleCards = galleryCards.filter((card) => category === "all" || card.dataset.category === category);

  galleryCards.forEach((card) => {
    const shouldShow = category === "all" || card.dataset.category === category;
    card.classList.toggle("hide", !shouldShow);
  });
}

function openLightbox(index) {
  currentIndex = index;
  const card = visibleCards[currentIndex];
  const image = card.querySelector("img");

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = `${card.dataset.category.toUpperCase()} - ${image.alt}`;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

function showImage(direction) {
  currentIndex = (currentIndex + direction + visibleCards.length) % visibleCards.length;
  openLightbox(currentIndex);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    updateVisibleCards(button.dataset.filter);
  });
});

galleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const index = visibleCards.indexOf(card);
    openLightbox(index);
  });
});

closeButton.addEventListener("click", closeLightbox);
previousButton.addEventListener("click", () => showImage(-1));
nextButton.addEventListener("click", () => showImage(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    showImage(-1);
  }

  if (event.key === "ArrowRight") {
    showImage(1);
  }
});
