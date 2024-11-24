import { readFile } from "../utilities.js";

const example = readFile('/2023/day02/example.txt')
const input = readFile('/2023/day02/input.txt')

function checkGame(color, number) {
    if(color === 'red') {
        return number <= 12
    } else if(color === 'green') {
        return number <= 13
    } else if(color === 'blue') {
        return number <= 14
    }
}

const allTrue = arr => arr.every(Boolean);

function solve1(input) {
    let totalScore = 0
    input.map((line) => {
        const gameNumber = Number(line.split(':')[0].match(/\d+/g))
        const games = line.split(':')[1].split(';')
        //console.log(games)
        let validGame = []
        games.forEach(game => {
            const pulls = game.split(',')
            //console.log(pulls)
            pulls.forEach(pull => {
                //extract the number and color
                let number = pull.match(/\d+/g)
                let color = pull.replace(/[^a-zA-Z]/g, "")
                validGame.push(checkGame(color, number))
            })
        })
        if(allTrue(validGame)) {totalScore += gameNumber}
    })

    console.log(totalScore)
}

//solve1(example)
//solve1(input)

function solve2(input) {
    let totalScore = 0
    input.map((line) => {
        const gameNumber = Number(line.split(':')[0].match(/\d+/g))
        const games = line.split(':')[1].split(';')
        //console.log(games)
        let blue = 0
        let red = 0
        let green = 0
        games.forEach(game => {
            const pulls = game.split(',')
            //console.log(pulls)
            pulls.forEach(pull => {
                //extract the number and color
                let number = Number(pull.match(/\d+/g)[0])
                let color = pull.replace(/[^a-zA-Z]/g, "")                
                if (color === 'blue') {
                    blue = number > blue ? number:blue
                } else if (color === 'red') {
                    red = number > red ? number:red
                } else if (color === 'green') {
                    green = number > green ? number:green
                }
                
            })
        })
        totalScore = (blue*red*green) + totalScore
    })

    console.log(totalScore)
}

solve2(example)
solve2(input)