import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import * as fs from "fs";

function cosmicExp(): number {

    const input = getInput();

    let count = 1;

    expandUniverse(input, count)

    const points = getPoints(input)

    return sumAllPaths(points);
}

function sumAllPaths(points: number[][]): number {
    let out = 0;
    let count = 0;
    for (let i=0;i<points.length;i++){
        for (let j=i+1;j<points.length;j++){
            out += (Math.abs(points[j][0] - points[i][0])) + Math.abs((points[j][1] - points[i][1]));
        }
    }

    return out;
}

function getPoints(input: string[][]): number[][] {
    const out: number[][] = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (input[i][j] !== "."){
                out.push([i, j]);
            }
        }
    }
    return out;
}

function expandUniverse(input: string[][], count: number): void {
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
    let offSet = 0;
    rows.forEach((row, i) => {
        if (row === false) {
            insertRow(input, i + offSet);
            offSet++;
        }
    })
    offSet = 0;
    cols.forEach((col, i) => {
        if (col === false) {
            insertCol(input, i + offSet);
            offSet++;
        }
    })
}

function insertCol(input: string[][], idx: number): void {
    for (let i of input) {
        i.splice(idx, 0, ".");
    }
}

function insertRow(input: string[][], idx: number): void {
    const row = new Array(input.length).fill(".");
    input.splice(idx, 0, row);
}

function getInput(): string[][] {
    return fs.readFileSync("./input-day11")
        .toString()
        .split("\n")
        .map(line => {
            return line.split("");
        });
}

console.log(cosmicExp());