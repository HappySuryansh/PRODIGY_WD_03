let currentPlayer = 'X';
let board = Array(9).fill('');
let vsAI = false;
let scores = { X: 0, O: 0 };
let playerNames = { X: 'Player 1', O: 'Player 2' };
let taunts = [
  "Nice try! 😎",
  "I was saving that spot! 😏",
  "Too slow! 🤖",
  "You blinked! 😉",
  "Predictable human move."
];

function startGame(mode) {
  vsAI = mode === 'AI';
  document.getElementById('main-menu').classList.add('hidden');
  document.getElementById('name-input').classList.remove('hidden');
}

function initGame() {
  let p1 = document.getElementById('player1').value || 'Player 1';
  let p2 = document.getElementById('player2').value || (vsAI ? 'AI' : 'Player 2');
  playerNames = { X: p1, O: p2 };
  scores = { X: 0, O: 0 };
  document.getElementById('name-input').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  resetBoard();
}

function updateBoard() {
  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = '';
  board.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.textContent = cell;
    div.onclick = () => handleMove(index);
    boardDiv.appendChild(div);
  });
  document.getElementById('scoreboard').textContent = `${playerNames.X}: ${scores.X} | ${playerNames.O}: ${scores.O}`;
}

function handleMove(index) {
  if (board[index] !== '' || checkWinner()) return;
  board[index] = currentPlayer;
  updateBoard();

  if (checkWinner()) {
    scores[currentPlayer]++;
    highlightWin();
  } else if (board.every(cell => cell !== '')) {
    document.getElementById('taunt').textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (vsAI && currentPlayer === 'O') {
      setTimeout(aiMove, 500);
    }
  }
}

function aiMove() {
  let available = board.map((v, i) => v === '' ? i : null).filter(i => i !== null);
  let move = available[Math.floor(Math.random() * available.length)];
  board[move] = 'O';
  document.getElementById('taunt').textContent = taunts[Math.floor(Math.random() * taunts.length)];
  currentPlayer = 'X';
  updateBoard();
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
}

function highlightWin() {
  const win = checkWinner();
  if (!win) return;
  win.forEach(i => document.getElementsByClassName('cell')[i].classList.add('win'));
}

function resetBoard() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  document.getElementById('taunt').textContent = '';
  updateBoard();
}

function goToMenu() {
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('main-menu').classList.remove('hidden');
}
