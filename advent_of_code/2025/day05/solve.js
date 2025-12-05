import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2025/day05/example.txt')
const input = readFile('/advent_of_code/2025/day05/input.txt')

function solve1(input) {
    let ranges = []
    let ingredients = []
    let freshCount = 0
    // split in the input into ranges and ingredients
    let readyForIngredients = false
    input.forEach(line => {
        readyForIngredients ? ingredients.push(line) : ranges.push(line)
        if(line.length === 0) readyForIngredients = true
    })
    // now for each ingredient, see if it falls in a range
    ingredients.forEach(ingredient => {
        ingredient = Number(ingredient)
        let match = false
        ranges.forEach(range => {
            let min = Number(range.split('-')[0])
            let max = Number(range.split('-')[1])
            if(ingredient >= min && ingredient <= max) {
                if(match === false) freshCount+=1
                match = true
            }

        })
    })
    return freshCount

}

let startSolve1 = performance.now();
console.log(solve1(example))
console.log(solve1(input))
let endSolve1 = performance.now();
console.log(`Solve 1 Execution time: ${endSolve1 - startSolve1} milliseconds`);


function parseRange(rangeStr) {
    let [start, end] = rangeStr.split("-").map(Number);
    return { start, end };
}

function solve2(input) {
    let rangeList= []
    let ingredients = []
    let readyForIngredients = false
    input.forEach(line => {
        if(line.length === 0) readyForIngredients = true
        readyForIngredients ? ingredients.push(line) : rangeList.push(line)
    })
    let ranges = rangeList.map(parseRange);
    ranges.sort((a, b) => a.start - b.start || a.end - b.end);
    // for each range, if the end is including in the start of the next one,
    // increase the state
    let cleanRanges = [ranges[0]]
    // lets try to merge the intervals together
    ranges.forEach((range, index) => {
        if (index > 0) {
            let currentEnd = cleanRanges[cleanRanges.length-1].end;
            let nextStart = range.start;
            // if the nextStart is less than the end, append the latest interval
            if(currentEnd >= nextStart && currentEnd < range.end) {
                // extend the current range
                cleanRanges[cleanRanges.length-1].end = range.end
            } else if(currentEnd >= nextStart && currentEnd >= range.end) {
                // this range is inside the current range
                return
            } else {
                // this is a brand new range!!
                cleanRanges.push(range)
            }
        }
    });

    let totalItems = cleanRanges.reduce((acc, curr) => acc + (curr.end - curr.start)+1, 0)

    return totalItems;
}


let startSolve2A = performance.now();
console.log(solve2(example))
console.log(solve2(input))
let endSolve2A = performance.now();
console.log(`Solve 2 Execution time: ${endSolve2A - startSolve2A} milliseconds`);