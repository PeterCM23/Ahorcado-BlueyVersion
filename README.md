# Ahorcado-BlueyVersion
Practica HTML,CSS,JS
// Declaración de palabras posibles para adivinar
const words = ["bluey", "bingo", "bandit", "chilly"];

// Variable que almacenará la palabra seleccionada para adivinar
let chosenWord = "";

// Array que almacenará las letras adivinadas por el jugador
let guessedLetters = [];

// Variable que guarda el número de intentos restantes antes de completar el muñeco del ahorcado
let attemptsLeft = 6;

// Array con el código SVG para dibujar las diferentes partes del muñeco del ahorcado
const hangmanParts = [
  `<circle cx="75" cy="25" r="20" stroke="black" stroke-width="3" />`,
  `<line x1="75" y1="45" x2="75" y2="90" stroke="black" stroke-width="3" />`,
  `<line x1="75" y1="60" x2="40" y2="40" stroke="black" stroke-width="3" />`,
  `<line x1="75" y1="60" x2="110" y2="40" stroke="black" stroke-width="3" />`,
  `<line x1="75" y1="90" x2="40" y2="130" stroke="black" stroke-width="3" />`,
  `<line x1="75" y1="90" x2="110" y2="130" stroke="black" stroke-width="3" />`,
  `<circle cx="75" cy="55" r="10" stroke="black" stroke-width="3" />` // Cabeza del muñeco
];

// Función que inicializa el juego y reinicia todas las variables y elementos del juego
function initializeGame() {
  // Seleccionar una palabra aleatoria del array 'words'
  chosenWord = words[Math.floor(Math.random() * words.length)];

  // Reiniciar el array de letras adivinadas
  guessedLetters = [];

  // Reiniciar el número de intentos restantes
  attemptsLeft = 6;

  // Obtener referencia al elemento SVG donde dibujamos el muñeco del ahorcado
  const hangmanDiv = document.getElementById("hangman");

  // Dibujar la estructura básica del muñeco del ahorcado al inicio de cada partida
  hangmanDiv.innerHTML = `<line x1="10" y1="140" x2="70" y2="140" stroke="black" stroke-width="3" />
                          <line x1="40" y1="20" x2="40" y2="140" stroke="black" stroke-width="3" />
                          <line x1="40" y1="20" x2="75" y2="20" stroke="black" stroke-width="3" />`;

  // Obtener referencia al elemento HTML donde se muestra la palabra oculta
  const wordDisplay = document.getElementById("word-display");

  // Mostrar la palabra oculta con las letras adivinadas y no adivinadas
  wordDisplay.textContent = createWordDisplay();

  // Obtener referencia al campo de entrada donde el jugador ingresa sus adivinanzas
  const letterInput = document.getElementById("letter-input");

  // Reiniciar el campo de entrada para que esté vacío al inicio de cada partida
  letterInput.value = "";

  // Obtener referencia al elemento HTML donde se muestra el mensaje de resultado del juego
  const message = document.getElementById("message");

  // Reiniciar el mensaje para que esté vacío al inicio de cada partida
  message.textContent = "";

  // Ocultar el botón de reinicio al inicio de cada partida
  const resetBtn = document.getElementById("reset-btn");
  resetBtn.style.display = "none";
}

// Función para crear el string que representa la palabra oculta con las letras adivinadas
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

// Función para actualizar el display de la palabra oculta en el HTML
function updateWordDisplay() {
  const wordDisplay = document.getElementById("word-display");
  wordDisplay.textContent = createWordDisplay();
}

// Función que verifica si la letra adivinada es correcta o incorrecta
function checkLetter(letter) {
  // Verificar si la letra ya ha sido adivinada antes
  if (guessedLetters.includes(letter)) {
    return;
  }

  // Agregar la letra al array de letras adivinadas
  guessedLetters.push(letter);

  // Verificar si la letra está presente en la palabra seleccionada
  if (!chosenWord.includes(letter)) {
    // Si la letra no está en la palabra, disminuir el número de intentos restantes
    attemptsLeft--;

    // Agregar una nueva parte del muñeco del ahorcado usando el array 'hangmanParts'
    const hangmanDiv = document.getElementById("hangman");
    hangmanDiv.innerHTML += hangmanParts[6 - attemptsLeft];
  }

  // Actualizar el display de la palabra oculta con las letras adivinadas y no adivinadas
  updateWordDisplay();

  // Verificar si el juego ha terminado
  checkGameStatus();
}

// Función para verificar si el juego ha terminado (el jugador ha ganado o perdido)
function checkGameStatus() {
  const message = document.getElementById("message");

  // Verificar si el jugador ha perdido (se han agotado los intentos)
  if (attemptsLeft === 0) {
    message.textContent = `Perdiste. La palabra era "${chosenWord}".`;

    // Mostrar el botón de reinicio para que el jugador pueda empezar una nueva partida
    showResetButton();
  } else if (!createWordDisplay().includes("_")) {
    // Verificar si el jugador ha ganado (todas las letras adivinadas)
    message.textContent = "¡Ganaste! Adivinaste la palabra.";

    // Mostrar el botón de reinicio para que el jugador pueda empezar una nueva partida
    showResetButton();
  }
}

// Función para mostrar el botón de reinicio al final del juego
function showResetButton() {
  const resetBtn = document.getElementById("reset-btn");
  resetBtn.style.display = "block";
}

// Agregar evento de clic al botón "Adivinar" para que el jugador pueda hacer sus adivinanzas
const guessBtn = document.getElementById("guess-btn");
guessBtn.addEventListener("click", function() {
  // Obtener la letra ingresada por el jugador
  const letterInput = document.getElementById("letter-input");
  const letter = letterInput.value.toLowerCase();

  // Verificar si la letra ingresada es una letra válida
  if (letter.match(/[a-z]/) && letter.length === 1) {
    // Verificar si la letra adivinada es correcta o incorrecta
    checkLetter(letter);
  }

  // Reiniciar el campo de entrada para que el jugador pueda ingresar una nueva letra
  letterInput.value = "";
});

// Agregar evento de clic al botón de reinicio para que el jugador pueda comenzar una nueva partida
const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", function() {
  initializeGame();
});

// Inicializar el juego al cargar la página
initializeGame();
