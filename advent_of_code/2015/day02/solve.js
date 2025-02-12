import { readFile } from "../../../utilities.js";

const input = readFile('/advent_of_code/2015/day02/input.txt')
const example = readFile('/advent_of_code/2015/day02/example.txt')

function surfaceAreaPlus (dims) {
    let [l,w,h] = [dims[0], dims[1], dims[2]]
    let sorted = dims.sort(function (a, b) {  return a - b;  })
    return ((2*l*w) + (2*w*h) + (2*h*l) + (sorted[0] * sorted[1]))
}

function solve1(input) {

    let totalPaper = 0

    input.forEach(el => {
        let sides = el.split('x').map(el => Number(el))
        totalPaper += surfaceAreaPlus(sides)
    })

    return totalPaper

}

console.log('example1: ', solve1(example))
console.log('solve1: ', solve1(input))

function makeTheBow (dims) {
    let [l,w,h] = [dims[0], dims[1], dims[2]]
    let sorted = dims.sort(function (a, b) {  return a - b;  })
    let volume = l*w*h
    let wrap = sorted[0] + sorted[0] +sorted[1] +sorted[1]
    return (volume + wrap)

}

function solve2(input) {

    let totalRibbon = 0

    input.forEach(el => {
        let sides = el.split('x').map(el => Number(el))
        totalRibbon += makeTheBow(sides)
    })

    return totalRibbon

}

console.log('example2: ', solve2(example))
console.log('solve2: ', solve2(input))