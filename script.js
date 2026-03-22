const img = document.getElementById("randomImage");

const counters = { 1:0, 2:0, 3:0, 4:0, 5:0 };

const images = [
  { src: "images/chat-noir.png", weight: 5, rarity: 4 },
  { src: "images/chat-noir-wink.png", weight: 5, rarity: 5 }
];

function getRandomImage() {
  const total = images.reduce((sum, img) => sum + img.weight, 0);
  const rand = Math.random() * total;

  let cumulative = 0;
  for (let img of images) {
    cumulative += img.weight;
    if (rand < cumulative) return img;
  }
}

function getCommonStartImage() {
  const commons = images.filter(img => img.weight === 5);

  if (commons.length === 0) return images[0];

  return commons[Math.floor(Math.random() * commons.length)];
}

function updateDisplay(rarity) {
  counters[rarity]++;

  if (rarity === 4) {
    const el = document.getElementById("rare4");
    el.classList.remove("hidden");
    el.querySelector("span").textContent = counters[4];
  }

  if (rarity === 5) {
    const el = document.getElementById("rare5");
    el.classList.remove("hidden");
    el.querySelector("span").textContent = counters[5];
  }
}

img.addEventListener("click", () => {
  const selected = getRandomImage();
  img.src = selected.src;
  updateDisplay(selected.rarity);
});

// INIT
const startImage = getCommonStartImage();
img.src = startImage.src;
updateDisplay(startImage.rarity);
