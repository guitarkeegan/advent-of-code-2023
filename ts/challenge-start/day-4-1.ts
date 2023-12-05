import * as fs from "fs";


function getWinners() {
    const input = getInput();
    let total = 0;
    let count = 0;

    for (let parent of input) {
        count++
        let points = 0;
        for (let num of parent[0]) {
            if (num !== "") {
                if (parent[1].includes(num)) {
                    points === 0 ? points = 1 : points *= 2;
                }
            }
        }
        total += points;
    }
    return total;
}

function getInput() {
    return fs.readFileSync("./input-day4")
        .toString()
        .split("\n")
        .map(line => {
            return line.replace(/\d*:*\s/, " ").trim();
        })
        .map(line => {
            return line.split("|").map(side => {
                return side.trim().split(" ");
            });
        })
}

console.log(getWinners());