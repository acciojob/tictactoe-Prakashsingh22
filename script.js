const playerInputDiv = document.querySelector(".player-input");
const gameDiv = document.querySelector(".game");
const submitBtn = document.getElementById("submit");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// When players click “Start Game”
submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value || "Player 1";
  player2 = document.getElementById("player-2").value || "Player 2";
  currentPlayer = player1;

  playerInputDiv.style.display = "none";
  gameDiv.style.display = "block";

  messageDiv.textContent = `${currentPlayer}, you're up!`;
});

// Handle cell clicks
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (gameOver || board[index] !== "") return;

    board[index] = currentSymbol;
    cell.textContent = currentSymbol;

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer}, congratulations you won! 🎉`;
      gameOver = true;
      return;
    }

    if (board.every(cell => cell !== "")) {
      messageDiv.textContent = "It's a draw!";
      gameOver = true;
      return;
    }

    // Switch turns
    if (currentSymbol === "X") {
      currentSymbol = "O";
      currentPlayer = player2;
    } else {
      currentSymbol = "X";
      currentPlayer = player1;
    }

    messageDiv.textContent = `${currentPlayer}, you're up!`;
  });
});

// Check for winner
function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWinningCells(combo);
      return true;
    }
  }
  return false;
}

// Highlight winning cells
function highlightWinningCells(combo) {
  combo.forEach(index => {
    cells[index].classList.add("winner");
  });
}
