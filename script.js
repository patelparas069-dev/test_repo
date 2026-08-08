const cells = document.querySelectorAll(".cell");
const message = document.querySelector("#message");
const resetButton = document.querySelector("#reset");

let currentPlayer = "X";
let gameOver = false;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        // Don't allow clicking after game is over
        if (gameOver) {
            return;
        }

        // Don't allow changing an already filled cell
        if (cell.textContent !== "") {
            return;
        }

        // Put X or O
        cell.textContent = currentPlayer;

        // Check winner
        if (checkWinner()) {
            message.textContent = `Player ${currentPlayer} Wins!`;
            gameOver = true;
            return;
        }

        // Check draw
        if (checkDraw()) {
            message.textContent = "It's a Draw!";
            gameOver = true;
            return;
        }

        // Change player
        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }

        message.textContent = `Player ${currentPlayer}'s Turn`;
    });
});

function checkWinner() {
    for (let pattern of winningPatterns) {
        const a = cells[pattern[0]].textContent;
        const b = cells[pattern[1]].textContent;
        const c = cells[pattern[2]].textContent;

        if (a !== "" && a === b && b === c) {
            return true;
        }
    }

    return false;
}

function checkDraw() {
    for (let cell of cells) {
        if (cell.textContent === "") {
            return false;
        }
    }

    return true;
}

resetButton.addEventListener("click", () => {
    cells.forEach((cell) => {
        cell.textContent = "";
    });

    currentPlayer = "X";
    gameOver = false;

    message.textContent = "Player X's Turn";
});
