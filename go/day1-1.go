package main

import (
	"advent-of-code.com/2023/algos"
	"bufio"
	"fmt"
	"io"
	"os"
	"strconv"
	"unicode"
)

// --- Day 1: Trebuchet?! ---
func Trebuchet() int {
	ch := make(chan string)
	ch2 := make(chan int)
	go getInput(ch)
	go getNums(ch, ch2)
	return sumNums(ch2)
}

// --- Day 1: Trebuchet part 2 ---
func Trebuchet2() int {
	ch := make(chan string)
	ch2 := make(chan int)
	go getInput(ch)
	go getNums2(ch, ch2)
	return sumNums(ch2)
}

func sumNums(upstream chan int) int {
	total := 0
	for num := range upstream {
		total += num
	}
	return total
}

func getNums(upstream chan string, downstream chan int) {
	var num string
	for line := range upstream {
		// get first int
		for _, char := range line {
			if unicode.IsDigit(char) {
				num += string(char)
				break
			}
		}
		for i := len(line) - 1; i > -1; i-- {
			// better way to do this?
			if unicode.IsDigit(rune(line[i])) {
				num += string(line[i])
				break
			}
		}
		realNum, _ := strconv.Atoi(num)
		downstream <- realNum
		num = ""
	}
	close(downstream)
}

func getNums2(upstream chan string, downstream chan int) {
	numMap := map[string]string{
		"one":   "1",
		"two":   "2",
		"three": "3",
		"four":  "4",
		"five":  "5",
		"six":   "6",
		"seven": "7",
		"eight": "8",
		"nine":  "9",
	}
	trie := algos.NewTrie()
	trie.SeedTrieNumbers()
	var num []string
	candidate := ""
	count := 0
	for line := range upstream {
		// get first int
		for i, char := range line {
			if unicode.IsDigit(char) {
				num = append(num, string(char))
			} else {
				// Trie
				count = i
				candidate = string(char)
				for trie.StartsWith(candidate) {
					candidate += string(char)
					if trie.Search(candidate) {
						num = append(num, numMap[candidate])
						candidate = ""
						break
					}
					count++
				}
				candidate = ""
			}
		}
		newNum := num[0] + num[len(num)-1]
		realNum, _ := strconv.Atoi(newNum)
		downstream <- realNum
	}
	close(downstream)
}

func getInput(ch chan string) {
	file, err := os.Open("./inputs/day1")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	reader := bufio.NewReader(file)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			if err != io.EOF {
				fmt.Println("error on reader..")
				panic(err)
			}
			break
		}
		// process the line
		ch <- line
	}
	close(ch)
}
