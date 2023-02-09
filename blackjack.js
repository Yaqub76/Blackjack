// const deckUrl = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
// const hitButton = document.querySelector(".hit-button");
// const cardsContainer = document.querySelector(".cards");
// let deckId; 
// async function getDeck(){
//     // this is fetching from deck url
//     const response = await fetch(deckUrl);      
//     const deckDetails = await response.json();
// console.log(deckDetails.deckId)
// deckId = deckDetails.deck_id;
// }
// getDeck();
// // to create a shuffled deck and draw cards from that deck in the same request
// hitButton.onclick = async function(){
//     const cardUrl = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
//     const response = await fetch(cardUrl);      
//     const card = await response.json();
//     const cardDetails = card.cards[0];
//     cardsContainer.innerHtml += `<img src="${cardDetails.image}">`
// }

// gobal veribals here
// var yoursum = 0;
// var dealersum = 0;
// var yourAccCount = 0;
// var hidden; //keeps dealer card hidden
// var deck;
// var canHit = true; //player can hit if less then 21\
// // when page load we call a function
// window.onload = function() {
//     buildDeck();
// }
// function buildDeck() {
//     let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
//     let types = ["C", "D", "H", "S"];
//     deck = []; 
//     for (let i = 0; i < types.length; i++) {
//         for (let j = 0; j < values.length; j++) {
//             deck.push(values[j] + "-" + types[i]);
//         }
//     }
//     console.log(deck);
// }
