const input = require('./input');

const days = 80;

let oldFish = [];
let newFish = [];
let allFish = [...input];

for (let day = 0; day < days; day++) {
    allFish.forEach(f => {
        if (f - 1 === 0) {
            oldFish.push(0);
         } else if (f - 1 < 0) {
            oldFish.push(6);
            newFish.push(8);
        } else {
            oldFish.push(f - 1);
        }
    });
    
    allFish = [...oldFish, ...newFish];
    newFish = [];
    oldFish = []; 
}

console.log(allFish.length);