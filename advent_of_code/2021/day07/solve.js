import {readFile} from '../../../utilities.js'

const example = readFile('/advent_of_code/2021/day07/example.txt')[0].split(',').map(Number)
const input = readFile('/advent_of_code/2021/day07/input.txt')[0].split(',').map(Number)

console.log(example)

function median(arr) {
    // Sort the array
    arr.sort((a, b) => a - b);

    const length = arr.length;
    const middle = Math.floor(length / 2);

    // Check if the array length is even or odd
    if (length % 2 === 0) {
        // If even, return the average of middle two elements
        return (arr[middle - 1] + arr[middle]) / 2;
    } else {
        // If odd, return the middle element
        return arr[middle];
    }
}


function solve1(input) {
    const medArray = median(input)

    const totalFull = input.reduce((acc, cur) => acc + Math.abs(medArray - cur), 0)
    return totalFull
}

console.log(solve1(example))
console.log(solve1(input))

function solve2(input) {
    const average = array => array.reduce((a, b) => a + b) / array.length;
    function calculateCost(from, to) {
  const diff = Math.abs(to - from);
  return (diff * (diff + 1)) / 2;
}
    const avg = Math.ceil(average(input))
    const totalFull = input.reduce((acc, cur) => acc + calculateCost(avg, cur), 0)
    return totalFull
}

console.log(solve2(example))
console.log(solve2(input))