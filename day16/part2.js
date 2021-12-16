const input = require("./input");

(function () {
  let startingBinary = input
    .split("")
    .reduce((acc, x) => acc + parseInt(x, 16).toString(2).padStart(4, "0"), "");

    const [allPackets, remainder] = parsePackets(startingBinary);

  console.log(allPackets[0].value);

  function parsePackets(binary) {
    let unprocessed = binary;
    const ver = parseInt(unprocessed.substring(0, 3), 2);
    const typeId = parseInt(unprocessed.substring(3, 6), 2);

    if (typeId === 4) {
      //literal value
      const [value, remainingString] = processValuePacket(unprocessed);
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
        const newPacket = { ver, typeId, subpackets };
        processOperationPacket(newPacket);
        return [[newPacket], unprocessed];
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
        const newPacket = { ver, typeId, subpackets };
        processOperationPacket(newPacket);
        return [[newPacket], unprocessed];
      }
    }
  }

  function processOperationPacket(packet) {
    console.log();
    switch (packet.typeId) {
      case 0:
        packet.value = packet.subpackets.reduce((acc, x) => acc + x.value, 0);
        break;
      case 1:
        packet.value =
          packet.subpackets.length > 1
            ? packet.subpackets.reduce((acc, x) => acc * x.value, 1)
            : packet.subpackets[0].value;
        break;
      case 2:
        packet.value = Math.min(...packet.subpackets.map((x) => x.value));
        break;
      case 3:
        packet.value = Math.max(...packet.subpackets.map((x) => x.value));
        break;
      case 5:
        if (packet.subpackets.length != 2) throw new Error("nope");
        packet.value =
          packet.subpackets[0].value > packet.subpackets[1].value ? 1 : 0;
        break;
      case 6:
        if (packet.subpackets.length != 2) throw new Error("nope");
        packet.value =
          packet.subpackets[0].value < packet.subpackets[1].value ? 1 : 0;
        break;
      case 7:
        if (packet.subpackets.length != 2) throw new Error("nope");
        packet.value =
          packet.subpackets[0].value === packet.subpackets[1].value ? 1 : 0;
        break;
      default:
        throw new Error("nope");
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
