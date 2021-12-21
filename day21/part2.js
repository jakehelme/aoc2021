const fs = require("fs");

const input = fs.readFileSync("./day21/input.txt").toString();
const startingPos = input
  .split("\n")
  .map((x) => x.match(/\d+$/))
  .map(Number);

let gameVersions = { [`${startingPos[0] - 1}|0,${startingPos[1] - 1}|0`]: 1 };
let p1wins = 0;
let p2wins = 0;

function playRound(gameVersions, isPlayer1 = true) {
  const newVersions = {};

  for (const version in gameVersions) {
    const currentPos = isPlayer1
      ? parseInt(version.match(/\d+/)[0])
      : parseInt(version.split(",")[1].match(/\d+/)[0]);
    const currentScore = isPlayer1
      ? parseInt(version.split(",")[0].match(/\d+$/)[0])
      : parseInt(version.split(",")[1].match(/\d+$/)[0]);
    for (let x = 1; x <= 3; x++) {
      for (let y = 1; y <= 3; y++) {
        for (let z = 1; z <= 3; z++) {
          const dice = x + y + z;
          const pos = (currentPos + dice) % 10;
          const score = currentScore + pos + 1;
          const key = isPlayer1
            ? `${pos}|${score},${version.split(",")[1]}`
            : `${version.split(",")[0]},${pos}|${score}`;
          newVersions[key] =
            newVersions[key] + gameVersions[version] || gameVersions[version];
        }
      }
    }
  }

  for (const version in newVersions) {
    if (isPlayer1) {
      const score = parseInt(version.split(",")[0].match(/\d+$/)[0]);
      if (score >= 21) {
        p1wins += newVersions[version];
        delete newVersions[version];
      }
    } else {
      const score = parseInt(version.split(",")[1].match(/\d+$/)[0]);
      if (score >= 21) {
        p2wins += newVersions[version];
        delete newVersions[version];
      }
    }
  }
  return newVersions;
}

while (Object.keys(gameVersions).length) {
  gameVersions = playRound(gameVersions, true);
  gameVersions = playRound(gameVersions, false);
}

console.log(Math.max(p1wins, p2wins));
