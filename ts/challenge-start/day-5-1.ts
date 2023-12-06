import * as fs from "fs";

function seedMap() {
    const input = getInput()

    let soil, fert, water, light, temp, humidity, location;

    const seeds = input[0].replace(/seeds:\s/, "").split(/\s/).map((num) => Number(num));

    const seedToSoilArr = arrFactor(input, "seed-to-soil map:");
    const soilToFertilizerArr = arrFactor(input, "soil-to-fertilizer map:");
    const fertilizerToWaterArr = arrFactor(input, "fertilizer-to-water map:");
    const waterToLightArr = arrFactor(input, "water-to-light map:");
    const lightToTempArr = arrFactor(input, "light-to-temperature map:");
    const tempToHumidityArr = arrFactor(input, "temperature-to-humidity map:");
    const humidityToLocationArr = arrFactor(input, "humidity-to-location map:");

    let smallestLoc = Infinity;

    for (let seed of seeds) {
        soil = getNextValue(seed, seedToSoilArr);
        fert = getNextValue(soil, soilToFertilizerArr);
        water = getNextValue(fert, fertilizerToWaterArr);
        light = getNextValue(water, waterToLightArr);
        temp = getNextValue(light, lightToTempArr);
        humidity = getNextValue(temp, tempToHumidityArr);
        location = getNextValue(humidity, humidityToLocationArr);
        smallestLoc = Math.min(smallestLoc, location);
    }

    return smallestLoc;

}

function getInput() {
    return fs.readFileSync("./input-day5")
        .toString()
        .split("\n");
}

function getNextValue(needle: number, haystack: number[][]): number {
    for (let line of haystack){
        if (needle > line[1] && needle < line[1] + line[2]){
            return (needle - line[1]) + line[0];
        }
    }
    return needle;
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