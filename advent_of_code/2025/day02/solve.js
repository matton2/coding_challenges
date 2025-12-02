import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2025/day02/example.txt')
const input = readFile('/advent_of_code/2025/day02/input.txt')

const figureOutRepeatsPart1 = (range) => {
    let start = range.split('-')[0]
    let end = range.split('-')[1]
    let startNumber = Number(start)
    let endNumber = Number(end)
    let startFirstHalf = start.length % 2 !== 0 ? start.substring(0, Math.floor(start.length/2)) : start.substring(0, Math.ceil(start.length/2))
    let endFirstHalf = end.substring(0, Math.ceil(end.length/2))
    // since this could be a range, i need to generate all the possible combinations here
    let possibleCombinations = []
    for(let i = Number(startFirstHalf); i <= Number(endFirstHalf); i++) {
        possibleCombinations.push(Number(`${i}${i}`))
    }
    //console.log(possibleCombinations)
    let included = []
    possibleCombinations.forEach(combination => {
        if(combination >= startNumber && combination <= endNumber) {included.push(combination)}
    })
    ///console.log(included)
    return(included.reduce((acc, curr) => acc + curr, 0))

    
}

function solve1(input) {
    const ranges = input[0].split(',')
    //console.log(ranges)
    let totalInvalids = 0
    ranges.forEach(range => {
        totalInvalids += figureOutRepeatsPart1(range)
    })
    return totalInvalids
}

let startSolve1 = performance.now();
//console.log(solve1(example))
console.log(solve1(input))
let endSolve1 = performance.now();
console.log(`Solve 1 Execution time: ${endSolve1 - startSolve1} milliseconds`);

// i need a function that will take in some number of digits and repeat them based upon the length i care about returning.  I will then loop through the elngth of the strings and pass in the correct subset to get my combinations back

const figureOutRepeatsPart2 = (range) => {
    let start = range.split('-')[0]
    let end = range.split('-')[1]
    let startNumber = Number(start)
    let endNumber = Number(end)
    let startFirstHalf = start.length % 2 !== 0 ? start.substring(0, Math.floor(start.length/2)) : start.substring(0, Math.ceil(start.length/2))
    let endFirstHalf = end.substring(0, Math.ceil(end.length/2))
    // since this could be a range, i need to generate all the possible combinations here
    let possibleCombinations = []
    for(let i = Number(startFirstHalf); i <= Number(endFirstHalf); i++) {
        // now the repeats can be atleast twice
        // i can use .repeat
        for(let j = 1; j <= String(i).length; j++) {
            let currentStartCombo = String(i).substring(0, j)
            // just make sure to keep the length resonable by dividing by j
            let currentComboStart = Number(currentStartCombo.repeat(start.length/j))
            let currentComboEnd = Number(currentStartCombo.repeat(end.length/j))
            // ah there is a chance these can be the same....
            if(currentComboStart >= startNumber && currentComboStart <= endNumber) {possibleCombinations.push(currentComboStart)}

            if(currentComboEnd >= startNumber && currentComboEnd <= endNumber && currentComboStart !== currentComboEnd) {possibleCombinations.push(currentComboEnd)}
        }
        
    }
    //console.log(possibleCombinations)
    let uniqueCombinations = [... new Set(possibleCombinations)]
    //console.log(uniqueCombinations)
    let included = []
    uniqueCombinations.forEach(combination => {
        if(combination >= startNumber && combination <= endNumber) {included.push(combination)}
    })
    ///console.log(included)
    return(included.reduce((acc, curr) => acc + curr, 0))

    
}

function solve2(input) {
    const ranges = input[0].split(',')
    //console.log(ranges)
    let totalInvalids = 0
    ranges.forEach(range => {
        totalInvalids += figureOutRepeatsPart2(range)
    })
    return totalInvalids
}

let startSolve2 = performance.now();
//console.log(solve2(example))
console.log(solve2(input))
let endSolve2 = performance.now();
console.log(`Solve 2 Execution time: ${endSolve2 - startSolve2} milliseconds`);
