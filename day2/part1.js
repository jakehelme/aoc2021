const input = require('./input');

let hor = 0, depth = 0;

input.forEach(el => {
    const dir = el.match(/\w+/)[0];
    const dist = parseInt(el.match(/\d+/)[0]);
    switch(dir) {
        case 'forward':
            hor += dist;
            break;
        case 'down':
            depth += dist;
            break;
        case 'up':
            depth -= dist;
            break;
        default:
            throw new Error('nope');
    }
})

console.log(hor * depth);