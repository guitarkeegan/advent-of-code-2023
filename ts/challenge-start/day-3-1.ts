import * as fs from "fs";

// The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

// Here is an example engine schematic:

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
// In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

function getParts() {

    const input = getInput();
    let total = 0;

    // create 2d array
    // const input = testInput.split("\n")
        // .map(line => line.split(""));

    // const seen = createSeen(input);

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (/[0-9]/.test(input[i][j])) {
               total += sonar(input, i, j);
            }
            while (/[0-9]/.test(input[i][j]) && j < input[0].length) {
                j++;
            }
        }
    }

    return total;
}

function getInput() {
    return fs.readFileSync("./input-day3")
        .toString()
        .split("\n")
        .map(line => line.split(""));
}

function sonar(matrix: string[][], r: number, c: number): number {

    const ROWS = matrix.length;
    const COLS = matrix[0].length;
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0], [-1, 1], [1, 1], [1, -1], [-1, -1]];
    let numStr = "";
    let out = 0;

    let tempC = c
    while (/[\d]/.test(matrix[r][tempC]) && tempC < matrix[0].length) {
        numStr += matrix[r][tempC];
        tempC++;
        // console.log(numStr);
    }
    // console.log("done\n");
    for (let i = 0; i < numStr.length; i++) {
        dirs.forEach(([row, col]) => {
            const nextRow = row + r;
            const nextCol = col + c;
            if (
                !(
                    nextRow >= ROWS ||
                    nextCol >= COLS ||
                    Math.min(nextRow, nextCol) < 0 ||
                    matrix[nextRow][nextCol] === "." ||
                    /\d/.test(matrix[nextRow][nextCol]) 
                )
            ) {
                out = Number(numStr);
            }
        })
        c++;
    }
    return out;
}

function createSeen(matrix: string[][]): boolean[][] {
    let seen: boolean[][] = [];
    for (let i = 0; i < matrix.length; i++) {
        seen.push(new Array(matrix[0].length).fill(false));
    }
    return seen;
}

console.log(getParts());