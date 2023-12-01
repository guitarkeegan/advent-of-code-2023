import * as fs from "fs"
// For example:

// 1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet
// In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

// Consider your entire calibration document. What is the sum of all of the calibration values?

function sumCalibrationValues(): number {

    const input = getInput("./input-day-1-1").split("\n");
    const re = /[0-9]/;
    let total = 0;

    for (let line of input) {
        let tens = "";
        let ones = "";
        for (let l=0;l<line.length;l++){
            if (re.test(line[l])) {
                tens = line[l];
                break;
            }
        }
        for (let l=line.length;l>=0;l--){
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

console.log(sumCalibrationValues());