import {readFile} from '../../../utilities.js'

const example = readFile('/advent_of_code/2022/day02/example.txt')
const input = readFile('/advent_of_code/2022/day02/input.txt')

function solve1(input) {
    let totalScore = 0

    input.forEach(game => {
        let throws = game.split(" ")
        let op = game[0]
        let me = game[1]
        

    })

}

console.log('example1:', solve1(example))
console.log('input1:', solve1(input))