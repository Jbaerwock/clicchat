const img = document.getElementById("randomImage");

//  TU MODIFIES JUSTE ICI
const images = [
  { src: "images/chats/chat-1-1.png", rarity: 1 },
  { src: "images/chats/chat-2-1.png", rarity: 3 },
  { src: "images/chats/chat-3-5.png", rarity: 5 }
];

//  Ajouter automatiquement le poids
images.forEach(img => {
  img.weight = 6 - img.rarity;
});

//  Compteurs (optionnels)
const counters = {1:0, 2:0, 3:0, 4:0, 5:0};

//  Tirage pondéré
function getRandomImage() {
  const totalWeight = images.reduce((sum, img) => sum + img.weight, 0);
  let rand = Math.random() * totalWeight;

  for (let img of images) {
    if (rand < img.weight) return img;
    rand -= img.weight;
  }

  return images[0];
}

//  Image de départ (rareté 1)
function getStartImage() {
  const commons = images.filter(img => img.rarity === 1);
  if (commons.length === 0) return images[0];
  return commons[Math.floor(Math.random() * commons.length)];
}

//  Mise à jour (safe même sans HTML)
function updateDisplay(rarity) {
  counters[rarity]++;

  const el = document.getElementById("r" + rarity);
  if (el) el.textContent = counters[rarity];

  const el4 = document.getElementById("rare4");
  if (rarity === 4 && el4) {
    el4.classList.remove("hidden");
    const span = el4.querySelector("span");
    if (span) span.textContent = counters[4];
  }

  const el5 = document.getElementById("rare5");
  if (rarity === 5 && el5) {
    el5.classList.remove("hidden");
    const span = el5.querySelector("span");
    if (span) span.textContent = counters[5];
  }
}

//  Click
img.addEventListener("click", () => {
  const selected = getRandomImage();
  img.src = selected.src;
  updateDisplay(selected.rarity);
});

//  INIT
const start = getStartImage();
img.src = start.src;
updateDisplay(start.rarity);
