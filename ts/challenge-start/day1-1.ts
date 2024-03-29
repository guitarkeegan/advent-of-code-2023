import * as fs from "fs"

function sumCalibrationValues(): number {

    const input = getInput("./input-day-1-1").split("\n");
    const re = /[0-9]/;
    let total = 0;

    for (let line of input) {
        let tens = "";
        let ones = "";
        for (let l = 0; l < line.length; l++) {
            if (re.test(line[l])) {
                tens = line[l];
                break;
            }
        }
        for (let l = line.length; l >= 0; l--) {
            if (re.test(line[l])) {
                ones = line[l];
                break;
            }
        }
        total += Number(tens as string + ones as string);
    }

    return total;

}

function getInput(path: string) {
    return fs.readFileSync(path, "utf-8");
}

console.time("sumCalibrationValues");
//console.log(sumCalibrationValues());
sumCalibrationValues();
console.timeEnd("sumCalibrationValues");
