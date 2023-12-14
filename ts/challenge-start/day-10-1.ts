import * as fs from "fs";

function pipeMaze(): number {
    const matrix = getInput();

    const seen = makeSeen(matrix);

    let out = 0;

    // find S
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === "S") {
                out = bfs(matrix, i, j, seen);
            }
        }
    }

    console.table(seen);

    return out;
}

function getInput() {
    return fs.readFileSync("./input-day10")
        .toString()
        .split("\n")
        .map(line => line.split(""));
}

function makeSeen(matrix: string[][]): number[][] {
    const out: number[][] = [];
    for (let _ of matrix) {
        out.push(new Array(matrix[0].length).fill(-1));
    }

    return out;
}

function bfs(matrix: string[][], r: number, c: number, seen: number[][]): number {

    const ROWS = matrix.length, COLS = matrix[0].length;
    const dirs = [[0, 1], [-1, 0], [0, -1], [1, 0]];
    const UP = ["|", "7", "F"], DOWN = ["|", "L", "J"];
    const RIGHT = ["-", "J", "7"], LEFT = ["-", "L", "F"];
    const NO_FROM_RIGHT = ["|", "7", "J"], NO_FROM_LEFT = ["|", "F", "L"]
    const NO_FROM_UP = ["-", "7", "F"], NO_FROM_DOWN = ["-", "J", "L"]
    seen[r][c] = 0;
    let q = [[r, c]];

    let steps = 0, totalSteps = 1;

    while (q.length) {
        const length = q.length;

        for (let i = 0; i < length; i++) {
            const [row, col] = q.shift() as number[];
            for (let dir of dirs) {
                const nextRow = row + dir[0];
                const nextCol = col + dir[1];
                if (
                    !(
                        //TODO: check valid dirs
                        Math.min(nextRow, nextCol) < 0 ||
                        nextRow >= ROWS ||
                        nextCol >= COLS ||
                        // going to
                        nextRow > row && !DOWN.includes(matrix[nextRow][nextCol]) ||
                        nextRow < row && !UP.includes(matrix[nextRow][nextCol]) ||
                        nextCol > col && !RIGHT.includes(matrix[nextRow][nextCol]) ||
                        nextCol < col && !LEFT.includes(matrix[nextRow][nextCol]) ||
                        // coming from
                        nextCol < col && NO_FROM_LEFT.includes(matrix[row][col]) ||
                        nextCol > col && NO_FROM_RIGHT.includes(matrix[row][col]) ||
                        nextRow < row && NO_FROM_UP.includes(matrix[row][col]) ||
                        nextRow > row && NO_FROM_DOWN.includes(matrix[row][col]) ||
                        seen[nextRow][nextCol] > -1)
                ) {
                    q.push([nextRow, nextCol]);
                    seen[nextRow][nextCol] = totalSteps;
                }
            }
            totalSteps++;
        }
        steps++;
    }


    return steps - 1 ;
}

console.log(pipeMaze());