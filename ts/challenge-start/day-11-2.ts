import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import * as fs from "fs";

function cosmicExp(exp: number): number {

    const input = getInput();

    let count = 1;
    let emptyRows: number[] = [];
    let emptyCols: number[] = [];

    expandUniverse(input, count, emptyRows, emptyCols);

    const points = getPoints(input)

    return sumAllPaths(points, emptyRows, emptyCols, exp);
}

function sumAllPaths(points: number[][], emptyRows: number[], emptyCols: number[], exp: number): number {
    // first should be 104
    console.log(points);
    let out = 0;
    // let c = 0;
    let numOfExpRows = 0;
    let numOfExpCols = 0;
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            //rows
            for (let k = points[i][0]; k < points[j][0]; k++) {
                if (emptyRows.includes(k)) {
                    numOfExpRows++;
                }
            }
            //cols
            for (let k = Math.min(points[i][1], points[j][1]); k < Math.max(points[j][1], points[i][1]) + 1; k++) {
                if (emptyCols.includes(k)) {
                    numOfExpCols++;
                }
            }
            // if (c < 3) console.log("before: ", out); // log out !!!
            out += (Math.abs(points[j][0] - points[i][0])) + (numOfExpRows * exp) - numOfExpRows + Math.abs((points[j][1] - points[i][1])) + (numOfExpCols * exp) - (numOfExpCols);
            // if (c < 3) console.log("after:", out); // log out !!!
            // c++; // c++ !!!
            numOfExpRows = 0;
            numOfExpCols = 0;
        }
    }

    return out;
}

function getPoints(input: string[][]): number[][] {
    const out: number[][] = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (input[i][j] !== ".") {
                out.push([i, j]);
            }
        }
    }
    return out;
}

function expandUniverse(input: string[][], count: number, emptyRows: number[], emptyCols: number[]): void {
    const rows = new Array(input.length).fill(false);
    const cols = new Array(input[0].length).fill(false);

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (input[i][j] === "#") {
                rows[i] = true;
                cols[j] = true;
                input[i][j] = count.toString();
                count++;
            }
        }
    }
    rows.forEach((row, i) => {
        if (row === false) {
            emptyRows.push(i);
        }
    });
    cols.forEach((col, i) => {
        if (col === false) {
            emptyCols.push(i);
        }
    });
}

function getInput(): string[][] {
    return fs.readFileSync("./input-day11")
        .toString()
        .split("\n")
        .map(line => {
            return line.split("");
        });
}

console.log(cosmicExp(1000000));