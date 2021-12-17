const input = require('./input');
let xZone = input.match(/x=(-?\d+\.\.-?\d+)/)[0];
let yZone = input.match(/y=(-?\d+\.\.-?\d+)/)[0];
xZone = xZone.substring(2).split('..').map(x => parseInt(x));
yZone = yZone.substring(2).split('..').map(x => parseInt(x));

function fireProbe(x, y) {
  let newX = x;
  let newY = y;
  let highestY = 0;
  let position = [0, 0];
  let step = 0
  while(position[0] < xZone[1] && position[1] > yZone[1]) {
    position[0] += newX;
    position[1] += newY;
    if (newX < 0) {
      newX++;
    } else if (newX > 0) {
      newX--;
    }
    if(position[1] > highestY) highestY = position[1];
    newY--;
    step++;
    if(xZone[0] <= position[0] && position[0] <= xZone[1] && yZone[0] <= position[1] && position[1] <= yZone[1]) {
        return highestY;
    }
  }
  return null;
}

let xForTargetMin;
for(let x = 0; x < Infinity; x++) {
    if((Math.pow(x,2)+x)/2 > xZone[0]) {
        xForTargetMin = x;
        break;
    }
}
let xForTargetMax;
for(let x = xForTargetMin + 1; x < Infinity; x++) {
    if((Math.pow(x,2)+x)/2 > xZone[1]) {
        xForTargetMax = x - 1;
        break;
    }
}

const highestPoints = [];
for (let x = xForTargetMin; x <= xForTargetMax; x++) {
    for (let y = 0; y < 1000; y++) {
        const highest = fireProbe(x,y);        
        if(highest) highestPoints.push(highest);
    }
}

console.log(Math.max(...highestPoints));
