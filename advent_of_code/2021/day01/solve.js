import {readFile} from '../../../utilities.js'

const example = readFile('/advent_of_code/2021/day01/example.txt').map(Number)
const input = readFile('/advent_of_code/2021/day01/input.txt').map(Number)

function solve1(input) {
    let totalIncrease = 0
    input.forEach((depth, index, depths) => {
        if (index > 0) { 
            if(depth > depths[index-1]) {
                totalIncrease += 1
            }   
        } 
    })

    return totalIncrease

}

console.log('example1:', solve1(example))
console.log('input1:', solve1(input))


function solve2(input) {
    let totalIncrease = 0
    input.forEach((depth, index, depths) => {
        if(index > 0  && index < depths.length-2) {
            let previous = depths[index-1] + depths[index] + depths[index+1]
            let current = depths[index] + depths[index+1] + depths[index+2]
            if(current > previous) {
                totalIncrease += 1
            }
        }
    })

    return totalIncrease
}

console.log('example1:', solve2(example))
console.log('input1:', solve2(input))