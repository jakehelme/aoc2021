const fs = require("fs");

const input = fs.readFileSync("./day22/input.txt").toString().split("\n");

const cuboids = input
  .map((x) => {
    const digits = x.match(/-?\d+/g).map(Number);
    const on = /^on/.test(x);
    return {
      x: [digits[0], digits[1]],
      y: [digits[2], digits[3]],
      z: [digits[4], digits[5]],
      on,
    };
  })
  .reverse();

function volume(box) {
  return (
    (box.x[1] - box.x[0] + 1) *
    (box.y[1] - box.y[0] + 1) *
    (box.z[1] - box.z[0] + 1)
  );
}

function overlap(box, boxesChecked) {
  const allOverlaps = boxesChecked.map((b, i) => {
    const xOverlapMin = Math.max(box.x[0], b.x[0]);
    const xOverlapMax = Math.min(box.x[1], b.x[1]);
    const yOverlapMin = Math.max(box.y[0], b.y[0]);
    const yOverlapMax = Math.min(box.y[1], b.y[1]);
    const zOverlapMin = Math.max(box.z[0], b.z[0]);
    const zOverlapMax = Math.min(box.z[1], b.z[1]);
    if (
      xOverlapMax - xOverlapMin >= 0 &&
      yOverlapMax - yOverlapMin >= 0 &&
      zOverlapMax - zOverlapMin >= 0
    ) {
      const overlappingCube = {
        x: [xOverlapMin, xOverlapMax],
        y: [yOverlapMin, yOverlapMax],
        z: [zOverlapMin, zOverlapMax],
      };
      return (
        volume(overlappingCube) -
        overlap(overlappingCube, boxesChecked.slice(i + 1))
      );
    } else {
      return 0;
    }
  });

  return allOverlaps.reduce((acc, x) => acc + x, 0);
}

const cuboidsChecked = [];
let cubesOn = 0;
for (const cuboid of cuboids) {
  if (cuboid.on) {
    cubesOn += volume(cuboid) - overlap(cuboid, cuboidsChecked);
  }
  cuboidsChecked.push(cuboid);
}

console.log(cubesOn);