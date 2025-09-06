// script.js
const cards = document.querySelectorAll('.projekt-card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => observer.observe(card));

// Header animation
const logo = document.querySelector('.logo img');
const maxScroll = 300; // scrollhöhe für Logo-Movement

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Logo bewegt sich von links nach Mitte
    const startLeft = 0; // links
    const endLeft = window.innerWidth / 2 - logo.offsetWidth / 2;
    const currentLeft = startLeft + (endLeft - startLeft) * Math.min(scrollY / maxScroll, 1);
    logo.style.position = 'absolute';
    logo.style.left = `${currentLeft}px`;
});

// Slideshow
let index = 0;
const slides = document.querySelectorAll('.slide');
const slideshow = document.querySelector('.slideshow-container');

function nextSlide() {
    index = (index + 1) % slides.length; // Schleife
    slideshow.style.transform = `translateX(-${index * 100}%)`;
}
setInterval(nextSlide, 3000); // alle 3 Sekunden wechseln

// Spotify Logo animation
document.addEventListener("DOMContentLoaded", () => {
  const bg = document.querySelector(".spotify-logo");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          bg.classList.add("visible");
        }
      });
    },
    { threshold: 0.5 } // Bild bewegt sich, wenn 50% der Box sichtbar sind
  );

  const spotifyWrapper = document.querySelector(".spotify-wrapper");
  observer.observe(spotifyWrapper);
});