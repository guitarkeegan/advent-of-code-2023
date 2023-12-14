import * as fs from "fs";

function mirageMaintenance() {
    const input = getInput();

    let result = 0;

    for (let arr of input) {
        result += getDiff(arr);
    }

    return result;
}

function getDiff(arr: number[]): number {
    // 0 3 6 9 12 15
    // base case 
    let allZeros = true;
    for (let num of arr) {
        if (num !== 0) {
            allZeros = false;
            break;
        }
    }
    if (allZeros) return 0;

    const newArr: number[] = [];

    for (let i = 1; i < arr.length; i++) {
        newArr.push(arr[i] - arr[i - 1])
    }

    const firstNum = arr[0];

    return firstNum - getDiff(newArr);
}

function getInput() {
    return fs.readFileSync("./input-day9")
        .toString()
        .split("\n")
        .map(line => line.split(" ").map(num => Number(num)));
}

console.log(mirageMaintenance());