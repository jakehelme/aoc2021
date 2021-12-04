const fs = require('fs');

const input = fs.readFileSync('./day4/input.txt').toString();

const inputNumbers = input.match(/^.*$/m)[0].split(',').map(n => parseInt(n));

const boardsRaw = input.match(/\n.+\d\n.+\d\n.+\d\n.+\d\n.+\d\n/g);

const boards = []

boardsRaw.forEach(b => {
    boards.push(b.split('\n').filter(r => r !== '').map(r => r.split(/\s+/).filter(x => x !== '').map(x => parseInt(x))));
});

inputNumbers.forEach(inputNumber => {
    boards.forEach((board, boardIndex) => {
        board.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                if (col === inputNumber) {
                    boards[boardIndex][rowIndex][colIndex] = -1;
                }
            });
        });
    });
    boards.forEach((board) => {
        if(isRowBingo(board) || isColBingo(board)) {
            console.log('Bingo!');
            calculateResult(board, inputNumber);
            process.exit();
        }
    });
});

function calculateResult(board, finalNum) {
    let tot = 0;
    board.forEach(row => {
        row.forEach(col => {
            if(col >= 0) tot += col;
        })
    });
    console.log(tot * finalNum);
}

function isRowBingo(board) {
    board.forEach(row => {
        if(row[0] < 0 && row[1] < 0 && row[2] < 0 && row[3] < 0 && row[4] < 0) return true;
    })
    return false;
}

function isColBingo(board) {
    for (let col = 0; col < 5; col++) {
        if(board[0][col] < 0 && board[1][col] < 0 && board[2][col] < 0 && board[3][col] < 0 && board[4][col] < 0) return true;
    }
    return false;
}

console.log(inputNumbers);