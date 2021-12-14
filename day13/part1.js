const input = require('./input');

const dots = input.filter(x => /\d+,\d+/.test(x)).map(x => x.split(',').map(y => parseInt(y)));
const folds = input.filter(x => /fold along *./.test(x)).map(x => x.match(/[xy]=\d+/)[0]);

const maxWidth = Math.max(...dots.map(x => x[0]));
const maxHeight = Math.max(...dots.map(x => x[1]));

let grid = [];

for (let y = 0; y <= maxHeight; y++) {
    grid.push([]);
    for (let x = 0; x <= maxWidth; x++) {
        grid[y].push('.');
    }
}

dots.forEach(x => grid[x[1]][x[0]] = '#');

let toTranspose;
let foldLine = parseInt(folds[0].match(/\d+/)[0])
if (folds[0][0] === 'x') {
    toTranspose = dots.filter(x => x[0] > parseInt(folds[0].match(/\d+/)[0]));
    grid.forEach(x => x.splice(foldLine));
} else {
    toTranspose = dots.filter(x => x[1] > parseInt(folds[0].match(/\d+/)[0]));
    grid.splice(foldLine);
}

toTranspose.forEach(x => {
    if (folds[0][0] === 'x') {
        grid[x[1]][Math.abs(2 * foldLine - x[0])] = '#';
    } else {
        grid[Math.abs(2 * foldLine - x[1])][x[0]] = '#';
    }
});

const dotsFlat = grid.flat().filter(x => x === '#');
console.log(dotsFlat.length);