import { readFile } from "../../../utilities.js";

const example = readFile('/coding_quest/2022/day01/example.txt')
const input = readFile('/coding_quest/2022/day01/input.txt')


function solve1(input) {
     let readings = input.map(Number)
     let totalExcursions = 0
     for(let i = 0; i < readings.length - 59; i++) {
        const currentRolling = readings.slice(i, i+60)
        const average = currentRolling.reduce((sum, number) => sum+number, 0)/currentRolling.length
        if (average > 1600 ||  average < 1500) {
            totalExcursions += 1
        }
     }

     return totalExcursions
}

console.log('example:', solve1(example))
console.log('input:', solve1(input))
