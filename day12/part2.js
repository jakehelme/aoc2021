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

function canVisitSmallCave(caveName, route) {
    const smallCaveVisits = route.split(',').filter(x => /[a-z]/.test(x) && x !== 'start' && x !== 'end');
    const smallCaves = {};
    smallCaveVisits.forEach(x => {
        if(smallCaves[x]) smallCaves[x]++;
        else smallCaves[x] = 1;
    });
    let canVisit = true;
    const visitedBefore = smallCaveVisits.some(x => x === caveName);
    let hasASmallCaveBeenVisitedTwice = false;
    for (const cave in smallCaves) {
        if (Object.hasOwnProperty.call(smallCaves, cave)) {
            if(smallCaves[cave] > 1) hasASmallCaveBeenVisitedTwice = true;
            
        }
    }

    if(visitedBefore && hasASmallCaveBeenVisitedTwice) canVisit = false;
    
    return canVisit;
}

while (routes.some(x => x.split(',').pop() !== 'end')) {
    routes.forEach(x => {
        const last = x.split(',').pop();
        if (last !== 'end') {
            caves[last].linkedCaves.forEach(y => {
                if (y !== 'start') {
                    if (y === 'end') {
                        newRoutes.push(`${x},${y}`);
                    } else if (/[a-z]/.test(y) && canVisitSmallCave(y, x)) {
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

routes.sort();

console.log(routes.length);