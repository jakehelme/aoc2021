const fs = require("fs");

const raw = fs.readFileSync("./day25/input.txt", "utf8");

let grid = raw.split("\n").map((x) => x.split(""));
let steps = 0;
let madeMove = true;
while (madeMove) {
  madeMove = false;
  steps++;
  let newGrid = grid.map((i) => i.map((j) => j));
  //move east
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const tile = grid[i][j];
      if (tile === ">") {
        if (j + 1 < grid[i].length) {
          if (grid[i][j + 1] === ".") {
            newGrid[i][j + 1] = ">";
            newGrid[i][j] = ".";
            madeMove = true;
          }
        } else {
          //wrap
          if (grid[i][0] === ".") {
            newGrid[i][0] = ">";
            newGrid[i][j] = ".";
            madeMove = true;
          }
        }
      }
    }
  }

  grid = newGrid.map((i) => i.map((j) => j));
  // move south
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const tile = grid[i][j];
      if (tile === "v") {
        if (i + 1 < grid.length) {
          if (grid[i + 1][j] === ".") {
            newGrid[i + 1][j] = "v";
            newGrid[i][j] = ".";
            madeMove = true;
          }
        } else {
          //wrap
          if (grid[0][j] === ".") {
            newGrid[0][j] = "v";
            newGrid[i][j] = ".";
            madeMove = true;
          }
        }
      }
    }
  }
  grid = newGrid;
}

console.log(steps);
