import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()

export function readFile(file) {
    const input = fs
	.readFileSync(path.join(__dirname, file), 'utf8')
	.toString()
	.trim()
	.split('\n');

    return(input)
}

export function lookAroundAndCount(grid, row, col, includeDiagonals = false, symbol) {
	let numberOfRows = grid.length
	let numberOfCols = grid[0].length
	let orthogonals = [
		[-1,0],  //up
		[1,0], // down
		[0,1], // right
		[0,-1] // left 
	]
	let diagonals = [
		[-1,-1],
		[-1,1],
		[1,-1],
		[1,1]
	]
	let directions = includeDiagonals ? orthogonals.concat(diagonals) :orthogonals
	let totalCount = 0
	directions.forEach(direction => {
		let newRow = row + direction[0]
		let newCol = col + direction[1]
		if(newRow >=0 && newRow < numberOfRows && newCol >=0 && newCol < numberOfCols) {
			let neighbor = grid[newRow][newCol]
			if (symbol === neighbor) totalCount+=1
		}

	})
	return totalCount
}