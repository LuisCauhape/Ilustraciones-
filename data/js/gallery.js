const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalYear = document.getElementById("modalYear");
const modalDesc = document.getElementById("modalDesc");
const close = document.getElementById("closeModal");

projects.forEach(p => {
  const card = document.createElement("div");
  card.className = "archivo-card";

  card.innerHTML = `
    <img src="${p.image}">
    <div class="archivo-hover">${p.title}</div>
  `;

  card.onclick = () => {
    modal.style.display = "flex";
    modalImg.src = p.image;
    modalTitle.textContent = p.title;
    modalYear.textContent = p.year;
    modalDesc.textContent = p.description;
  };

  gallery.appendChild(card);
});

close.onclick = () => modal.style.display = "none";
