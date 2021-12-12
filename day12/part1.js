const input = require('./input');

const caves = {};

input.forEach(x => {
    const [cave1, cave2] = x.split('-');
    if (caves[cave1]) caves[cave1].linkedCaves.push(cave2);
    else caves[cave1] = { linkedCaves: [cave2] };

    if (caves[cave2]) caves[cave2].linkedCaves.push(cave1);
    else caves[cave2] = { linkedCaves: [cave1] };
});

let routes = [];

caves['start'].linkedCaves.forEach(x => routes.push(`start,${x}`));

let newRoutes = [];


while (routes.some(x => x.split(',').pop() !== 'end')) {
    routes.forEach(x => {
        const last = x.split(',').pop();
        if (last !== 'end') {
            caves[last].linkedCaves.forEach(y => {
                if (y !== 'start') {
                    if (y === 'end') {
                        newRoutes.push(`${x},${y}`);
                    } else if (/[a-z]/.test(y) && x.indexOf(y) < 0) {
                        newRoutes.push(`${x},${y}`);
                    } else if (/[A-Z]/.test(y)) {
                        newRoutes.push(`${x},${y}`);
                    }

                }
            });
        } else {
            newRoutes.push(x);
        }

    });

    routes = [...newRoutes];
    newRoutes = [];
}

console.log(routes.length);