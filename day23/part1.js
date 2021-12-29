const fs = require("fs");

const raw = fs.readFileSync("./day23/input.txt", "utf8");

const startingPositions = [...raw.matchAll(/\w/g)];
const roomA = startingPositions[0] + startingPositions[4];
const roomB = startingPositions[1] + startingPositions[5];
const roomC = startingPositions[2] + startingPositions[6];
const roomD = startingPositions[3] + startingPositions[7];
const hallway = raw.match(/\.+/)[0];

function scoreMove(dist, type) {
	switch (type) {
		case "A":
			return dist;
		case "B":
			return dist * 10;
		case "C":
			return dist * 100;
		case "D":
			return dist * 1000;
		default:
			throw new Error("nope");
	}
}

function makePossibleMoves(gameState) {
	let { hallway, rooms, score } = gameState;
	if (
		rooms[0] === "AA" &&
		rooms[1] === "BB" &&
		rooms[2] === "CC" &&
		rooms[3] === "DD"
	) {
		return false;
	}

	const nextStates = [];

	for (let [i, room] of rooms.entries()) {
		const roomExitIndex = i * 2 + 2;
		if (
			(i === 0 && room === "AA") ||
			(i === 0 && room === ".A") ||
			(i === 1 && room === "BB") ||
			(i === 1 && room === ".B") ||
			(i === 2 && room === "CC") ||
			(i === 2 && room === ".C") ||
			(i === 3 && room === "DD") ||
			(i === 3 && room === ".D")
		) {
			// do nothing - should not move anything out of room
		} else if (room === "..") {
			// do nothing - room is empty
		} else {
			const closestToDoor = room[0];
			const furthestFromDoor = room[1];
			let amphi;
			let newScore = score;
			if (closestToDoor !== ".") {
				amphi = closestToDoor;
				room = "." + room[1];
			} else {
				amphi = furthestFromDoor;
				room = "..";
				newScore += scoreMove(1, amphi);
			}
			for (let j = 0; j < gameState.hallway.length; j++) {
				if (j === 2 || j === 4 || j === 6 || j === 8) continue;
				let intendedPath =
					j < roomExitIndex
						? hallway.substring(j, roomExitIndex + 1)
						: hallway.substring(roomExitIndex, j + 1);
				if (!/[^\.]/.test(intendedPath)) {
					nextStates.push({
						rooms: [...rooms.slice(0, i), room, ...rooms.slice(i + 1)],
						hallway: spliceStr(hallway, j, 1, amphi),
						score: newScore + scoreMove(intendedPath.length, amphi),
					});
				}
			}
		}
	}
	const amphisInHall = hallway.matchAll(/\w/g);
	for (const hallAmphi of amphisInHall) {
		const gameStateIfMoved = moveToRoomIfPossible(gameState, hallAmphi.index);
		if (gameStateIfMoved) {
			nextStates.push(gameStateIfMoved);
		}
	}
	return nextStates;
}

function moveToRoomIfPossible(gameState, amphiToMoveIndex) {
	const { rooms, hallway, score } = gameState;
	const amphi = hallway[amphiToMoveIndex];
	const roomIndex = availableRoom(rooms, amphi);
	if (roomIndex || roomIndex === 0) {
		const roomEntranceIndex = roomIndex * 2 + 2;
		const intendedPath =
			amphiToMoveIndex < roomEntranceIndex
				? hallway.substring(amphiToMoveIndex + 1, roomEntranceIndex + 1)
				: hallway.substring(roomEntranceIndex, amphiToMoveIndex);
		if (!/[^\.]/.test(intendedPath)) {
			const newHallway = spliceStr(hallway, amphiToMoveIndex, 1, ".");
			let newRoom;
			let newScore;
			if (rooms[roomIndex][1] === ".") {
				newRoom = `.${amphi}`;
				newScore = score + scoreMove(intendedPath.length + 2, amphi);
			} else {
				newRoom = `${amphi}${rooms[roomIndex][1]}`;
				newScore = score + scoreMove(intendedPath.length + 1, amphi);
			}
			return {
				rooms: [
					...rooms.slice(0, roomIndex),
					newRoom,
					...rooms.slice(roomIndex + 1),
				],
				hallway: newHallway,
				score: newScore,
			};
		}
	}

	return false;
}

function availableRoom(rooms, amphi) {
	const roomIndex = amphi.charCodeAt(0) - 65;

	const room = rooms[roomIndex];
	if (room === `.${amphi}` || room === "..") {
		return roomIndex;
	}
	return false;
}

function spliceStr(str, index, count, add) {
	if (index < 0) {
		index = str.length + index;
		if (index < 0) {
			index = 0;
		}
	}
	return str.slice(0, index) + (add || "") + str.slice(index + count);
}

function getKey(gameState) {
	return gameState.hallway + gameState.rooms.join("");
}

const initGameState = {
	rooms: [roomA, roomB, roomC, roomD],
	hallway,
	score: 0,
};
let gameStates = { [getKey(initGameState)]: initGameState };

const completedGameStates = [];
let count = 0;
while (Object.keys(gameStates).length) {
	// console.log(++count);
	const newStates = {};
	for (const gameState in gameStates) {
		const results = makePossibleMoves(gameStates[gameState]);
		if (results) {
			// newStates.push(...results);
			for (const result of results) {
				const key = getKey(result);
				if (newStates[key]) {
					if (newStates[key].score > result.score) {
						newStates[key] = result;
					}
				} else {
					newStates[key] = result;
				}
			}
		} else {
			completedGameStates.push(gameStates[gameState].score);
		}
	}
	gameStates = newStates;
}

console.log(Math.min(...completedGameStates));
