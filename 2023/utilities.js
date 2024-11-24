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