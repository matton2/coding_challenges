import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2024/day01/example.txt')
const input = readFile('/advent_of_code/2024/day01/input.txt')

function solve1(input) {
    let leftside = []
    let rightside = []

    input.forEach(line => {
        let numbers = line.split('  ')
        leftside.push(Number(numbers[0]))
        rightside.push(Number(numbers[1]))
    });

    leftside.sort()
    rightside.sort()

    let distances = leftside.map((left, index) => {
        return Math.abs(left - rightside[index])
    })

    let final = distances.reduce((sum, current) => sum + current, 0)

    return(final)
}

//console.log(solve1(example))
//console.log(solve1(input))

function solve2(input) {

    let leftside = []
    let rightside = []

    input.forEach(line => {
        let numbers = line.split('  ')
        leftside.push(Number(numbers[0]))
        rightside.push(Number(numbers[1]))
    });

    leftside.sort()
    rightside.sort()

    let distances = leftside.map((left, index) => {

        let matches = rightside.filter(el => el === left).length

        return matches * left
    })

    let final = distances.reduce((sum, current) => sum + current, 0)

    return(final)



}

console.log(solve2(example))
console.log(solve2(input))