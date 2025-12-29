// ==================== Particle System ====================
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.resizeCanvas();
    this.init();
    this.animate();

    window.addEventListener("resize", () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    // Create heart particles
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 1 + 0.5,
        size: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.3,
        type: Math.random() > 0.5 ? "❤️" : "💕",
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      particle.y += particle.vy;
      particle.x += particle.vx;
      particle.opacity -= 0.003;

      if (particle.opacity <= 0) {
        particle.y = -10;
        particle.opacity = Math.random() * 0.5 + 0.3;
      }

      this.ctx.globalAlpha = particle.opacity;
      this.ctx.font = `${particle.size * 8}px Arial`;
      this.ctx.fillText(particle.type, particle.x, particle.y);
    });

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize particles on load
window.addEventListener("load", () => {
  new ParticleSystem("particleCanvas");
});
