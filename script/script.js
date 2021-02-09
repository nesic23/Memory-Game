const cards = document.querySelectorAll(".memory-card");

// Start game
document.querySelector(".start-game-btn").addEventListener("click", () => {
  const game = document.querySelector(".memory-game");
  const startGameButton = document.querySelector(".start-game-btn");
  const btnContainer = document.querySelector(".btn-container");

  game.style.visibility = "visible";
  btnContainer.style.display = "none";
  startGameButton.style.display = "none";
});

// Shuffle cards
const shuffleCards = () => {
  cards.forEach((card) => {
    let shuffle = Math.floor(Math.random() * 20);
    card.style.order = shuffle;
  });
};

shuffleCards();

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
          const game = document.querySelector(".memory-game");
          const btnContainer = document.querySelector(".btn-container");
          //congrats msg
          game.style.display = "none";
          btnContainer.style.display = "flex";
          const newH1 = document.createElement("h1");
          const newGameButton = document.createElement("button");

          newH1.innerHTML = "Congratulations!";
          newH1.classList.add("header");
          newGameButton.appendChild(document.createTextNode("Play again?"));
          newGameButton.classList.add("start-game-btn");
          btnContainer.appendChild(newH1);
          btnContainer.appendChild(newGameButton);
          newGameButton.addEventListener("click", () => {
            game.style.display = "flex";
            game.style.visibility = "visible";
            btnContainer.style.display = "none";
            cards.forEach((card) => {
              card.classList.remove("flip");
              card.style.visibility = "visible";
              shuffleCards();
            });
          });
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
