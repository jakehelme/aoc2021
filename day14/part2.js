const input = require('./input');

const template = input[0];
const rules = input.slice(2).map(x => x.split(' -> '));
let polymer = template;
let pairs = {};

for (let i = 0; i < polymer.length - 1; i++) {
    const pair = polymer.slice(i, i+2);
    pairs[pair] ? pairs[pair]++ : pairs[pair] = 1;
}

for (let step = 0; step < 40; step++) {
    let newPairs = {};
    for (const pair in pairs) {
        if (Object.hasOwnProperty.call(pairs, pair)) {
            
                const rule = rules.filter(x => x[0] === pair)[0];
                const newPair1 = pair[0] + rule[1];
                const newPair2 = rule[1] + pair[1];
                newPairs[newPair1] ? newPairs[newPair1]+= pairs[pair] : newPairs[newPair1] = pairs[pair];
                newPairs[newPair2] ? newPairs[newPair2]+= pairs[pair] : newPairs[newPair2] = pairs[pair];
            
        }
    }
    pairs = newPairs;
    newPairs = {};
}

// const counts = {};
// for (const pair in pairs) {
//     if (Object.hasOwnProperty.call(pairs, pair)) {
//         const pairCount = pairs[pair];
//         const char1 = pair[0];
//         const char2 = pair[1];
//         counts[char1] ? counts[char1] += pairCount : counts[char1] = pairCount;
//         counts[char2] ? counts[char2] += pairCount : counts[char2] = pairCount;
//     }
// }

const chars = new Set();
Object.keys(pairs).forEach(x => x.split('').forEach(y => chars.add(y)));

const tots = {};

[...chars].forEach(char => {
    for (const pair in pairs) {
        if (Object.hasOwnProperty.call(pairs, pair)) {
            if(pair[0] === char) {
                tots[char] ? tots[char] += pairs[pair] : tots[char] = pairs[pair];
            }
        }
    }
});

const counts = [];
for (const char in tots) {
    if (Object.hasOwnProperty.call(tots, char)) {
        counts.push(tots[char]);
    }
}

console.log(Math.max(...counts) - Math.min(...counts));