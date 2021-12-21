const fs = require("fs");

const input = fs.readFileSync("./day21/input.txt").toString();
const startingPos = input
  .split("\n")
  .map((x) => x.match(/\d+$/))
  .map(Number);

const players = [
  { score: 0, pos: startingPos[0] },
  { score: 0, pos: startingPos[1] },
];

let dieVal = 0;

function playRound(playerIndex) {
  let totalMove = 0;
  for (let i = 0; i < 3; i++) {
    dieVal++;
    totalMove += dieVal;
  }
  let newPos = players[playerIndex].pos + totalMove;
  if (!(newPos % 10)) {
    newPos = 10;
  } else {
    newPos = newPos.toString();
    newPos = parseInt(newPos.slice(newPos.length - 1));
  }

  players[playerIndex].pos = newPos;
  players[playerIndex].score += newPos;
}

while (true) {
  playRound(0);
  if(players[0].score >= 1000) break;
  playRound(1);
  if(players[1].score >= 1000) break;
}

const lowest = players.reduce((acc, x) => {
    if(x.score < acc) return acc = x.score;
    return acc;
}, Infinity)

console.log(lowest * dieVal);
