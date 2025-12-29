// ==================== Gallery Functions ====================
const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach((item) => {
  // Add hover animation with GSAP
  item.addEventListener("mouseenter", function () {
    gsap.to(this, {
      y: -10,
      duration: 0.3,
      ease: "power2.out",
    });

    const heartOverlay = this.querySelector(".heart-overlay");
    gsap.to(heartOverlay, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "elastic.out",
    });
  });

  item.addEventListener("mouseleave", function () {
    gsap.to(this, {
      y: 0,
      duration: 0.3,
    });
  });

  // Click to enlarge
  item.addEventListener("click", function () {
    const img = this.querySelector("img").src;
    showGalleryModal(img);
  });
});

function showGalleryModal(imageSrc) {
  const modal = document.createElement("div");
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        backdrop-filter: blur(5px);
        cursor: pointer;
    `;

  const img = document.createElement("img");
  img.src = imageSrc;
  img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        cursor: auto;
    `;

  modal.appendChild(img);
  document.body.appendChild(modal);

  gsap.from(modal, {
    opacity: 0,
    duration: 0.3,
  });

  gsap.from(img, {
    scale: 0.8,
    opacity: 0,
    duration: 0.5,
    ease: "elastic.out",
  });

  modal.addEventListener("click", () => {
    gsap.to(modal, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => modal.remove(),
    });
  });
}

// Photo upload functionality
document.addEventListener("DOMContentLoaded", () => {
  const photoUpload = document.getElementById("photoUpload");

  if (photoUpload) {
    photoUpload.addEventListener("change", function (e) {
      const files = e.target.files;
      let uploadedIndex = 0;

      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function (event) {
          const galleryItems = document.querySelectorAll(".gallery-item");
          if (uploadedIndex < galleryItems.length) {
            const img = galleryItems[uploadedIndex].querySelector("img");
            img.src = event.target.result;
            uploadedIndex++;

            // Animate the replaced image
            gsap.from(img, {
              opacity: 0,
              scale: 0.8,
              duration: 0.5,
              ease: "elastic.out",
            });
          }
        };
        reader.readAsDataURL(file);
      });
    });
  }
});

// Parallax effect on gallery images
window.addEventListener("scroll", () => {
  const gallerySection = document.querySelector(".gallery-section");
  if (!gallerySection) return;

  const rect = gallerySection.getBoundingClientRect();
  const scrollPercent =
    (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

  galleryItems.forEach((item, index) => {
    const img = item.querySelector("img");
    if (img) {
      const moveAmount = scrollPercent * 20;
      gsap.to(img, {
        y: -moveAmount,
        duration: 0.1,
        overwrite: "auto",
      });
    }
  });
});

// Stagger gallery items entrance
window.addEventListener("load", () => {
  gsap.from(galleryItems, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
  });
});
