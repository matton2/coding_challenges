import { readFile, lookAroundAndCount } from "../../../utilities.js";

const example = readFile('/advent_of_code/2025/day04/example.txt')
const input = readFile('/advent_of_code/2025/day04/input.txt')


function solve1(input) {
    let totalCount = 0
    input.forEach((row, r) => {
        let cleanRow = row.split('')
        cleanRow.forEach((col, c) => {
            let totalRolls = col === '@' ? lookAroundAndCount(input, r, c, true, '@'):5
            if (totalRolls < 4) totalCount +=1
        })
    })
    return totalCount
}

let startSolve1 = performance.now();
console.log(solve1(example))
console.log(solve1(input))
let endSolve1 = performance.now();
console.log(`Solve 1 Execution time: ${endSolve1 - startSolve1} milliseconds`);


function solve2(input) {
    let totalCount = 0
    let currentInput = Array.from(input)
    let updatedInput = Array.from(input)
    // i need a while loop here
    let movedMore = true
    while (movedMore) {
        movedMore = false
        currentInput.forEach((row, r) => {
            let cleanRow = row.split('')
            cleanRow.forEach((col, c) => {
                let totalRolls = col === '@' ? lookAroundAndCount(currentInput, r, c, true, '@'):5
                if (totalRolls < 4) {
                    totalCount +=1
                    // the update updated row apart
                    let updatedRow = updatedInput[r].split('')
                    // switch the @ to a .
                    updatedRow[c] = '.'
                    // put the updated row back together
                    updatedInput[r] = updatedRow.join('')
                    movedMore = true
                }
            })
        })
        currentInput = Array.from(updatedInput)
    }

    return totalCount
}

let startSolve2 = performance.now();
console.log(solve2(example))
console.log(solve2(input))
let endSolve2 = performance.now();
console.log(`Solve 1 Execution time: ${endSolve2 - startSolve2} milliseconds`);

