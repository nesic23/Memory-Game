const cards = document.querySelectorAll(".memoryCard");

// Start game
document.querySelector(".startGameButton").addEventListener("click", () => {
  const game = document.querySelector(".memoryGame");
  const startGameButton = document.querySelector(".startGameButton");

  game.style.visibility = "visible";
  startGameButton.style.visibility = "hidden";
  document.getElementById("header").style.visibility = "hidden";
});

// Shuffle cards
(() => {
  cards.forEach((card) => {
    let shuffleCards = Math.floor(Math.random() * 20);
    card.style.order = shuffleCards;
  });
})();

// Flip cards
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  matchCards();
}

// Match cards
cards.forEach((card) => card.addEventListener("click", flipCard));
let counter = 0;

matchCards = () => {
  if (firstCard.dataset.character === secondCard.dataset.character) {
    if (firstCard.alt === secondCard.alt) {
      blockEvents();
      setTimeout(() => {
        firstCard.style.visibility = "hidden";
        secondCard.style.visibility = "hidden";
        disableCards();
        restoreEvents();
        counter += 1;
        if (counter == cards.length / 2) {
          //congrats msg
          let newH1 = document.createElement("h1");
          newH1.innerHTML = "Bravo Matej!";
          document.body.appendChild(newH1);
          newH1.classList.add("congratsMsg");
        }
      }, 1000);
    }
    return;
  }
  unflipCards();
};

disableCards = () => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
};

unflipCards = () => {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
};

resetBoard = () => {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};

blockEvents = () => {
  cards.forEach((card) => {
    card.removeEventListener("click", flipCard);
  });
};

restoreEvents = () => {
  cards.forEach((card) => card.addEventListener("click", flipCard));
};
