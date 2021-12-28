const fs = require("fs");

const input = fs.readFileSync("./day22/input.txt").toString().split("\n");

const cuboids = input.map((x) => {
  const digits = x.match(/-?\d+/g).map(Number);
  const on = /^on/.test(x);
  return {
    x: [digits[0], digits[1]],
    y: [digits[2], digits[3]],
    z: [digits[4], digits[5]],
    on,
  };
});

const grid = {};

for (const cuboid of cuboids) {
  for (let x = Math.max(cuboid.x[0], -50); x <= Math.min(cuboid.x[1], 50); x++) {
    for (let y = Math.max(cuboid.y[0], -50); y <= Math.min(cuboid.y[1], 50); y++) {
      for (let z = Math.max(cuboid.z[0], -50); z <= Math.min(cuboid.z[1], 50); z++) {
        grid[`${x},${y},${z}`] = cuboid.on;
      }
    }
  }
}

let cubesOn = 0;
for (const cube in grid) {
  if(grid[cube]) cubesOn++;
}

console.log(cubesOn);
