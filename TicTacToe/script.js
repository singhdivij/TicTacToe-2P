let btn = document.querySelectorAll(".btn");
let resetButton = document.querySelector("#resetBtn");
let hideThis = document.querySelector(".new-game");
let winnerMsg = document.querySelector("#winner-msg");
let newBtn = document.querySelector("#new-btn");
let info = document.querySelector(".info");
let endgif = document.querySelector(".hidegif");

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

let turnO = true;

// Reset the game to original state
const resetFunction = () => {
    turnO = true;
    enableButtons();
    info.innerText = "Start with O."
    winnerMsg.innerText = '';
    hideThis.classList.add("hidden");
    endgif.classList.add("hidegif");
}
// Disable buttons
const disableButtons = () => {
    btn.forEach((buttons) => {
        buttons.disabled = true;
    })

}
// Enable buttons and clear them of text and color-classes.
const enableButtons = () => {
    btn.forEach((box) => {
        box.innerText = '';
        box.disabled = false;
        box.classList.remove("xmark", "omark");
    })
}
// Display winner message. Unhide the div.new-game
const winnerAlert = (winner) => {
    disableButtons();
    winnerMsg.innerText = `Winner of this round is ${winner}`;
    hideThis.classList.remove("hidden");
}
// Check for a winner.
const checkWin = () => {
    for (let pattern of winningPatterns) {
        let x = btn[pattern[0]].innerText;
        let y = btn[pattern[1]].innerText;
        let z = btn[pattern[2]].innerText;
        if (x != "" && y != "" && z != "") {
            if (x === y && y === z) {
                if (btn[pattern[0]].classList.contains('xmark')) {
                    winnerAlert('X');
                } else {
                    winnerAlert('O');
                }
                info.innerText = "Hands up, don't move!"
                endgif.classList.remove("hidegif");
                return true;
            }
        }
    }
    return false;
}
// Check for no winners after all the boxes are marked.
const noWin = () => {
    let occupiedBtn = 0
    btn.forEach((box) => {
        if (box.innerText != '') {
            occupiedBtn += 1;
        }
    })
    console.log("Occupied buttons:", occupiedBtn);
    console.log("Winner message:", winnerMsg.innerText);
    if (occupiedBtn === 9 && winnerMsg.innerText === '') {
        winnerMsg.innerText = "No winner in this round.";
        hideThis.classList.remove("hidden");
        info.innerText = "Got no moves?!"
        return true;
    }
    return false;
}

// Handle button click event to place markers and switch turns.
btn.forEach((box) => {
    box.addEventListener('click', () => {
        //Player turns
        if (!box.innerText) {
            if (turnO) {
                box.innerText = "O";
                box.classList.add("omark");
                info.innerText = "Place marker for X.";
            }
            else {
                box.innerText = 'X';
                box.classList.add("xmark");
                info.innerText = "Place marker for O.";
            }
            turnO = !turnO;
            box.disabled = true;
            checkWin();
            noWin();
        }
    })
})
// Handle Reset and New Game buttons click events.
resetButton.addEventListener('click', resetFunction);
newBtn.addEventListener('click', resetFunction);