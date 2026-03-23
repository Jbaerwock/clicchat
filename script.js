const img = document.getElementById("randomImage");

//  SEULE CHOSE À MODIFIER : liste des fichiers existants
const imageFiles = [
  "chat-1-1.png",
  "chat-2-1.png",
  "chat-3-1.png",
  "chat-4-1.png",
  "chat-5-1.png",
  "chat-6-1.png",
  "chat-7-1.png"
];


//  Extraire la rareté depuis le nom (chat-INDEX-RARETÉ.png)
function getRarity(filename) {
  const match = filename.match(/-(\d+)\.(png|jpg|jpeg|gif)$/);
  // match[1] = INDEX, match[2] = extension
  // On prend le dernier chiffre avant l’extension comme rareté
  const rareMatch = filename.match(/-(\d+)\.(?:png|jpg|jpeg|gif)$/);
  if (!rareMatch) return 1;
  // rareté = dernier chiffre après dernier tiret
  const parts = filename.split("-");
  return parseInt(parts[parts.length -1].split(".")[0]);
}

//  Construire les objets images avec rareté et poids
const images = imageFiles.map(file => ({
  src: "images/chats/" + file,
  rarity: getRarity(file),
  weight: 6 - getRarity(file)  // pondération : rareté élevée = moins de chance
}));

//  Compteurs
const counters = {1:0, 2:0, 3:0, 4:0, 5:0};

//  Tirage pondéré
function getRandomImage() {
  const totalWeight = images.reduce((sum, img) => sum + img.weight, 0);
  let rand = Math.random() * totalWeight;

  for (let img of images) {
    if (rand < img.weight) return img;
    rand -= img.weight;
  }

  // fallback
  return images[0];
}

//  Image de départ : rareté 1 si possible
function getStartImage() {
  const commons = images.filter(img => img.rarity === 1);
  if (commons.length === 0) return images[0];
  return commons[Math.floor(Math.random() * commons.length)];
}

//  Mise à jour compteur et affichage
function updateDisplay(rarity) {
  counters[rarity]++;

  // Raretes 1 à 3
  if (rarity <= 3) {
    const el = document.getElementById("r" + rarity);
    if (el) el.textContent = counters[rarity];
  }

  // Rarete 4
  if (rarity === 4) {
    const el = document.getElementById("rare4");
    if (el) {
      el.classList.remove("hidden");
      const span = el.querySelector("span");
      if (span) span.textContent = counters[4];
    }
  }

  // Rarete 5
  if (rarity === 5) {
    const el = document.getElementById("rare5");
    if (el) {
      el.classList.remove("hidden");
      const span = el.querySelector("span");
      if (span) span.textContent = counters[5];
    }
  }
}

//  Click → nouvelle image
img.addEventListener("click", () => {
  const selected = getRandomImage();
  img.src = selected.src;
  updateDisplay(selected.rarity);
});

// 🚀 INIT
const start = getStartImage();
img.src = start.src;
updateDisplay(start.rarity);
