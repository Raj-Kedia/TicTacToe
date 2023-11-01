let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function handleCellClick(cellIndex) {
    if (board[cellIndex] === "" && gameActive) {
        board[cellIndex] = currentPlayer;
        document.getElementById(`cell-${cellIndex}`).textContent = currentPlayer;
        if (checkWinner(currentPlayer)) {
            document.getElementById("message").textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (board.every(cell => cell !== "")) {
            document.getElementById("message").textContent = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("message").textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

function initializeGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    document.getElementById("board").innerHTML = "";
    document.getElementById("message").textContent = `Player ${currentPlayer}'s turn`;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("id", `cell-${i}`);
        cell.addEventListener("click", () => handleCellClick(i));
        document.getElementById("board").appendChild(cell);
    }
}

function resetGame() {
    initializeGame();
}

initializeGame();