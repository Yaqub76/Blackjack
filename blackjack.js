const API_URL = `https://deckofcardsapi.com/api/deck/ntr1lqsx9iso/draw/?count=2`;
const hitButton = document.querySelector('.hit-button');
const stayButton = document.querySelector('.stay-button');
const message = document.querySelector(".message");
const winner = document.querySelector(".winner");
const busted = document.querySelector(".busted");
const won = document.querySelector(".won");
const lost = document.querySelector(".lost");
const loser = document.querySelector(".loser");
const push = document.querySelector(".push");
const main = document.querySelector("main");
const playAgain = document.querySelector(".play-again");
const dealerTotalNumber = document.querySelector("#dealer-total-number");
const playerTotalNumber = document.querySelector("#player-total-number");
//The code createstwo arrays playerCards and dealerCards to store the cards drawn
let playerCards = [];
let dealerCards = [];
let dealerTotal = 0;
let playerTotal = 0;
//the eevent listener triggers a call to the function 
hitButton.addEventListener('click', () => {
  fetchCards(1, playerCards);
});

stayButton.addEventListener('click', () => {
  fetchCards(1, dealerCards, true);
});

playAgain.addEventListener('click', () => {
 dealerTotal = 0;
 playerTotal = 0;
playerCards = [];
  dealerCards = [];
  main.style.filter = "blur(0px)";
  message.style.display = "none";
  won.style.display = "none";
  busted.style.display = "none";
  lost.style.display = "none";
  winner.style.display = "none";
  fetchCards(1, playerCards);
});
//the fetchCards function is used to get a specified number of cards from the API
function fetchCards(count, targetArray, isDealer = false) {
  fetch(`${API_URL}&count=${count}`)
    .then(response => response.json())
    .then(data => {
      targetArray.push(...data.cards);
      renderCards(targetArray, isDealer);
      dealerTotal = calculateValue(dealerCards);
      checkBust(playerCards);
      dealerTotalNumber.innerHTML = data.DealerTotal;
      playerTotalNumber.innerHTML = data.PlayerTotal;
    });
}
//The renderCards function takes two arguments cards and isDealer
//It is used to display the cards in the HTML file.
function renderCards(cards, isDealer) {
  let cardsContainer = document.querySelector('.player-cards');
  if (isDealer) {
    cardsContainer = document.querySelector('.dealer-cards');
  }

  cardsContainer.innerHTML = '';

  cards.forEach(card => {
    const cardElement = document.createElement('img');
    cardElement.src = card.image;
    //the alt attribtue is set to a string that describes the cards value and suit
    cardElement.alt = `${card.value} of ${card.suit}`;
    cardsContainer.appendChild(cardElement);
  });
}
//takes an array of card suits as an argument and 
//gets us the total value of the cards
function checkBust(cards) {
    let playerTotal = 0;
    // If the value is "KING", "QUEEN", or "JACK", the total is increased by 10
    // If the is "ACE" , the total is increased by 11 if less den equal to 21 if not it will be 1
    cards.forEach(card => {
      if (card.value === "KING" || card.value === "QUEEN" || card.value === "JACK"){
        playerTotal += 10;
      } else if(card.value === "ACE" && (playerTotal + 11) <= 21){
        playerTotal += 11;
      }
      else if(card.value === "ACE"){
        playerTotal += 1;
      }
      else {
        playerTotal += parseInt(card.value);
      }
    });
  console.log(playerTotal);
    //display a message to the user that they have busted if they pass 21
  if (playerTotal > 21) {
        main.style.filter = "blur(4px)";
        message.style.display = "block";
    }
    else if(playerTotal == 21) {
        main.style.filter = "blur(4px)";
        winner.style.display = "block";
    }
}
// Fetch the dealer's cards from the API
// Function to calculate the total value of a set of cards
function calculateValue(cards) {
  let dealerTotal = 0;
  cards.forEach(card => {
    if (card.value === "KING" || card.value === "QUEEN" || card.value === "JACK") {
        dealerTotal += 10;
    } else if (card.value === "ACE") {
      if (dealerTotal + 11 <= 21) {
        dealerTotal += 11;
      } else {
        dealerTotal += 1;
      }
    } else {
        dealerTotal += parseInt(card.value);
    }
  });
  console.log(dealerTotal);
 if(dealerTotal == 21) {
    main.style.filter = "blur(4px)";
    loser.style.display = "block";
}
else if (dealerTotal > 21) {
    main.style.filter = "blur(4px)";
    busted.style.display = "block";
}
}



function checkTotals() {
    let dealerTotal = 0;
    let playerTotal = 0;
    if (dealerTotal >= 17) {
      if (dealerTotal > 21) {
        console.log("Player wins! Dealer went over 21.");
        main.style.filter = "blur(4px)";
        busted.style.display = "block";
      } else if (dealerTotal > playerTotal) {
        console.log("Dealer wins with a total of " + dealerTotal);
        main.style.filter = "blur(4px)";
        lost.style.display = "block";
      } else if (playerTotal > dealerTotal) {
        console.log("Player wins with a total of " + playerTotal);
        main.style.filter = "blur(4px)";
        won.style.display = "block";
      } else {
        console.log("It's a push!");
        main.style.filter = "blur(4px)";
        push.style.display = "block";
      }
    }
  }
  
  checkTotals();
