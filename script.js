//your JS code here. If required.
let currentPlayer = "X";
let player1 = "";
let player2 = "";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

document.getElementById("submit").addEventListener("click", () => {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();

  if (!player1 || !player2) {
    alert("Please enter names for both players!");
    return;
  }

  document.querySelector(".player-input").style.display = "none";
  document.querySelector(".game").style.display = "block";

  document.querySelector(".message").textContent = `${player1}, you're up!`;
});

const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const cellId = parseInt(cell.id) - 1;

    if (!gameActive || board[cellId] !== "") return;

    board[cellId] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
      const winner = currentPlayer === "X" ? player1 : player2;
      document.querySelector(".message").textContent = `${winner}, congratulations you won!`;
      gameActive = false;
      return;
    }

    if (board.every(cell => cell !== "")) {
      document.querySelector(".message").textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    const nextPlayer = currentPlayer === "X" ? player1 : player2;
    document.querySelector(".message").textContent = `${nextPlayer}, you're up!`;
  });
});

function checkWinner() {
  const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}
