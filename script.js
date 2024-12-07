// DOM Elements
const board = document.getElementById("game-board");
const statusDisplay = document.getElementById("game-status");
const resetButton = document.getElementById("reset-btn");

// Game Variables
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

// Winning Conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Initialize Game Board
function initializeBoard() {
    board.innerHTML = "";
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
}

// Handle Cell Click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.dataset.index;

    if (gameState[cellIndex] !== "" || !isGameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    checkResult();
    if (isGameActive) switchPlayer();
}

// Switch Player
function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

// Check Game Result
function checkResult() {
    let roundWon = false;

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.textContent = "It's a tie!";
        isGameActive = false;
        return;
    }
}

// Reset Game
resetButton.addEventListener("click", initializeBoard);

// Start Game
initializeBoard();
