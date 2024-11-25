import { readFile } from "../utilities.js";

const example = readFile('/2023/day05/example.txt')
const input = readFile('/2023/day05/input.txt')

const range = (start, end) => Array.from({ length: end - start + 1 }, (_, index) => index + start);



function solve1(input) {
    let seeds = input[0].match(/\d+/g)
    console.log(seeds)
    let finalValues = []

    input.shift()
    input.shift()
    for(const seed of seeds) {
        let source = seed
        input.map(line => {
            //second number is the source
            let newMap = Number(line.match(/\d+/g))
            if(newMap != 0) {
                if(newMap[1] <= source <= newMap[1]+newMap[2]) {
                    console.log(source)
                }
            }
            
            
        })

    }
    
}

solve1(example)