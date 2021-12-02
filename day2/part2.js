const input = require('./input');

let hor = 0, depth = 0, aim = 0;

input.forEach(el => {
    const dir = el.match(/\w+/)[0];
    const dist = parseInt(el.match(/\d+/)[0]);
    switch(dir) {
        case 'forward':
            hor += dist;
            depth += aim * dist;
            break;
        case 'down':
            aim += dist;
            break;
        case 'up':
            aim -= dist;
            break;
        default:
            throw new Error('nope');
    }
})

console.log(hor * depth);