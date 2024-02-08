package day2

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"regexp"
)

// --- Day 2: Cube Conundrum ---
// 12 red cubes, 13 green cubes, and 14 blue cubes
func CubeMain() int {
	ch1 := make(chan string)
	ch2 := make(chan int)
	go getCubeConundrumInput(ch1)
	go processGame(ch1, ch2)
	return sumIds(ch2)
}

func sumIds(ch chan int) int {
	total := 0
	for num := range ch {
		total += num
	}
	return total
}

func processGame(upstream chan string, downstream chan int) {
	for line := range upstream {
		// TODO: what to do with the line
	}
	downstream <- 1
	close(downstream)
}

func getCubeConundrumInput(s chan string) {

	file, err := os.Open("./inputs/day2")
	if err != nil {
		fmt.Printf("Error Reading file %v", err)
	}
	defer file.Close()

	reader := bufio.NewReader(file)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			if err != io.EOF {
				fmt.Printf("error on reader: %v", err)
				panic(err)
			}
			break
		}
		s <- line
	}
	close(s)
}
