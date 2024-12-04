import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2024/day04/example.txt')
const input = readFile('/advent_of_code/2024/day04/input.txt')

const lookAround = (line, lineNumber, index, letter, direction) => {
    const offsets = {
        forward: [0, 1, 2, 3],
        backward: [0, -1, -2, -3],
        up: [0, -1, -2, -3],
        down: [0, 1, 2, 3],
        diagLeftUp: [0, -1, -2, -3],
        diagRightUp: [0, 1, 2, 3],
        diagLeftDown: [0, -1, -2, -3],
        diagRightDown: [0, 1, 2, 3],
    };

    const [rowDelta, colDelta] = {
        forward: [0, 1],
        backward: [0, -1],
        up: [-1, 0],
        down: [1, 0],
        diagLeftUp: [-1, -1],
        diagRightUp: [-1, 1],
        diagLeftDown: [1, -1],
        diagRightDown: [1, 1],
    }[direction];

    return offsets[direction].map((offset) => {
        const row = lineNumber + offset * rowDelta;
        const col = index + offset * colDelta;
        return line[row]?.[col] ?? ""; // Safely access the value
    }).join("");

}

function solve1(input) {
    let totalCount = 0

    let split = input.map(lines => lines.split(''))

    split.forEach((line, index, array) =>{
        let lineNumber = index
        let splits = array
        line.forEach((letter, index) => {
            if(letter === "X") {
                // now we need to look around
                let searchForward = line.slice(index, index+4).join("")
                let searchBackard = line.slice(index-3, index+1).join("")
                let searchUp = [letter, splits[lineNumber-1]?.[index], splits[lineNumber-2]?.[index],splits[lineNumber-3]?.[index]].join("")
                let searchDown = [letter, splits[lineNumber+1]?.[index], splits[lineNumber+2]?.[index],splits[lineNumber+3]?.[index]].join("")
                let searchDiagLeftUp = [letter, splits[lineNumber-1]?.[index-1], splits[lineNumber-2]?.[index-2],splits[lineNumber-3]?.[index-3]].join("")
                let searchDiagRightUp = [letter, splits[lineNumber-1]?.[index+1], splits[lineNumber-2]?.[index+2],splits[lineNumber-3]?.[index+3]].join("")
                let searchDiagLeftDown = [letter, splits[lineNumber+1]?.[index-1], splits[lineNumber+2]?.[index-2],splits[lineNumber+3]?.[index-3]].join("")
                let searchDiagRightDown =  [letter, splits[lineNumber+1]?.[index+1], splits[lineNumber+2]?.[index+2],splits[lineNumber+3]?.[index+3]].join("")

                let allSearches = [searchForward, searchBackard, searchUp, searchDown, searchDiagLeftUp, searchDiagRightUp, 
                    searchDiagLeftDown, searchDiagRightDown
                ]
                totalCount += allSearches.filter(el => el === "XMAS").length
                totalCount += allSearches.filter(el => el === "SAMX").length
               
            }
        })

    })

    return totalCount

}

//console.log(solve1(example))
//console.log(solve1(input))

function solve2(input) {
    let totalCount = 0

    let split = input.map(lines => lines.split(''))

    split.forEach((line, index, array) =>{
        let lineNumber = index
        let splits = array
        line.forEach((letter, index) => {
            if(letter === "A") {
                // now we need to look around
                // if we find an A, we need to look one positin in each direction
                // this should be left up one and right down one
                let backSlash = [splits[lineNumber-1]?.[index-1], letter, splits[lineNumber+1]?.[index+1]].sort().join("")
                // this should be right up one left down one
                let forwardSlash = [splits[lineNumber-1]?.[index+1], letter, splits[lineNumber+1]?.[index-1]].sort().join("")
                if(backSlash === forwardSlash && backSlash.length===3 && backSlash === "AMS") {
                    totalCount+=1
                }
               
            }
        })

    })

    return totalCount

}

console.log(solve2(example))
console.log(solve2(input))