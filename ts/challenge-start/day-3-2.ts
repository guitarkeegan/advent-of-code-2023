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

    // create 2d array
    // const input = testInput.split("\n")
    //     .map(line => line.split(""));


    const seen = createSeen(input);

    const size = labelGears(input, seen);
    let total: number[][] = [];

    for (let i=0;i<size;i++){
        total.push(new Array(0).fill([]));
    }

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (/[0-9]/.test(input[i][j])) {
               const [val, idx] = sonar(input, i, j, seen);
               total[idx].push(val);
            }
            while (/[0-9]/.test(input[i][j]) && j < input[0].length) {
                j++;
            }
        }
    }

    let sum = 0;
    for (let group of total){
        if (group.length > 1){
            sum += group.reduce((acc, cv)=> acc * cv);
        }
    }
    console.log(total);
    return sum;
}

function getInput() {
    return fs.readFileSync("./input-day3")
        .toString()
        .split("\n")
        .map(line => line.split(""));
}

function labelGears(matrix: string[][], seenMatrix: number[][]): number {
    let count = 1;
    for (let i=0;i<matrix.length;i++){
        for (let j=0;j<matrix[0].length;j++){
            if (matrix[i][j] === "*") {
                seenMatrix[i][j] = count;
                count++;
            }
        }
    }
    return count;
} 

function sonar(matrix: string[][], r: number, c: number, seen: number[][]): number[] {

    const ROWS = matrix.length;
    const COLS = matrix[0].length;
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0], [-1, 1], [1, 1], [1, -1], [-1, -1]];
    let numStr = "";
    let out = 0;
    let idx = 0;

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
                    /[^\*]/.test(matrix[nextRow][nextCol])
                )
            ) {
                idx = seen[nextRow][nextCol];
                out = Number(numStr);
            }
        })
        c++;
    }
    return [out, idx];
}

function createSeen(matrix: string[][]): number[][] {
    let seen: number[][] = [];
    for (let i = 0; i < matrix.length; i++) {
        seen.push(new Array(matrix[0].length).fill(0));
    }
    return seen;
}

console.log(getParts());
// getParts();