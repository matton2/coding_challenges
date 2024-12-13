import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2024/day11/example.txt')
const input = readFile('/advent_of_code/2024/day11/input.txt')


const stoneSplit = (stone) => {
    if(stone === 0) {
        return [1]
    } else if (String(stone).length % 2 === 0  ) {
        let stoneLength = String(stone).length/2
        let stone1 = String(stone).slice(0,stoneLength)
        let stone2 = String(stone).slice(stoneLength)
        return [Number(stone1), Number(stone2)]
    } else {
        return [stone * 2024]
    }
}

function solve1(input, totalBlinks) {
    let stones = input[0].split(' ')
    let totalStones = 0

    //now split each stone that many times

    stones.forEach(stone => {
        let stoneStore = [Number(stone)]
        for(let i = 0; i < totalBlinks; i++) {
            stoneStore.forEach((stone, index) => {
                let split = stoneSplit(stone)
                stoneStore[index] = split
            })
            stoneStore = stoneStore.flat()
        }
        totalStones = totalStones + stoneStore.length
    })
    return(totalStones)
}

console.log('Example Solve1:', solve1(example, 25))
console.log('Input 25 blinks Solve1:', solve1(input, 25))

function solve2(input, totalBlinks) {
    let stones = input[0].split(' ').map(Number)
    let stoneArray = new Map()

    // now we can seed our map with starting stones
    stones.forEach(stone => {
        stoneArray.set(stone, 1)
    })
    //now split each stone that many times
    for(let i = 0; i < totalBlinks; i++) {
        // keep the new stones from this blink
        let stoneForThisBlink = new Map()
        stoneArray.forEach((count, index) => {
            const splits = stoneSplit(index)
            splits.forEach(split => {
                stoneForThisBlink.set(split, (stoneForThisBlink.get(split) || 0) + count);
            })
        })
        stoneArray = stoneForThisBlink
    }
    let totalStones = Array.from(stoneArray.values()).reduce((acc, value) => acc + value,0)
    return(totalStones)
}

console.log('Example Solve2:', solve2(example, 75))
const t0 = performance.now();
console.log('Input Solve2:', solve2(input, 75))
const t1 = performance.now();
console.log(`75 blinks took ${t1 - t0} milliseconds.`);
