import * as fs from 'fs';

function camelCards() {
    const input = getInput();

    const sortedHands = quickSort(input, 0, input.length - 1);
    return multiplyRanks(sortedHands);
}

function multiplyRanks(hands: (string | number)[][]): number {
    let out = 0;
    for (let i = 0; i < hands.length; i++) {
        out += hands[i][1] as number * (i + 1);
    }
    return out;
}

function quickSort(hands: (string | number)[][], start: number, end: number) {

    if (end - start + 1 <= 1) {
        return hands;
    }

    const pivot = hands[end];

    let leftPointer = start;
    for (let i = start; i < end; i++) {
        if (lessThanPivot(hands[i][0] as string, pivot[0] as string)) {
            let tmp = hands[leftPointer];
            hands[leftPointer] = hands[i];
            hands[i] = tmp;
            leftPointer++;
        }
    }

    hands[end] = hands[leftPointer];
    hands[leftPointer] = pivot;

    quickSort(hands, start, leftPointer - 1);
    quickSort(hands, leftPointer + 1, end);

    return hands;
}

function getInput() {
    return fs.readFileSync("./input-day7")
        .toString()
        .split("\n")
        .map(line => {
            return line.split(" ").map((val, i) => {
                return i % 2 === 0 ? val : Number(val);
            });
        });
}

function checkHandType(hand: string): number {
    const cardMap = new Map<string, number>();
    for (let card of hand) {
        if (cardMap.has(card)) {
            cardMap.set(card, cardMap.get(card) as number + 1);
        } else {
            cardMap.set(card, 1);
        }
    }
    // get jokers
    let jokers = 0;
    if (cardMap.has("J")) {
        jokers = cardMap.get("J") as number;
        cardMap.delete("J");
    }
    // seperate logic if jokers
    if (jokers > 0) {
        if (jokers > 3) {
            return 6;
        }
        // get highest pairs
        let highestVal = "";
        let highestPairs = 0;
        cardMap.forEach((val, key) => {
            if (highestPairs < val){
                highestPairs = val;
                highestVal = key;
            }
        })
        if (highestPairs === 4){
            return 6;
        }
        if (highestPairs === 3){
            return 5;
        }
        if (highestPairs === 2){
            // check if two pair
            let numOfPairs = 0;
            cardMap.forEach((val, key) => {
                if (val === 2){
                    numOfPairs++;
                }
            });
            if (numOfPairs === 2){
                return 4;
            }
            if (jokers === 1){
                return 3;
            } else if (jokers === 2){
                return 5;
            } else if (jokers === 3){
                return 6;
            }
        }
        if (jokers === 1){
            return 2;
        }
        if (jokers === 2){
            return 3;
        }
        if (jokers === 3){
            return 5;
        }
    }
    if (cardMap.size === 1) {
        // 5 of a kind
        return 6;
    }
    let hasFour = false;
    let hasThree = false;
    let hasTwo = false;
    let hasTwoMore = false;
    cardMap.forEach((val, key) => {
        if (val === 4) {
            hasFour = true;
        } else if (
            val === 3
        ) {
            hasThree = true;
        } else if (val === 2 && hasTwo) {
            hasTwoMore = true;
        } else if (val === 2) {
            hasTwo = true;
        }
    });
    if (hasFour) {
        return 5;
    }
    if (hasThree && hasTwo) {
        return 4;
    }
    if (hasThree) {
        return 3;
    }
    if (hasTwoMore) {
        return 2;
    }
    if (hasTwo) {
        return 1;
    }
    return 0;
}

function cardScore(card: string): number {
    const valueMap = {
        "J": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9,
        "T": 10,
        "Q": 11,
        "K": 12,
        "A": 13,
    }
    return valueMap[card as keyof typeof valueMap];
}

function lessThanPivot(hand1: string, pivot: string): boolean {
    const hand1Type = checkHandType(hand1);
    const pivotType = checkHandType(pivot);
    const sameType = hand1Type === pivotType;
    if (sameType) {
        for (let i = 0; i < hand1.length; i++) {
            if (cardScore(hand1[i]) !== cardScore(pivot[i])) {
                if (cardScore(hand1[i]) > cardScore(pivot[i])) {
                    return false;
                }
                if (cardScore(hand1[i]) < cardScore(pivot[i])) {
                    return true;
                }
            }
        }
    }
    return hand1Type > pivotType ? false : true;
}


console.log(camelCards());