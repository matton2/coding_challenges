import {readFile} from '../../../utilities.js'

const example = readFile('/advent_of_code/2021/day09/example.txt')
const input = readFile('/advent_of_code/2021/day09/input.txt')

function isLowest(matrix, row, col) {
    const numRows = matrix.length
    const numCols = matrix[0].length
    const targetValue = matrix[row][col]
    let isLowest = true
    const dirArray = [-1, 0, 1]

    dirArray.forEach(dr => {
        dirArray.forEach(dc => {
            if(dr ===0 && dc ===0) return;

            const newRow = row+dr
            const newCol = col+dc

            if(newRow >=0 && newRow < numRows && newCol >=0 && newCol < numCols) {
                if(matrix[newRow][newCol] <= targetValue) {
                    isLowest = false
                }
            }
        })
    })

    return isLowest
    
}

function solve1(input) {
    let grid = []
    let total = 0;
    input.forEach(row => {
        grid.push(row.split('').map(Number))
    })
    //so for each point, i need to look around and see if it the lowest, if it is, i need to add 1 to the number and check track of the total
    
    // i have a 2D array now
    grid.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
            if(isLowest(grid, rowIndex, colIndex)) {
                total = total + grid[rowIndex][colIndex] + 1
            }
        })
    })

    return total

}

//console.log(solve1(example))
//console.log(solve1(input))



function findBasinSizes(matrix) {

  const numRows = matrix.length;

  const numCols = matrix[0].length;

  const visited = Array.from({ length: numRows }, () => Array(numCols).fill(false));

  const basinSizes = [];

  function getNeighbors(r, c) {

    return [

      [r - 1, c], // up

      [r + 1, c], // down

      [r, c - 1], // left

      [r, c + 1]  // right

    ].filter(([nr, nc]) => nr >= 0 && nr < numRows && nc >= 0 && nc < numCols);

  }

  function isLowest(r, c) {

    const val = matrix[r][c];

    return getNeighbors(r, c).every(([nr, nc]) => matrix[nr][nc] > val);

  }

  function dfs(r, c) {

    if (visited[r][c]) return 0;

    visited[r][c] = true;

    let size = 1;

    getNeighbors(r, c).forEach(([nr, nc]) => {

      if (!visited[nr][nc] && matrix[nr][nc] >= matrix[r][c]) {

        size += dfs(nr, nc);

      }

    });

    return size;

  }

  for (let r = 0; r < numRows; r++) {

    for (let c = 0; c < numCols; c++) {

      if (!visited[r][c] && isLowest(r, c)) {

        const size = dfs(r, c);

        basinSizes.push(size);

      }

    }

  }

  return basinSizes;

}

function solve2(input) {
    let grid = []
    input.forEach(row => {
        grid.push(row.split('').map(Number))
    })
    //so for each point, i need to look around and see if it the lowest, if it is, i need to add 1 to the number and check track of the total
    
    return findBasinSizes(grid)

}

console.log(solve2(example))