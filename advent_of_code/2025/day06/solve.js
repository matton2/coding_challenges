import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2025/day06/example.txt')
const input = readFile('/advent_of_code/2025/day06/input.txt')

function solve1(input) {
    let cleanProblems = input.map(el => el.split(' ')).map(list => list.filter(el => el.length > 0))
    let formattedProblems = cleanProblems[0].map((_, colIndex) =>
    cleanProblems.map(row => row[colIndex]))
    let total = 0
    formattedProblems.forEach(problem => {
        let operator = problem.pop()
        let numbers = problem.map(Number)
        if(operator === '*') {
            let problemSolution = numbers.reduce((acc, curr) => acc * curr, 1)
            total += problemSolution
        } else if (operator === '+') {
            let problemSolution = numbers.reduce((acc, curr) => acc + curr, 0)
            total += problemSolution
        }
    })
    return total
}

let startSolve1 = performance.now();
//console.log(solve1(example))
//console.log(solve1(input))
let endSolve1 = performance.now();
console.log(`Solve 1 Execution time: ${endSolve1 - startSolve1} milliseconds`);


function solve2(input) {
    // on the input, the white space is trimmed on the first lne and last line, this was hard to figure out...
    input[0] = ' ' + input[0]
    input[4] = input[4] + " "
    let cleanProblems = input.map(el => el.split(''))    
    let formattedProblems = cleanProblems[0].map((_, colIndex) =>
        cleanProblems.map(row => row[colIndex]))
    let betterProblems = []
    let currentOperator = '*'
    formattedProblems.forEach(problem => {
        // if its a blank line, we can move to the next problem
        if(problem.every(el => el === ' ')) {
            return
        }
        // for each line, i am going to check if there is symbol in the last element, 
       
        if(problem[4] !== ' ') {
            currentOperator = problem.pop()
            let currentNumber = Number(problem.join(''))
            betterProblems.push([currentOperator, currentNumber])
        } else {
            let currentNumber = Number(problem.join(''))
            betterProblems[betterProblems.length-1].push(currentNumber)
        }
    })
    let total = 0
    betterProblems.findLast(problem => {
        let operator = problem.shift()
        if(operator === '*') {
            let problemSolution = problem.reduce((acc, curr) => acc * curr, 1)
            total += problemSolution
        } else if (operator === '+') {
            let problemSolution = problem.reduce((acc, curr) => acc + curr, 0)
            total += problemSolution
        }
    })
    return total
}

let startSolve2 = performance.now();
//console.log(solve2(example))
console.log(solve2(input))
let endSolve2 = performance.now();
console.log(`Solve 2 Execution time: ${endSolve2 - startSolve2} milliseconds`);

