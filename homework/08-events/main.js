// win rules
const horizontalWins = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"]
];

const verticalWins = [
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"]
];

const diagonalWins = [
    ["1", "5", "9"],
    ["3", "5", "7"]
];

const winContext = {
    'horizontal': horizontalWins,
    // 'vertical': verticalWins,
    // 'diagonal': diagonalWins
}

// DOM extraction

const gameBoard = document.getElementById("game-board");
const boxes = gameBoard.getElementsByClassName("box");
const results = document.getElementById("results");

// position analysis

const hExtractLoop = (contentData, startNum, endNum) => {
    let row = [];
    for (let i = startNum; i < endNum; i++) {
        row.push(contentData[i]);
    }
    return row;
}

const horizontalExtract = (content) => {
    let extractedArray = [];

    let row1 = hExtractLoop(content, 0, 3);
    let row2 = hExtractLoop(content, 3, 6);
    let row3 = hExtractLoop(content, 6, 9);

    extractedArray.push(row1, row2, row3);
    return extractedArray;
}

const vExtractLoop = (contentData, startNum, endNum) => {
    let row = [];
    for (let i = startNum; i < endNum; i += 3) {
        row.push(contentData[i]);
    }
    return row;
}

const verticalExtract = (content) => {
    let extractedArray = [];

    let row1 = vExtractLoop(content, 0, 7);
    let row2 = vExtractLoop(content, 1, 8);
    let row3 = vExtractLoop(content, 2, 9);

    extractedArray.push(row1, row2, row3);
    return extractedArray;
}

const dExtractLoop = (contentData, startNum, endNum, increment) => {
    let row = [];
    for (let i = startNum; i < endNum; i += increment) {
        row.push(contentData[i]);
    }
    return row;
}

const diagonalExtract = (content) => {
    let extractedArray = [];

    let row1 = dExtractLoop(content, 0, 9, 4);
    let row2 = dExtractLoop(content, 2, 8, 2);

    extractedArray.push(row1, row2);
    return extractedArray;
}

// click awareness

let playHistory = [];
const playerX = "X";
const playerO = "O";

gameBoard.addEventListener("click", (e) => {
    let lastPlayer = playHistory[playHistory.length - 1];
    if (e.target.innerText === "RESULTS") {
        e.target.innerText = "RESULTS";
    } else if (e.target.innerText === playerX) {
        e.target.innerText = playerX;
    } else if (e.target.innerText === playerO) {
        e.target.innerText = playerO;
    } else {
        if (lastPlayer === undefined) {
            e.target.innerText = playerX;
            e.target.style.color = 'red';
            playHistory.push(playerX);
        } else if (lastPlayer === playerX) {
            e.target.innerText = playerO;
            e.target.color = 'black';
            playHistory.push(playerO);
        } else if (lastPlayer === playerO) {
            e.target.innerText = playerX;
            e.target.style.color = 'red';
            playHistory.push(playerX);
        } else {
            null
        }
    }
});

const verdict = (positions) => {
    for (let arr of positions) {
        if (arr.every(play => play === arr[0])) {
            return [true, arr[0]];
        } else {
            return false;
        }
        console.log(arr);
    }
}

const winAnalysis = (content) => {
    const horizontals = horizontalExtract(content);
    const verticals = verticalExtract(content);
    const diagonals = diagonalExtract(content);

    const horizontalVerdict = verdict(horizontals);
    const verticalVerdict = verdict(verticals);
    const diagonalVerdict = verdict(diagonals);

    if (horizontalVerdict[0]) {
        return `${horizontalVerdict[1]} has won!`;
    } else if (verticalVerdict[0]) {
        return `${verticalVerdict[1]} has won!`;
    } else if (diagonalVerdict[0]) {
        return `${diagonalVerdict[1]} has won!`;
    } else {
        return false;
    }
}

results.addEventListener('click', () => {
    let playerPositions = [];

    for (let box of boxes) {
        playerPositions.push(box.innerText);
    }

    console.log(winAnalysis(playerPositions));
});
