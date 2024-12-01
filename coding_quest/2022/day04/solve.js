import { readFile } from "../../../utilities.js";

const example = readFile('/coding_quest/2022/day04/example.txt')
const input = readFile('/coding_quest/2022/day04/input.txt')

const checkWin = (board) => {

    board.forEach(element => {
        //for each column i need to check if there are 4 in a row
        // if the difference between this and the next = 0, then keep track, otherwise reset
        console.log(element)
    });
}

function solve1(input) {

    input.map(game => {
        let board = Array.from(Array(8), ()=> new Array())
        console.log(board)
        let moves = game.split('').map(Number)
        for(let i=0; i < moves.length-3; i +=3) {
            console.log(moves[i])
            board[moves[i]].push(1)
            if(checkWin(board)) {

            }
            board[moves[i+1]].push(2) 
            if(checkWin(board)) {

            }
            board[moves[i+2]].push(3) 
            if(checkWin(board)) {

            }
            console.log('end round?')
            
        }


    })
}

console.log('example:', solve1(example))