import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2024/day02/example.txt')
const input = readFile('/advent_of_code/2024/day02/input.txt')

function solve1(input) {
    let safe = 0

    input.forEach((line,index) => {
        let levels = line.split(' ').map(Number)
        let setTheTone = levels[0]-levels[1] > 0?'desc':'asc'
        let currentlySafe = true
        for(let level = 0; level < levels.length-1; level += 1) {
            let thisLevel = levels[level]
            let nextLevel = levels[level+1]
            let currentTone = thisLevel-nextLevel > 0?'desc':'asc'
            if(thisLevel-nextLevel === 0) {
                currentlySafe=false
            }
            if((Math.abs(thisLevel-nextLevel)>3) || setTheTone !== currentTone) {
                currentlySafe=false
            }
        }
        currentlySafe===true?safe+=1:0
    })
    return safe
}

//console.log('example:', solve1(example))
//console.log('input:', solve1(input))

function checkingSafeness(levels) {
    let setTheTone = levels[0]-levels[1] > 0?'desc':'asc'
    let badLevel = -1
        for(let level = 0; level < levels.length-1; level += 1) {
            let thisLevel = levels[level]
            let nextLevel = levels[level+1]
            let currentTone = thisLevel-nextLevel > 0?'desc':'asc'
            if(thisLevel-nextLevel === 0) {
                badLevel = level +1
            }
            if((Math.abs(thisLevel-nextLevel)>3) || setTheTone !== currentTone) {
                badLevel = level+1
            }
        }
    return badLevel
}

function solve2(input) {
    let safe = 0

    input.forEach((line,index) => {
        let levels = line.split(' ').map(Number)
        let wasItOk = checkingSafeness(levels)
        if(wasItOk === -1) {
            safe+= 1
        } else {
                let temp = levels
                temp.splice(wasItOk, 1)
                let tryAgain = checkingSafeness(temp)
                if(tryAgain === -1) {
                    safe+=1
                }
        }
    })
    return safe
}

console.log('example:', solve2(example))
console.log('input:', solve2(input))