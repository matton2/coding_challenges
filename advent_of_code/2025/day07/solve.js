import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2025/day07/example.txt').map(line => line.split(''))
const input = readFile('/advent_of_code/2025/day07/input.txt').map(line => line.split(''))

function solve1(input) {
    let totalSplits = 0
    input.forEach((level, row) => {
        if(row === input.length-1) return
        level.forEach((section, column) => {
            // i need to look below
            // if the section = 'S' i need to put a | in the spot right below
            // if the section = ^ then i need to put a | on the left and right of that section and increase my totalSplits by 1
            let rightBelow = input[row+1][column]
            if(section === '.') return
            if(section === 'S') input[row+1][column] = '|' 
            if(section === '|' && rightBelow === '.') input[row+1][column] = '|' 
            if(section === '|' && rightBelow === '^') {
                input[row+1][column-1] = '|'
                input[row+1][column+1] = '|'
                totalSplits+=1
            }            
        })
    })
    return totalSplits
}

let startSolve1 = performance.now();
//console.log(solve1(Array.from(example)))
//console.log(solve1(Array.from(input)))
let endSolve1 = performance.now();
console.log(`Solve 1 Execution time: ${endSolve1 - startSolve1} milliseconds`);

function solve2(input) {
    input.forEach((level, row) => {
        if(row === input.length-1) return
        level.forEach((section, column) => {
            // i need to look below
            // if the section = 'S' i need to put a | in the spot right below
            // if the section = ^ then i need to put a | on the left and right of that section and increase my totalSplits by 1
            let rightBelow = input[row+1][column]
            if(section === '.') return
            if(section === 'S') input[row+1][column] = 1 
            if(typeof section === 'number' && rightBelow === '.') input[row+1][column] = section
            if(typeof section === 'number' && typeof rightBelow === 'number') input[row+1][column] = section+rightBelow
            if(typeof section === 'number' && rightBelow === '^') {

                input[row+1][column-1] === '.' ? input[row+1][column-1] = section : input[row+1][column-1]+=section
                input[row+1][column+1] === '.' ? input[row+1][column+1] = section : input[row+1][column+1]+=section
            }            
        })
    })
    let lastRow = input[input.length-1].filter(el => el !== '.').reduce((acc, curr) => acc + curr, 0)
    return lastRow
}

let startSolve2 = performance.now();
console.log(solve2(Array.from(example)))
console.log(solve2(Array.from(input)))
let endSolve2 = performance.now();
console.log(`Solve 2 Execution time: ${endSolve2 - startSolve2} milliseconds`);