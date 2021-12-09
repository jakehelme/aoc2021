const input = require('./input');

const heightMap = input.map(x => x.split('').map(y => parseInt(y)));

const lows = [];

for (let y = 0; y < heightMap.length; y++) {
    for (let x = 0; x < heightMap[y].length; x++) {
        const neighbors = [];
        for (let i = Math.max(0, y - 1); i <= Math.min(y + 1, heightMap.length -1); i++) {
            for (let j = Math.max(0, x - 1); j <= Math.min(x + 1, heightMap[y].length -1); j++) {
                if(y !== i || x !== j) {
                    if((i === y && j !== x) || (i !== y && j === x)){
                        neighbors.push(heightMap[i][j]);
                    }
                }
            }
        }
        const current = heightMap[y][x]
        if(Math.min(...neighbors, current) === current) {
            if(neighbors.filter(x => x === current).length === 0) {
                lows.push(heightMap[y][x]);
            }
        
        }
        
    }
}

console.log(lows.map(x => x+1).reduce((tot, i) => tot + i));
