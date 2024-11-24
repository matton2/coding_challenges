import { readFile } from "../utilities.js";

const example = readFile('/2023/day01/example.txt')
const input = readFile('/2023/day01/input.txt')


function extractNumbers(str) {
    const matches = str.match(/\d+/g); // \d+ matches one or more digits
    return matches ? matches.join('') : []; // Convert strings to numbers
  }

function solve1 (input) {

    const vals = []

    input.forEach(line => {
        let numbers = extractNumbers(line)
        if (numbers.length === 1) {
            vals.push(Number(numbers[0] + numbers[0]))
        } else if (numbers.length === 2) {
            vals.push(Number(numbers))
        } else {
            vals.push(Number(numbers[0]+ numbers[numbers.length-1]))
        }
    })
    
    let ans1 = vals.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    )
    
    return(ans1)

}


//console.log(solve1(input))

//part 2

function extractStingNumber(string) {
    const numberDict = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9
    }
    
    const NUM_ENTS = Object.entries(numberDict)

    for(let [word, num] of NUM_ENTS) {
        if (string.startsWith(word)) {
            return num
        }
    }

    return ''
}

function solve2(input) {
    let numbers = []
    input.map((line) => {
        const allNumber = line
            .split('')
            .map((char, index) => {
                const restOfLine = line.slice(index)
                return /\d/.test(char) ? String(char) : extractStingNumber(restOfLine)
            })
            .filter(Boolean)

            let first = allNumber[0]
            let last = allNumber[allNumber.length-1]
            numbers.push(parseInt(`${first}${last}`, 10))
        
    })
    console.log(numbers)
    let ans2 = numbers.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    )
    
    return(ans2)

}


console.log(solve2(example))
console.log(solve2(input))