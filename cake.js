let scene, camera, renderer, cake, candle, flame, flameLight;
let analyser, dataArray, micStream;
let isLit = true;
let cakeGroup;
let nameSprite;
let nameLight, nameTarget;
const balloonOverlay = document.getElementById("balloonOverlay");
const flames = [];
const flameLights = [];
let sparkleSystem;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x07020d);

  camera = new THREE.PerspectiveCamera(45, getAspect(), 0.1, 100);
  camera.position.set(4.5, 4.4, 5.8);
  camera.lookAt(0, 1.4, 0);

  const container = document.getElementById("scene");
  renderer = new THREE.WebGLRenderer({ antialias: true });
  setRendererSize();
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 0.35);
  scene.add(ambient);

  const dir = new THREE.DirectionalLight(0xffffff, 0.6);
  dir.position.set(5, 8, 4);
  scene.add(dir);

  flameLight = new THREE.PointLight(0xffa23a, 1.1, 6);
  flameLight.position.set(0, 1.9, 0);
  scene.add(flameLight);

  cakeGroup = new THREE.Group();
  scene.add(cakeGroup);

  // 3-layer cake
  const layerMats = [
    new THREE.MeshStandardMaterial({ color: 0xd58fff, roughness: 0.65 }),
    new THREE.MeshStandardMaterial({ color: 0xc17dff, roughness: 0.6 }),
    new THREE.MeshStandardMaterial({ color: 0xffb5d8, roughness: 0.5 }),
  ];
  const layerHeights = [0.55, 0.45, 0.35];
  const layerRadii = [2.3, 2.0, 1.6];
  const layerY = [0.55, 1.1, 1.45];

  for (let i = 0; i < 3; i++) {
    const geo = new THREE.CylinderGeometry(
      layerRadii[i],
      layerRadii[i],
      layerHeights[i],
      48
    );
    const mesh = new THREE.Mesh(geo, layerMats[i]);
    mesh.position.y = layerY[i];
    cakeGroup.add(mesh);
  }

  const topGeo = new THREE.CylinderGeometry(1.7, 1.7, 0.14, 48);
  const topTex = createRainbowTopTexture();
  const topMat = new THREE.MeshStandardMaterial({
    map: topTex,
    roughness: 0.35,
  });
  const top = new THREE.Mesh(topGeo, topMat);
  top.position.y = layerY[2] + layerHeights[2] / 2 + 0.1;
  cakeGroup.add(top);

  const creamMat = new THREE.MeshStandardMaterial({
    color: 0xfff6e8,
    roughness: 0.22,
    metalness: 0.05,
  });
  const creamTopGeo = new THREE.CylinderGeometry(1.78, 1.78, 0.12, 48, 1, true);
  const creamTop = new THREE.Mesh(creamTopGeo, creamMat);
  creamTop.position.y = top.position.y + 0.08;
  cakeGroup.add(creamTop);

  const dripGeo = new THREE.SphereGeometry(0.08, 12, 12);
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const drip = new THREE.Mesh(dripGeo, creamMat);
    const r = 1.78 + Math.random() * 0.05;
    drip.scale.y = 1.4 + Math.random() * 0.6;
    drip.position.set(Math.cos(a) * r, top.position.y - 0.05, Math.sin(a) * r);
    cakeGroup.add(drip);
  }

  generateCandles(16, 1.45, creamTop.position.y + 0.55);

  nameSprite = createNameSprite("Aashii");
  nameSprite.scale.set(3.6, 1.6, 1);
  nameSprite.renderOrder = 999;
  scene.add(nameSprite);
  placeNameSprite(layerY[0] + 0.05, layerRadii[0] + 0.28);

  nameLight = new THREE.SpotLight(0xffc2f2, 1.4, 6, Math.PI / 7, 0.35, 1.2);
  nameTarget = new THREE.Object3D();
  scene.add(nameTarget);
  nameLight.target = nameTarget;
  scene.add(nameLight);

  createSparkleCandle(creamTop.position.y + 0.55);

  window.addEventListener("resize", onResize, false);

  startBalloonShow();
}

