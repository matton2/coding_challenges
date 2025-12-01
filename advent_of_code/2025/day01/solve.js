import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2025/day01/example.txt')
const input = readFile('/advent_of_code/2025/day01/input.txt')

function solve1(input) {
    let dial = 50
    let numberOfZero = 0

    input.forEach(turn => {
        console.log('turn', turn)
        // if the turn is left, subtract
        // if the turn is right, add
        const directions = turn.replace(/[^a-zA-z]/g, '')
        const turns = Number(turn.replace(/\D/g, ''))
        const numbers = turns > 99 ? turns%100  : turns
        console.log('numbers', numbers)

        dial = directions === 'R' ? dial + numbers : dial - numbers
        if (dial > 99) {
            dial = Math.abs(100 - dial)
        }
        if (dial < 0) {dial = Math.abs(100 + dial)}
        console.log('current dial', dial)
        if (dial === 0) numberOfZero += 1
    })
    return numberOfZero

}

console.log('solve 1 example:', solve1(example))
console.log('solve 1 input:', solve1(input))

function solve2(input) {
    let dial = 50
    let numberOfZero = 0

    input.forEach(turn => {
        console.log('turn', turn)
        // if the turn is left, subtract
        // if the turn is right, add
        const directions = turn.replace(/[^a-zA-z]/g, '')
        const turns = Number(turn.replace(/\D/g, ''))
        const numbers = turns > 99 ? turns%100  : turns
        if(turns > 99) {numberOfZero += Math.floor(turns/100)}
        console.log('numbers', numbers)
        let startingDial = dial
        dial = directions === 'R' ? dial + numbers : dial - numbers
        if (dial > 99) {
            dial = Math.abs(100 - dial)
            if(dial !== 0 && startingDial !== 0) {numberOfZero += 1}
        }
        if (dial < 0) {
            dial = Math.abs(100 + dial)
            if(dial !== 0 && startingDial !== 0) {numberOfZero += 1}

        }
        console.log('current dial', dial)
        if (dial === 0) numberOfZero += 1
        console.log('current zeros', numberOfZero)
    })
    return numberOfZero

}

console.log('solve 2 example:', solve2(example))
console.log('solve 2 inputs:', solve2(input))