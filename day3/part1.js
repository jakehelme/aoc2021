const input = require('./input');
let counts = {'0': 0, '1': 0}
let gamma = '';

for (let i = 0; i < 12; i++) {

    input.forEach(el => {
        const bit = el[i];
        counts[bit]++;
    })

    if(counts['0'] > counts['1']) gamma += '0';
    else gamma += '1';
    counts = {'0': 0, '1': 0};
}

console.log(gamma);
let epsilon = '';
for (let i = 0; i < gamma.length; i++) {
    if(gamma[i] === '1') epsilon += '0';
    else epsilon += '1';
}
console.log(epsilon);
console.log(parseInt(gamma, 2));
console.log(parseInt(epsilon, 2));
console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));