function getAspect() {
  const el = document.getElementById("scene");
  return (
    (el.clientWidth || window.innerWidth) /
    (el.clientHeight || window.innerHeight * 0.6)
  );
}

function onResize() {
  camera.aspect = getAspect();
  camera.updateProjectionMatrix();
  setRendererSize();
}

function setRendererSize() {
  const el = document.getElementById("scene");
  renderer.setSize(el.clientWidth, el.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);
  cakeGroup.rotation.y += 0.0015;
  placeNameSprite(0.55, 2.52);

  if (isLit) {
    const t = performance.now() * 0.005;
    for (let i = 0; i < flames.length; i++) {
      const flicker = 0.04 + Math.sin(t + i) * 0.02 + Math.random() * 0.015;
      flames[i].scale.setScalar(1 + flicker);
      flames[i].material.opacity = 0.8 + Math.random() * 0.15;
      flames[i].visible = true;
      if (flameLights[i]) flameLights[i].intensity = 0.9 + Math.random() * 0.4;
    }
    if (sparkleSystem) updateSparkles();
  } else {
    for (let i = 0; i < flames.length; i++) {
      flames[i].visible = false;
      if (flameLights[i]) flameLights[i].intensity = 0;
    }
    if (sparkleSystem) sparkleSystem.points.visible = false;
  }

  renderer.render(scene, camera);
}

function lightCandle() {
  isLit = true;
}
function blowOut() {
  isLit = false;
}

async function enableMic() {
  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(micStream);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser);
    listenForBlow();
    alert("Mic enabled. Blow towards your mic to extinguish the candle!");
  } catch (e) {
    alert("Mic permission denied. Use the manual Blow Out button instead.");
  }
}

function listenForBlow() {
  if (!analyser) return;
  analyser.getByteTimeDomainData(dataArray);
  let max = 0;
  for (let i = 0; i < dataArray.length; i++) {
    const v = Math.abs(dataArray[i] - 128);
    if (v > max) max = v;
  }
  const amplitude = max / 128;
  if (amplitude > 0.35 && isLit) {
    blowOut();
  }
  requestAnimationFrame(listenForBlow);
}

function generateCandles(count, radius, yBase) {
  const colors = [
    "#ff5252",
    "#ffd54f",
    "#64b5f6",
    "#81c784",
    "#f06292",
    "#9575cd",
    "#ff8a65",
    "#4dd0e1",
    "#fff59d",
    "#a5d6a7",
  ];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + 0.12;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const bodyGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.95, 24);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: colors[i % colors.length],
      roughness: 0.35,
      metalness: 0.06,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(x, yBase, z);
    cakeGroup.add(body);

    const wickGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.14, 12);
    const wickMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.9,
    });
    const wick = new THREE.Mesh(wickGeo, wickMat);
    wick.position.set(x, yBase + 0.55, z);
    cakeGroup.add(wick);

    const flameGeo = new THREE.SphereGeometry(0.13, 16, 16);
    const flameMat = new THREE.MeshStandardMaterial({
      color: 0xffd15c,
      emissive: 0xffa200,
      emissiveIntensity: 1.4,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9,
    });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.set(x, yBase + 0.65, z);
    cakeGroup.add(flame);
    flames.push(flame);

    const pl = new THREE.PointLight(0xffa23a, 1.0, 2.8);
    pl.position.copy(flame.position);
    cakeGroup.add(pl);
    flameLights.push(pl);
  }
}

