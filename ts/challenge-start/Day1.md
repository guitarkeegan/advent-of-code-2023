# Day 1

## Part 1

Basically, the first part was to take a bunch of string inputs from a file, combine the first and last numbers into a two digit number, then add all of them together.

```
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the calibration values?
```

### My Solution

- I used two pointers to iterate through string. The first for-loop goes from the start, and breaks when it hits a number.
- Next, I did the same thing iterating through the string backwards. 
- I saved each of the numbers to variables, then concatinated them, and added it to the total with...

'''
total += Number(tens + ones);
'''

### Hard Parts

The part that I got stuck on was iterating backwards. The line of code that caused me pain was:
```
   for (let l=line.length;l>=0;l--){
```
... the l>=0 was l>0 and was missing the index 0 for several of the lines. I think I was just tired.

## Part 2

For part two, you have to do the same thing, but your program need to recognize how to read the numbers spelled out.

```
It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.
```

### My Solution 

This one was quite difficult for me. I felt like I got to the general idea for what I wanted to do pretty quickly, but at one point I ran into a bug, that took a long time to figure out. 

I implemented a Trie data struction to detect when a word like "one" or "two" was found within the string. Then I mapped each number-word to its string counterpart,  
```"one": "1"```

Upon finding each number-word, I appended them to an array.

Then, I basically did the same thing as part 1. I created 2 varables for the beginning and end of the array. Turned them into numbers, then added them to the total. 

### Hard Parts

There turned out to be a bug that cause me a lot of trouble. It had to do with a few specific cases where the words would overlap. 

> ex. fone, onine 

The problem was the my program would see
```
f
could be four
fo
could be four
fon
not four, then update
n
instead of 
on
could be one
one
is one!
```

So I had to modify how the string that I would checking agains my Trie would be modified, in the event that the search didn't find the word.

### W for day one!