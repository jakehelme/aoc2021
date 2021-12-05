const input = require('./input');

const coords = input.map(x => x.match(/\d+/g).map(y => parseInt(y)));

const straights = coords.filter(x => x[0] === x[2] || x[1] === x[3] || Math.abs(x[0] - x[2]) / Math.abs(x[1] - x[3]) === 1);

const grid = [];

for (let i = 0; i < 1000; i++) {
    grid.push([]);
    grid[i] = [];
    for (let j = 0; j < 1000; j++) {
        grid[i][j] = '.';
    }
}

straights.forEach(line => {
    if (line[0] === line[2]) {
        for (let i = Math.min(line[1], line[3]); i <= Math.max(line[1], line[3]); i++) {
            grid[i][line[0]] === '.' ? grid[i][line[0]] = 1 : grid[i][line[0]]++;
        }
    } else if (line[1] === line[3]) {
        for (let i = Math.min(line[0], line[2]); i <= Math.max(line[0], line[2]); i++) {
            grid[line[1]][i] === '.' ? grid[line[1]][i] = 1 : grid[line[1]][i]++;
        }
    } else {
        const m = (line[0] - line[2]) / (line[1] - line[3]);
        const c = line[0] - (m * line[1]);
        for (let x = Math.max(line[1], line[3]); x >= Math.min(line[1], line[3]); x--) {
            const y = m * x + c;
            grid[x][y] === '.' ? grid[x][y] = 1 : grid[x][y]++;
        }
    }
});

let count = 0;

for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
        if (grid[x][y] !== '.' && grid[x][y] > 1) count++;
    }
}

console.log(count);