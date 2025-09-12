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

// Project banner parallax
document.addEventListener('DOMContentLoaded', () => {
  const img = document.querySelector('.projekte-header');
  if (!img) return;

  function start() {
    const maxShift = 100;
    let ticking = false;

    function update() {
      const rect = img.getBoundingClientRect();
      const imgTopDoc = rect.top + window.scrollY;
      const imgHeight = rect.height;
      const scrollY = window.scrollY;

      const start = imgTopDoc - window.innerHeight;
      const end = imgTopDoc + imgHeight;

      // progress nur zwischen 0..1 begrenzen
      let progress = (scrollY - start) / (end - start);
      progress = Math.min(Math.max(progress, 0), 1);

      const shift = progress * maxShift * 0.5;

      // nur transform ändern, wenn nötig
      img.style.transform = `translate3d(-50%, ${-shift}px, 0)`;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    });

    // initial setzen
    update();
    window.addEventListener('resize', update);
  }

  if (!img.complete) {
    img.addEventListener('load', start);
  } else {
    start();
  }
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

// Prüfen, ob der Nutzer schon Cookies gewählt hat
if (!localStorage.getItem('cookiesAccepted')) {
    document.getElementById('cookie-banner').classList.remove('hide');
}

const banner = document.getElementById('cookie-banner');
const acceptOptional = document.getElementById('accept-optional');
const acceptNecessary = document.getElementById('accept-necessary');

acceptOptional.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'all');
    banner.classList.add('hide');
    enableAnalytics();
});

acceptNecessary.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'necessary');
    banner.classList.add('hide');
    // keine Analytics laden
});

function enableAnalytics() {
    // GA Script nur laden, wenn Optional Cookies akzeptiert
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-BR1BDJZ8E9';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-BR1BDJZ8E9');
}

// Wenn der User schon Cookies akzeptiert hat
const accepted = localStorage.getItem('cookiesAccepted');
if (accepted === 'all') enableAnalytics();


/* Project Carousel (self-contained) */
(function () {
  const carousel = document.querySelector('.project-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.pc-track');
  const slides = Array.from(carousel.querySelectorAll('.pc-slide'));
  const prevBtn = carousel.querySelector('.pc-prev');
  const nextBtn = carousel.querySelector('.pc-next');
  const indicators = carousel.querySelector('.pc-indicators');

  const config = {
    autoplay: true,
    autoplaySpeed: 4000,
    transitionMs: 600,
    pauseOnHover: true
  };

  let index = 0;
  let isAnimating = false;
  let autoplayTimer = null;

  // ========== build indicators ==========
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `Go to slide ${i+1}`);
    btn.addEventListener('click', () => goTo(i));
    indicators.appendChild(btn);
  });

  const dots = Array.from(indicators.children);
  function updateDots() {
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  // ========== infinite loop via clones ==========
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length-1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, track.firstChild);

  // force track to start at the real first slide (index 0 => position 1)
  const totalSlides = slides.length;
  let trackIndex = 1;

  // set initial translate
  function setTransform(instant=false) {
    if (instant) {
      track.style.transition = 'none';
    } else {
      track.style.transition = `transform ${config.transitionMs}ms cubic-bezier(.22,.9,.37,1)`;
    }
    const x = -trackIndex * 100;
    track.style.transform = `translateX(${x}%)`;
    if (instant) requestAnimationFrame(()=> track.style.transition = `transform ${config.transitionMs}ms cubic-bezier(.22,.9,.37,1)`);
  }
  // initial
  setTransform(true);
  updateDots();

  // ========== navigation ==========
  function next() { if (isAnimating) return; isAnimating = true; trackIndex++; setTransform(); }
  function prev() { if (isAnimating) return; isAnimating = true; trackIndex--; setTransform(); }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  // handle dot goto
  function goTo(i) {
    if (isAnimating) return;
    isAnimating = true;
    index = i;
    trackIndex = i + 1;
    setTransform();
  }

  // when transition ends: handle clones
  track.addEventListener('transitionend', () => {
    isAnimating = false;
    if (trackIndex === 0) {
      // moved to last clone -> snap to real last
      trackIndex = totalSlides;
      setTransform(true);
      index = totalSlides - 1;
    } else if (trackIndex === totalSlides + 1) {
      // moved to first clone -> snap to real first
      trackIndex = 1;
      setTransform(true);
      index = 0;
    } else {
      index = trackIndex - 1;
    }
    updateDots();
  });

  // ========== autoplay ==========
  function startAutoplay() {
    if (!config.autoplay) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => { next(); }, config.autoplaySpeed);
  }
  function stopAutoplay() { if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; } }

  if (config.pauseOnHover) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
  }

  // start autoplay once images likely loaded
  window.addEventListener('load', () => {
    startAutoplay();
  });

  // ========== keyboard ==========
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // ========== touch / drag support ==========
  let pointerActive = false;
  let startX = 0;
  let currentTranslate = 0;

  carousel.addEventListener('pointerdown', (e) => {
    pointerActive = true;
    startX = e.clientX;
    track.style.transition = 'none';
    stopAutoplay();
    carousel.setPointerCapture(e.pointerId);
  });
  carousel.addEventListener('pointermove', (e) => {
    if (!pointerActive) return;
    const dx = e.clientX - startX;
    const percent = (dx / carousel.offsetWidth) * 100;
    track.style.transform = `translateX(${ -trackIndex * 100 + percent }%)`;
  });
  carousel.addEventListener('pointerup', (e) => {
    if (!pointerActive) return;
    pointerActive = false;
    const dx = e.clientX - startX;
    const threshold = carousel.offsetWidth * 0.15;
    if (dx > threshold) { prev(); } 
    else if (dx < -threshold) { next(); } 
    else { setTransform(); } // revert
    startAutoplay();
  });
  carousel.addEventListener('pointercancel', () => { pointerActive = false; setTransform(); startAutoplay(); });

  // make dots keyboard focusable
  dots.forEach(d => d.setAttribute('tabindex', '0'));

})();