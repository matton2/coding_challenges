import {readFile} from '../../../utilities.js'

const example = readFile('/advent_of_code/2021/day04/example.txt')
const input = readFile('/advent_of_code/2021/day04/input.txt')

function checkCard(card, number) {
    if(number === 24) {
        console.log('24')
    }

    let win = false;

    let updatedCard = card.map(el => 
        el.map(ele =>  ele === number ? "X":ele)
    )

    // check row winner
    win = updatedCard.map(row => row.every(el => el === "X")).some(el => el)

    if(!win) {
        //check col winner
        for(let i = 0; i<updatedCard.length;i++) {
            let thisWin = [updatedCard[0][i], 
            updatedCard[1][i], 
            updatedCard[2][i], 
            updatedCard[3][i], 
            updatedCard[4][i], 
                    ].every(el => el === 'X')
            if(thisWin === true) {
                win = true
                break
            }
        }

    }

    return {win: win, cardOutcome: updatedCard}
}

function calculateFinalNumber(card, number) {
    let cardScore = 0
    card.map(el => 
        el.map(ele =>  typeof(ele) === 'number' ? cardScore+=ele :null))
    return cardScore * number
}

function solve1(input) {
    let numbers = input[0].split(',').map(parseFloat)
    let final;
    let cards = []
    for(let i = 2; i < input.length; i = i+6) {
        let cardString = input.slice(i, i+5)
        let card = cardString.map(el => el.split(" ").map(parseFloat).filter( value => !Number.isNaN(value) ))
        cards.push(card)
    }
    numbers.forEach(num => {
        cards.forEach((card, index) => {
            let {win, cardOutcome} = checkCard(card, num)
            if(win) {
                return calculateFinalNumber(cardOutcome, num)
            } else {
                cards[index] = cardOutcome
            }
        })
    })
    

}

console.log('example1:', solve1(example))
console.log('input1:', solve1(input))



function solve2(input) {

     

}

//console.log('example1:', solve2(example))
//console.log('input1:', solve2(input))
