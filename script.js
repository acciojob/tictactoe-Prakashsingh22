const submitBtn = document.getElementById('submit');
const inputSection = document.getElementById('input-section');
const gameSection = document.getElementById('game-section');
const boardDiv = document.getElementById('board');
const messageDiv = document.querySelector('.message');

let player1 = '';
let player2 = '';
let currentPlayer = '';
let currentSymbol = 'X';
let gameActive = true;
const boardState = Array(9).fill('');

const winCombos = [
	[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

submitBtn.addEventListener('click', () => {
	player1 = document.getElementById('player-1').value.trim();
    player2 = document.getElementById('player-2').value.trim();
    if (player1 === '' || player2 === '') {
	    alert('Please enter both player names!');
        return;
    }
    currentPlayer = player1;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
    inputSection.style.display = 'none';
    gameSection.style.display = 'block';
    createBoard();
});
function createBoard() {
	boardDiv.innerHTML = '';
    for (let i = 0; i < 9; i++) {
		const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = i + 1;
        cell.addEventListener('click', () => makeMove(cell, i));
        boardDiv.appendChild(cell);
    }
}
function makeMove(cell, index) {
	if (!gameActive || cell.textContent !== '') return;
	cell.textContent = currentSymbol;
    boardState[index] = currentSymbol;
	const winningCombo = checkWinner();
    if (winningCombo) {
		messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
        highlightWinner(winningCombo);
        gameActive = false;
        return;
    }
	if (boardState.every(cell => cell !== '')) {
		messageDiv.textContent = "It's a draw!";
        gameActive = false;
        return;
    }
	if (currentPlayer === player1) {
		currentPlayer = player2;
        currentSymbol = 'O';
    } else {
		currentPlayer = player1;
        currentSymbol = 'X';
    }
	messageDiv.textContent = `${currentPlayer}, you're up!`;
}
function checkWinner() {
	for (let combo of winCombos) {
		const [a, b, c] = combo;
        if (
          boardState[a] !== '' &&
          boardState[a] === boardState[b] &&
          boardState[a] === boardState[c]
        ){
          return combo;
        }
    }
      return null;
}
function highlightWinner(combo) {
	combo.forEach(index => {
		const cell = document.getElementById(index + 1);
        cell.classList.add('winner');
    });
}