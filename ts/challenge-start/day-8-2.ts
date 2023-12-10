import * as fs from "fs";

function hauntedWasteland() {

    const input = getInput();
    const instructions = input[0];
    const edges = input.slice(2).map(line => {
        return line.replace(/[=(),]/g, "").replace(/\s\s/, " ").split(" ")
    });
    const adjacencyList = new Map<string, string[]>();
    // create new nodes from val and left-right
    adjacencyList.set(edges[0][0], new Array<string>())
    adjacencyList.set(edges[0][1], new Array<string>())
    adjacencyList.set(edges[0][2], new Array<string>())

    for (let i = 0; i < edges.length; i++) {
        let val = edges[i][0], left = edges[i][1], right = edges[i][2];
        if (!adjacencyList.has(val)) {
            adjacencyList.set(val, new Array<string>());
        }
        if (!adjacencyList.has(left)) {
            adjacencyList.set(val, new Array<string>());
        }
        if (!adjacencyList.has(right)) {
            adjacencyList.set(val, new Array<string>());
        }
        adjacencyList.get(val)?.push(left);
        adjacencyList.get(val)?.push(right);
    }
    let steps = 0;
    let curr: string[] = [];
    adjacencyList.forEach((val, key) => {
        if (/..A/.test(key)) {
            curr.push(key);
        }
    });
    let idx = 0;
    console.log(curr);
    // failsafe 
    while (!(isEnd(curr)) && steps < 3) {
        const dir = instructions[idx];
        for (let _ of curr) {
            const sItem = curr.shift();
            if (dir === "L") {
                // go left
                let n = adjacencyList.get(sItem as string);
                n ? curr.push(n[0]) : "";
            } else {
                // go right
                let n = adjacencyList.get(sItem as string);
                n ? curr.push(n[1]) : "";
            }
        }
        console.log(curr);
        steps++;
        idx++;
        if (idx >= instructions.length) {
            idx = 0;
        }
    }
    return steps;
}

function isEnd(q: string[]): boolean {
    for (let i of q) {
        if (!(/..Z/.test(i))) {
            return false
        }
    }
    return true;
}

function getInput() {
    return fs.readFileSync("./input-day8")
        .toString()
        .split("\n");
}

console.log(hauntedWasteland());