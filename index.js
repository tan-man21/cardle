import { createButton } from "./functions.js";

const card = document.querySelector('.card');
const score = document.querySelector('.score');
const button = document.querySelector('#drawCard');
const colorBtns = document.querySelector('.colorBtns');
const suitBtns = document.querySelector('.suitBtns');
const faceNumBtns = document.querySelector('.faceNumBtns');
const faceOrNumBtns = document.querySelector('.faceOrNumBtns');
const higherLowerBtns = document.querySelector('.higherLowerBtns');

let redCard, blackCard;
let diamond, heart, spade, club;
let currentScore = 0;
let numberCard, faceCard;
let cardData, correctCard;
let roundResolved = false;

// Face/number arrays
const faceValues = ["ace", "king", "queen", "jack"];
const lowerValues = ["2", "3", "4", "5"];
const higherValues = ["6", "7", "8", "9", "10"];

// Score functions
const addScore = () => { currentScore += 10; score.textContent = currentScore; }
const resetScore = () => { currentScore = 0; score.textContent = currentScore; }

// Clear all button containers
function clearButtons() {
  colorBtns.innerHTML = "";
  suitBtns.innerHTML = "";
  faceNumBtns.innerHTML = "";
  faceOrNumBtns.innerHTML = "";
  higherLowerBtns.innerHTML = "";
}

// Flip card
function flipCard(cardElement, { duration = 750, force = null } = {}) {
  cardElement.style.transition = `transform ${duration}ms ease`;
  if (force === true) cardElement.classList.add("flipped");
  else if (force === false) cardElement.classList.remove("flipped");
  else cardElement.classList.toggle("flipped");
}

// Get random card index
function getRandomCardIndex() {
  return Math.floor(Math.random() * 52);
}

// Display color buttons
function displayColorButtons() {
  colorBtns.innerHTML = "";
  roundResolved = false;

  const redBtn = createButton('red');
  const blackBtn = createButton('black');
  redBtn.classList.add("red");
  blackBtn.classList.add("black");

  redBtn.addEventListener("click", () => handleColorChoice(true));
  blackBtn.addEventListener("click", () => handleColorChoice(false));

  colorBtns.append(redBtn, blackBtn);
  colorBtns.style.display = "flex";
}

// Handle color choice
function handleColorChoice(isRed) {
  if ((isRed && redCard) || (!isRed && blackCard)) {
    alert("Correct!");
    addScore();
    colorBtns.style.display = "none";
    displaySuitButtons();
  } else {
    alert("Wrong!");
    resetScore();
    flipCard(card, { force: true });
  }
}

// Display suit buttons dynamically
function displaySuitButtons() {
  suitBtns.innerHTML = "";
  roundResolved = false;

  const suits = [];
  if (redCard) {
    suits.push({ name: "diamond", correct: diamond });
    suits.push({ name: "heart", correct: heart });
  } else {
    suits.push({ name: "spade", correct: spade });
    suits.push({ name: "club", correct: club });
  }

  suits.forEach(s => {
    const btn = createButton(s.name);
    btn.classList.add(redCard ? "red" : "black");
    btn.dataset.correct = s.correct;
    btn.addEventListener("click", () => handleSuitChoice(s.correct));
    suitBtns.appendChild(btn);
  });

  suitBtns.style.display = "flex";
}

// Handle suit choice
function handleSuitChoice(isCorrect) {
  if (isCorrect) {
    alert("Correct!");
    addScore();
    suitBtns.style.display = "none";
    displayFaceNumButtons();
  } else {
    alert("Wrong!");
    resetScore();
    flipCard(card, { force: true });
  }
}

