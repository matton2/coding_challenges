import { readFile } from "../../../utilities.js";

const example = readFile('/advent_of_code/2023/day05/example.txt')
const input = readFile('/advent_of_code/2023/day05/input.txt')


const findNextSource = (source, directions) => {
    // if the source is between the directions[1] + range
    let min = directions[1]
    let max = directions[1] + directions[2] -1
    if(source >= min && source <= max) {
        let difference = source - min
        let newSource = directions[0] + difference
        return newSource
    }
    return source

}

function solve1(lines) {
    const input = [...lines];
    let seeds = input[0].match(/\d+/g).map(Number)
    console.log(seeds)
    input.shift()
    input.shift()
    let finalValues = []
    for(const seed of seeds) {
        let source = seed
        let sourceFound = false
        // i probably need to group this insturctions together
        input.forEach(line => {
            if(!line || line.trim().length === 0) {
                sourceFound = false
            }   
            if(sourceFound) return         
            let directions = line.match(/\d+/g)
            if (directions === null) {
                return
            }
            directions = directions.map(Number)
            let newSource = findNextSource(source, directions)
            if (newSource !== source) {
                source = newSource
                sourceFound = true
            }

        })
        finalValues.push(source)
    }
    return Math.min(...finalValues)
}

console.log(solve1(example))
console.log(solve1(input))


function parseMaps(lines) {
  const maps = [];
  let current = [];

  for (let i = 2; i < lines.length; i++) { // skip seeds line + blank
    const line = lines[i];
    if (!line || line.trim().length === 0) continue;

    if (line.includes('map:')) {
      if (current) maps.push(current);
      current = [];
      continue;
    }

    const nums = line.match(/\d+/g);
    if (nums) {
      const [dst, src, len] = nums.map(Number);
      current.push({ dst, src, len });
    }
  }
  if (current) maps.push(current);
  return maps;
}

function applyBlockToIntervals(intervals, rules) {
  // intervals: array of [start, end], inclusive
  const out = [];

  for (const [start, end] of intervals) {
    // We’ll process the current interval piece-by-piece against rules.
    const queue = [[start, end]];

    while (queue.length) {
      const [s, e] = queue.pop();
      let matched = false;

      for (const { dst, src, len } of rules) {
        const srcStart = src;
        const srcEnd = src + len - 1;

        // overlap between [s,e] and [srcStart, srcEnd]
        const os = Math.max(s, srcStart);
        const oe = Math.min(e, srcEnd);
        if (os <= oe) {
          // Left side (before overlap) stays to be tested by other rules
          if (s < os) queue.push([s, os - 1]);

          // Overlap chunk gets translated
          const delta = dst - srcStart;
          out.push([os + delta, oe + delta]);

          // Right side (after overlap)
          if (oe < e) queue.push([oe + 1, e]);

          matched = true;
          break; // IMPORTANT: only one rule can apply per block; move on
        }
      }

      if (!matched) {
        // No rule matched this piece in this block; passes through unchanged
        out.push([s, e]);
      }
    }
  }

  // Optional: merge adjacent/overlapping intervals to keep list small
  out.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const [s, e] of out) {
    if (!merged.length || s > merged[merged.length - 1][1] + 1) {
      merged.push([s, e]);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], e);
    }
  }
  return merged;
}

function solve2(lines) {
  const input = [...lines];
  const nums = input[0].match(/\d+/g).map(Number); // seed ranges [start, len, start, len, ...]
  input.shift(); // "seeds: ..."
  input.shift(); // blank line

  // Build initial intervals from pairs
  const initialIntervals = [];
  for (let i = 0; i < nums.length; i += 2) {
    const start = nums[i];
    const len = nums[i + 1];
    initialIntervals.push([start, start + len - 1]); // inclusive
  }

  const maps = parseMaps(input);

  // Push intervals through each block
  let intervals = initialIntervals;
  for (const rules of maps) {
    intervals = applyBlockToIntervals(intervals, rules);
  }

  // The answer is the minimum start of the final intervals
  let minLocation = Infinity;
  for (const [s] of intervals) {
    if (s < minLocation) minLocation = s;
  }
  return minLocation;
}

console.log(solve2(example))
console.log(solve2(input))