function createRainbowTopTexture() {
  const size = 512,
    cx = size / 2,
    cy = size / 2;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, size, size);
  ctx.lineCap = "round";
  for (let r = 70; r <= 230; r += 10) {
    const hue = ((r - 70) / 160) * 300;
    ctx.strokeStyle = `hsl(${hue}, 90%, 60%)`;
    ctx.lineWidth = 12;
    const off = Math.sin(r * 0.08) * 12;
    ctx.beginPath();
    ctx.arc(cx + off, cy - off, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  const grd = ctx.createRadialGradient(cx, cy, 40, cx, cy, 240);
  grd.addColorStop(0, "rgba(255,255,255,0.35)");
  grd.addColorStop(1, "rgba(255,255,255,0.0)");
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(cx, cy, 240, 0, Math.PI * 2);
  ctx.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.anisotropy = 8;
  return tex;
}

function createNameSprite(text) {
  const w = 1024,
    h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  function paint(fontFamily) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0.0, "#ff5eb0");
    grad.addColorStop(0.45, "#b76cff");
    grad.addColorStop(0.75, "#ffd84d");
    grad.addColorStop(1.0, "#55e7ff");
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `900 220px ${fontFamily}, Poppins, Arial, sans-serif`;
    ctx.lineJoin = "round";
    ctx.translate(w / 2, h / 2);
    ctx.rotate(-0.05);
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 10;
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 22;
    ctx.strokeText(text, 0, 0);
    ctx.shadowColor = "transparent";
    ctx.fillStyle = grad;
    ctx.fillText(text, 0, 0);
    ctx.strokeStyle = "rgba(255,255,255,0.45)";
    ctx.lineWidth = 10;
    ctx.strokeText(text, 0, 0);
    ctx.strokeStyle = "rgba(0,0,0,0.25)";
    ctx.lineWidth = 6;
    ctx.strokeText(text, 0, 0);
  }
  paint("Poppins");
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  const mat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    depthTest: false,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(3.6, 1.6, 1);
  return sprite;
}

function placeNameSprite(y, radiusPlus) {
  const center = new THREE.Vector3(0, y, 0);
  const dir = new THREE.Vector3(
    camera.position.x - center.x,
    0,
    camera.position.z - center.z
  ).normalize();
  nameSprite.position.set(
    center.x + dir.x * radiusPlus,
    y,
    center.z + dir.z * radiusPlus
  );
  nameSprite.quaternion.copy(camera.quaternion);
  if (nameLight && nameTarget) {
    nameLight.position.set(
      nameSprite.position.x,
      nameSprite.position.y + 0.8,
      nameSprite.position.z + 0.2
    );
    nameTarget.position.copy(nameSprite.position);
  }
}

function createSparkleCandle(yBase) {
  const group = new THREE.Group();
  const tex = createGoldStripeTexture();
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 3);
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.15, 1.15, 32),
    new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.25,
      metalness: 0.35,
    })
  );
  body.position.set(0, yBase, 0);
  group.add(body);
  const wick = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.16, 12),
    new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.9 })
  );
  wick.position.set(0, yBase + 0.6, 0);
  group.add(wick);
  const flame = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 16, 16),
    new THREE.MeshStandardMaterial({
      color: 0xffd15c,
      emissive: 0xffa200,
      emissiveIntensity: 1.5,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9,
    })
  );
  flame.position.set(0, yBase + 0.7, 0);
  group.add(flame);
  flames.push(flame);
  const pl = new THREE.PointLight(0xffa23a, 1.1, 3.2);
  pl.position.copy(flame.position);
  group.add(pl);
  flameLights.push(pl);

  const count = 160;
  const geom = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    pos[i3] = (Math.random() - 0.5) * 0.15;
    pos[i3 + 1] = flame.position.y + (Math.random() - 0.5) * 0.08;
    pos[i3 + 2] = (Math.random() - 0.5) * 0.15;
    vel[i3] = (Math.random() - 0.5) * 0.01;
    vel[i3 + 1] = 0.015 + Math.random() * 0.02;
    vel[i3 + 2] = (Math.random() - 0.5) * 0.01;
    const hue = 40 + Math.random() * 20;
    const c = new THREE.Color(`hsl(${hue},100%,70%)`);
    col[i3] = c.r;
    col[i3 + 1] = c.g;
    col[i3 + 2] = c.b;
  }
  geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geom.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const points = new THREE.Points(geom, mat);
  group.add(points);
  sparkleSystem = { points, pos, vel, count, centerY: flame.position.y };
  cakeGroup.add(group);
}

