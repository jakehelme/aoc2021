const input = require('./input');

const navSubSys = input.map(x => x.split(''));

const corrupted = [];
const corruptedSyms = [];

navSubSys.forEach((line, lineIndex) => {

    const opening = [];
    const closing = [];
    for (let i = 0; i < line.length; i++) {
        const sym = line[i];
        const theLine = line;
        let shouldExit = false;
        if (/[<({\[]/.test(sym)) {
            opening.push(sym);
        } else {
            switch (sym) {
                case '>':
                    if (opening[opening.length - 1] === '<') opening.pop();
                    else {
                        shouldExit = true;
                        corruptedSyms.push(sym);
                    }
                    break;
                case '}':
                    if (opening[opening.length - 1] === '{') opening.pop();
                    else {
                        shouldExit = true;
                        corruptedSyms.push(sym);
                    }
                    break;
                case ']':
                    if (opening[opening.length - 1] === '[') opening.pop();
                    else {
                        shouldExit = true;
                        corruptedSyms.push(sym);
                    }
                    break;
                case ')':
                    if (opening[opening.length - 1] === '(') opening.pop();
                    else {
                        shouldExit = true;
                        corruptedSyms.push(sym);
                    }
                    break;
                default:
                    throw new Error('nope');
            }
        }
        if (shouldExit) {
            corrupted.push(line);
            break;
        }
    }
});

let tot = 0;
corruptedSyms.forEach(x => {
    switch (x) {
        case ')':
            tot += 3;
            break;
        case ']':
            tot += 57;
            break;
        case '}':
            tot += 1197;
            break;
        case '>':
            tot += 25137;
            break;
        default:
            throw new Error('nope');
    }
});

console.log(tot);