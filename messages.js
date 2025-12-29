// ==================== Typing Animation ====================
class TypingAnimator {
  constructor(element, text, speed = 50) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.index = 0;
  }

  animate() {
    if (this.index < this.text.length) {
      this.element.textContent += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.animate(), this.speed);
    }
  }

  start() {
    this.element.textContent = "";
    this.animate();
  }
}

// ==================== Flying Text Animation ====================
class FlyingTextAnimator {
  constructor(element, text) {
    this.element = element;
    this.text = text;
  }

  animate() {
    const words = this.text.split(" ");
    this.element.textContent = "";

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(20px)";
      this.element.appendChild(span);

      gsap.to(span, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: "power2.out",
      });
    });
  }
}

// ==================== Initialize Message Animations ====================
document.addEventListener("DOMContentLoaded", () => {
  const messageCards = document.querySelectorAll(".message-card");

  messageCards.forEach((card, index) => {
    const typingTexts = card.querySelectorAll(".typing-text");
    const flyingTexts = card.querySelectorAll(".flying-text");

    typingTexts.forEach((el) => {
      const text = el.getAttribute("data-text");
      if (text) {
        const animator = new TypingAnimator(el, text);

        // Trigger animation when card comes into view
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            animator.start();
            observer.unobserve(el);
          }
        });
        observer.observe(el);
      }
    });

    flyingTexts.forEach((el) => {
      const text = el.getAttribute("data-text");
      if (text) {
        const animator = new FlyingTextAnimator(el, text);

        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            animator.animate();
            observer.unobserve(el);
          }
        });
        observer.observe(el);
      }
    });
  });
});

// ==================== Music Player ====================
let isPlaying = false;

function toggleMusic() {
  const audio = document.getElementById("bgMusic");
  const playBtn = document.getElementById("playBtn");
  const equalizer = document.getElementById("equalizer");

  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    playBtn.classList.remove("playing");
    isPlaying = false;
  } else {
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    playBtn.classList.add("playing");
    isPlaying = true;
  }
}

// Update progress bar
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bgMusic");
  const progress = document.getElementById("progress");
  const progressBar = document.querySelector(".progress-bar");

  if (audio) {
    audio.addEventListener("timeupdate", () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      if (progress) {
        progress.style.width = percent + "%";
      }
    });

    if (progressBar) {
      progressBar.addEventListener("click", (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
      });
    }
  }
});