function updateSparkles() {
  const s = sparkleSystem;
  s.points.visible = true;
  for (let i = 0; i < s.count; i++) {
    const i3 = i * 3;
    s.pos[i3] += s.vel[i3];
    s.pos[i3 + 1] += s.vel[i3 + 1];
    s.pos[i3 + 2] += s.vel[i3 + 2];
    if (s.pos[i3 + 1] > s.centerY + 0.9 || Math.random() < 0.005) {
      s.pos[i3] = (Math.random() - 0.5) * 0.15;
      s.pos[i3 + 1] = s.centerY + (Math.random() - 0.3) * 0.05;
      s.pos[i3 + 2] = (Math.random() - 0.5) * 0.15;
      s.vel[i3] = (Math.random() - 0.5) * 0.01;
      s.vel[i3 + 1] = 0.015 + Math.random() * 0.02;
      s.vel[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }
  }
  s.points.geometry.attributes.position.needsUpdate = true;
}

function createGoldStripeTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, "#ffd54f");
  grad.addColorStop(0.5, "#ffe082");
  grad.addColorStop(1, "#ffc107");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 6;
  for (let i = -size; i < size * 2; i += 22) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + size, size);
    ctx.stroke();
  }
  return new THREE.CanvasTexture(canvas);
}

function startBalloonShow() {
  setInterval(() => spawnBalloon(), 1800);
  setInterval(() => spawnBalloon(), 2400);
}

function spawnBalloon() {
  const colors = [
    "#ff5eb0",
    "#ffd84d",
    "#64b5f6",
    "#81c784",
    "#f06292",
    "#9575cd",
    "#4dd0e1",
    "#ffa06a",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const b = document.createElement("div");
  b.className = "balloon";
  b.style.setProperty("--dur", 8 + Math.random() * 4 + "s");
  b.style.left = 5 + Math.random() * 90 + "vw";
  const drift =
    (Math.random() < 0.5 ? "-" : "") + (2 + Math.random() * 8) + "vw";
  b.style.setProperty("--dx", drift);
  b.style.background = `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.9) 0%, ${color} 45%, ${shade(
    color,
    -25
  )} 100%)`;
  balloonOverlay.appendChild(b);
  const popIn = 1500 + Math.random() * 5500;
  setTimeout(() => popBalloon(b), popIn);
  b.addEventListener("animationend", () => b.remove());
}

function popBalloon(b) {
  const r = b.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  b.remove();
  createConfettiBurst(x, y);
}

function createConfettiBurst(x, y) {
  const count = 36;
  const cols = [
    "#ff5eb0",
    "#ffd84d",
    "#64b5f6",
    "#81c784",
    "#f06292",
    "#9575cd",
    "#4dd0e1",
    "#ffa06a",
    "#fff59d",
  ];
  for (let i = 0; i < count; i++) {
    const c = document.createElement("span");
    c.className = "confetti";
    c.style.setProperty("--x", x + "px");
    c.style.setProperty("--y", y + "px");
    const angle = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * 60;
    c.style.setProperty("--tx", Math.cos(angle) * dist + "px");
    c.style.setProperty("--ty", Math.sin(angle) * dist + "px");
    c.style.setProperty("--fx", (Math.random() - 0.5) * 60 + "px");
    c.style.setProperty("--rot", Math.random() * 180 - 90 + "deg");
    c.style.setProperty("--c", cols[i % cols.length]);
    balloonOverlay.appendChild(c);
    setTimeout(() => c.remove(), 2200);
  }
}

function shade(hex, pct) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const f = (v) =>
    Math.max(0, Math.min(255, Math.round(v + (pct / 100) * 255)));
  return `#${f(r).toString(16).padStart(2, "0")}${f(g)
    .toString(16)
    .padStart(2, "0")}${f(b).toString(16).padStart(2, "0")}`;
}

window.addEventListener("beforeunload", () => {
  if (micStream) micStream.getTracks().forEach((t) => t.stop());
});
