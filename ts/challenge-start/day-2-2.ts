import * as fs from "fs"

const textInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

function gamesPossible() {
    const games = getInput("./input-day2.txt").split("\n");
    // const games = textInput.split("\n");
    let total = 0;

    for (let line of games) {
        // let id = getId(line);
        // if (id === 0) throw new Error("no id found");
        const result = isPossible(line);
        total += result;

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

function isPossible(info: string): number {
    const strRe = /[a-z]/;
    const numRe = /\d/;
    let numStr = "";
    let color = "";
    let minRed = 0;
    let minGreen = 0;
    let minBlue = 0;
    for (let i = 0; i < info.length; i++) {
        if (numRe.test(info[i]) && info[i + 1] !== ":" && info[i + 2] !== ":") {
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
                    // console.log("red: ", r, "found: ", numStr);
                    minRed = Math.max(minRed, Number(numStr));
                    color = "";
                    numStr = "";
                    break;
                case "blue":
                    // console.log("blue: ", b, "found: ", numStr);
                    minBlue = Math.max(minBlue, Number(numStr));
                    color = "";
                    numStr = "";
                    break;
                case "green":
                    // console.log("green: ", g, "found: ", numStr);
                    minGreen = Math.max(minGreen, Number(numStr));
                    color = "";
                    numStr = "";
                    break;
                default:
                    color = "";
                    numStr = "";
            }
        }
    }
    return minBlue * minGreen * minRed;
}

console.log(gamesPossible());