// Display face/number choice buttons
function displayFaceNumButtons() {
  faceNumBtns.innerHTML = "";
  roundResolved = false;

  const numberBtn = createButton('number');
  const faceBtn = createButton('face');

  numberBtn.classList.add(redCard ? "red" : "black");
  faceBtn.classList.add(redCard ? "red" : "black");

  numberBtn.addEventListener("click", () => handleFaceNumChoice(false));
  faceBtn.addEventListener("click", () => handleFaceNumChoice(true));

  faceNumBtns.append(faceBtn, numberBtn);
  faceNumBtns.style.display = "flex";
}

// Handle face/number choice
function handleFaceNumChoice(choseFace) {
  if ((choseFace && faceCard) || (!choseFace && numberCard)) {
    alert("Correct!");
    addScore();
    faceNumBtns.style.display = "none";

    if (faceCard) displayFaceButtons();
    else displayNumberButtons();
  } else {
    alert("Wrong!");
    resetScore();
    flipCard(card, { force: true });
  }
}

// Display face buttons dynamically
function displayFaceButtons() {
  faceOrNumBtns.innerHTML = "";
  roundResolved = false;

  faceValues.forEach(face => {
    const btn = createButton(face);
    btn.classList.add(redCard ? "red" : "black", "fade-in");
    btn.dataset.value = face;
    faceOrNumBtns.appendChild(btn);
  });
}

// Display number buttons dynamically (higher/lower)
function displayNumberButtons() {
  faceOrNumBtns.innerHTML = "";
  higherLowerBtns.innerHTML = "";
  roundResolved = false;

  const isLower = lowerValues.includes(cardData.value);
  const valuesToShow = isLower ? lowerValues : higherValues;

  valuesToShow.forEach(val => {
    const btn = createButton(val);
    btn.classList.add(redCard ? "red" : "black", "fade-in");
    btn.dataset.value = val;
    higherLowerBtns.appendChild(btn);
  });
}

// Delegated listener for face buttons
faceOrNumBtns.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn || roundResolved) return;
  if (!faceValues.includes(btn.dataset.value)) return;

  roundResolved = true;
  const faceMap = { A: "ace", K: "king", Q: "queen", J: "jack" };
  const correctFace = faceMap[correctCard[0]];

  if (btn.dataset.value === correctFace) {
    alert("You Won!");
    addScore();
  } else {
    alert("Wrong!");
    resetScore();
    flipCard(card, { force: true });
  }
});

// Delegated listener for number buttons
higherLowerBtns.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn || roundResolved) return;

  roundResolved = true;

  if (btn.dataset.value === String(cardData.value)) {
    alert("You Won!");
    addScore();
  } else {
    alert("Wrong!");
    resetScore();
    flipCard(card, { force: true });
  }
});


// Main card draw
const getCard = async () => {
  resetScore();
  clearButtons();

  try {
    const res = await fetch('./cardDeck.json');
    const data = await res.json();
    cardData = data.cardDeck[getRandomCardIndex()];

    correctCard = `${cardData.value} of ${cardData.suit}`;

    // Reset card properties
    redCard = ["hearts", "diamonds"].includes(cardData.suit);
    blackCard = !redCard;

    diamond = cardData.suit === "diamonds";
    heart = cardData.suit === "hearts";
    spade = cardData.suit === "spades";
    club = cardData.suit === "clubs";

    numberCard = !isNaN(Number(cardData.value));
    faceCard = !numberCard;

    // Render card back/front (simplified)
    card.innerHTML = "";
    const backFace = document.createElement("div");
    backFace.className = "card-face back";
    const backImg = document.createElement("img");
    backImg.src = "./icons/card.png";
    backImg.ariaValueText = correctCard;
    backFace.appendChild(backImg);

    const frontFace = document.createElement("div");
    frontFace.className = "card-face front";
    const frontImg = document.createElement("img");
    frontImg.src = "./icons/item-0.png";
    frontFace.appendChild(frontImg);

    card.append(backFace, frontFace);
    flipCard(card, { force: false });

    // Start flow
    displayColorButtons();

  } catch (e) {
    console.error(e);
  }
}

// Start game
button.addEventListener("click", getCard);
