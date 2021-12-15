const input = require('./input');

const template = input[0];
const rules = input.slice(2).map(x => x.split(' -> '));
let polymer = template;

for (let step = 0; step < 10; step++) {
    let newPolymer = '';
    for (let i = 0; i < polymer.length - 1; i++) {
        const pair = polymer.slice(i, i+2);
        const rule = rules.filter(x => x[0] === pair);
        if(!i) newPolymer += pair[0];
        if(rule.length){
            newPolymer += rule[0][1] + pair[1];
        }
    }
    polymer = newPolymer;
    newPolymer = '';
}

const counts = {};
polymer.split('').forEach(x => {
    if(counts[x]) counts[x]++;
    else counts[x] = 1;
});
const tots = [];
for (const i in counts) {
    tots.push(counts[i]);
}

console.log(Math.max(...tots) - Math.min(...tots));