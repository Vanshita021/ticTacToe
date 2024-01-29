// Game state
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

// Function to check for a win
function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
      return true;
    }
  }

  return false;
}

// Function to check for a tie
function checkTie() {
  return !board.includes('');
}

// Function to handle cell click
function handleCellClick(index) {
  if (board[index] === '' && !checkWin() && !checkTie()) {
    board[index] = currentPlayer;
    renderBoard();
    if (checkWin()) {
      showResult(`Player ${currentPlayer} wins!`);
    } else if (checkTie()) {
      showResult("It's a tie!");
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

// Function to reset the game
function resetGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  renderBoard();
}

// Function to render the board
function renderBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = board[i];
    cell.addEventListener('click', () => handleCellClick(i));
    boardElement.appendChild(cell);
  }
}

// Function to show the result pop-up
function showResult(message) {
  const resultElement = document.createElement('div');
  resultElement.className = 'game-result';
  
  const heading = document.createElement('h2');
  heading.textContent = message;
  resultElement.appendChild(heading);
  
  const newGameButton = document.createElement('button');
  newGameButton.textContent = 'New Game';
  newGameButton.addEventListener('click', () => {
    document.body.removeChild(resultElement);
    resetGame();
  });
  resultElement.appendChild(newGameButton);

  document.body.appendChild(resultElement);
}

// Initial render
renderBoard();
