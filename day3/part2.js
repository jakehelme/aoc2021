const input = require('./input');
let counts = {'0': 0, '1': 0}
let oxySet = [...input];
let co2Set = [...input];

for (let i = 0; i < 12; i++) {

    oxySet.forEach(el => {
        const bit = el[i];
        counts[bit]++;
    })

    if(counts['0'] > counts['1']) oxySet = oxySet.filter(el => el[i] === '0')
    else if (counts['0'] < counts['1'])  oxySet = oxySet.filter(el => el[i] === '1')
    else  oxySet = oxySet.filter(el => el[i] === '1')
    counts = {'0': 0, '1': 0};
    if (oxySet.length === 1) break;
}

for (let i = 0; i < 12; i++) {

    co2Set.forEach(el => {
        const bit = el[i];
        counts[bit]++;
    })

    if(counts['0'] < counts['1']) co2Set = co2Set.filter(el => el[i] === '0')
    else if (counts['0'] > counts['1'])  co2Set = co2Set.filter(el => el[i] === '1')
    else  co2Set = co2Set.filter(el => el[i] === '0')
    counts = {'0': 0, '1': 0};
    if (co2Set.length === 1) break;
}

console.log(oxySet);
console.log(co2Set);

console.log(parseInt(oxySet[0], 2) * parseInt(co2Set[0], 2));




