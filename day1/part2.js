const input = require('./input.js');

let last;
let increasing = 0;
let decreasing = 0;

input.forEach((el, i) => {
    if(i < input.length - 2){
        const sum = el + input[i+1] + input[i+2];
        if(last) {
            if (sum > last) increasing++;
            else decreasing++;
        }
        last = sum;
    }
})

console.log(increasing);