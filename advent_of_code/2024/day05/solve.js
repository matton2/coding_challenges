import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2024/day05/example.txt')
const input = readFile('/advent_of_code/2024/day05/input.txt')

function cleanInput(input) {
    let beforeRule = []
    let afterRule = []
    let printing = []

    input.forEach(line => {
        if(line.includes('|')) {
            let split = line.split("|")
            beforeRule.push(Number(split[0]))
            afterRule.push(Number(split[1]))
        } else if (line.length >0) {
            printing.push(line.split(",").map(Number))
        }
    })
    
    return [beforeRule, afterRule, printing]
}

function checkTheLine(line, beforeRule, afterRule) {
    let goodPrintingQ = true
        line.forEach((page, index, array) => {
            //for each number, i need for figure out the pre indexes
            let prePrintIndexes = beforeRule.map((el, i) => el === page ? i : '').filter(Number)
            // i will then need to figure out what pages need to be printed 
            let afterPrints = prePrintIndexes.map(index => afterRule[index])
            // this will remove any pages after this index so i only deal with prev printed pages
            let pagesBefore = array.slice(0, index)
            // if the pages before contains an after print, it is wrong
            if(pagesBefore.some(page => afterPrints.includes(page))) {
                goodPrintingQ = false
            }
        })
    return goodPrintingQ
}

function solve1(input) {

    let [beforeRule, afterRule, printing] = cleanInput(input)

    let printingLines = []
    let middlePageSums = 0

    printing.forEach(line => {
        if(checkTheLine(line, beforeRule, afterRule)) {
            printingLines.push(line)
        }
    })

    printingLines.forEach(line => {
        let mid = Math.floor(line.length/2)
        middlePageSums += line[mid]
    })
    
    return(middlePageSums)

}

console.log('example Solve1:', solve1(example))
console.log('input Solve1:', solve1(input))

function fixTheLine (line, beforeRule, afterRule) {
    let goodPrintingQ = -1
        let indexToFix = -1
        line.forEach((page, index, array) => {
            //for each number, i need for figure out the pre indexes
            let prePrintIndexes = beforeRule.map((el, i) => el === page ? i : '').filter(Number)
            // i will then need to figure out what pages need to be printed 
            let afterPrints = prePrintIndexes.map(index => afterRule[index])
            let pagesBefore = array.slice(0, index)
            // if the pages before contains an after print, it is wrong
            if(pagesBefore.some(page => afterPrints.includes(page))) {
                //so this will tell the index that is wrong, so we will need to splice the array and rearrange
                goodPrintingQ = pagesBefore.findIndex(page => afterPrints.includes(page))
                indexToFix = index
            }
        })  

    let toInsert = line[goodPrintingQ]
    line.splice(goodPrintingQ, 1)
    line.splice(indexToFix, 0, toInsert)

    return (line)


}

function solve2(input) {

    let [beforeRule, afterRule, printing] = cleanInput(input)

    let printingLines = []
    let middlePageSums = 0

    printing.forEach(line => {
        
        if(!checkTheLine(line, beforeRule, afterRule)) {
            while(!checkTheLine(line, beforeRule, afterRule)) {
                fixTheLine(line, beforeRule, afterRule)
            }
            printingLines.push(line)
        }       
        
    })

    printingLines.forEach(line => {
        let mid = Math.floor(line.length/2)
        middlePageSums += line[mid]
    })
    
    return(middlePageSums)

}

console.log('example Solve2:', solve2(example))
console.log('input Solve2:', solve2(input))