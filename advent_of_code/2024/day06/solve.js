import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2024/day06/example.txt').map(el => el.split(""))
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
    
    return(totalSpots)

}

//console.log('Example:', solve1(example))
//console.log('Example:', solve1(input))


function solve2(input) {

    // inorder to create a loop i must have a # in row x, column y, a # in row x-1, 
    let totalObstacles = 0

    input.forEach((line, row) => {
        line.forEach((space, column) => {
            if(space === "#") {
                //does a spot down and to the right have a #
                console.log('found our first x')
                let rowDown = input[row+1].slice(column).findIndex(el => el === '#')
                if(rowDown !== -1) {
                    console.log('found out second x')
                    let actualRow = rowDown + column
                    let belowLines = input.slice(row+1) 
                    belowLines.forEach((bottomLine) => {
                        if(bottomLine[actualRow] === '#') {
                            console.log('found our 3rd')
                            totalObstacles += 1
                            console.log(totalObstacles)
                        }
                    })
                } 
                
            }
        })
    })


    return totalObstacles

}

console.log('Example:', solve2(example))
//console.log('Example:', solve2(input))