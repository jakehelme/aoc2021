const input = require("./input");

function addSnailNumbers(a, b) {
  return JSON.stringify([JSON.parse(a), JSON.parse(b)]);
}

function explodeIfNeeded(snailNum) {
  let newNum;
  let depth = 0;
  for (let i = 0; i < snailNum.length; i++) {
    const char = snailNum[i];
    if (char === "[") depth++;
    else if (char === "]") depth--;
    if (depth === 5) {
      const pairToExplode = snailNum.substring(i + 1).match(/^(\d+,\d+)/)[0];
      const [left, right] = pairToExplode.split(",").map((x) => parseInt(x));
      newNum = snailNum.split("");
      newNum.splice(i, pairToExplode.length + 2, "0");
      for (let j = i + 1; j < newNum.length; j++) {
        if (
          j + 1 < newNum.length &&
          /\d/.test(newNum[j]) &&
          /\d/.test(newNum[j + 1])
        ) {
          const num = parseInt(`${newNum[j]}${newNum[j + 1]}`);
          const sum = num + right;
          newNum.splice(j, 2, ...`${sum}`.split(""));
          break;
        } else if (/\d/.test(newNum[j])) {
          newNum[j] = `${parseInt(newNum[j]) + right}`;
          console.log();
          break;
        }
      }
      for (let j = i - 1; j >= 0; j--) {
        if (j - 1 >= 0 && /\d/.test(newNum[j]) && /\d/.test(newNum[j - 1])) {
          const num = parseInt(`${newNum[j - 1]}${newNum[j]}`);
          const sum = num + left;
          newNum.splice(j - 1, 2, ...`${sum}`.split(""));
          break;
        } else if (/\d/.test(newNum[j])) {
          newNum[j] = `${parseInt(newNum[j]) + left}`;
          break;
        }
      }
      newNum = newNum.join("");
      return [true, newNum];
    }
  }
  return [false, snailNum];
}

function splitIfNeeded(snailNum) {
  let newNum;
  for (let i = 0; i < snailNum.length - 2; i++) {
    const char = snailNum[i];
    if (/\d/.test(char) && /\d/.test(snailNum[i + 1])) {
      newNum = snailNum.split("");
      const newNumX = Math.floor(parseInt(snailNum.substring(i, i + 2)) / 2);
      const newNumY = Math.ceil(parseInt(snailNum.substring(i, i + 2)) / 2);
      newNum.splice(i, 2, `[${newNumX},${newNumY}]`);
      newNum = newNum.join("");
      return [true, newNum];
    }
  }
  return [false, snailNum];
}

function calculateMagnitude(snailNum) {
  let newNum = snailNum;
  while (newNum.match(/\d+,\d+/)) {
    const match = newNum.match(/\d+,\d+/);
    const pair = match[0];
    const [left, right] = pair.split(",").map((x) => parseInt(x));
    const index = match.index;
    newNum = newNum.split("");
    newNum.splice(index - 1, pair.length + 2, ...`${3 * left + 2 * right}`);
    newNum = newNum.join("");
  }

  return newNum;
}

function process(x,y) {
  let result = addSnailNumbers(input[x], input[y]);
  while (true) {
    const [wasExploded, explodeResult] = explodeIfNeeded(result);
    if (wasExploded) {
      result = explodeResult;
    } else if (!wasExploded) {
      const [wasSplit, splitResult] = splitIfNeeded(result);
      if (wasSplit) {
        result = splitResult;
      } else {
        break;
      }
    }
  }
  return result;
}

const magnitudes = [];

for (let i = 0; i < input.length; i++) {
  for(let j = i + 1; j < input.length; j++) {
    const result1 = process(i,j);
    const result2 = process(j,i);
    magnitudes.push(calculateMagnitude(result1));
    magnitudes.push(calculateMagnitude(result2));
  }
}

console.log(Math.max(...magnitudes));
