import { createButton } from "./functions.js";
import { progressBar } from "./functions.js";

const card = document.querySelector('.card');
const score = document.querySelector('.score');
const button = document.querySelector('#drawCard');
const colorBtns = document.querySelector('.colorBtns');
const suitBtns = document.querySelector('.suitBtns');
const faceNumBtns = document.querySelector('.faceNumBtns');
const faceOrNumBtns = document.querySelector('.faceOrNumBtns');
const higherLowerBtns = document.querySelector('.higherLowerBtns');
// const progressBar = document.querySelector('.check-bar-container');
const gameSubtitle = document.querySelector('.gameSubtitle');

let redCard, blackCard;
let diamond, heart, spade, club;
let currentScore = 0;
let numberCard, faceCard;
let cardData, correctCard;
let roundResolved = false;

// Arrays
const faceValues = ["ace", "king", "queen", "jack"];
const lowerValues = ["2", "3", "4", "5"];
const higherValues = ["6", "7", "8", "9", "10"];

// Score functions
const addScore = () => { currentScore += 10; score.textContent = currentScore; }
const winningScore = () => { currentScore += 100; score.textContent = currentScore; }
const resetScore = () => { currentScore = 0; score.textContent = currentScore; }

function generateSubtitle (sub) {
    gameSubtitle.innerHTML = "";   
    gameSubtitle.textContent = `${sub}`;
    // gameSubtitle.appendChild();
}

document.addEventListener("click", (e) => {
    const tooltip = e.target.closest(".tooltip, .geartip");
  
    // Close all tooltips first
    document.querySelectorAll(".tooltip.active, .geartip.active")
      .forEach(el => el.classList.remove("active"));
  
    // If clicking an icon, toggle it
    if (tooltip) {
      tooltip.classList.toggle("active");
      e.stopPropagation();
    }
  });

// Clear all button containers
function clearButtons() {
  colorBtns.innerHTML = "";
  suitBtns.innerHTML = "";
  faceNumBtns.innerHTML = "";
  faceOrNumBtns.innerHTML = "";
  higherLowerBtns.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", () => {
    progressBar(0);
    getCard();

    generateSubtitle("Guess the Card");
  });
  
  

// Flip card
function flipCard(cardElement, { duration = 750, force = null } = {}) {
    return new Promise((resolve) => {
      cardElement.style.transition = `transform ${duration}ms ease`;
  
      if (force === true) {
        cardElement.classList.add("flipped");
      } else if (force === false) {
        cardElement.classList.remove("flipped");
      } else {
        cardElement.classList.toggle("flipped");
      }
  
      setTimeout(resolve, duration);
    });
  }
  

// Get random card index
function getRandomCardIndex() {
  return Math.floor(Math.random() * 52);
}

// ---------------------- COLOR BUTTONS ----------------------
function displayColorButtons() {
  colorBtns.innerHTML = "";
  roundResolved = false;

  const redBtn = createButton("red");
  const blackBtn = createButton("black");
  redBtn.classList.add("red");
  blackBtn.classList.add("black");

  redBtn.addEventListener("click", () => handleColorChoice(true));
  blackBtn.addEventListener("click", () => handleColorChoice(false));

  colorBtns.append(redBtn, blackBtn);
  colorBtns.style.display = "flex";
}

async function handleColorChoice(isRed) {
  if ((isRed && redCard) || (!isRed && blackCard)) {
    // alert("Correct!");
    // addScore();
    progressBar(20);
    colorBtns.style.display = "none";
    displaySuitButtons();
  } else {
    // alert("Wrong!");
    // resetScore();
    clearButtons();
    await flipCard(card, { force: true });
  }
}

// ---------------------- SUIT BUTTONS ----------------------
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

async function handleSuitChoice(isCorrect) {
  if (isCorrect) {
    // alert("Correct!");
    // addScore();
    progressBar(40);
    suitBtns.style.display = "none";
    displayFaceNumButtons();
  } else {
    // alert("Wrong!");
    // resetScore();
    progressBar(0);
    clearButtons();
    await flipCard(card, { force: true });
  }
}

// ---------------------- FACE / NUMBER BUTTONS ----------------------
function displayFaceNumButtons() {
    faceNumBtns.innerHTML = "";
    roundResolved = false;
  
    const numberBtn = createButton("number");
    const faceBtn = createButton("face");
  
    numberBtn.classList.add(redCard ? "red" : "black");
    faceBtn.classList.add(redCard ? "red" : "black");
  
    numberBtn.addEventListener("click", async () => {
      if (!numberCard) {
        // alert("Wrong!");
        // resetScore();
        progressBar(0);
        clearButtons();
        await flipCard(card, { force: true });
        return;
      }
  
    //   alert("Correct!");
    //   addScore();
    progressBar(60);
      faceNumBtns.style.display = "none";
      displayHigherLowerChoice();
    });
  
    faceBtn.addEventListener("click", async () => {
      if (!faceCard) {
        // alert("Wrong!");
        // resetScore();
        progressBar(0);
        clearButtons();
        await flipCard(card, { force: true });
        return;
      }
  
    //   alert("Correct!");
    //   addScore();
    progressBar(80);
      faceNumBtns.style.display = "none";
      displayFaceButtons();
    });
  
    faceNumBtns.append(faceBtn, numberBtn);
    faceNumBtns.style.display = "flex";
  }
  
  // ---------------------- FACE BUTTONS ----------------------
