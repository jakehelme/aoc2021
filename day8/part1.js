const input = require('./input');

const outputs = input.flatMap(x => x.split(' | ')[1].split(' '));

let count = 0;

outputs.forEach(x => {
    if (x.length === 2 || x.length === 4 || x.length === 3 || x.length === 7) count++;
});

console.log(count);
// 1 4 7 8