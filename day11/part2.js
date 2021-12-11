const input = require('./input');

const grid = input.map(x => x.split('').map(y => ({energy: parseInt(y), checked: false})));

let step = 0;
let cont = true;

while (cont) {

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            grid[y][x].energy++;
        }
    }

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const octo = grid[y][x];
            if (octo.energy > 9) {
                octo.checked = true;
                for (let i = Math.max(0, y - 1); i <= Math.min(y + 1, grid.length - 1); i++) {
                    for (let j = Math.max(0, x - 1); j <= Math.min(x + 1, grid[y].length - 1); j++) {
                        if (y !== i || x !== j) {
                            grid[i][j].energy++;
                        }
                    }
                }
            }
        }
    }

    while(grid.flatMap(x => x).some(x => x.energy > 9 && !x.checked)) {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                const octo = grid[y][x];
                if (octo.energy > 9 && !octo.checked) {
                    octo.checked = true;
                    for (let i = Math.max(0, y - 1); i <= Math.min(y + 1, grid.length - 1); i++) {
                        for (let j = Math.max(0, x - 1); j <= Math.min(x + 1, grid[y].length - 1); j++) {
                            if (y !== i || x !== j) {
                                grid[i][j].energy++;
                            }
                        }
                    }
                }
            }
        }
    }
    
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x].energy > 9) {
                grid[y][x].energy = 0;
            }
            grid[y][x].checked = false;
        }
    }

    step++;
    if(!grid.flatMap(x => x).some(x => x.energy)) {
        console.log(step);
        cont = false;
    }
    
}

function printOcts(grid) {
    let out = '';
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            out += grid[y][x].energy;
        }
        out += '\n';
    }
    console.log(out);
}

printOcts(grid);


