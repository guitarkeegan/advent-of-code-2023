import * as fs from 'fs';

function camelCards() {
    const hand = checkHandType("44445");
    console.log(hand);
    return getInput();
}

function getInput() {
    return fs.readFileSync("./input-test-day7")
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
        }  else if (val === 2) {
            hasTwo = true;
        }  
    });
    if (hasFour){
        return 5;
    }
    if (hasThree && hasTwo){
        return 4;
    }
    if (hasThree){
        return 3;
    }
    if (hasTwoMore){
        return 2;
    }
    if (hasTwo){
        return 1;
    }
    return 0;
}


console.log(camelCards());