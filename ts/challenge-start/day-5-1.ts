import * as fs from "fs";

function seedMap() {
    const input = getInput()

    const seeds = input[0].replace(/seeds:\s/, "").split(/\s/).map((num) => Number(num));

    const seedToSoilArr = arrFactor(input, "seed-to-soil map:");
    const soilToFertilizerArr = arrFactor(input, "soil-to-fertilizer map:");
    const fertilizerToWaterArr = arrFactor(input, "fertilizer-to-water map:");
    const waterToLightArr = arrFactor(input, "water-to-light map:");
    const lightToTempArr = arrFactor(input, "light-to-temperature map:");
    const tempToHumidityArr = arrFactor(input, "temperature-to-humidity map:");
    const humidityToLocationArr = arrFactor(input, "humidity-to-location map:");
}

function getInput() {
    return fs.readFileSync("./input-test-day5")
        .toString()
        .split("\n");
}

function arrToMap(inputs: number[][]): Map<number, number> {
    const out = new Map<number, number>();
    for (let i = 0; i < inputs.length; i++) {
        let start = inputs[i][1];
        let end = inputs[i][1] + inputs[i][2];
        let finish = inputs[i][0];
        while (start < end) {
            out.set(start, finish);
            start++;
            finish++;
        }
    }
    return out;
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

console.log(seedMap());