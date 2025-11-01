const submitBtn = document.getElementById('submit');
const inputSection = document.getElementById('input-section');
const gameSection = document.getElementById('game-section');
const boardDiv = document.getElementById('board');
const messageDiv = document.querySelector('.message');
const resetBtn = document.getElementById('reset');

let player1 = '';
let player2 = '';
let currentPlayer = '';
let currentSymbol = 'X';
let gameActive = true;
let boardState = []; 
const winCombos = [
	[0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

    submitBtn.addEventListener('click', () => {
      player1 = document.getElementById('player-1').value.trim();
      player2 = document.getElementById('player-2').value.trim();
      if (player1 === '' || player2 === '') {
        alert('Please enter both player names!');
        return;
      }

      startNewGame();
      inputSection.style.display = 'none';
      gameSection.style.display = 'block';
    });

    resetBtn.addEventListener('click', () => {
      // keep same players, just restart
      startNewGame();
    });

    function startNewGame() {
      // reset game state
      boardState = Array(9).fill('');
      currentSymbol = 'X';
      gameActive = true;
      currentPlayer = player1;
      messageDiv.textContent = `${currentPlayer}, you're up!`;
      resetBtn.style.display = 'none';
      createBoard();
    }

    function createBoard() {
      boardDiv.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);  // prefer data-* to avoid id collisions
        cell.id = String(i + 1);
        cell.textContent = ''; // clear any previous
        cell.addEventListener('click', () => makeMove(cell, i), { once: false });
        boardDiv.appendChild(cell);
      }
    }

    function makeMove(cell, index) {
      if (!gameActive || boardState[index] !== '') return;

      // mark
      boardState[index] = currentSymbol;
      cell.textContent = currentSymbol;

      // check winner
      const winningCombo = checkWinner();
      if (winningCombo) {
        messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
        highlightWinner(winningCombo);
        gameActive = false;
        resetBtn.style.display = 'inline-block';
        return;
      }

      // check draw
      if (boardState.every(v => v !== '')) {
        messageDiv.textContent = "It's a draw!";
        gameActive = false;
        resetBtn.style.display = 'inline-block';
        return;
      }

      // switch turn
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
      for (const combo of winCombos) {
        const [a,b,c] = combo;
        if (boardState[a] !== '' &&
            boardState[a] === boardState[b] &&
            boardState[a] === boardState[c]) {
          return combo;
        }
      }
      return null;
    }

    function highlightWinner(combo) {
      combo.forEach(index => {
        const cell = document.getElementById(String(index + 1));
        if (cell) cell.classList.add('winner');
      });
    }