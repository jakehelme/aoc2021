const input = require('./input');

const max = Math.max(...input);
const fuels = [];

for (let pos = 0; pos <= max; pos++) {
    let fuel = 0;
    input.forEach(crab => {
        fuel += Math.abs(crab - pos);
    });
    fuels.push(fuel);
}

console.log(Math.min(...fuels));