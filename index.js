let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function handleCellClick(cellIndex) {
    if (board[cellIndex] === "" && gameActive) {
        board[cellIndex] = currentPlayer;
        document.getElementById(`cell-${cellIndex}`).textContent = currentPlayer;
        const winningCombination = checkWinner(currentPlayer);
        if (winningCombination !== null) {
            drawWinningLine(winningCombination);
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

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] === player && board[b] === player && board[c] === player) {
            return combination;
        }
    }

    return null;
}

function drawWinningLine(combination) {
    const canvasContainer = document.getElementById("board");
    const canvas = document.createElement("canvas");
    canvas.classList.add("winning-line");
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvasContainer.offsetHeight;
    canvasContainer.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;

    const [a, b, c] = combination;
    const cellA = document.getElementById(`cell-${a}`).getBoundingClientRect();
    const cellB = document.getElementById(`cell-${b}`).getBoundingClientRect();
    const cellC = document.getElementById(`cell-${c}`).getBoundingClientRect();

    const pointA = {
        x: cellA.left - canvasContainer.offsetLeft + cellA.width / 2,
        y: cellA.top - canvasContainer.offsetTop + cellA.height / 2
    };

    const pointB = {
        x: cellB.left - canvasContainer.offsetLeft + cellB.width / 2,
        y: cellB.top - canvasContainer.offsetTop + cellB.height / 2
    };

    const pointC = {
        x: cellC.left - canvasContainer.offsetLeft + cellC.width / 2,
        y: cellC.top - canvasContainer.offsetTop + cellC.height / 2
    };

    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "2";

    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointC.x, pointC.y);
    ctx.stroke();
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
