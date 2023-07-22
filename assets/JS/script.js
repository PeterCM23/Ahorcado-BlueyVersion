const words = ["bluey", "bingo", "chilly", "bandit"];
let chosenWord = "";
let guessedLetters = [];
let attemptsLeft = 6;

const hangmanParts = [
  `<circle cx="75" cy="25" r="20" stroke="black" stroke-width="3" />`,
  `<line x1="75" y1="45" x2="75" y2="90" stroke="black" stroke-width="3" />`,
  `<line x1="75" y1="60" x2="40" y2="40" stroke="black" stroke-width="3" />`,
  `<line x1="75" y1="60" x2="110" y2="40" stroke="black" stroke-width="3" />`,
  `<line x1="75" y1="90" x2="40" y2="130" stroke="black" stroke-width="3" />`,
  `<line x1="75" y1="90" x2="110" y2="130" stroke="black" stroke-width="3" />`,
  `<circle cx="75" cy="45" r="10" stroke="black" stroke-width="3" />`, // Cabeza del muñeco
];

function initializeGame() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  attemptsLeft = 6;

  const hangmanDiv = document.getElementById("hangman");
  hangmanDiv.innerHTML = `<line x1="10" y1="140" x2="70" y2="140" stroke="black" stroke-width="3" />
                          <line x1="40" y1="20" x2="40" y2="140" stroke="black" stroke-width="3" />
                          <line x1="40" y1="20" x2="75" y2="20" stroke="black" stroke-width="3" />`;

  const wordDisplay = document.getElementById("word-display");
  wordDisplay.textContent = createWordDisplay();

  const letterInput = document.getElementById("letter-input");
  letterInput.value = "";

  const message = document.getElementById("message");
  message.textContent = "";

  const resetBtn = document.getElementById("reset-btn");
  resetBtn.style.display = "none";
}

function createWordDisplay() {
  let display = "";
  for (let letter of chosenWord) {
    if (guessedLetters.includes(letter)) {
      display += letter + " ";
    } else {
      display += "_ ";
    }
  }
  return display;
}

function updateWordDisplay() {
  const wordDisplay = document.getElementById("word-display");
  wordDisplay.textContent = createWordDisplay();
}

function checkLetter(letter) {
  if (guessedLetters.includes(letter)) {
    return;
  }

  guessedLetters.push(letter);

  if (!chosenWord.includes(letter)) {
    attemptsLeft--;

    const hangmanDiv = document.getElementById("hangman");
    hangmanDiv.innerHTML += hangmanParts[6 - attemptsLeft];
  }

  updateWordDisplay();
  checkGameStatus();
}

function checkGameStatus() {
  const message = document.getElementById("message");
  if (attemptsLeft === 0) {
    message.textContent = `Perdiste. La palabra era "${chosenWord}".`;
    showResetButton();
  } else if (!createWordDisplay().includes("_")) {
    message.textContent = "¡Ganaste! Adivinaste la palabra.";
    showResetButton();
  }
}

function showResetButton() {
  const resetBtn = document.getElementById("reset-btn");
  resetBtn.style.display = "block";
}

const guessBtn = document.getElementById("guess-btn");
guessBtn.addEventListener("click", function () {
  const letterInput = document.getElementById("letter-input");
  const letter = letterInput.value.toLowerCase();

  if (letter.match(/[a-z]/) && letter.length === 1) {
    checkLetter(letter);
  }

  letterInput.value = "";
});

const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", function () {
  initializeGame();
});

initializeGame();
