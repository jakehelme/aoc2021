const Heap = require("heap");
const input = require("./input");

const grid = input.map((y) => y.split("").map((x) => parseInt(x)));

let openList = new Heap((a, b) => a.f - b.f);
const closedList = [];

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
  closedList.push(currentNode);

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
    for (const closedNode of closedList) {
      if (
        closedNode.pos[0] === child.pos[0] &&
        closedNode.pos[1] === child.pos[1]
      ) {
        continue checkchild;
      }
    }

    const D = 1;
    child.g = currentNode.g + grid[child.pos[0]][child.pos[1]];
    child.h =
      D *
      (Math.abs(child.pos[0] - endNode.pos[0]) +
        Math.abs(child.pos[1] - endNode.pos[1]));
    child.f = child.g + child.h;

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
