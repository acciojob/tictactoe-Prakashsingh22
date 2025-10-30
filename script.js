const playerInput = document.getElementById("player-input");
const game = document.getElementById("game");
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

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value || "Player 1";
  player2 = document.getElementById("player-2").value || "Player 2";
  currentPlayer = player1;

  playerInput.classList.add("hidden");
  game.classList.remove("hidden");

  messageDiv.textContent = `${currentPlayer}, you're up!`;
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (gameOver || board[index] !== "") return;

    board[index] = currentSymbol;
    cell.textContent = currentSymbol;

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      gameOver = true;
      return;
    }

    if (board.every(cell => cell !== "")) {
      messageDiv.textContent = "It's a draw!";
      gameOver = true;
      return;
    }

    // Switch player
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

function highlightWinningCells(combo) {
  combo.forEach(index => {
    cells[index].classList.add("winner");
  });
}
