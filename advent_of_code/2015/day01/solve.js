import { readFile } from "../../../utilities.js";

const input = readFile('/advent_of_code/2015/day01/input.txt')

function solve1(input) {

    let floors = input[0].split('').map(el => {
        if(el === '(') {
            return 1
        } else {
            return -1
        }
    })

    let finalFloor = floors.reduce((acc, el) => acc + el, 0)

    return finalFloor

}

console.log('solve1: ', solve1(input))

function solve2(input) {

    let floors = input[0].split('').map(el => {
        if(el === '(') {
            return 1
        } else {
            return -1
        }
    })

    let currentFloor = 0

    let when = floors.map(el => {
        return currentFloor += el
    })

    let basement = when.findIndex(el => el === -1)

    return basement+1

}

console.log('solve2: ', solve2(input))
