const input = require("./input");

(function () {
  let startingBinary = input
    .split("")
    .reduce((acc, x) => acc + parseInt(x, 16).toString(2).padStart(4, "0"), "");

  let versionTotal = 0;
  const [allPackets, remainder] = parsePackets(startingBinary);

  console.log(versionTotal);

  function parsePackets(binary) {
    let unprocessed = binary;
    const ver = parseInt(unprocessed.substring(0, 3), 2);
    const typeId = parseInt(unprocessed.substring(3, 6), 2);

    if (typeId === 4) {
      //literal value

      const [value, remainingString] = processValuePacket(unprocessed);
      versionTotal += ver;
      return [[{ ver, typeId, value }], remainingString];
    } else {
      //operator
      const subpackets = [];
      const lengthTypeId = parseInt(unprocessed.substring(6, 7), 2);
      if (lengthTypeId) {
        // 11bits
        const numOfSubpackets = parseInt(unprocessed.substring(7, 18), 2);
        unprocessed = unprocessed.substring(18);
        for (let i = 0; i < numOfSubpackets; i++) {
          const [parsedPackets, remainingString] = parsePackets(unprocessed);
          unprocessed = remainingString;
          parsedPackets.forEach((x) => subpackets.push(x));
        }
        versionTotal += ver;
        return [[{ ver, typeId, subpackets }], unprocessed];
      } else {
        //15bits
        const lengthTotalBits = parseInt(unprocessed.substring(7, 22), 2);
        let potentialPackets = unprocessed.substring(22, 22 + lengthTotalBits);
        unprocessed = unprocessed.substring(22 + lengthTotalBits);
        while (potentialPackets.length) {
          const [parsedPackets, remainingString] =
            parsePackets(potentialPackets);
          potentialPackets = remainingString;
          parsedPackets.forEach((x) => subpackets.push(x));
          console.log();
        }
        versionTotal += ver;
        return [[{ ver, typeId, subpackets }], unprocessed];
      }
    }
  }

  function processValuePacket(bin) {
    let number = "";

    let remainingString = bin.substring(6);
    while (true) {
      let current = remainingString.substring(0, 5);
      remainingString = remainingString.substring(5);
      number += current.substring(1);
      if (current.substring(0, 1) === "0") {
        break;
      }
    }
    return [parseInt(number, 2), remainingString];
  }
})();
