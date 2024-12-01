import { readFile } from "../../../utilities.js";

const example = readFile('/2023/day04/example.txt')
const input = readFile('/2023/day04/input.txt')

function solve1(input) {
    let total = 0
    input.map(line => {
        let game = line.split(":")
        let numbers = game[1].split('|')
        let winningNumbers = numbers[0].match(/\d+/g)
        let myNumbers = numbers[1].match(/\d+/g)
        let matches = myNumbers.filter(el => winningNumbers.includes(el))
        if(matches.length === 1) {
            total += 1
        } else if (matches.length > 1) {
            let cardTotal = 1
            for(let i = 1; i< matches.length; i++) {
                cardTotal = cardTotal * 2
            }
            total += cardTotal
        }
        
    })

    return(total)

}

console.log(solve1(example))
console.log(solve1(input))

function solve2(input) {

    let totalCards = new Array(input.length).fill(0)
    input.map(line => {
        let game = line.split(":")
        let gameNumber = game[0].match(/\d+/g)-1
        let numbers = game[1].split('|')
        let winningNumbers = numbers[0].match(/\d+/g)
        let myNumbers = numbers[1].match(/\d+/g)
        let matches = myNumbers.filter(el => winningNumbers.includes(el))
        totalCards[gameNumber] += 1
        for(let i = 1; i< matches.length+1; i++) {
            totalCards[gameNumber+i] += totalCards[gameNumber]
        }
    })
    const finalCount = totalCards.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    )
    return (finalCount)

}

console.log(solve2(example))
console.log(solve2(input))