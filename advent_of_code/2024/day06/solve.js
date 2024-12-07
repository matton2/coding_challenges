import { readFile } from "../../../utilities.js";

const example1 = readFile('/advent_of_code/2024/day06/example.txt').map(el => el.split(""))
const example2 = readFile('/advent_of_code/2024/day06/example.txt').map(el => el.split(""))
const input = readFile('/advent_of_code/2024/day06/input.txt').map(el => el.split(""))

function solve1(input) {
    //find the starting position first
    //x, y
    let position = []
    let up = [-1,0]
    let down = [1,0]
    let left = [0,-1]
    let right = [0,1]
    let currentMarker = null
    let directionList =['^', ">", 'v', '<']
    let directionMoveList = [up, right, down, left]
    let currentDirection = directionMoveList[0]
    let maxRows = input.length
    let maxColumns = input[0].length

    input.forEach((line, row) => {
        
        line.forEach((space, column) => {
            if (space === "^") {
                currentMarker = space
                currentDirection = directionMoveList[directionList.findIndex(el => el === currentMarker)]
                position.push(row)
                position.push(column)
            }
        })
    })

    while(position !== undefined) {
        //we need to move one position in our current direction and replce the current position with an x
        input[position[0]][position[1]] = "X"
        //check to see if next position is a #, we need to change direction
        if(position[0]+currentDirection[0] === maxRows || position[1]+currentDirection[1] === maxColumns ||
            position[0]+currentDirection[0] === -1 || position[1]+currentDirection[1] === -1
        ) {
            position = undefined

        } else if(input[position[0]+currentDirection[0]][position[1]+currentDirection[1]] === "#") {
            currentMarker = directionList[directionList.findIndex(el => el ===currentMarker)+1]
            if(currentMarker === undefined) {
                currentMarker = directionList[0]
            }
            currentDirection = directionMoveList[directionList.findIndex(el => el === currentMarker)]

        } else {
            position[0] = position[0]+currentDirection[0]
            position[1] = position[1]+currentDirection[1]
        }
        
    }

    let totalSpots = 0
    input.forEach(row => {
        row.forEach(place => {
            if(place === 'X') {
                totalSpots += 1
            }
        })
    })
    
    return([totalSpots, input])

}

console.log('Example:', solve1(example1))
//console.log('Example:', solve1(input[0]))


function solve2(input) {

    // inorder to create a loop i must have a # in row x, column y, a # in row x-1, 
    let totalObstacles = 0
    input.forEach((line, row) => {
        line.forEach((cell, column) => {
            if(cell === 'X') {
                let tempInput = input
            tempInput[row][column] = '#' 
            console.log(solve1(tempInput))

            }
            
        })
    })

    return totalObstacles

}
    


console.log('Example:', solve2(solve1(example2)[1]))
//console.log('Example:', solve2(input))