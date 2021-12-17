const input = require('./input');
let xZone = input.match(/x=(-?\d+\.\.-?\d+)/)[0];
let yZone = input.match(/y=(-?\d+\.\.-?\d+)/)[0];
xZone = xZone.substring(2).split('..').map(x => parseInt(x));
yZone = yZone.substring(2).split('..').map(x => parseInt(x));

function velocityHitsTarget(x, y) {
  let newX = x;
  let newY = y;
  let highestY = 0;
  let position = [0, 0];
  let step = 0
  while(position[0] < xZone[1] && position[1] > yZone[0]) {
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
        return true;
    }
  }
  return false;
}

const velocities = [];
for (let x = 0; x <= 1000; x++) {
    for (let y = -1000; y < 1000; y++) {
        if(velocityHitsTarget(x,y)) velocities.push([x,y]);
    }
}

console.log(velocities.length);
