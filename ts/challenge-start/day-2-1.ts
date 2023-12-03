import * as fs from "fs"
// For example, the record of a few games might look like this:

// const textInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green`;

const textInput = `Game 7: 2 green, 3 red, 14 blue; 3 red, 2 green, 6 blue; 3 blue, 1 red; 10 blue, 1 green; 3 green, 17 blue`;
// Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?
function gamesPossible(r: number, g: number, b: number) {
    const games = getInput("./input-day2.txt").split("\n");
    // const games = textInput.split("\n");
    let total = 0;

    for (let line of games) {
        let id = getId(line);
        if (id === 0) throw new Error("no id found");
        const result = isPossible(line, r, g, b);
        if (result) {
            total += id;
        } else {

        console.log(`id: ${id},\n${line}\n${result} total is now ${total}\n\n`);
        }
    }
    return total;
}

function getInput(path: string) {
    return fs.readFileSync(path).toString();
}

function getId(game: string): number {
    let id: number = 0;
    let idStr = "";
    for (let c of game.slice(4)) {
        if (c === ":") {
            break;
        }
        idStr += c;
    }
    id = Number(idStr);
    return id;
}

function isPossible(info: string, r: number, g: number, b: number): boolean {
    const strRe = /[a-z]/;
    const numRe = /\d/;
    let numStr = "";
    let color = "";
    for (let i = 0; i < info.length; i++) {
        if (numRe.test(info[i]) && info[i+1] !== ":" && info[i+2] !== ":") {
            while (numRe.test(info[i]) && i < info.length) {
                numStr += info[i];
                i++;
                // console.log(numStr);
            }
            i++;
            while (strRe.test(info[i]) && i < info.length) {
                color += info[i];
                i++;
                // console.log(color);
            }
            i++;
            switch (color) {
                case "red":
                    if (Number(numStr) > r) {
                        // console.log("red: ", r, "found: ", numStr);
                        return false;
                    }
                    color = "";
                    numStr = "";
                case "blue":
                    if (Number(numStr) > b) {
                        // console.log("blue: ", b, "found: ", numStr);
                        return false;
                    }
                    color = "";
                    numStr = "";
                case "green":
                    if (Number(numStr) > g) {
                        // console.log("green: ", g, "found: ", numStr);
                        return false;
                    }
                    color = "";
                    numStr = "";
                default:
                    color = "";
                    numStr = "";
            }
        }
    }
    return true;
}

console.log(gamesPossible(12, 13, 14));