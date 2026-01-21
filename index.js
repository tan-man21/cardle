const card = document.querySelector('.card')
const score = document.querySelector('.score')
const button = document.querySelector('#drawCard')
const colorBtns = document.querySelector('.colorBtns')
const suitBtns = document.querySelector('.suitBtns')
const faceNumBtns = document.querySelector('.faceNumBtns')

let redCard;
let blackCard;
let diamond = false;
let heart = false;
let spade= false;
let club = false;
let currentScore = 0;

//add score function
const addScore = () => {
  currentScore += 10;
  score.textContent = currentScore;
}
//reset score function
const resetScore = () => {
  currentScore = 0;
  score.textContent = currentScore
}

function createButton(text) {
    const btn = document.createElement("button");
    btn.classList.add("button", "fade-in");    
    btn.textContent = text;

    return btn;
  }

  function clearButtons() {
    // Clear button containers
    colorBtns.innerHTML = "";
    suitBtns.innerHTML = "";
    faceNumBtns.innerHTML = "";
}

function getRandomCardIndex() {
  return Math.floor(Math.random() * 52);
}

//flip card
function flipCard(cardElement, options = {}) {
  const {
    duration = 750,
    force = null // true = flip, false = unflip, null = toggle
  } = options;

  cardElement.style.transition = `transform ${duration}ms ease`;

  if (force === true) {
    cardElement.classList.add("flipped");
  } else if (force === false) {
    cardElement.classList.remove("flipped");
  } else {
    cardElement.classList.toggle("flipped");
  }
}
  

