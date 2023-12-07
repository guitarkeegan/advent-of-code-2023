import * as fs from "fs";
// Time:        58819676
// Distance:   434104122191218

function boatRace() {
    const [strTime, strDistance] = getInput();
    const time = Number(strTime);
    const distance = Number(strDistance);

    let minTime = 0;

    for (let i = 0; i < time; i++) {
        const newRecord = i * (time - i);
        if (newRecord > distance) {
            minTime = i;
            console.log(`minTime is ${i} * (${time} - ${i}) = ${newRecord}\n which is greater than ${distance}`);
            break;
        }
    }
    const maxTime = time - minTime;

    return maxTime - minTime + 1;
}

function getInput() {
    return fs.readFileSync("./input-day6")
        .toString()
        .split("\n")
        .map((line) => {
            return line.replace(/[a-zA-Z\s:]*/g, "");
        });
}

console.log(boatRace());
