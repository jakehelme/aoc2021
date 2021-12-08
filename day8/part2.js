const input = require('./input');

const signalPatterns = input.map(x => x.split(' | ')[0].split(' '));
const outputs = input.map(x => x.split(' | ')[1].split(' '));

let tot = 0;

/*
    aaaa
   b    c
   b    c
    dddd
   e    f
   e    f
    gggg
*/

for (let signalIndex = 0; signalIndex < input.length; signalIndex++) {
    const signals = signalPatterns[signalIndex];
    const ledMapping = {};
    const mapped = new Set();

    const sigOne = signals.filter(x => x.length === 2)[0];
    sigOne.split('').forEach(x => mapped.add(x));
    ledMapping.c = sigOne.split('');
    ledMapping.f = sigOne.split('');
    const sigSeven = signals.filter(x => x.length === 3)[0];
    sigSeven.split('').forEach(x => mapped.add(x));
    ledMapping.a = sigSeven.split('').filter(x => ledMapping.c.indexOf(x) < 0)[0];
    const sigFour = signals.filter(x => x.length === 4)[0];
    sigFour.split('').forEach(x => mapped.add(x));
    ledMapping.b = sigFour.split('').filter(x => ledMapping.c.indexOf(x) < 0);
    ledMapping.d = sigFour.split('').filter(x => ledMapping.c.indexOf(x) < 0);
    ledMapping.e = ledMapping.g = ['a','b','c','d','e','f','g'].filter(x => [...mapped].indexOf(x) < 0);

    const sigSix = signals.filter(x => x.length === 6).filter(x => x.indexOf(ledMapping.c[0]) < 0 || x.indexOf(ledMapping.c[1]) < 0)[0];
    ledMapping.c = ledMapping.c.filter(x => sigSix.indexOf(x) < 0)[0];
    ledMapping.f = ledMapping.f.filter(x => sigSix.indexOf(x) >= 0)[0];
    const sigNine = signals.filter(x => x.length === 6).filter(x => x.indexOf(ledMapping.e[0]) < 0 || x.indexOf(ledMapping.e[1]) < 0)[0];
    ledMapping.e = ledMapping.e.filter(x => sigNine.indexOf(x) < 0)[0];
    ledMapping.g = ledMapping.g.filter(x => sigNine.indexOf(x) >= 0)[0];
    const sigZero = signals.filter(x => x.length === 6).filter(x => x.indexOf(ledMapping.d[0]) < 0 || x.indexOf(ledMapping.d[1]) < 0)[0];
    ledMapping.d = ledMapping.d.filter(x => sigZero.indexOf(x) < 0)[0];
    ledMapping.b = ledMapping.b.filter(x => sigZero.indexOf(x) >= 0)[0];
    const sortedSignals = [
        [ledMapping.a, ledMapping.b, ledMapping.c, ledMapping.e, ledMapping.f, ledMapping.g].sort().join(''), //0
        [ledMapping.c, ledMapping.f].sort().join(''), //1
        [ledMapping.a, ledMapping.c, ledMapping.d, ledMapping.e, ledMapping.g].sort().join(''), //2
        [ledMapping.a, ledMapping.c, ledMapping.d, ledMapping.f, ledMapping.g].sort().join(''), //3
        [ledMapping.b, ledMapping.c, ledMapping.d, ledMapping.f].sort().join(''), //4
        [ledMapping.a, ledMapping.b, ledMapping.d, ledMapping.f, ledMapping.g].sort().join(''), //5
        [ledMapping.a, ledMapping.b, ledMapping.d, ledMapping.e, ledMapping.f, ledMapping.g].sort().join(''), //6
        [ledMapping.a, ledMapping.c, ledMapping.f].sort().join(''), //7
        [ledMapping.a, ledMapping.b, ledMapping.c, ledMapping.d, ledMapping.e, ledMapping.f, ledMapping.g].sort().join(''), //8
        [ledMapping.a, ledMapping.b, ledMapping.c, ledMapping.d, ledMapping.f, ledMapping.g].sort().join(''), //9
    ]
    outputs[signalIndex] = outputs[signalIndex].map(x => x.split('').sort().join(''));
    const out1000 = sortedSignals.indexOf(outputs[signalIndex][0]);
    const out100 = sortedSignals.indexOf(outputs[signalIndex][1]);
    const out10 = sortedSignals.indexOf(outputs[signalIndex][2]);
    const out1 = sortedSignals.indexOf(outputs[signalIndex][3]);
    const outval = 1000 * out1000 + 100 * out100 + 10 * out10 + out1;
    tot += outval;
}

console.log(tot);
