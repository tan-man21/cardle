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

const getCard = async () => {
  
  // Reset score every new card
  resetScore();
  
  //hides current card
  //card.style.display = "none";
  
  colorBtns.style.display = "flex";
  
  try {
    const res = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
    
    const data = await res.json();
    
    const cardData = data.cards[0];
    
    card.innerHTML = "";
    //Create Card Element
    const img = document.createElement("img");
    img.src = cardData.image;
    img.alt = `${cardData.value} of ${cardData.suit}`;
    //Display the Card in card container
    card.appendChild(img);
    
    //Checks color of current card
    if(cardData.suit === 'HEARTS' || cardData.suit === 'DIAMONDS') {
      redCard = true;
      blackCard = false;
    } else {
      redCard = false;
      blackCard = true;
    }
    
    // Determine suit
    switch (cardData.suit) {
      case "HEARTS":
        heart = true;
        break;
      case "DIAMONDS":
        diamond = true;
        break;
      case "SPADES":
        spade = true;
        break;
      case "CLUBS":
        club = true;
        break;
    }
    
    // Determine face or number
    let numberCard = !isNaN(Number(cardData.value));
    let faceCard = !numberCard;


    // Clear button containers
    colorBtns.innerHTML = "";
    suitBtns.innerHTML = "";
    faceNumBtns.innerHTML = "";
    
    //Create face or number buttons
    const numberBtn = document.createElement("a");
    //numberBtn.textContent = "Number";
    numberBtn.className = `hand-btn fade-in ${redCard ? 'number-red' : 'number-black'}`;
    const faceBtn = document.createElement("a");
    //faceBtn.textContent = "Face";
    faceBtn.className = `hand-btn fade-in ${redCard ? 'face-red' : 'face-black'}`;


    
    //Create suit buttons
    const diamondSuit = document.createElement("a");
    //diamondSuit.textContent = "Diamond"
    diamondSuit.className = "hand-btn cross fade-in"
    const heartSuit = document.createElement("a");
    //heartSuit.textContent = "Heart"
    heartSuit.className = "hand-btn heart fade-in"    
    const spadeSuit = document.createElement("a");
    //spadeSuit.textContent = "Spade"
    spadeSuit.className = "hand-btn flower fade-in"
    const clubSuit = document.createElement("a");
    //clubSuit.textContent = "Club"
    clubSuit.className = "hand-btn tick fade-in"
    
    //Create color buttons
    const redBtn = document.createElement("a");
    //redBtn.textContent = "Red"
    redBtn.className = "hand-btn fade-in red"
    const blackBtn = document.createElement("a");
    //blackBtn.textContent = "Black"
    blackBtn.className = "hand-btn fade-in black"
    
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