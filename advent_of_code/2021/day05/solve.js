import {readFile} from '../../../utilities.js'

const example = readFile('/advent_of_code/2021/day05/example.txt')
const input = readFile('/advent_of_code/2021/day05/input.txt')

function solveVentLines(input, includeDiagonals = false) {
    //const lines = input.trim().split("\n");
    const lines = input
    const map = new Map();

    const addPoint = (x, y) => {
        const key = `${x},${y}`;
        map.set(key, (map.get(key) || 0) + 1);
    };

    for (const line of lines) {
        const [start, end] = line.split(" -> ");
        const [x1, y1] = start.split(",").map(Number);
        const [x2, y2] = end.split(",").map(Number);

        const dx = Math.sign(x2 - x1);
        const dy = Math.sign(y2 - y1);

        if (x1 === x2 || y1 === y2 || (includeDiagonals && Math.abs(x2 - x1) === Math.abs(y2 - y1))) {
            let x = x1, y = y1;
            while (x !== x2 || y !== y2) {
                addPoint(x, y);
                x += dx;
                y += dy;
            }
            addPoint(x2, y2); // Don't forget the last point!
        }
    }
    console.log(map)

    let overlapCount = 0;
    for (const count of map.values()) {
        if (count >= 2) overlapCount++;
    }
    return overlapCount;
}

console.log(solveVentLines(example))
console.log(solveVentLines(input))

console.log(solveVentLines(example, true))
console.log(solveVentLines(input, true))