import { create } from "domain";
import { readFile } from "../utilities.js";

const example = readFile('/2023/day03/example.txt')
const input = readFile('/2023/day03/input.txt')

const range = (start, end) => Array.from({ length: end - start + 1 }, (_, index) => index + start);

function solve1(input) {

    const specials = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/
    let total = 0
    input.map((line, index) => {
        //find the numbers
        //but i also need to find the index of those numbers?
        let numbers = line.match(/\d+/g)
        let lineIndex = index
        let lastIndex = 0
        if(numbers?.length > 0) {
            for(const number of numbers) {
                 //find the position of the numbers
                 let restOfLine = line.slice(lastIndex)
                 let startInd = lastIndex + (restOfLine.indexOf(number) > 0 ? restOfLine.indexOf(number) -1 : restOfLine.indexOf(number))
                 //let startInd = line.indexOf(number) > 0 ? line.indexOf(number) -1 : line.indexOf(number)
                 let endInd = (number.length +startInd +2)
                 //this will make sure we get everything before the last index as well
                 lastIndex = endInd-1
                 //see if that number is adject to a symbol
                 // should this be set up as an x (index),y (line) point
                 let lineRange = range(lineIndex-1, lineIndex+1).filter(el => el >= 0 && el < input.length)
                 for (const line of lineRange) {
                        //i can use .test to see if a string contains it
                     if(specials.test(input[line].slice(startInd, endInd))) {
                         console.log('add',number)
                         total += Number(number)
                         break
                     }
                 }

            }
        }
      
    })
    return(total)
}
//console.log('example:',solve1(example))
//console.log(solve1(input))

function solve2(input) {
    let total = 0
    const maxNumberDigits = 3
    input.map((line, index) => {
        let allChar = line.split('')
        let lineIndex = index
        allChar.map((char, index) => {
            // this will fall into the loop if the char at the given index is *
            if(char === "*") {
                const numbersPerStar = []
                let starIndex = index
                // this would be the lines i need to look around
                let lineRange = range(lineIndex-1, lineIndex+1).filter(el => el >= 0 && el < input.length)
                for (const line of lineRange) {
                    let numbers = input[line].match(/\d+/g)
                    //let lineIndex = index
                    let lastIndex = 0
                    if(numbers?.length > 0) {
                    for(const number of numbers) {
                        let restOfLine = input[line].slice(lastIndex)
                        let startInd = lastIndex + (restOfLine.indexOf(number) > 0 ? restOfLine.indexOf(number) -1 : restOfLine.indexOf(number))
                        //let startInd = line.indexOf(number) > 0 ? line.indexOf(number) -1 : line.indexOf(number)
                        let endInd = (number.length +startInd +1)
                        //this will make sure we get everything before the last index as well
                        lastIndex = endInd
                        if(range(startInd, endInd).includes(starIndex)) {
                            numbersPerStar.push(Number(number))
                        }

                    }
                }                    
                }
                if(numbersPerStar.length === 2) {
                    total = total + (numbersPerStar[0] * numbersPerStar[1])
                }

            }
           
        })
       
    })
    return(total)
}

console.log('example:',solve2(example))
console.log('input:',solve2(input))
