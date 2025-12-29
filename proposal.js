// ==================== 3D Ring Animation ====================
class RingAnimation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    this.setupRenderer();
    this.createRing();
    this.animate();

    window.addEventListener("resize", () => this.onWindowResize());
  }

  setupRenderer() {
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    this.camera.position.z = 5;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    pointLight.castShadow = true;
    this.scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xff1744, 0.5);
    pointLight2.position.set(-5, -5, 5);
    this.scene.add(pointLight2);
  }

  createRing() {
    // Create ring shape
    const curve = new THREE.EllipseCurve(0, 0, 2, 2, 0, Math.PI * 2, false, 0);
    const points = curve.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    // Create tube geometry for the ring
    const tubeGeometry = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(
        points.map((p) => new THREE.Vector3(p.x, p.y, 0))
      ),
      100,
      0.3,
      8,
      false
    );

    // Create material with golden color
    const material = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xffa500,
    });

    this.ring = new THREE.Mesh(tubeGeometry, material);
    this.scene.add(this.ring);

    // Create diamond on top
    this.createDiamond();
  }

  createDiamond() {
    const diamondGeometry = new THREE.OctahedronGeometry(0.5, 3);
    const diamondMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1,
      roughness: 0.1,
      emissive: 0xff69b4,
    });

    this.diamond = new THREE.Mesh(diamondGeometry, diamondMaterial);
    this.diamond.position.set(0, 2, 0);
    this.diamond.castShadow = true;
    this.scene.add(this.diamond);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.ring) {
      this.ring.rotation.x += 0.002;
      this.ring.rotation.y += 0.01;
      this.ring.rotation.z += 0.001;
    }

    if (this.diamond) {
      this.diamond.rotation.x += 0.01;
      this.diamond.rotation.y += 0.01;

      // Pulsing effect
      const scale = 1 + Math.sin(Date.now() * 0.003) * 0.1;
      this.diamond.scale.set(scale, scale, scale);
    }

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

// ==================== Falling Petals ====================
function createFallingPetals() {
  const container = document.querySelector(".falling-petals");
  if (!container) return;

  const petals = ["🌹", "🌸", "🌺", "💐", "🌻"];

  for (let i = 0; i < 20; i++) {
    const petal = document.createElement("div");
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
    petal.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: -20px;
            font-size: ${Math.random() * 1.5 + 1}rem;
            opacity: ${Math.random() * 0.7 + 0.3};
            pointer-events: none;
        `;

    container.appendChild(petal);

    const duration = Math.random() * 3 + 4;
    const delay = Math.random() * 2;

    gsap.to(petal, {
      y: window.innerHeight + 100,
      x: (Math.random() - 0.5) * 200,
      rotate: Math.random() * 360,
      opacity: 0,
      duration: duration,
      delay: delay,
      repeat: -1,
      ease: "none",
    });
  }
}

// ==================== Initialize on Page Load ====================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize 3D ring
  new RingAnimation("ringScene");

  // Create falling petals
  createFallingPetals();

  // Animate proposal section on scroll into view
  const proposalSection = document.querySelector(".proposal-section");
  if (proposalSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        gsap.from(proposalSection.querySelector("h2"), {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.from(proposalSection.querySelector(".proposal-text"), {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
        });

        observer.unobserve(proposalSection);
      }
    });
    observer.observe(proposalSection);
  }
});

// ==================== Share Functionality ====================
function shareLink() {
  const link = window.location.href;
  const text =
    "Check out this beautiful love story dedicated to someone special! 💕";

  if (navigator.share) {
    navigator
      .share({
        title: "Our Love Story 💕",
        text: text,
        url: link,
      })
      .catch((err) => console.log("Share failed:", err));
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(`${text}\n${link}`).then(() => {
      alert("Link copied to clipboard! Share it with your loved one! 💕");
    });
  }
}

function downloadPage() {
  // Create a canvas from the current page
  const pageLink = document.querySelector("a[href]");

  // For now, show a message
  const message = document.createElement("div");
  message.textContent =
    "💕 This page is already yours to share forever! Send the link to someone special.";
  message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff1744, #ff5783);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        z-index: 2000;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        font-size: 1.2rem;
        text-align: center;
    `;

  document.body.appendChild(message);

  gsap.from(message, {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: "elastic.out",
  });

  setTimeout(() => {
    gsap.to(message, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: "back.in",
      onComplete: () => message.remove(),
    });
  }, 3000);
}

// ==================== Page Scroll Navigation ====================
function scrollTo(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}
