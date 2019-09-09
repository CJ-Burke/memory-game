// Shuffle function from http://stackoverflow.com/a/2450976
moves = 0;
matchedCards = 0;
openCards = [];
matches = [];
let seconds = 00;
let minutes = 00;
let hours = 00;
createDeck();
addListeners();
startTimer();



function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

 function createDeck() {
 	const cardList = document.querySelectorAll('.card'); /*selects all cards from html*/
 	const cardArray = Array.from(cardList); /*puts the cards into an array*/
 	const shuffleArray = shuffle(cardArray); /*shuffles the array of cards*/
 	for (i=0; i < cardList.length; i++) {
 		const oldCard = cardList[i];
 		oldCard.remove();
 	} /*loops over the array of cards and removes old cards from the html so they aren't doubled on screen*/
 	const deckFragment = document.createDocumentFragment();
 	for (i=0; i < shuffleArray.length; i++) {
 		const newCard = document.createElement('li');
 		newCard.innerHTML = shuffleArray[i].innerHTML;
 		newCard.className = shuffleArray[i].className;
 		deckFragment.appendChild(newCard);
 	} /*creates the new shuffled deck of cards using document fragment*/
 	const newDeckList = document.querySelector('.deck');
 	newDeckList.appendChild(deckFragment); /*displays the newly shuffled deck*/
}

function addListeners() {
    const cardDeck = document.querySelector('.deck');
    cardDeck.addEventListener('click', flipCard);
}
function removeListeners() {
    const cardDeck = document.querySelector('.deck');
    cardDeck.removeEventListener('click', flipCard);
}

function flipCard(e) {
    if (e.target.className === 'card') {
        e.target.classList.add('open', 'show');
        openCards.push(e.target);
        if (openCards.length === 2) {
            checkCards();
        }
    }
}

function displayMoves(){
    moves += 1;
  document.querySelector('.moves').innerHTML= moves;
}

function starRating(){
  let stars = document.querySelector('.stars');
  if (moves === 12){
  stars.removeChild(stars.lastElementChild)
}
else if (moves === 15){
  stars.removeChild(stars.lastElementChild)
}
else if (moves === 18){
  stars.removeChild(stars.lastElementChild)
}
};

let replay = document.querySelector('.fa-repeat');
replay.addEventListener('click', function(e) {
  location.reload(true);
});

function checkCards() {
    removeListeners();
    displayMoves();
    starRating();
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        setTimeout(match, 200);
    } else {
        setTimeout(notMatch, 800);
    };
}



function add() {

  seconds++;
    if (seconds >= 60) {
        seconds = 00;
        minutes++;
        if (minutes >= 60) {
            minutes = 00;
            hours++;
          }
        }
document.querySelector('.time').innerHTML = hours + ":" + minutes + ":" + seconds;
startTimer();
}

function startTimer() {
t = setTimeout(add, 1000);
};

function match() {
    console.log("cards match");
openCards[0].classList.remove('open', 'show');
openCards[1].classList.remove('open', 'show');
openCards[0].classList.add('match');
openCards[1].classList.add('match');
matchedCards += 2;
	openCards = [];
	addListeners();
  if (matchedCards === 16){
    gameOver();
  }
}
function notMatch() {
    console.log("cards don't match");
    openCards[0].classList.remove('open', 'show');
    openCards[1].classList.remove('open', 'show');
	openCards = [];
	addListeners();
}

function myModal(){
    let stars = document.querySelector('.stars');
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    document.querySelector('.timeMin').innerHTML= "It took you " + minutes + " minutes";
    document.querySelector('.timeSec').innerHTML = seconds + " seconds";
    document.querySelector('.starRate').innerHTML = "You've earned " + stars.children.length + " stars!";
    let restart = document.querySelector('.restartBtn');
    restart.addEventListener('click', function(e) {
            location.reload(true);
            modal.style.display = "none";
    })
    window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
  }

function gameOver(){
  clearTimeout(t);
  if (matchedCards === 16){
    myModal();
};
}
