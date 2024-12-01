import { readFile } from "../../../utilities.js";

const example = readFile('/coding_quest/2022/day02/example.txt')
const input = readFile('/coding_quest/2022/day02/input.txt')

//winning numbers 12 48 30 95 15 55 97

function howMuchMoney(match) {
    if(match===3) {
        return 1
    } else if (match===4) {
        return 10
    } else if (match===5) {
        return 100
    } else if (match === 6) {
        return 1000
    } else {
        return 0
    }
}

function solve1(input) {
    const winning = [12, 48, 30, 95, 15, 55, 97]

    const winnings = input.map(numbers => {
        let number = numbers.split(' ').map(Number)
        let matches = number.filter(el => winning.includes(el))
        return(howMuchMoney(matches.length))
    })

    return(winnings.reduce((sum, winnings) => sum + winnings, 0))


}

console.log('example:', solve1(example))
console.log('input:', solve1(input))