function displayFaceButtons() {
    faceOrNumBtns.innerHTML = "";
    roundResolved = false;
  
    faceValues.forEach(face => {
      const btn = createButton(face);
      btn.classList.add(redCard ? "red" : "black", "fade-in");
      btn.dataset.value = face;
      faceOrNumBtns.appendChild(btn);
    });
  
    faceOrNumBtns.style.display = "flex";
  }

async function handleFaceNumChoice(choseFace) {
  if ((choseFace && faceCard) || (!choseFace && numberCard)) {
    // alert("Correct!");
    addScore();
    faceNumBtns.style.display = "none";

    if (faceCard) displayFaceButtons();
    else displayHigherLowerChoice(); // show 5 or lower / 6 or higher
  } else {
    // alert("Wrong!");
    resetScore();
    clearButtons();
    await flipCard(card, { force: true });
  }
}

// ---------------------- NUMBER CARD: HIGHER/LOWER ----------------------
function displayHigherLowerChoice() {
  faceOrNumBtns.innerHTML = "";
  roundResolved = false;

  const lowerBtn = createButton("5 or lower");
  const higherBtn = createButton("6 or higher");

  lowerBtn.classList.add(redCard ? "red" : "black");
  higherBtn.classList.add(redCard ? "red" : "black");

  lowerBtn.dataset.correct = lowerValues.includes(cardData.value);
  higherBtn.dataset.correct = higherValues.includes(cardData.value);

  faceOrNumBtns.append(lowerBtn, higherBtn);
  faceOrNumBtns.style.display = "flex";
}

function displayNumberBtns() {
  higherLowerBtns.innerHTML = "";
  roundResolved = false;

  const valuesToShow = lowerValues.includes(cardData.value) ? lowerValues : higherValues;

  valuesToShow.forEach(val => {
    const btn = createButton(val);
    btn.classList.add(redCard ? "red" : "black", "fade-in");
    btn.dataset.value = val;
    higherLowerBtns.appendChild(btn);
  });

  higherLowerBtns.style.display = "flex";
}

// ---------------------- DELEGATED LISTENERS ----------------------

// Face buttons (ace, king, queen, jack)
faceOrNumBtns.addEventListener("click", async (e) => {
  const btn = e.target.closest("button");
  if (!btn || roundResolved) return;

  // Step 1: Higher/Lower choice buttons
  if (btn.dataset.correct !== undefined) {
    roundResolved = true;

    if (btn.dataset.correct === "true") {
    //   alert("Correct!");
    //   addScore();
    progressBar(80);
      faceOrNumBtns.style.display = "none";
      displayNumberBtns();
      return;
    } else {
    //   alert("Wrong!");
    //   resetScore();
    progressBar(0);
      clearButtons();
      await flipCard(card, { force: true });
      return;
    }
  }

  // Step 2: Face button clicked
  if (btn.dataset.value && faceValues.includes(btn.dataset.value)) {
    roundResolved = true;

    const faceMap = { A: "ace", K: "king", Q: "queen", J: "jack" };
    const correctFace = faceMap[correctCard[0]];

    if (btn.dataset.value === correctFace) {
    //   alert("You Won!");
    //   winningScore();
    progressBar(100);
    generateSubtitle(`${correctCard}`);
    generateSubtitle(`${correctCard}`);
    await flipCard(card, { force: true });
    } else {
    //   alert("Wrong!");
    //   resetScore();
    progressBar(0);
      clearButtons();
      await flipCard(card, { force: true });
    }

    faceOrNumBtns.style.display = "none";
  }
});

// Higher/Lower number buttons (2-5 or 6-10)
higherLowerBtns.addEventListener("click", async (e) => {
  const btn = e.target.closest("button");
  if (!btn || roundResolved) return;

  roundResolved = true;
  if (btn.dataset.value === String(cardData.value)) {
    // alert("You Won!");
    // winningScore();
    progressBar(100);
    generateSubtitle(`${correctCard}`);
    await flipCard(card, { force: true });
  } else {
    // alert("Wrong!");
    // resetScore();
    progressBar(0);
    await flipCard(card, { force: true });
  }

  higherLowerBtns.style.display = "none";
});

// ---------------------- DRAW CARD ----------------------
const getCard = async () => {
//   resetScore();
  clearButtons();

  try {
    const res = await fetch("./cardDeck.json");
    const data = await res.json();
    cardData = data.cards[getRandomCardIndex()];

    // Normalize card value to string
    cardData.value = String(cardData.value);

    correctCard = `${cardData.value} of ${cardData.suit}`;

    // Reset properties
    redCard = ["hearts", "diamonds"].includes(cardData.suit);
    blackCard = !redCard;

    diamond = cardData.suit === "diamonds";
    heart = cardData.suit === "hearts";
    spade = cardData.suit === "spades";
    club = cardData.suit === "clubs";

    numberCard = !isNaN(Number(cardData.value));
    faceCard = !numberCard;

    progressBar(0);

    // Render card back/front
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
    frontImg.src = `./icons/${cardData.image}.png`;
    frontFace.appendChild(frontImg);

    card.append(backFace, frontFace);
    flipCard(card, { force: false });

    // Start game flow
    displayColorButtons();
  } catch (e) {
    console.error(e);
  }
};

// Start game
button.addEventListener("click", async () => {
    // if card is flipped, flip it back first
    if (card.classList.contains("flipped")) {
      await flipCard(card, { force: false }); // wait for it to unflip
    }

    generateSubtitle("Guess the Card");
  
    getCard();
  });
  
