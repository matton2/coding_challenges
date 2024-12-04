import { readFile } from "../../../utilities.js";

const example = readFile('/coding_quest/2022/day04/example.txt')
const input = readFile('/coding_quest/2022/day04/input.txt')

const checkColumns = (board, numberToWin) => {
    
    board.forEach(col => {
        let currentCount = 1
        if(col.length > 0) {
            col.forEach((el, index) => {
                if(index > 0) {
                    if(el === col[index-1]) {
                        currentCount += 1
                        if(currentCount === numberToWin) {
                            return true
                        }
                    } else {
                        currentCount = 1
                    }
                }
            })
        }
    })

}

const checkRows = (board, numberToWin) => {

    for(let row=0; row< 7; row+=1) {
        let currentCount = 1
        for(let column=1; column <7;column+=1) {
            let thisCell = board[column][row]
            let prevCell = board[column-1][row]
            if (thisCell !== undefined && prevCell !== undefined) {
                if(thisCell === prevCell) {
                    currentCount += 1
                    if(currentCount === numberToWin) {
                        return true
                    }
                } else {
                    currentCount = 1
                }
            } else {
                currentCount = 1
            }
        }
        
    }

}

const checkDiag = (board, numberToWin) => {
    // i need to check diagonals in both directions!!
    for(let row = 0; row < 7; row+=1) {
        let currentCount = 1
        for(let column=1; column < 7; column+=1) {
            let thisCell = board[column][row]
            let prevCell = board[column+1][row+1]
            if (thisCell !== undefined && prevCell !== undefined) {
                if(thisCell === prevCell) {
                    currentCount += 1
                    if(currentCount === numberToWin) {
                        return true
                    }
                } else {
                    currentCount = 1
                }
            } else {
                currentCount = 1
            }
        }
    }

    for(let row = 0; row < 7; row+=1) {
        let currentCount = 1
        for(let column=7; column > 0; column-=1) {
            let thisCell = board[column][row]
            let prevCell = board[column-1][row+1]
            if (thisCell !== undefined && prevCell !== undefined) {
                if(thisCell === prevCell) {
                    currentCount += 1
                    if(currentCount === numberToWin) {
                        return true
                    }
                } else {
                    currentCount = 1
                }
            } else {
                currentCount = 1
            }
        }
    }
    

}

const checkWin = (board) => {

    if(checkColumns(board, 4) || checkRows(board, 4) || checkDiag(board, 4)) {
        return true
    }
}

function solve1(input) {
    let player1Wins = 0
    let player2Wins = 0
    let player3Wins = 0

    let gameLog = input.map(game => {
        let board = Array.from(Array(8), ()=> new Array())
        let moves = game.split('').map(Number)
        for(let i=0; i < moves.length-3; i +=3) {
            board[moves[i]].push(1)
            if(checkWin(board)) {
                console.log('player1 wins!')
                player1Wins += 1
                return 1
                
            }
            board[moves[i+1]].push(2) 
            if(checkWin(board)) {
                console.log('player2 wins!')
                player2Wins += 1
                return 2
            }
            board[moves[i+2]].push(3) 
            if(checkWin(board)) {
                player3Wins += 1
                console.log('player3 wins!')
                return 3
            }
            
        }
    })
    console.log('player 1 wins:', player1Wins)
    console.log('player 2 wins:', player2Wins)
    console.log('player 3 wins:', player3Wins)
    console.log('game log:', gameLog)

}

console.log('example:', solve1(example))
console.log('example:', solve1(input))