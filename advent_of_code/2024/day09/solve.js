import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2024/day09/example.txt')
const input = readFile('/advent_of_code/2024/day09/input.txt')


function solve1(input) {
    let file = input[0].split('')
    let fileStructure = []
    let id = 0
    file.forEach((number, index) => {
        if (index % 2 === 0) {
            let temp = Array(Number(number)).fill(String(id))
            id += 1
            fileStructure.push(...temp)
        } else {
            let temp = Array(Number(number)).fill('.')
            fileStructure.push(...temp)
        }

    })

    let total = 0

    fileStructure.some((el, index) => {
        if(el !== '.') {
            total = total + (index * Number(el))
        } else {
            fileStructure.findLast((lastEl, lastIndex) => {
                if(lastEl !== '.') {
                    total = total + (index * Number(lastEl))
                    fileStructure[index] = lastEl
                    fileStructure[lastIndex] = '.'
                    return true
                }             
            })
        }
        // check to see if the formating is done
        let whatsLeft = fileStructure.slice(index+1)
        if(whatsLeft.every(el => el === '.')) {
            return true
        }
    })

    return(total)

}

console.log(solve1(example))
console.log(solve1(input))



function solve2(input) {
    let file = input[0].split('')
    let fileStructure = []
    let id = 0
    file.forEach((number, index) => {
        if (index % 2 === 0) {
            let temp = Array(Number(number)).fill(String(id))
            id += 1
            fileStructure.push(...temp)
        } else {
            let temp = Array(Number(number)).fill('.')
            fileStructure.push(...temp)
        }

    })

    let total = 0

    

    fileStructure.some((el, index) => {
        if(el !== '.') {
            total = total + (index * Number(el))
        } else {
            fileStructure.findLast((lastEl, lastIndex) => {
                if(lastEl !== '.') {
                    total = total + (index * Number(lastEl))
                    fileStructure[index] = lastEl
                    fileStructure[lastIndex] = '.'
                    return true
                }             
            })
        }
        // check to see if the formating is done
        let whatsLeft = fileStructure.slice(index+1)
        if(whatsLeft.every(el => el === '.')) {
            return true
        }
    })

    return(total)

}

console.log(solve2(example))
//console.log(solve2(input))
