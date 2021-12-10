const input = require('./input');

const navSubSys = input.map(x => x.split(''));
const incomplete = [];

navSubSys.forEach(line => {
    let shouldExit = false;
    const opening = [];
    for (let i = 0; i < line.length; i++) {
        const sym = line[i];
        shouldExit = false;
        if (/[<({\[]/.test(sym)) {
            opening.push(sym);
        } else {
            switch (sym) {
                case '>':
                    if (opening[opening.length - 1] === '<') opening.pop();
                    else {
                        shouldExit = true;
                    }
                    break;
                case '}':
                    if (opening[opening.length - 1] === '{') opening.pop();
                    else {
                        shouldExit = true;
                    }
                    break;
                case ']':
                    if (opening[opening.length - 1] === '[') opening.pop();
                    else {
                        shouldExit = true;
                    }
                    break;
                case ')':
                    if (opening[opening.length - 1] === '(') opening.pop();
                    else {
                        shouldExit = true;
                    }
                    break;
                default:
                    throw new Error('nope');
            }
        }
        if (shouldExit) {
            break;
        }
    }
    if (!shouldExit) incomplete.push(line);
});

const tots = [];

incomplete.forEach(line => {
    const opening = [];
    const closing = [];
    for (let i = 0; i < line.length; i++) {
        const sym = line[i];
        if (/[<({\[]/.test(sym)) {
            opening.push(sym);
        } else {
            switch (sym) {
                case '>':
                    if (opening[opening.length - 1] === '<') opening.pop();
                    break;
                case '}':
                    if (opening[opening.length - 1] === '{') opening.pop();
                    break;
                case ']':
                    if (opening[opening.length - 1] === '[') opening.pop();
                    break;
                case ')':
                    if (opening[opening.length - 1] === '(') opening.pop();
                    break;
                default:
                    throw new Error('nope');
            }
        }
    }
    opening.forEach(sym => {
        switch (sym) {
            case '<':
                closing.push('>')
                break;
            case '{':
                closing.push('}')
                break;
            case '[':
                closing.push(']')
                break;
            case '(':
                closing.push(')')
                break;
            default:
                throw new Error('nope');
        }
    });
    closing.reverse();
    let tot = 0;
    closing.forEach(sym => {
        tot *= 5;
        if (sym === ')') tot += 1;
        if (sym === ']') tot += 2;
        if (sym === '}') tot += 3;
        if (sym === '>') tot += 4;
    });
    tots.push(tot);
});

tots.sort((a, b) => a - b);

console.log(tots[Math.floor(tots.length / 2)]);