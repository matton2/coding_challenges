import {readFile} from '../../../utilities.js'

const example = readFile('/advent_of_code/2022/day01/example.txt')
const input = readFile('/advent_of_code/2022/day01/input.txt')

function solve1(input) {
    let mostCalories = 0
    let currentCalories = 0
    input.forEach(el => {
        if(el.length === 0) {
            mostCalories = mostCalories > currentCalories? mostCalories:currentCalories
            currentCalories = 0
        } else {
            currentCalories = currentCalories + Number(el)
        }
        
    })
    return(mostCalories)

}

console.log('example1:', solve1(example))
console.log('input1:', solve1(input))


function solve2(input) {
    let caloriesBeingCarried = []
    let currentCalories = 0
    input.forEach(el => {
        if(el.length === 0) {
            caloriesBeingCarried.push(currentCalories)
            currentCalories = 0
        } else {
            currentCalories = currentCalories + Number(el)
        }
        
    })

    caloriesBeingCarried.sort((a, b) => b - a)

    let top3 = caloriesBeingCarried[0] + caloriesBeingCarried[1] + caloriesBeingCarried[2]

    return(top3)

}

console.log('example1:', solve2(example))
console.log('input1:', solve2(input))