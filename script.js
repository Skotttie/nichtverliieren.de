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

//Header (whiteBanner) animation
const whiteBar = document.querySelector('.scrolling-white-bar');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Parallax: der Balken bewegt sich langsamer als der Content
    // z.B. nur 50% des Scrollwerts
    whiteBar.style.transform = `translateY(${-scrollY * 0.2}px)`;
});

// Header (Logo) animation
const logo = document.querySelector('.logo img');
const maxScroll = 300; // Scrollhöhe für Logo-Movement
const fadeStart = 400; // ab hier langsam ausfaden
const fadeEnd = 600;   // bis hier ganz unsichtbar

// Startwert einmalig beim Laden setzen
let startLeft = logo.getBoundingClientRect().left; 
const endLeft = (window.innerWidth / 2) - (logo.offsetWidth / 2);

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Bewegung: von links zur Mitte
    const progress = Math.min(scrollY / maxScroll, 1);
    const currentLeft = startLeft + (endLeft - startLeft) * progress;
    logo.style.left = `${currentLeft}px`;

    // Fade-Out: bleibt erst sichtbar, dann ausfaden
    if (scrollY < fadeStart) {
        logo.style.opacity = "1";
    } else if (scrollY >= fadeStart && scrollY <= fadeEnd) {
        const fadeProgress = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
        logo.style.opacity = fadeProgress.toString();
    } else {
        logo.style.opacity = "0";
    }
});

// Slideshow
window.addEventListener("load", () => {
    document.querySelector('.slideshow-track').style.animationPlayState = 'running';
});

let index = 0;
const slides = document.querySelectorAll('.slide');
const slideshow = document.querySelector('.slideshow-container');

// Music header übergang
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;

    const slider = document.querySelector('.slideshow-container');
    //Spotify
    const spotify = document.querySelector('.spotify-wrapper');
    // Slider bewegt sich langsamer nach oben
    slider.style.transform = `translateY(${scrollY * 0.3}px)`;

    // Spotify bewegt sich schneller
    spotify.style.transform = `translateY(${scrollY * 0.1}px)`;

    //AppleMusic
    const apple = document.querySelector('.applemusic-wrapper');
    if (apple) {
        apple.style.transform = `translateY(${scrollY * 0.1}px)`; // gleiche Geschwindigkeit wie Spotify
    }
});

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

// AppleMusic Logo animation
document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".applemusic-logo");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          logo.classList.add("visible");
        }
      });
    },
    { threshold: 0.5 } // Bild bewegt sich, wenn 50% der Box sichtbar sind
  );

  const wrapper = document.querySelector(".applemusic-wrapper");
  observer.observe(wrapper);
});