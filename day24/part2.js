const fs = require("fs");

const rawInput = fs.readFileSync("./day24/input.txt").toString();

const instructions = rawInput.split("\n").map((inst) => inst.split(" "));
const A = instructions
  .filter((_, i) => i % 18 === 4)
  .map((x) => x[2])
  .map(Number);
const B = instructions
  .filter((_, i) => i % 18 === 5)
  .map((x) => x[2])
  .map(Number);
const C = instructions
  .filter((_, i) => i % 18 === 15)
  .map((x) => x[2])
  .map(Number);

const stack = [];
const monad = new Array(14);
  for (let i = 0; i < 14; i++) {
  if (A[i] === 1) {
    stack.push({index: i, val: C[i]});
  } else {
    const popped = stack.pop();
    const adjustor = popped.val + B[i];
    if(adjustor > 0) {
      monad[popped.index] = 1;
      monad[i] = 1 + adjustor;
    } else {
      monad[popped.index] = 1 - adjustor;
      monad[i] = 1;
    }
  }
}

console.log(monad.join(''));
