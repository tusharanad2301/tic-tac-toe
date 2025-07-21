// Get all the grid boxes
let boxes = document.querySelectorAll(".box");

// Game state variables
let turn = "X";
let isGameOver = false;

// Win counters
let xWins = 0;
let oWins = 0;

// Initialize the board and add click event listeners to each box
boxes.forEach(e => {
    e.innerHTML = ""; // Clear the box initially

    e.addEventListener("click", () => {
        // Only allow click if game is not over and box is empty
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn; // Set current player's symbol
            checkWin();         // Check for a win after each move
            checkDraw();        // Check for draw if no win
            changeTurn();       // Switch turns
        }
    });
});

// Function to switch turns and move the turn indicator
function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "190px"; // Move indicator to "O"
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "15px";  // Move indicator to "X"
    }
}

// Function to check for a win
function checkWin() {
    // All possible win combinations
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        // Check if all three boxes are filled and equal (win)
        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameOver = true;

            // Display winner
            document.querySelector("#results").innerHTML = turn + " win";
            document.querySelector("#play-again").style.display = "inline";

            // 🟢 Update win count and scoreboard
            if (turn === "X") {
                xWins++;
                document.getElementById("x-wins").textContent = xWins;
            } else {
                oWins++;
                document.getElementById("o-wins").textContent = oWins;
            }

            // Highlight the winning combination
            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winConditions[i][j]].style.color = "#000";
            }
        }
    }
}

// Function to check for a draw (when all boxes are filled and no win)
function checkDraw() {
    if (!isGameOver) {
        let isDraw = true;

        // Check if all boxes are filled
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });

        // If all are filled and no win, it's a draw
        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

// Reset the board but keep the scores
document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";

    // Reset the turn indicator position
    document.querySelector(".bg").style.left = "15px";
    
    // Clear result message and hide play again button
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    // Clear all boxes and remove styles
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
});

// Reset both players' scores to 0
document.getElementById("reset-scores").addEventListener("click", () => {
    xWins = 0;
    oWins = 0;

    // Update score display
    document.getElementById("x-wins").textContent = xWins;
    document.getElementById("o-wins").textContent = oWins;
});
