const input = require("./input");

let rawScanners = [];

let scanner = [];
for (const [i, line] of input.entries()) {
  if (/---/.test(line)) {
    if (i) rawScanners.push(scanner);
    scanner = [];
  } else if (!line) {
  } else {
    scanner.push(line.split(",").map((x) => parseInt(x)));
  }
  if (i === input.length - 1) rawScanners.push(scanner);
}

const getScannerWithOrientation = (scanner, orientation) => {
  const direction = Math.floor(orientation / 4);
  const rotation = orientation % 4;

  return scanner.map(([x, y, z]) => {
    // go up
    if (direction === 1) [y, z] = [z, -y];
    // go down
    if (direction === 2) [y, z] = [-z, y];
    // go left
    if (direction === 3) [x, z] = [-z, x];
    // go right
    if (direction === 4) [x, z] = [z, -x];
    // look behind
    if (direction === 5) [x, z] = [-x, -z];

    // 90deg right
    if (rotation === 1) [x, y] = [-y, x];
    // 180deg right
    if (rotation === 2) [x, y] = [-x, -y];
    // 270deg right
    if (rotation === 3) [x, y] = [y, -x];

    return [x, y, z];
  });
};

function orientateScanners(scanners) {
  const orientatedScanners = [
    { pos: [0, 0, 0], beacons: scanners.shift(), isChecked: false },
  ];

  while (scanners.length) {
    for (let i = 0; i < orientatedScanners.length; i++) {
      const { pos, beacons, isChecked } = orientatedScanners[i];
      if (isChecked) continue;
      orientatedScanners[i].isChecked = true;

      inner: for (let j = scanners.length - 1; j >= 0; --j) {
        const testScanner = scanners[j];

        for (let k = 0; k < 24; k++) {
          const reoriented = getScannerWithOrientation(testScanner, k);
          const relativeDistances = {};
          for (const [x1, y1, z1] of beacons) {
            for (const [x2, y2, z2] of reoriented) {
              const key = `${x1 - x2},${y1 - y2},${z1 - z2}`;
              relativeDistances[key] = relativeDistances[key] + 1 || 1;

              if (relativeDistances[key] >= 12) {
                const [offX, offY, offZ] = key.split(",").map(Number);
                scanners.splice(j, 1);

                orientatedScanners.push({
                  pos: [pos[0] + offX, pos[1] + offY, pos[2] + offZ],
                  beacons: reoriented,
                  isChecked: false,
                });

                continue inner;
              }
            }
          }
        }
      }
    }
  }
  return orientatedScanners;
}

const orientatedScanners = orientateScanners(rawScanners);

const distances = [];
for (let i = 0; i < orientatedScanners.length - 1; i++) {
  for (let j = i + 1; j < orientatedScanners.length; j++) {
    const dist =
      Math.abs(orientatedScanners[i].pos[0] - orientatedScanners[j].pos[0]) +
      Math.abs(orientatedScanners[i].pos[1] - orientatedScanners[j].pos[1]) +
      Math.abs(orientatedScanners[i].pos[2] - orientatedScanners[j].pos[2]);
    distances.push(dist);
  }
}

console.log(Math.max(...distances));
