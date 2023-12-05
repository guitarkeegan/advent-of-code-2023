import * as fs from "fs";


function getWinners() {
    const input = getInput();
    let count = -1;
    const arr = new Array(input.length).fill(0);

    for (let parent of input) {
        count++
        let wins = 0;
        for (let num of parent[0]) {
            if (num !== "") {
                if (parent[1].includes(num)) {
                    wins++;
                }
            }
        }
        arr[count] = wins;
    }

    const copies: number[] = new Array(arr.length).fill(1);

    for (let i=0;i<arr.length;i++){
        if (arr[i] > 0){
            // add to the copies
            for (let j=i+1;j<i+1+arr[i];j++){
                copies[j] += copies[i];
            }
        }
    }

    return copies.reduce((acc, val) => acc + val);
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