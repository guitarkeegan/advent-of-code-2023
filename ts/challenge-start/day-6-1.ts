import * as fs from "fs";
// Time:        58     81     96     76
// Distance:   434   1041   2219   1218

function boatRace(){
    const [times, distances] = getInput();
    const waysToWin: number[] = new Array(times.length).fill(0);
    for (let i=0;i<times.length;i++){
        for (let j=0;j<times[i];j++){
            const final = j * (times[i] - j);
            if (final > distances[i]){
                waysToWin[i]++;
            }
        }
    }
    return waysToWin.reduce((acc, val) => acc * val);
}

function getInput(){
    return fs.readFileSync("./input-day6")
        .toString()
        .split("\n")
        .map(line => {
            return line.replace(/\w*:\s*/, "").split(/\s*[^\d]/).map(num=> Number(num));
        });
}

console.log(boatRace());
