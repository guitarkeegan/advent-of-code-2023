import * as fs from "fs"
// --- Part Two ---
// Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

// Equipped with this new information, you now need to find the real first and last digit on each line. For example:

// two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen
// In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

// What is the sum of all of the calibration values?
const words = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const wordsMap: { [key: string]: string } = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
}

function sumCalibrationValues2(): number {

    const myTrie = new Trie();
    words.forEach(word => {
        myTrie.addWord(word);
    })

    const input = getInput("./input-day-1-1").split("\n");
    const re = /[0-9]/;
    let total = 0;

    for (let line of input) {
        const nums: string[] = [];
        let currWord: string = "";
        for (let c of line) {
            if (!re.test(c)) {
                currWord += c;
                if (!myTrie.searchPartial(currWord)) {
                    currWord = currWord.slice(1);
                }
                if (myTrie.searchWord(currWord)) {
                    nums.push(wordsMap[currWord]);
                    currWord = c;
                }
            } else {
                nums.push(c);
                currWord = "";
            }
        }
        let tens = nums[0];
        let ones = nums[nums.length - 1];
        total += Number(tens + ones);
        fs.appendFileSync("./out", `${line} ${Number(tens + ones)}\n`)
    }

    return total;

}



function getInput(path: string) {
    return fs.readFileSync(path).toString();
}


class TrieNode {
    children = new Map<string, TrieNode>();
    endOfWord: boolean = false;
    constructor(end?: boolean) {
        this.endOfWord = end ?? false;
    }
}

class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    addWord(word: string) {
        let curr = this.root;
        for (let l of word) {
            if (!curr.children.has(l)) {
                curr.children.set(l, new TrieNode());
            }
            curr = curr.children.get(l) as TrieNode;
        }
        curr.endOfWord = true;
    }

    searchWord(word: string): boolean {
        let curr = this.root;
        for (let l of word) {
            if (!curr.children.has(l)) {
                return false;
            }
            curr = curr.children.get(l) as TrieNode;
        }
        if (curr.endOfWord) {
            return true;
        }
        return false;
    }

    searchPartial(word: string): boolean {
        let curr = this.root;
        for (let l of word) {
            if (!curr.children.has(l)) {
                return false;
            }
            curr = curr.children.get(l) as TrieNode;
        }
        return true;
    }
}
console.log(sumCalibrationValues2());