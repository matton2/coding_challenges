import {readFile} from '../../../utilities.js'

const example = readFile('/advent_of_code/2021/day06/example.txt')
const input = readFile('/advent_of_code/2021/day06/input.txt')

function lanternFish (input, days) {
   const fishes = Array(9).fill(0)

   input[0].split(',').map(Number).forEach(fish => {
        fishes[fish]++;
    });

    for (let day = 0; day < days; day++) {
        const newFish = fishes[0]; // Fish with timer 0 will reproduce
        for (let i = 0; i < 8; i++) {
            fishes[i] = fishes[i + 1]; // Shift timers down
        }
        fishes[6] += newFish; // Reset fish to timer 6
        fishes[8] = newFish;  // New fish start with timer 8
    }

    return fishes.reduce((a, b) => a + b, 0); // Total number of fish

}

console.log(lanternFish(example, 80))
console.log(lanternFish(input, 80))

console.log(lanternFish(example, 256))
console.log(lanternFish(input, 256))