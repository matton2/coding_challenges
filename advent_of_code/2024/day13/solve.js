import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2024/day13/example.txt')
const input = readFile('/advent_of_code/2024/day13/input.txt')

function solveLinearEquations(a1, b1, c1, a2, b2, c2) {
    // Calculate the determinant
    const determinant = a1 * b2 - a2 * b1

    if (determinant === 0) {
        return 0
    }

    // Solve for x and y
    const x = (c1 * b2 - c2 * b1) / determinant
    const y = (a1 * c2 - a2 * c1) / determinant

    if(x > 100 || y > 100 || x % 1 !== 0 || y % 1 !== 0) {
        return 0
    }

    return { x, y };
}

function solveLinearEquations2(a1, b1, c1, a2, b2, c2) {
    // Calculate the determinant
    const determinant = a1 * b2 - a2 * b1

    if (determinant === 0) {
        return 0
    }

    // Solve for x and y
    const x = (c1 * b2 - c2 * b1) / determinant
    const y = (a1 * c2 - a2 * c1) / determinant

    if(x % 1 !== 0 || y % 1 !== 0) {
        return 0
    }

    return { x, y };
}



function solve1(input) {
    let totalTokens = 0

    for(let i = 0; i < input.length; i +=4) {
        
        let a = input[i].match(/\b\d{2}\b/g).map(Number)
        let b = input[i+1].match(/\b\d{2}\b/g).map(Number)
        let prize = input[i+2].match(/\b\d{3,5}\b/g).map(Number)
        let solve = solveLinearEquations(a[0], b[0], prize[0], a[1], b[1], prize[1])
        if (solve !== 0) {
            totalTokens = totalTokens + solve['x']*3
            totalTokens = totalTokens + solve['y']
        }

    }
    return(totalTokens)

}

console.log('Example solve1', solve1(example))
console.log('Input solve1', solve1(input))

function solve2(input) {
    let totalTokens = 0

    for(let i = 0; i < input.length; i +=4) {
        
        let a = input[i].match(/\b\d{2}\b/g).map(Number)
        let b = input[i+1].match(/\b\d{2}\b/g).map(Number)
        let prize = input[i+2].match(/\b\d{3,5}\b/g).map(Number).map(el => el + 10000000000000)
        let solve = solveLinearEquations2(a[0], b[0], prize[0], a[1], b[1], prize[1])
        if (solve !== 0) {
            totalTokens = totalTokens + solve['x']*3
            totalTokens = totalTokens + solve['y']
        }

    }
    return(totalTokens)

}

console.log('Example solve2', solve2(example))
console.log('Input solve2', solve2(input))