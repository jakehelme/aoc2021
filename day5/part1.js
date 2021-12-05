const input = require('./input');

const coords = input.map(x => x.match(/\d+/g).map(y => parseInt(y)));

const straights = coords.filter(x => x[0] === x[2] || x[1] === x[3]);

const grid = [];

for (let i = 0; i < 1000; i++) {
    grid.push([]);
    grid[i] = [];
    for (let j = 0; j < 1000; j++) {
        grid[i][j] = '.';
    }
}

straights.forEach(x => {
    if(x[0] === x[2]) {
        for (let i = Math.min(x[1], x[3]); i <= Math.max(x[1], x[3]); i++) {
            grid[i][x[0]] === '.' ? grid[i][x[0]] = 1 : grid[i][x[0]]++;
        }
    } else {
        for (let i = Math.min(x[0], x[2]); i <= Math.max(x[0], x[2]); i++) {
            grid[x[1]][i] === '.' ? grid[x[1]][i] = 1 : grid[x[1]][i]++;
        }
    }
});

let count = 0;

for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
        if (grid[x][y] !== '.' && grid[x][y] > 1) count++;
    }
}

console.log(count);