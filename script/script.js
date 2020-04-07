const cards = document.querySelectorAll(".memoryCard");

// Start game
document.querySelector("#startGameButton").addEventListener("click", () => {
  const game = document.querySelector(".memoryGame");
  const startGame = document.querySelector("#startGameButton");

  game.style.visibility = "visible";
  startGame.remove();
  document.getElementById("header").remove();
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

matchCards = () => {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    if (firstCard.alt === secondCard.alt) {
      blockEvents();
      setTimeout(() => {
        firstCard.style.visibility = "hidden";
        secondCard.style.visibility = "hidden";
        disableCards();
        restoreEvents();
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

gameOver = () => {
  if (
    cards.forEach((card) => {
      card.style.visibility === "hidden";
    })
  ) {
    console.log("congrats");
  }
};
