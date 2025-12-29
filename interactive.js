// ==================== Interactive Hover Effects ====================
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// ==================== Butterfly Effect ====================
function createButterfly() {
  const butterflies = ["🦋", "🎀", "✨"];
  const butterfly = document.createElement("div");
  butterfly.textContent =
    butterflies[Math.floor(Math.random() * butterflies.length)];
  butterfly.className = "butterfly";
  butterfly.style.left = mouseX + "px";
  butterfly.style.top = mouseY + "px";

  document.body.appendChild(butterfly);

  // Create a fluttering animation path
  const angle = Math.random() * Math.PI * 2;
  const vx = Math.cos(angle) * (Math.random() * 2 + 1);
  const vy = Math.sin(angle) * (Math.random() * 2 + 1);

  let x = mouseX;
  let y = mouseY;
  let lifetime = 0;
  const maxLife = 200;

  const animate = () => {
    x += vx;
    y += vy;
    lifetime++;

    butterfly.style.left = x + "px";
    butterfly.style.top = y + "px";
    butterfly.style.opacity = (maxLife - lifetime) / maxLife;

    if (lifetime < maxLife) {
      requestAnimationFrame(animate);
    } else {
      butterfly.remove();
    }
  };

  animate();
}

// Create butterflies on mouse move (with throttling)
let lastButterflyTime = 0;
document.addEventListener("mousemove", () => {
  const now = Date.now();
  if (now - lastButterflyTime > 100) {
    if (Math.random() > 0.5) {
      createButterfly();
    }
    lastButterflyTime = now;
  }
});

// ==================== Fireworks Effect ====================
function createFireworks(x, y) {
  const fireworks = ["💥", "✨", "💫", "⭐", "💕", "🎇"];
  const particleCount = 12;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.textContent =
      fireworks[Math.floor(Math.random() * fireworks.length)];
    particle.className = "firework";
    particle.style.left = x + "px";
    particle.style.top = y + "px";

    const angle = (i / particleCount) * Math.PI * 2;
    const velocity = 5 + Math.random() * 5;
    const tx = Math.cos(angle) * velocity * 30;
    const ty = Math.sin(angle) * velocity * 30;

    particle.style.setProperty("--tx", tx + "px");
    particle.style.setProperty("--ty", ty + "px");

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
  }

  // Show love message
  const message = document.createElement("div");
  message.textContent = "💕 I Love You 💕";
  message.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y - 30}px;
        font-size: 1.5rem;
        font-weight: bold;
        color: #ff1744;
        pointer-events: none;
        z-index: 1000;
        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    `;

  document.body.appendChild(message);

  gsap.to(message, {
    y: y - 150,
    opacity: 0,
    duration: 2,
    ease: "power2.out",
    onComplete: () => message.remove(),
  });
}

// Create fireworks on click
document.addEventListener("click", (e) => {
  // Don't trigger on buttons or inputs
  if (e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") {
    return;
  }
  createFireworks(e.clientX, e.clientY);
});

// ==================== Heart Cursor Trail ====================
class HeartCursor {
  constructor() {
    this.lastX = 0;
    this.lastY = 0;
    this.init();
  }

  init() {
    document.addEventListener("mousemove", (e) => {
      this.lastX = e.clientX;
      this.lastY = e.clientY;

      if (Math.random() > 0.8) {
        this.createHeart();
      }
    });
  }

  createHeart() {
    const heart = document.createElement("span");
    heart.textContent = "❤️";
    heart.style.cssText = `
            position: fixed;
            left: ${this.lastX}px;
            top: ${this.lastY}px;
            pointer-events: none;
            font-size: 1.2rem;
            z-index: 50;
            opacity: 0.8;
        `;

    document.body.appendChild(heart);

    gsap.to(heart, {
      y: this.lastY - 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => heart.remove(),
    });
  }
}

// Initialize heart cursor on load
document.addEventListener("load", () => {
  new HeartCursor();
});

// ==================== Page Click Animation ====================
document.addEventListener("click", function (e) {
  // Create ripple effect
  const ripple = document.createElement("span");
  ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255,23,68,0.8), rgba(255,23,68,0));
        border-radius: 50%;
        pointer-events: none;
        z-index: 100;
        transform: translate(-50%, -50%);
    `;

  document.body.appendChild(ripple);

  gsap.to(ripple, {
    width: 100,
    height: 100,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    onComplete: () => ripple.remove(),
  });
});

// ==================== Scroll Animations ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      gsap.from(entry.target, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
});
