import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2025/day08/example.txt').map(line => line.split(',')).map(el => el.map(Number))
const input = readFile('/advent_of_code/2025/day08/input.txt').map(line => line.split(',')).map(el => el.map(Number))

const findDistance = (loc1, loc2) => {
    let x = Math.pow((loc2[0]-loc1[0]),2)
    let y = Math.pow((loc2[1]-loc1[1]),2)
    let z = Math.pow((loc2[2]-loc1[2]),2)
    return Math.sqrt(x+y+z)
}

function solve1(input, numberToConnect) {
    let distances = []
    input.forEach((spot, index) => {
        // this only needs to run at the index below it...
        if(index === input.length -1) {
            return
        }
        input.slice(index+1, input.length).forEach((otherSpot,otherIndex) => {
            if(spot !== otherSpot) {
                distances.push({point1: spot, point2: otherSpot, distance: findDistance(otherSpot, spot)})
            }
        })
    })
    distances.sort((a,b) => a.distance - b.distance)
    let circuits = []
    let totalConnections = 0
    distances.slice(0, numberToConnect).forEach(pair => {
        if(circuits.length === 0) {
            circuits.push([pair.point1, pair.point2])
            totalConnections+=1
            return
        }
        if(totalConnections >= numberToConnect) return
        let circuitIndexP1 = null
        let circuitIndexP2 = null
        circuits.forEach((circuit, index) => {
            // check to see if either of the pair are already in the circuit, if so, just add the new one
            let match1 = circuit.filter(el => el === pair.point1)
            let match2 = circuit.filter(el => el === pair.point2)
            if(match1.length === 1) {
                circuitIndexP1 = index
            } 
            if(match2.length === 1) {
                circuitIndexP2 = index
            }
        })
        const p1InCircuit = circuitIndexP1 !== null
        const p2InCircuit = circuitIndexP2 !== null
        if(!p1InCircuit && !p2InCircuit) {
            circuits.push([pair.point1, pair.point2])
            totalConnections+=1
        }  else if(p1InCircuit && !p2InCircuit) {
            circuits[circuitIndexP1].push(pair.point2)
            totalConnections+=1
        } else if(p2InCircuit && !p1InCircuit) {
            circuits[circuitIndexP2].push(pair.point1)
            totalConnections+=1
        } else {
            if(circuitIndexP1 === circuitIndexP2) {
                return
            } else {
                let inds = [circuitIndexP1, circuitIndexP2].sort((a,b) => b - a)
                let newCircuit = circuits[circuitIndexP1].concat(circuits[circuitIndexP2])
                circuits.splice(inds[0], 1)
                circuits.splice(inds[1], 1)
                circuits.push(newCircuit)
                totalConnections+=1
            }
           
        }
    })
    circuits.sort((a,b) => b.length - a.length)
    let total = circuits[0].length * circuits[1].length * circuits[2].length
    return total
}


let startSolve1 = performance.now();
console.log(solve1(example, 10))
console.log(solve1(input, 1000))
let endSolve1 = performance.now();
console.log(`Solve 1 Execution time: ${endSolve1 - startSolve1} milliseconds`);

function solve2(input) {
    let distances = []
    input.forEach((spot, index) => {
        // this only needs to run at the index below it...
        if(index === input.length -1) {
            return
        }
        input.slice(index+1, input.length).forEach((otherSpot,otherIndex) => {
            if(spot !== otherSpot) {
                distances.push({point1: spot, point2: otherSpot, distance: findDistance(otherSpot, spot)})
            }
            
        })
    })
    distances.sort((a,b) => a.distance - b.distance)
    let circuits = []
    let lastPairToConnect = []
    distances.forEach(pair => {
        if(circuits.length === 0) {
            circuits.push([pair.point1, pair.point2])
            return
        }
        let circuitIndexP1 = null
        let circuitIndexP2 = null
        circuits.forEach((circuit, index) => {
            // check to see if either of the pair are already in the circuit, if so, just add the new one
            let match1 = circuit.filter(el => el === pair.point1)
            let match2 = circuit.filter(el => el === pair.point2)
            if(match1.length === 1) {
                circuitIndexP1 = index
            } 
            if(match2.length === 1) {
                circuitIndexP2 = index
            }
        })
        const p1InCircuit = circuitIndexP1 !== null
        const p2InCircuit = circuitIndexP2 !== null
        if(!p1InCircuit && !p2InCircuit) {
            circuits.push([pair.point1, pair.point2])
        }  else if(p1InCircuit && !p2InCircuit) {
            circuits[circuitIndexP1].push(pair.point2)
        } else if(p2InCircuit && !p1InCircuit) {
            circuits[circuitIndexP2].push(pair.point1)
        } else {
            if(circuitIndexP1 === circuitIndexP2) {
                return
            } else {
                let inds = [circuitIndexP1, circuitIndexP2].sort((a,b) => b - a)
                let newCircuit = circuits[circuitIndexP1].concat(circuits[circuitIndexP2])
                circuits.splice(inds[0], 1)
                circuits.splice(inds[1], 1)
                circuits.push(newCircuit)
                
            }
           
        }
        if(circuits[0].length === input.length) {
            lastPairToConnect = [pair.point1, pair.point2]
        }
    })
    
    return lastPairToConnect[0][0] * lastPairToConnect[1][0]
}


let startSolve2 = performance.now();
console.log(solve2(example))
console.log(solve2(input))
let endSolve2 = performance.now();
console.log(`Solve 2 Execution time: ${endSolve2 - startSolve2} milliseconds`);