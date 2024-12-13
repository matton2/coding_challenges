import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2024/day10/example.txt').map(el => el.split("")).map(subArray => {
    return subArray.map(el => Number(el))
})
const input = readFile('/advent_of_code/2024/day10/input.txt')

function walkTheTrail(input, col, row, total=0) {
    let up = [-1,0]
    let down = [1,0]
    let left = [0,-1]
    let right = [0,1]
    let directions = [up, right, down, left]
    let currentNumber = input[col][row]
    if(currentNumber === 9) {
        console.log('find a good path!')
        return (total+1)
    }
    directions.forEach(dir => {
        if(input[col+dir[0]]?.[row+dir[1]] === undefined) {
            return total
        } else if(input[col+dir[0]][row+dir[1]] === currentNumber +1) {
            walkTheTrail(input, col+dir[0], row+dir[1], total)            
        } else {
            return(total)
        }
    })
}

function solve1(input) {
    let totalTrailHeads = 0

    input.forEach((trail, col) => {
        trail.forEach((trailHead, row) => {
            // we need to look around
            if(trailHead === 0) {
                console.log(walkTheTrail(input, col, row))
                if(walkTheTrail(input, col, row)) {
                    totalTrailHeads +=1
                }
            }
        })
    })
    
    return totalTrailHeads

    
}

console.log("Example solve1:", solve1(example))