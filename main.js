// ==================== Dark Mode Toggle ====================
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );

  // Update icon
  const themeBtn = document.querySelector(".theme-toggle");
  if (document.body.classList.contains("dark-mode")) {
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Load dark mode preference
document.addEventListener("DOMContentLoaded", () => {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    document.querySelector(".theme-toggle").innerHTML =
      '<i class="fas fa-sun"></i>';
  }
});

// ==================== Smooth Scroll Navigation ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ==================== Navbar Animation on Scroll ====================
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    gsap.to(navbar, { y: -100, duration: 0.3, overwrite: "auto" });
  } else {
    // Scrolling up
    gsap.to(navbar, { y: 0, duration: 0.3, overwrite: "auto" });
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

  // Add shadow on scroll
  if (scrollTop > 0) {
    navbar.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

// ==================== Floating Hearts Animation ====================
function createFloatingHearts() {
  const container = document.querySelector(".floating-hearts");
  if (!container) return;

  for (let i = 0; i < 10; i++) {
    const heart = document.createElement("div");
    heart.textContent = "💕";
    heart.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: ${Math.random() * 1.5 + 1}rem;
            opacity: ${Math.random() * 0.5 + 0.3};
            pointer-events: none;
            animation: float-heart ${
              Math.random() * 3 + 4
            }s infinite ease-in-out;
            animation-delay: ${Math.random() * 2}s;
        `;

    container.appendChild(heart);
  }
}

// ==================== Page Load Animations ====================
document.addEventListener("DOMContentLoaded", () => {
  // Welcome message animation
  const heading = document.getElementById("greeting");
  if (heading) {
    gsap.from(heading, {
      opacity: 0,
      scale: 0,
      rotate: -180,
      duration: 1,
      ease: "elastic.out",
    });
  }

  // Floating hearts
  createFloatingHearts();

  // Animate section titles
  const sectionTitles = document.querySelectorAll(".section-title");
  sectionTitles.forEach((title, index) => {
    gsap.from(title, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
    });
  });

  // Stagger message cards entrance
  const messageCards = document.querySelectorAll(".message-card");
  gsap.from(messageCards, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
  });

  // Timeline items stagger
  const timelineItems = document.querySelectorAll(".timeline-item");
  gsap.from(timelineItems, {
    opacity: 0,
    x: (index) => (index % 2 === 0 ? -50 : 50),
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
  });
});

// ==================== Intersection Observer for Lazy Animations ====================
const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".gallery-item, .timeline-card, .message-card")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "all 0.6s ease";
      animationObserver.observe(el);
    });
});

// ==================== Keyboard Navigation ====================
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close any open modals
    const modal = document.getElementById("timelineModal");
    if (modal && modal.classList.contains("show")) {
      modal.classList.remove("show");
    }
  }
});

// ==================== Performance Optimization ====================
// Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==================== Page Visibility API ====================
document.addEventListener("visibilitychange", () => {
  const audio = document.getElementById("bgMusic");
  if (audio) {
    if (document.hidden) {
      audio.pause();
    }
  }
});

// ==================== Print Functionality ====================
function printPage() {
  window.print();
}

// ==================== Personalization (Update with girlfriend's name) ====================
// Change 'Love' to her name
const greetingText = document.getElementById("greeting");
if (greetingText) {
  // You can update this with her actual name
  // greetingText.textContent = 'To My Love [Her Name]... 💕';
}

console.log("🎀 Love Story Loaded! All animations ready! 💕");
