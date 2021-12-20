const input = require("./input");

const enhanceAlg = input[0];

const inputImage = input.slice(2).map((x) => x.split(""));

const neighborDirs = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 0],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function expandImage(grid, replaceValue) {
  const image = new Array(grid.length + 2);

  for (let y = 0; y < image.length; y++) {
    image[y] = new Array(grid[0].length + 2);
    for (let x = 0; x < image[y].length; x++) {
      if (!x || !y || x === image[y].length - 1 || y === image.length - 1) {
        image[y][x] = replaceValue;
      } else {
        image[y][x] = grid[y - 1][x - 1];
      }
    }
  }
  return image;
}

let workingImage = inputImage;

for (let step = 0; step < 50; step++) {
  if (!step) workingImage = expandImage(workingImage, ".");
  else if (step % 2 === 0)
    workingImage = expandImage(workingImage, enhanceAlg[enhanceAlg.length - 1]);
  else workingImage = expandImage(workingImage, enhanceAlg[0]);

  let enchancedImage = new Array(workingImage.length);
  for (let y = 0; y < workingImage.length; y++) {
    enchancedImage[y] = new Array(workingImage[y].length);
    for (let x = 0; x < workingImage[y].length; x++) {
      let code = "";
      for (const neighbor of neighborDirs) {
        if (
          y + neighbor[0] < 0 ||
          x + neighbor[1] < 0 ||
          y + neighbor[0] >= workingImage.length ||
          x + neighbor[1] >= workingImage[y].length
        ) {
          if (!step) code += ".";
          else if (step % 2 === 0) code += enhanceAlg[enhanceAlg.length - 1];
          else code += enhanceAlg[0];
        } else {
          code += workingImage[y + neighbor[0]][x + neighbor[1]];
        }
      }
      code = code.replace(/\./g, "0").replace(/#/g, "1");
      const algPos = parseInt(code, 2);
      enchancedImage[y][x] = enhanceAlg[algPos];
    }
  }
  workingImage = enchancedImage;
}

console.log(
  workingImage.flat().reduce((acc, x) => {
    if (x === "#") return acc + 1;
    else return acc;
  }, 0)
);
