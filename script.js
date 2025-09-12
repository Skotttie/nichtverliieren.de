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

// Connect banner parallax (robust)
document.addEventListener('DOMContentLoaded', () => {
  const img = document.querySelector('.connect-overlay');
  if (!img) return;

  // warte, bis Bild geladen ist, damit offsetHeight stimmt
  function start() {
    const maxShift = 120; // px, maximale Verschiebung (anpassen)
    let ticking = false;

    function update() {
      const rect = img.getBoundingClientRect();
      const imgTopDoc = rect.top + window.scrollY; // position relativ document top
      const imgHeight = rect.height;
      const start = imgTopDoc - window.innerHeight; // wenn Bild gerade in View kommt
      const end = imgTopDoc + imgHeight;            // Ende Bereich
      const scrollY = window.scrollY;

      // progress 0..1 innerhalb des Bereichs
      const progress = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);

      // shift: je höher progress, desto mehr verschiebung (negativ = nach oben)
      const shift = progress * maxShift;

      img.style.transform = `translate3d(-50%, ${-shift}px, 0)`;
      // optional: fade out
      // img.style.opacity = String(1 - progress);
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false; });
        ticking = true;
      }
    });

    // initial setzen
    update();
    // wenn Fenstergröße sich ändert, nochmal anpassen
    window.addEventListener('resize', () => update());
  }

  if (!img.complete) {
    img.addEventListener('load', start);
  } else {
    start();
  }
});

// email verschickt animation
const form = document.getElementById("contact-form");
const successBox = document.getElementById("success-animation");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    let response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      form.reset();

      // Animation starten
      successBox.style.display = "block";
      successBox.style.opacity = "1";

      const anim = lottie.loadAnimation({
        container: successBox,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: "data/animations/sentv2.json"
      });

      // nach Ende rausfaden
      anim.addEventListener("complete", () => {
        successBox.style.opacity = "0";
        setTimeout(() => {
          successBox.style.display = "none";
        }, 1000); // wartet bis fade-out durch ist
      });

    } else {
      alert("sending failed :( try again");
    }
  } catch (err) {
    alert("network error: " + err.message);
  }
});