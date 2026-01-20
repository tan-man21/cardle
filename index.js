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

function createCylinderButton(text) {
    const btn = document.createElement("a");
    btn.classList.add("hand-btn", "fade-in");    
  
    const inner = document.createElement("span");
    inner.classList.add("inner-face");
    inner.textContent = text;
  
    btn.appendChild(inner);
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
    frontFace.textContent = "FRONT";

    card.append(backFace, frontFace);

    
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
    const numberBtn = createCylinderButton('N');
    //numberBtn.textContent = "Number";
    numberBtn.className = `hand-btn ${redCard ? 'red' : 'black'}`;
    const faceBtn = createCylinderButton('F');
    //faceBtn.textContent = "Face";
    faceBtn.className = `hand-btn ${redCard ? 'red' : 'black'}`;


    
    //Create suit buttons
    const diamondSuit = createCylinderButton('D');
    diamondSuit.className = "hand-btn red"
    const heartSuit = createCylinderButton('H');
    heartSuit.className = "hand-btn red"    
    const spadeSuit = createCylinderButton('S');
    spadeSuit.className = "hand-btn black"
    const clubSuit = createCylinderButton('C');
    clubSuit.className = "hand-btn black"
    
    //Create color buttons
    const redBtn = createCylinderButton();
    //redBtn.textContent = "Red"
    redBtn.className = "hand-btn red"
    const blackBtn = createCylinderButton();
    //blackBtn.textContent = "Black"
    blackBtn.className = "hand-btn black"
    
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
        card.style.display = "block";
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
      card.style.display = "block";
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
      card.style.display = "block";
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
      card.style.display = "block";
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
      card.style.display = "block";
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
      card.style.display = "block";
      } })
    
    numberBtn.addEventListener("click", () => {
      if(numberCard){ 
        alert("Correct!");
        
        addScore();
      } else {
        alert("Wrong!");
        
        resetScore();
      }
   });

faceBtn.addEventListener("click", () => {
  if(faceCard){ 
        alert("Correct!");
        
        addScore();
      } else {
        alert("Wrong!");
        
        resetScore();
      }
});

    
  } catch(e) {
    console.error(e)
  }
}



button.addEventListener("click", () => {
  getCard();
})