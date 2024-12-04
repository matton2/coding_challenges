import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2024/day03/example.txt')
const input = readFile('/advent_of_code/2024/day03/input.txt')


const extractAndMul = (mul) => {
    let regex = /\d+/g
    let numbers = mul.match(regex).map(Number)
    return numbers[0] * numbers[1]
}

function solve1(input) {
    let regex = /mul\(\d+,\d+\)/g
    let total = 0
    //let regex = /mul\((\d+),(\d+)\)/g
    input.forEach(line => {
        const matches = line.match(regex)
        matches.forEach(match => {
            let mult = extractAndMul(match)
            total += mult
        })

    })
    return(total)
    

}

//console.log(solve1(example))
//console.log(solve1(input))

function solve2(input) {
    let regexMul = /mul\(\d+,\d+\)/g
    let regexDo = /do\(\)/g
    let regexDont = /don\'t\(\)/g
    let total = 0
    input.forEach(line => {
        // i think i need to extract all the indexes for mul, do, and dont
        let multis = []
        let matchMul;
        while((matchMul = regexMul.exec(line)) != null) {
            multis.push(match.index)
        }
        console.log(multis)
    })

}

console.log(solve2(example))
//console.log(solve2(input))