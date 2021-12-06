const input = require('./input');

const days = 256;

let fishWithDaysLeft = {
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0
};

input.forEach(f => {
    fishWithDaysLeft[f]++;
});

for (let day = 0; day < days; day++) {
    const newFishDays = {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0
    };

    for (let i = 8; i >= 0; i--) {
        if(i === 8) {
            newFishDays[7] = fishWithDaysLeft[8]
            newFishDays[i] = fishWithDaysLeft[0];
        } else if(i < 8 && i > 0) {
            newFishDays[i-1] = fishWithDaysLeft[i];
        } else {
            newFishDays[6] += fishWithDaysLeft[i];
        }
        
    }

    fishWithDaysLeft = newFishDays;
}

let totFish = 0;
for (const day in fishWithDaysLeft) {
    if (Object.hasOwnProperty.call(fishWithDaysLeft, day)) {
        const element = fishWithDaysLeft[day];
        totFish += element;
    }
}
console.log(totFish);