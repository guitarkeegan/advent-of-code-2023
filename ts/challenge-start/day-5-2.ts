import * as fs from "fs";

function seedMap() {
    const input = getInput()

    const seeds = input[0].replace(/seeds:\s/, "").split(/\s/).map((num) => Number(num));

    const seedPairs = getSeedPairs(seeds);

    const processes = 
}

function getInput() {
    return fs.readFileSync("./input-test-day5")
        .toString()
        .split("\n");
}


function arrFactor(input: string[], mapCategory: string): number[][] {
    const out = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i] === mapCategory) {
            i++;
            while (input[i] !== "" && input[i]) {
                out.push(input[i].split(/\s/).map(num => Number(num)));
                i++;
            }
        }
    }
    return out;
}

function getSeedPairs(seeds: number[]): number[][]{
    let out = [];
    for (let i=0;i<seeds.length;i += 2){
        out.push([seeds[i], seeds[i] + seeds[i+1]]);
    }
    return out;
}

console.log(seedMap());