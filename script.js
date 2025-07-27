let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let xWins = 0, oWins = 0, draws = 0;
let playWithAI = false; // default: no AI

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
  cell.addEventListener("click", cellClicked);
});

function cellClicked(e) {
  const index = e.target.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();

  if (playWithAI && currentPlayer === "O" && gameActive) {
    setTimeout(aiMove, 500);
  }
}

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      cells[a].style.backgroundColor = "#90ee90";
      cells[b].style.backgroundColor = "#90ee90";
      cells[c].style.backgroundColor = "#90ee90";

      statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
      gameActive = false;
      updateScore(currentPlayer);
      return;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "🤝 It's a Draw!";
    gameActive = false;
    updateScore("draw");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Current Turn: ${currentPlayer}`;
}

function updateScore(winner) {
  if (winner === "X") xWins++;
  else if (winner === "O") oWins++;
  else draws++;

  document.getElementById("xWins").textContent = xWins;
  document.getElementById("oWins").textContent = oWins;
  document.getElementById("draws").textContent = draws;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Current Turn: X";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.backgroundColor = "white";
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function aiMove() {
  let emptyIndexes = board.map((val, idx) => val === "" ? idx : null).filter(idx => idx !== null);
  if (emptyIndexes.length === 0) return;

  let move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  board[move] = "O";
  cells[move].textContent = "O";
  checkWinner();
}
