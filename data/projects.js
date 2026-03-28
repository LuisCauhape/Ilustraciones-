// ==============================
// projects.js — Datos del Archivo Visual
// ==============================

const projects = [
  {
    title: "Pesadilla en Elm Street",
    year: 2024,
    category: "Ilustración digital",
    description: "Momento exacto en que la infancia, el hogar y los sueños dejan de ser seguros. Una composición oscura que captura la tensión entre lo familiar y lo ominoso.",
    tools: ["Photoshop", "Wacom", "ArtStation"],
    images: [
       "../ilustraciones/luis-diseno-nightmare-tres-artstation.webp",
    ]
  },
  {
    title: "Paisaje",
    year: 2023,
    category: "Pintura digital",
    description: "Exploración de pinceles personalizados para lograr un estilo de pintura digital único. Cada pieza busca capturar la luz y la atmósfera de escenas naturales.",
    tools: ["Photoshop", "Pinceles custom", "Wacom"],
    images: [
      "./ilustraciones/Mesa de trabajo 1.jpg",
      "./ilustraciones/Flor1.jpg",
      "./ilustraciones/Flor2.jpg",
      "./ilustraciones/Flor3.jpg",
      "./ilustraciones/Flor4.jpg",
    ]
  },
  {
    title: "Etiquetas de gin y vodka",
    year: 2023,
    category: "Diseño de packaging",
    description: "Diseño de etiquetas para productos de destilería. El desafío fue crear una identidad visual que equilibre elegancia y carácter artesanal.",
    tools: ["Illustrator", "Photoshop", "InDesign"],
    images: [
      "./ilustraciones/Etiqueta Uno.jpg",
      "./ilustraciones/Dibujo de Etiqueta Dos.jpg",
      "./ilustraciones/Imagen de etiqueta.jpg",
    ]
  },
  {
    title: "Tarot",
    year: 2023,
    category: "Ilustración editorial",
    description: "Serie de ilustraciones para un sitio web de tarot. Cada carta fue diseñada con simbología propia, combinando lo místico con una estética contemporánea.",
    tools: ["Illustrator", "Photoshop", "Procreate"],
    images: [
      "./ilustraciones/02.jpg",
      "./ilustraciones/03.jpg",
      "./ilustraciones/04.jpg",
      "./ilustraciones/06.jpg",
      "./ilustraciones/07.jpg",
    ]
  },
  {
    title: "Antes del salto",
    year: 2023,
    category: "Ilustración conceptual",
    description: "Un instante suspendido entre la inocencia y el peligro. La composición juega con la tensión del momento previo, dejando al espectador en el umbral.",
    tools: ["Photoshop", "Wacom", "Procreate"],
    images: [
      "./ilustraciones/fb66778b-5c48-4f99-8685-377dc06a76a8.png",
    ]
  }
];
// ==============================

// ==============================
// gallery.js — Lógica del Archivo Visual
// ==============================

// ── ELEMENTOS ──
const gallery       = document.getElementById("gallery");
const modal         = document.getElementById("modal");
const modalTitle    = document.getElementById("modalTitle");
const modalYear     = document.getElementById("modalYear");
const modalDesc     = document.getElementById("modalDesc");
const closeModalBtn = document.getElementById("closeModal");

// ── AÑO EN FOOTER ──
document.getElementById("year").textContent = new Date().getFullYear();

// ── SCROLL TO TOP ──
document.querySelectorAll(".js-scroll-top").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ── CURSOR CUSTOM ──
const cursor = document.getElementById("cursor");
const ring   = document.getElementById("cursor-ring");

if (cursor && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener("mousemove", e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(animRing);
  })();

  function setCursorHover() {
    cursor.style.background = "var(--pink)";
    ring.style.width        = "56px";
    ring.style.height       = "56px";
    ring.style.borderColor  = "rgba(255,79,216,.3)";
  }

  function setCursorDefault() {
    cursor.style.background = "var(--lime)";
    ring.style.width        = "36px";
    ring.style.height       = "36px";
    ring.style.borderColor  = "rgba(200,245,59,.4)";
  }

  // Aplicar a elementos estáticos
  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", setCursorHover);
    el.addEventListener("mouseleave", setCursorDefault);
  });

  window._setCursorHover   = setCursorHover;
  window._setCursorDefault = setCursorDefault;
}

// ── SCROLL REVEAL ──
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("visible");
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(el => revObs.observe(el));

// ==============================
// CREAR GALERÍA
// ==============================

projects.forEach((project, index) => {
  const card = document.createElement("div");
  card.classList.add("archivo-card", "reveal");

  const img = document.createElement("img");
  img.src     = project.images[0];
  img.alt     = project.title;
  img.loading = "lazy";

  const hover = document.createElement("div");
  hover.classList.add("archivo-hover");
  hover.innerHTML = `
    <span class="archivo-hover-title">${project.title}</span>
    <span class="archivo-hover-year">${project.year} · ${project.category}</span>
  `;

  card.appendChild(img);
  card.appendChild(hover);
  gallery.appendChild(card);

  revObs.observe(card);

  card.addEventListener("click", () => openModal(index));

  if (cursor && ring) {
    card.addEventListener("mouseenter", window._setCursorHover);
    card.addEventListener("mouseleave", window._setCursorDefault);
  }
});

// ==============================
// ABRIR MODAL
// ==============================

function openModal(index) {
  const project = projects[index];
  const content = modal.querySelector(".archivo-modal-content");

  // Limpiar contenido dinámico anterior
  content.querySelectorAll(
    "img, .modal-tools, .modal-img-count"
  ).forEach(el => el.remove());

  // ── HEADER (título, year, category, desc) ──
  // Actualizar campos fijos del HTML
  modalTitle.innerText = project.title;

  modalYear.innerHTML = `
    <span class="modal-year">${project.year}</span>
    <span class="modal-category">${project.category}</span>
  `;

  modalDesc.innerText = project.description;

  // ── TOOLS ──
  if (project.tools && project.tools.length) {
    const toolsSection = document.createElement("div");
    toolsSection.classList.add("modal-tools");
    toolsSection.innerHTML = `
      <div class="modal-tools-label">Programas &amp; herramientas</div>
      <div class="modal-tags">
        ${project.tools.map(t => `<span class="modal-tag">${t}</span>`).join("")}
      </div>
    `;
    content.appendChild(toolsSection);
  }

  // ── CONTADOR DE IMÁGENES ──
  const count = project.images.length;
  if (count > 1) {
    const countEl = document.createElement("div");
    countEl.classList.add("modal-img-count");
    countEl.innerText = `${count} piezas`;
    content.appendChild(countEl);
  }

  // ── IMÁGENES ──
  project.images.forEach(src => {
    const img = document.createElement("img");
    img.src     = src;
    img.alt     = project.title;
    img.loading = "lazy";
    content.appendChild(img);
  });

  // Reset scroll
  content.scrollTop = 0;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

// ==============================
// CERRAR MODAL
// ==============================

function closeModalFn() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

closeModalBtn.addEventListener("click", closeModalFn);

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModalFn();
});

modal.addEventListener("click", e => {
  if (e.target === modal) closeModalFn();
});
