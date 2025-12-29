document.addEventListener("DOMContentLoaded", () => {
  animateTitle();
  initParticles();
  wireHero();
  initTimeline();
  initGallery();
  initMessages();
  initQuiz();
  initGifts();
  restoreTheme();
  trackVisits();
});

function animateTitle() {
  const title = document.querySelector("#title");
  const words = [...title.querySelectorAll(".word")];
  words.forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 16, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        delay: i * 0.15,
        duration: 0.6,
        ease: "power2.out",
      }
    );
  });
}

async function initParticles() {
  await tsParticles.load("particles", {
    particles: {
      number: { value: 50, density: { enable: true, area: 800 } },
      color: { value: ["#ff77b7", "#ffd84d", "#7af5ff", "#b67cff"] },
      shape: {
        type: "char",
        options: { char: { value: ["❤", "★"], font: "Verdana", weight: 700 } },
      },
      opacity: { value: { min: 0.4, max: 0.8 } },
      size: { value: { min: 8, max: 14 } },
      move: {
        enable: true,
        speed: 0.7,
        direction: "none",
        outModes: { default: "out" },
      },
    },
  });
}

function wireHero() {
  const curtain = document.getElementById("transitionCurtain");
  const surpriseBtn = document.getElementById("surpriseBtn");
  const musicBtn = document.getElementById("musicBtn");
  const bgm = document.getElementById("bgm");
  const voiceBtn = document.getElementById("voiceBtn");
  const playBtn = document.getElementById("playWishBtn");

  surpriseBtn.addEventListener("click", () => {
    curtain.hidden = false;
    curtain.classList.add("show");
    setTimeout(() => (window.location.href = "cake.html"), 900);
  });

  musicBtn.addEventListener("click", async () => {
    if (bgm.paused) {
      bgm.volume = 0.6;
      try {
        await bgm.play();
      } catch {}
      musicBtn.textContent = "Music: On";
    } else {
      bgm.pause();
      musicBtn.textContent = "Music: Off";
    }
  });

  // Voice record wish
  let recorder,
    recStream,
    chunks = [],
    recordingURL;
  voiceBtn.addEventListener("click", async () => {
    if (!recorder || recorder.state === "inactive") {
      try {
        recStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recorder = new MediaRecorder(recStream);
        chunks = [];
        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/webm" });
          recordingURL = URL.createObjectURL(blob);
          playBtn.disabled = false;
          recStream.getTracks().forEach((t) => t.stop());
        };
        recorder.start();
        voiceBtn.textContent = "Stop Recording";
      } catch {
        alert("Mic permission denied.");
      }
    } else {
      recorder.stop();
      voiceBtn.textContent = "Record Wish";
    }
  });
  playBtn.addEventListener(
    "click",
    () => recordingURL && new Audio(recordingURL).play()
  );

  // Theme toggle + share
  document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("theme-light");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("theme-light") ? "light" : "dark"
    );
  });
  document.getElementById("shareBtn").addEventListener("click", () => {
    const url = window.location.href;
    const msg = encodeURIComponent("Aashii, open this ❤️ " + url);
    window.open("https://wa.me/?text=" + msg, "_blank");
  });
}

function restoreTheme() {
  const t = localStorage.getItem("theme");
  if (t === "light") document.body.classList.add("theme-light");
}

// Timeline
function initTimeline() {
  const data = [
    {
      date: "Jan 2024",
      img: "images/timeline/first-meet.jpg",
      text: "First time we met. Sparks everywhere.",
    },
    {
      date: "Feb 2024",
      img: "images/timeline/first-date.jpg",
      text: "Our first date—magical evening.",
    },
    {
      date: "Jun 2024",
      img: "images/timeline/trip.jpg",
      text: "Weekend trip and endless laughs.",
    },
  ];
  const list = document.getElementById("timelineList");
  data.forEach((d) => {
    const el = document.createElement("div");
    el.className = "item";
    el.innerHTML = `<img loading="lazy" src="${d.img}" alt="${d.date}" /><div><h3>${d.date}</h3><p>${d.text}</p></div>`;
    list.appendChild(el);
  });
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach(
        (e) =>
          e.isIntersecting &&
          gsap.to(e.target, { opacity: 1, y: 0, duration: 0.5 })
      );
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll(".timeline .item").forEach((el) => obs.observe(el));
}

// Gallery
function initGallery() {
  const track = document.getElementById("carouselTrack");
  const prev = document.querySelector(".carousel .prev");
  const next = document.querySelector(".carousel .next");
  const filters = document.querySelectorAll(".gallery-section .filters .btn");
  let index = 0;

  function update() {
    track.style.transform = `translateX(${-100 * index}%)`;
  }
  prev.onclick = () => {
    index = Math.max(0, index - 1);
    update();
  };
  next.onclick = () => {
    index = Math.min(track.children.length - 1, index + 1);
    update();
  };

  filters.forEach(
    (f) =>
      (f.onclick = () => {
        filters.forEach((x) => x.classList.remove("active"));
        f.classList.add("active");
        const tag = f.dataset.filter;
        [...track.children].forEach(
          (img) =>
            (img.style.display =
              tag === "all" || img.dataset.tag === tag ? "block" : "none")
        );
        index = 0;
        update();
      })
  );

  // zoom on hover
  [...track.children].forEach((img) =>
    img.addEventListener("mousemove", (e) => {
      const r = img.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.transform = "scale(1.06)";
    })
  );
  [...track.children].forEach((img) =>
    img.addEventListener("mouseleave", () => (img.style.transform = "scale(1)"))
  );
}

