import {readFile} from '../../../utilities.js'

const example = readFile('/advent_of_code/2021/day02/example.txt')
const input = readFile('/advent_of_code/2021/day02/input.txt')

function solve1(input) {
    // 0 = horizontal, 1 = depth
    let position = [0,0]
    input.forEach((move) => {
        let instruction = move.split(" ")
        let direction = instruction[0]
        let amount = Number(instruction[1])
        if(direction.includes('forward')) {
            position[0] = position[0] + amount
        } else if (direction.includes('up')) {
            position[1] = position[1] - amount
        } else if (direction.includes('down')) {
            position[1] = position[1] + amount
        }
    })

    return position[0] * position[1]

}

console.log('example1:', solve1(example))
console.log('input1:', solve1(input))


function solve2(input) {
     // 0 = horizontal, 1 = depth, 2 = aim
     let position = [0,0,0]
     input.forEach((move) => {
         let instruction = move.split(" ")
         let direction = instruction[0]
         let amount = Number(instruction[1])
         if(direction.includes('forward')) {
             position[0] = position[0] + amount
             position[1] = position[1] + (position[2] * amount)
         } else if (direction.includes('up')) {
             position[2] = position[2] - amount
         } else if (direction.includes('down')) {
             position[2] = position[2] + amount
         }
     })
 
     return position[0] * position[1]

}

console.log('example1:', solve2(example))
console.log('input1:', solve2(input))