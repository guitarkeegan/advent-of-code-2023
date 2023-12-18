import * as fs from "fs";

function hotSprings() {
    const input = getInput();
    let possibilities = 0;

    for (let i = 0; i < input.length; i++) {
        const inputStr: string = input[i][0]
        const conditions: number[] = input[i][1];
        for (let j = 0; j < inputStr.length; j++) {
            if (inputStr[j] === "#" || inputStr[j] === "?") {
                possibilities += checkConditions(inputStr, conditions, j);
            }
        }
    }
}

function checkConditions(inputString: string, conditions: number[], currIdx: number): number {
    // ???.### 1,1,3
    let atCondition = conditions[0];
    for (let i = currIdx; i < inputString.length; i++) {
        for (let j = i + 1; j < inputString.length; j++) {
            // now what...
        }
    }
}

function getInput(): any[][] {
    return fs.readFileSync("./input-test-day12")
        .toString()
        .split("\n")
        .map(line => {
            return line.split(/\s/)
                .map((val, i) => {
                    if (i % 2 !== 0) {
                        return val.split(",").map(num => Number(num));
                    }
                    return val;
                })
        })
}

console.log(hotSprings());