import * as fs from "fs";

function hauntedWasteland(){

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

    for (let i=0;i<edges.length;i++){
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
    let curr = "AAA";
    let idx = 0;
    while (curr !== "ZZZ"){
        const dir = instructions[idx];
        if (dir === "L"){
            // go left
            let n = adjacencyList.get(curr);
            n ? curr = n[0] : "";
        } else {
            // go right
            let n = adjacencyList.get(curr);
            n ? curr = n[1] : "";
        }
        steps++;
        idx++;
        if (idx >= instructions.length){
            idx = 0;
        }
    }
    return steps;
}

function getInput(){
    return fs.readFileSync("./input-day8")
    .toString()
    .split("\n");
}

console.log(hauntedWasteland());