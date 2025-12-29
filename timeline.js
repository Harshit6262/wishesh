// ==================== Timeline Data ====================
const timelineData = [
  {
    id: 0,
    title: "First Meeting",
    date: "May 15, 2022",
    story:
      "I still remember that moment like it was yesterday. The way you looked at me, the way you smiled... it felt like the whole world stopped. You were breathtaking, and I knew right then and there that my life was about to change forever.",
    emoji: "👀",
    photos: ["https://via.placeholder.com/400x300?text=First+Meeting"],
  },
  {
    id: 1,
    title: "First Date",
    date: "June 1, 2022",
    story:
      "Our first date was magical. The coffee shop, your laughter, the way we talked for hours... Time seemed to disappear when I was with you. I knew I wanted to spend every moment with you from that day on.",
    emoji: "☕",
    photos: ["https://via.placeholder.com/400x300?text=First+Date"],
  },
  {
    id: 2,
    title: "Special Trip",
    date: "December 2022",
    story:
      "This trip changed everything for us. Watching the sunset together, holding your hand, feeling your warmth... Every moment was perfect. You made me believe in fairy tales again. Thank you for those unforgettable memories.",
    emoji: "🌅",
    photos: ["https://via.placeholder.com/400x300?text=Special+Trip"],
  },
  {
    id: 3,
    title: "Anniversary",
    date: "Today & Forever",
    story:
      "Every day with you feels like a celebration. You make my heart skip a beat, you make me laugh until my sides hurt, and most importantly, you make me want to be a better person. I love you more than words can express.",
    emoji: "💍",
    photos: ["https://via.placeholder.com/400x300?text=Forever"],
  },
];

// ==================== Timeline Functions ====================
function viewTimeline(index) {
  const data = timelineData[index];
  const modalBody = document.getElementById("modalBody");

  let photosHTML = data.photos
    .map(
      (photo) => `
        <img src="${photo}" alt="${data.title}" style="width: 100%; border-radius: 10px; margin-bottom: 1.5rem;">
    `
    )
    .join("");

  modalBody.innerHTML = `
        <div style="text-align: center;">
            <span style="font-size: 3rem;">${data.emoji}</span>
            <h2 style="color: #ff1744; margin: 1rem 0;">${data.title}</h2>
            <p style="color: #ff5783; font-size: 0.9rem; margin-bottom: 1.5rem;">${data.date}</p>
            ${photosHTML}
            <p style="font-size: 1.1rem; line-height: 1.8; color: #333; font-style: italic;">"${data.story}"</p>
        </div>
    `;

  document.getElementById("timelineModal").classList.add("show");

  // Add animation
  gsap.from(modalBody, { opacity: 0, y: 20, duration: 0.5 });
}

function closeTimelineModal() {
  const modal = document.getElementById("timelineModal");
  gsap.to(modal, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      modal.classList.remove("show");
      gsap.to(modal, { opacity: 1, duration: 0 });
    },
  });
}

// Close modal on outside click
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("timelineModal");
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeTimelineModal();
    }
  });

  // Add click event listeners to timeline images for full view
  const timelineImages = document.querySelectorAll(".timeline .item img");
  timelineImages.forEach((img) => {
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      openImageModal(img.src);
    });
  });
});

// Function to open image modal
function openImageModal(imageSrc) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  modal.classList.add("show");
  modalImg.src = imageSrc;
}

// Function to close image modal
function closeImageModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.remove("show");
}

// Animate timeline items on scroll
window.addEventListener("scroll", () => {
  const items = document.querySelectorAll(".timeline-item");
  items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      gsap.to(item, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  });
});
