package main

import (
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
