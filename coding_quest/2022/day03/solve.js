import { readFile } from "../../../utilities.js";

const example = readFile('/coding_quest/2022/day03/example.txt')
const input = readFile('/coding_quest/2022/day03/input.txt')

const pyTheorm = (three) => {

    let a = three[0]
    let b = three[1]
    let c = three[2]
    return Math.floor(Math.sqrt(a**2 + b**2 + c**2))
}

function solve1(input) {
    const totalDist = []

    input.forEach((line,index) => {
        
        if(index > 0) {
            let starting = input[index-1].split(" ").map(Number)
            let ending = line.split(" ").map(Number)
            let distance = starting.map((num, index) => num - ending[index])
            let total = pyTheorm(distance)
            totalDist.push(total)
        }

    });

    return totalDist.reduce((sum, distance) => sum + distance, 0)

}

console.log('example:', solve1(example))
console.log('input:', solve1(input))