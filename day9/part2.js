const input = require('./input');

const heightMap = input.map(x => x.split('').map(y => parseInt(y)));

const lows = [];

for (let y = 0; y < heightMap.length; y++) {
    for (let x = 0; x < heightMap[y].length; x++) {
        const neighbors = [];
        for (let i = Math.max(0, y - 1); i <= Math.min(y + 1, heightMap.length - 1); i++) {
            for (let j = Math.max(0, x - 1); j <= Math.min(x + 1, heightMap[y].length - 1); j++) {
                if (y !== i || x !== j) {
                    if ((i === y && j !== x) || (i !== y && j === x)) {
                        neighbors.push(heightMap[i][j]);
                    }
                }
            }
        }
        const current = heightMap[y][x]
        if (Math.min(...neighbors, current) === current) {
            if (neighbors.filter(x => x === current).length === 0) {
                lows.push([y, x]);
            }

        }

    }
}

function checkCardinalLines(position, prevInBasin) {
    let inBasin;
    if (prevInBasin) {
        inBasin = prevInBasin;
        const currentPosIndex = inBasin.findIndex(x => x.pos[0] === position[0] && x.pos[1] === position[1]);
        inBasin[currentPosIndex].checked = true;
    } else {
        inBasin = [{ checked: true, pos: [...position] }];
    }
    // right
    let it = position[1] + 1;
    while (it < heightMap[position[0]].length && heightMap[position[0]][it] !== 9) {
        if (inBasin.findIndex(x => x.pos[0] === position[0] && x.pos[1] === it) < 0) {
            inBasin.push({ checked: false, pos: [position[0], it] });
        }

        it++;
    }
    // down
    it = position[0] + 1;
    while (it < heightMap.length && heightMap[it][position[1]] !== 9) {
        if (inBasin.findIndex(x => x.pos[0] === it && x.pos[1] === position[1]) < 0) {
            inBasin.push({ checked: false, pos: [it, position[1]] });
        }
        it++;
    }
    // left
    it = position[1] - 1;
    while (it >= 0 && heightMap[position[0]][it] !== 9) {
        if (inBasin.findIndex(x => x.pos[0] === position[0] && x.pos[1] === it) < 0) {
            inBasin.push({ checked: false, pos: [position[0], it] });
        }
        it--;
    }
    // up
    it = position[0] - 1;
    while (it >= 0 && heightMap[it][position[1]] !== 9) {
        if (inBasin.findIndex(x => x.pos[0] === it && x.pos[1] === position[1]) < 0) {
            inBasin.push({ checked: false, pos: [it, position[1]] });
        }
        it--;
    }

    const next = inBasin.findIndex(x => !x.checked);
    if (next > -1) {
        checkCardinalLines([inBasin[next].pos[0], inBasin[next].pos[1]], inBasin);
    }
    return inBasin.length;
}

const sizes = [];
lows.forEach(x => {
    const size = checkCardinalLines(x, undefined);
    sizes.push(size);
});

sizes.sort((a,b) => b - a);

console.log(sizes[0] * sizes[1] * sizes[2]);
