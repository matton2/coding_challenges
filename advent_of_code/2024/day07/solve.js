import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2024/day07/example.txt')
const input = readFile('/advent_of_code/2024/day07/input.txt')

function figureOutAllOperations(elements, length) {

    if (length === 0) {
        return [[]]
    }
    let totalOperations = []

    for (const element of elements) {
        const subcombinations = figureOutAllOperations(elements, length -1)
        for (const subcombination of subcombinations) {
            totalOperations.push([element, ...subcombination])
        }
    }
    return totalOperations
}

const doMath = (test, numbers) => {

    let totalOperations = figureOutAllOperations(['*', "+"], numbers.length-1)
    console.log('current test = ', test)
    let toRet = 0
    totalOperations.forEach(operation => {
        let total = 0;
        operation.some((op, index) => {
            if(index === 0) {
                total = eval([numbers[index], op, numbers[index+1]].join(''))
            } else {
                total = eval([total, op, numbers[index+1]].join(''))
            }
        })
        if(total === test) {
            toRet = total
            return true
        }
    })
    return(toRet)
}

function solve1(input) {
    let total = 0

    input.forEach(eq => {
        let cleanUp = eq.split(": ")
        let test = Number(cleanUp[0])
        let opers = cleanUp[1].split(" ").map(Number)
        total += doMath(test, opers)
    })

    return(total)

}

console.log('Example:', solve1(example))
console.log('Input:', solve1(input))