// Neuladen -> immer oben starten
document.addEventListener("DOMContentLoaded", () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = "manual"; // verhindert, dass Browser Position merkt
  }

  // Hash (#social etc.) aus der URL entfernen
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname + window.location.search);
  }

  // Direkt nach oben scrollen
  window.scrollTo(0, 0);
});

// Projekt Cards Fade-In
const cards = document.querySelectorAll(".projekt-card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);
cards.forEach((card) => observer.observe(card));

// Header (whiteBanner) animation
const whiteBar = document.querySelector(".scrolling-white-bar");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  whiteBar.style.transform = `translateY(${-scrollY * 0.2}px)`;
});

// Header (Logo) animation
const logo = document.querySelector(".logo img");
const maxScroll = 300;
const fadeStart = 400;
const fadeEnd = 600;
let startLeft = logo.getBoundingClientRect().left;
const endLeft = window.innerWidth / 2 - logo.offsetWidth / 2;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const progress = Math.min(scrollY / maxScroll, 1);
  const currentLeft = startLeft + (endLeft - startLeft) * progress;
  logo.style.left = `${currentLeft}px`;

  if (scrollY < fadeStart) {
    logo.style.opacity = "1";
  } else if (scrollY >= fadeStart && scrollY <= fadeEnd) {
    const fadeProgress = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
    logo.style.opacity = fadeProgress.toString();
  } else {
    logo.style.opacity = "0";
  }
});

// Slideshow start
window.addEventListener("load", () => {
  const track = document.querySelector(".slideshow-track");
  if (track) track.style.animationPlayState = "running";
});

// Music header Übergang
window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;
  const slider = document.querySelector(".slideshow-container");
  const spotify = document.querySelector(".spotify-wrapper");
  const apple = document.querySelector(".applemusic-wrapper");

  if (slider) slider.style.transform = `translateY(${scrollY * 0.3}px)`;
  if (spotify) spotify.style.transform = `translateY(${scrollY * 0.1}px)`;
  if (apple) apple.style.transform = `translateY(${scrollY * 0.1}px)`;
});

// Spotify Logo animation
document.addEventListener("DOMContentLoaded", () => {
  const bg = document.querySelector(".spotify-logo");
  const spotifyWrapper = document.querySelector(".spotify-wrapper");
  if (!bg || !spotifyWrapper) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          bg.classList.add("visible");
        }
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(spotifyWrapper);
});

// AppleMusic Logo animation
document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".applemusic-logo");
  const wrapper = document.querySelector(".applemusic-wrapper");
  if (!logo || !wrapper) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          logo.classList.add("visible");
        }
      });
    },
    { threshold: 0.5 }
  );
  observer.observe(wrapper);
});

// Project banner parallax
document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector(".projekte-header");
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

      let progress = (scrollY - start) / (end - start);
      progress = Math.min(Math.max(progress, 0), 1);

      const shift = progress * maxShift * 0.5;
      img.style.transform = `translate3d(-50%, ${-shift}px, 0)`;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    });

    update();
    window.addEventListener("resize", update);
  }

  if (!img.complete) {
    img.addEventListener("load", start);
  } else {
    start();
  }
});

// Connect banner parallax
document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector(".connect-overlay");
  if (!img) return;

  function start() {
    const maxShift = 120;
    let ticking = false;

    function update() {
      const rect = img.getBoundingClientRect();
      const imgTopDoc = rect.top + window.scrollY;
      const imgHeight = rect.height;
      const scrollY = window.scrollY;

      const start = imgTopDoc - window.innerHeight;
      const end = imgTopDoc + imgHeight;

      const progress = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
      const shift = progress * maxShift;

      img.style.transform = `translate3d(-50%, ${-shift}px, 0)`;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    });

    update();
    window.addEventListener("resize", update);
  }

  if (!img.complete) {
    img.addEventListener("load", start);
  } else {
    start();
  }
});

// Email verschickt animation
const form = document.getElementById("contact-form");
const successBox = document.getElementById("success-animation");

if (form && successBox) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      let response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        successBox.style.display = "block";
        successBox.style.opacity = "1";

        const anim = lottie.loadAnimation({
          container: successBox,
          renderer: "svg",
          loop: false,
          autoplay: true,
          path: "data/animations/sentv2.json",
        });

        anim.addEventListener("complete", () => {
          successBox.style.opacity = "0";
          setTimeout(() => {
            successBox.style.display = "none";
          }, 1000);
        });
      } else {
        alert("sending failed :( try again");
      }
    } catch (err) {
      alert("network error: " + err.message);
    }
  });
}

// Cookies Banner
if (!localStorage.getItem("cookiesAccepted")) {
  document.getElementById("cookie-banner").classList.remove("hide");
}
const banner = document.getElementById("cookie-banner");
const acceptOptional = document.getElementById("accept-optional");
const acceptNecessary = document.getElementById("accept-necessary");

acceptOptional.addEventListener("click", () => {
  localStorage.setItem("cookiesAccepted", "all");
  banner.classList.add("hide");
  enableAnalytics();
});
acceptNecessary.addEventListener("click", () => {
  localStorage.setItem("cookiesAccepted", "necessary");
  banner.classList.add("hide");
});

function enableAnalytics() {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-BR1BDJZ8E9";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", "G-BR1BDJZ8E9");
}

const accepted = localStorage.getItem("cookiesAccepted");
if (accepted === "all") enableAnalytics();

// Navigation smooth scroll + Hash verhindern
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", window.location.pathname); // verhindert Hash in URL
    }
  });
});