// Messages typing
function initMessages() {
  const lines = [
    "Aashii, tumhari muskurahat meri duniya hai.",
    "Har din tumhare saath ek nayi kahaani likhta hoon.",
    "Happy Birthday, meri jaan! 💖",
  ];
  const box = document.getElementById("typing");
  let i = 0;
  function typeLine() {
    const text = lines[i % lines.length];
    box.textContent = "";
    let j = 0;
    const timer = setInterval(() => {
      box.textContent += text[j++];
      if (j > text.length) {
        clearInterval(timer);
        setTimeout(() => {
          i++;
          typeLine();
        }, 1000);
      }
    }, 35);
  }
  typeLine();
}

// Quiz
function initQuiz() {
  const q = [
    { t: "Hum pehli baar kab mile the?", o: ["Jan", "Feb", "Mar"], a: 0 },
    { t: "Favorite dessert?", o: ["Cake", "Gulab Jamun", "Ice Cream"], a: 1 },
  ];
  const box = document.getElementById("quizBox");
  q.forEach((qq, qi) => {
    const div = document.createElement("div");
    div.className = "q";
    div.innerHTML =
      `<p>${qq.t}</p>` +
      qq.o
        .map(
          (o, oi) =>
            `<span class="opt" data-i="${qi}" data-o="${oi}">${o}</span>`
        )
        .join("");
    box.appendChild(div);
  });
  const res = document.getElementById("quizResult");
  let score = 0;
  box.addEventListener("click", (e) => {
    const el = e.target;
    if (!el.classList.contains("opt")) return;
    const qi = +el.dataset.i,
      oi = +el.dataset.o;
    if (oi === q[qi].a) {
      el.classList.add("right");
      score++;
      heartBurst(el);
    } else {
      el.classList.add("wrong");
    }
    res.textContent = `Score: ${score}/${q.length}`;
  });
}
function heartBurst(anchor) {
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.style.left = "0";
  div.style.top = "0";
  div.style.pointerEvents = "none";
  div.style.zIndex = "40";
  document.body.appendChild(div);
  for (let i = 0; i < 18; i++) {
    const s = document.createElement("span");
    s.textContent = "❤";
    s.style.position = "absolute";
    s.style.left = anchor.getBoundingClientRect().left + "px";
    s.style.top = anchor.getBoundingClientRect().top + "px";
    s.style.color = ["#ff77b7", "#ffd84d", "#7af5ff", "#b67cff"][i % 4];
    s.style.fontSize = "16px";
    document.body.appendChild(s);
    gsap.to(s, {
      x: (Math.random() - 0.5) * 200,
      y: -100 - Math.random() * 120,
      opacity: 0,
      scale: 1.6,
      duration: 0.9,
      onComplete: () => s.remove(),
    });
  }
  setTimeout(() => div.remove(), 900);
}

// Gifts (simple canvas animations)
function initGifts() {
  const c = document.getElementById("giftCanvas");
  const ctx = c.getContext("2d");
  document.getElementById("ringBtn").onclick = () => drawRing(ctx, c);
  document.getElementById("bouquetBtn").onclick = () => drawBouquet(ctx, c);
  document.getElementById("protectBtn").onclick = protectSite;
}
function drawRing(ctx, c) {
  ctx.clearRect(0, 0, c.width, c.height);
  for (let r = 40; r <= 140; r += 8) {
    ctx.strokeStyle = `hsl(${40 + r / 2},90%,60%)`;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(200, 200, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = "#ffd84d";
  ctx.beginPath();
  ctx.moveTo(380, 160);
  ctx.lineTo(430, 200);
  ctx.lineTo(380, 240);
  ctx.closePath();
  ctx.fill();
}
function drawBouquet(ctx, c) {
  ctx.clearRect(0, 0, c.width, c.height);
  for (let i = 0; i < 18; i++) {
    const x = 120 + i * 30;
    const y = 260 - Math.random() * 120;
    ctx.fillStyle = `hsl(${i * 20},90%,70%)`;
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#7bb86b";
  ctx.fillRect(120, 260, 420, 12);
}

// Privacy (simple password gate)
function protectSite() {
  const ok = localStorage.getItem("gate-ok");
  if (ok) return alert("Already unlocked.");
  const pass = prompt("Enter secret:"); // keep simple; change in production
  if ((pass || "").toLowerCase() === "aashii") {
    localStorage.setItem("gate-ok", "1");
    alert("Unlocked!");
  } else alert("Wrong password.");
}

// Performance + analytics (local)
function trackVisits() {
  const n = +localStorage.getItem("visits") + 1 || 1;
  localStorage.setItem("visits", n.toString());
}

// Lazy load helpers (optional if many imgs)
document.addEventListener("lazyloaded", () => {});
