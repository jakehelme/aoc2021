const input = require('./input.js');

let last;
let increasing = 0;
let decreasing = 0;

input.forEach(el => {
    if(last) {
        if (el > last) increasing++;
        else decreasing++;
    }
    last = el;
})

console.log(increasing);