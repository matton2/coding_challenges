import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2025/day03/example.txt')
const input = readFile('/advent_of_code/2025/day03/input.txt')


const findBiggestNumber = (batteries, length) => {
    // the biggest number will need to be before the length of the number
    // so i take the
    let currentIndex = 0
    let turnedOn = new Array(length).fill(0)
    turnedOn.forEach((_on, index) => {
        let currentBank = batteries.slice(currentIndex, batteries.length - ((length-1)-index))
        let currentMax = Math.max(...currentBank)
        currentIndex = currentBank.indexOf(currentMax) + currentIndex + 1
        turnedOn[index] = currentMax
    })
    return (Number(turnedOn.join('')))
}

function solve1Better(input) {
    const maxVolts = []
    input.forEach(bank => {
        let batteries = bank.split('').map(Number)
        let number = findBiggestNumber(batteries, 2)
        maxVolts.push(number)
    })
    return maxVolts.reduce((acc, curr) => acc + curr, 0)
}

console.log('Example Solve1: ', solve1Better(example))
console.log('Input Solve1: ', solve1Better(input))

function solve2(input) {
    const maxVolts = []
    input.forEach(bank => {
        let batteries = bank.split('').map(Number)
        let number = findBiggestNumber(batteries, 12)
        maxVolts.push(number)
    })
    return maxVolts.reduce((acc, curr) => acc + curr, 0)
}

console.log('Example Solve2: ', solve2(example))
console.log('Input Solve2: ', solve2(input))