const getCard = async () => {
  
  // Reset score every new card
  resetScore();

  clearButtons();
  
  //hides current card
  //card.style.display = "none";
  
  colorBtns.style.display = "flex";
  
  try {
    //const res = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
    
    const res = await fetch('./cardDeck.json')

    const data = await res.json();
    
    const cardData = data.cardDeck[getRandomCardIndex()];
    
    //card.innerHTML = "";
    //Create Card Element
    // const backImg = document.createElement("img");
    // backImg.src = './icons/card.png';
    // backImg.style.width = '25vw';
    // backImg.className = 'back';
    // //backImg.alt = `${cardData.value} of ${cardData.suit}`;
    // //Display the Card in card container
    // card.appendChild(backImg);

    card.innerHTML = ""; // clear first if reusing

    const backFace = document.createElement("div");
    backFace.className = "card-face back";

    const backImg = document.createElement("img");
    backImg.src = "./icons/card.png";
    backFace.appendChild(backImg);

    const frontFace = document.createElement("div");
    frontFace.className = "card-face front";
    
    const frontImg = document.createElement("img");
    frontImg.src = "./icons/item-0.png";
    frontFace.appendChild(frontImg);
    

    card.append(backFace, frontFace);

    flipCard(card, { force: false });

    
    //Checks color of current card
    if(cardData.suit === 'hearts' || cardData.suit === 'diamonds') {
      redCard = true;
      blackCard = false;
    } else {
      redCard = false;
      blackCard = true;
    }
    
    // Determine suit
    switch (cardData.suit) {
      case "hearts":
        heart = true;
        break;
      case "diamonds":
        diamond = true;
        break;
      case "spades":
        spade = true;
        break;
      case "clubs":
        club = true;
        break;
    }
    
    // Determine face or number
    let numberCard = !isNaN(Number(cardData.value));
    let faceCard = !numberCard;


    // Clear button containers
    //colorBtns.innerHTML = "";
    //suitBtns.innerHTML = "";
    //faceNumBtns.innerHTML = "";
    
    //Create face or number buttons
    const numberBtn = createButton('number');
    //numberBtn.textContent = "Number";
    numberBtn.className = `${redCard ? 'red' : 'black'}`;
    const faceBtn = createButton('face');
    //faceBtn.textContent = "Face";
    faceBtn.className = `${redCard ? 'red' : 'black'}`;


    
    //Create suit buttons
    const diamondSuit = createButton('diamond');
    diamondSuit.className = "red"
    const heartSuit = createButton('heart');
    heartSuit.className = "red"    
    const spadeSuit = createButton('spade');
    spadeSuit.className = "black"
    const clubSuit = createButton('club');
    clubSuit.className = "black"
    
    //Create color buttons
    const redBtn = createButton('red');
    //redBtn.textContent = "Red"
    redBtn.className = "red"
    const blackBtn = createButton('black');
    //blackBtn.textContent = "Black"
    blackBtn.className = "black"
    
    //listens for a click on red
    redBtn.addEventListener("click", () => {
      if (redCard) {
        alert("Correct!")
        
        //add score
        addScore();
        
        //Display if correct color selected
        suitBtns.innerHTML = "";
        suitBtns.appendChild(diamondSuit)
        suitBtns.appendChild(heartSuit)
        
        //removes color buttons
        colorBtns.style.display = "none";
      } else {
        alert("Wrong!")
        
        //reset score
        resetScore();
        
        //shows card
        flipCard(card, { force: true });
      }

  })
  //listens for a click on black
  blackBtn.addEventListener("click", () => {
    if (blackCard) {
      alert("Correct!")
     
      //add score
      addScore();
      
      //Display if correct color selected
      suitBtns.innerHTML = "";
      suitBtns.appendChild(spadeSuit)
      suitBtns.appendChild(clubSuit)
      
      //removes color buttons
      colorBtns.style.display = "none";
    } else {
      alert("Wrong!")
      
      //reset score
      resetScore();
      
      //shows card
      flipCard(card, { force: true });
    }

  })
    
    colorBtns.appendChild(redBtn)
    colorBtns.appendChild(blackBtn)
    
    //display face or number buttons
const displayFNBtns = () => {
  faceNumBtns.innerHTML = "";
  faceNumBtns.appendChild(numberBtn)
  faceNumBtns.appendChild(faceBtn)
}
    
    // Suit button listeners
    diamondSuit.addEventListener("click", () => {           if(diamond) { 
      alert("Correct!")
      
      //add score
      addScore();
      
      //call face or number function
      displayFNBtns();
      
      suitBtns.style.display = "none";
    } else { 
      alert("Wrong!") 
      
      //reset score
      resetScore();
      
      //shows card
      flipCard(card, { force: true });
    } }) 
    heartSuit.addEventListener("click", () => {             if(heart) { 
      alert("Correct!")
      
      //add score
      addScore();
      
      //call face or number function
      displayFNBtns();
      
      suitBtns.style.display = "none";
    } else { 
      alert("Wrong!")
      
      //reset score
      resetScore();
      
      //shows card
      flipCard(card, { force: true });
    } }) 
    spadeSuit.addEventListener("click", () => {             if(spade) { 
      alert("Correct!")
      
      //add score
      addScore();
      
      //call face or number function
      displayFNBtns();
      
      suitBtns.style.display = "none";
    } else { 
      alert("Wrong!")
      
      //reset score
      resetScore();
      
      //shows card
      flipCard(card, { force: true });
    } }) 
    clubSuit.addEventListener("click", () => { 
      if(club) { 
        alert("Correct!")
        
      //add score
      addScore();
        
      //call face or number function
      displayFNBtns();
        
      suitBtns.style.display = "none";
      } else { 
        alert("Wrong!")
        
      //reset score
      resetScore();
        
      //shows card
      flipCard(card, { force: true });
      } })
    
    numberBtn.addEventListener("click", () => {
      if(numberCard){ 
        alert("Correct!");
        
        addScore();
      } else {
        alert("Wrong!");
        
        resetScore();

        flipCard(card, { force: true });
      }
   });

faceBtn.addEventListener("click", () => {
  if(faceCard){ 
        alert("Correct!");
        
        addScore();
      } else {
        alert("Wrong!");
        
        resetScore();

        flipCard(card, { force: true });
      }
});

    
  } catch(e) {
    console.error(e)
  }
}



button.addEventListener("click", () => {
  getCard();
})