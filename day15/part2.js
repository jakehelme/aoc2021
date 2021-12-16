const Heap = require("heap");
const input = require("./input");

const map = input.map((y) => y.split("").map((x) => parseInt(x)));

const grid = [];
for (let y = 0; y < map.length * 5; y++) {
  grid.push([]);
  for (let x = 0; x < map[0].length * 5; x++) {
    const originalValue = map[y % map.length][x % map[0].length];
    const modifier = Math.floor(y / map.length) + Math.floor(x / map[0].length);
    const newValue =
      originalValue + modifier > 9
        ? originalValue + modifier - 9
        : originalValue + modifier;
    grid[y].push(newValue);
  }
}

let openList = new Heap((a, b) => a.f - b.f);
const closedList = {};

const startNode = {
  parent: null,
  pos: [0, 0],
  f: 0,
  g: 0,
  h: 0,
};

const endNode = {
  parent: null,
  pos: [grid.length - 1, grid[grid.length - 1].length - 1],
  f: 0,
  g: 0,
  h: 0,
};

openList.push(startNode);

while (!openList.empty()) {
  const currentNode = openList.pop();
  closedList[`${currentNode.pos[0]},${currentNode.pos[1]}`] = currentNode;

  if (
    currentNode.pos[0] === endNode.pos[0] &&
    currentNode.pos[1] === endNode.pos[1]
  ) {
    console.log(currentNode.f);
    break;
  }

  const children = [];

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  directions.forEach((dir) => {
    const nodePos = [currentNode.pos[0] + dir[0], currentNode.pos[1] + dir[1]];
    if (
      nodePos[0] < 0 ||
      nodePos[0] >= grid.length ||
      nodePos[1] < 0 ||
      nodePos[1] >= grid[0].length
    )
      return;

    const newNode = { parent: currentNode, pos: [...nodePos] };

    children.push(newNode);
  });

  checkchild: for (const child of children) {
    if (closedList[`${child.pos[0]},${child.pos[1]}`]) {
      continue;
    }

    const D = 1;
    child.g = currentNode.g + grid[child.pos[0]][child.pos[1]];
    child.h =
      D *
      (Math.abs(child.pos[0] - endNode.pos[0]) +
        Math.abs(child.pos[1] - endNode.pos[1]));
    child.f = child.g + child.h;

    // this can still be done better
    for (const openNode of openList.toArray()) {
      if (
        openNode.pos[0] === child.pos[0] &&
        openNode.pos[1] === child.pos[1] &&
        child.g > openNode.g
      ) {
        continue checkchild;
      }
    }

    openList.push(child);
  }
}
