import {readFile} from '../../../utilities.js'

const example = readFile('/advent_of_code/2021/day03/example.txt')
const input = readFile('/advent_of_code/2021/day03/input.txt')

function solve1(input) {
    let length = input[0].split('').length

    let oneCount = new Array(length).fill(0)
    let zeroCount = new Array(length).fill(0)

    input.forEach(numbers => {
        let code = numbers.split("").map(Number)
        code.forEach((binary, index) => {
            if(binary === 0) {
                zeroCount[index] = zeroCount[index] + 1
            } else {
                oneCount[index] = oneCount[index] + 1
            }
        })
    })

    console.log(zeroCount, oneCount)

    let gamma = []
    let epsilon = []
    zeroCount.forEach((zero, index) => {
        if(zeroCount[index] > oneCount[index]) {
            gamma[index] = 0
            epsilon[index] =  1
        } else {
            gamma[index] = 1
            epsilon[index] = 0
        }
    })

    return (parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2))

}

console.log('example1:', solve1(example))
console.log('input1:', solve1(input))

function figureOutTheBits(bits) {
    let length = bits[0].length
    let oneCount = new Array(length).fill(0)
    let zeroCount = new Array(length).fill(0)
    bits.forEach((binary) => {
        binary.forEach((bit, index) => {
            if(bit === 0) {
                zeroCount[index] = zeroCount[index] + 1
            } else {
                oneCount[index] = oneCount[index] + 1
            }

        })
        
    })

    return {zeroCount, oneCount}
}

function solve2(input) {
    let length = input[0].split('').length
    
    let o2Level = []
    let co2Level = []
    input.forEach((number,index) => {
        let code = number.split("").map(Number)
        o2Level[index] = code
        co2Level[index] = code
    })
    let filterO2 = true
    let filterCO2 = true
    
    // figure out 02 first
    for(let i = 0; i < length; i++) {
        let {zeroCount, oneCount} = figureOutTheBits(o2Level)
        if(zeroCount[i] > oneCount[i]) {
            //i will keep all the 0s in the position
            if(filterO2) {o2Level = o2Level.filter(el => el[i] === 0)}
            
            if(filterCO2) {co2Level = co2Level.filter(el => el[i] === 1)}
        } else {
            if(filterO2) {o2Level = o2Level.filter(el => el[i] === 1)}
            
            if(filterCO2) {co2Level = co2Level.filter(el => el[i] === 0)}
        }
        if(o2Level.length === 1) {filterO2 = false}
        if(co2Level.length === 1) {filterCO2 = false}
    }

    console.log(o2Level, co2Level)

    return (parseInt(o2Level[0].join(''), 2) * parseInt(co2Level[0].join(''), 2))
     

}

console.log('example1:', solve2(example))
console.log('input1:', solve2(input))
