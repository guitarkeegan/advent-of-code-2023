package gears

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

func HotSprings() {
	getInput()
}

func getInput() {
	dir, err := os.Getwd()
	if err != nil {
		fmt.Println(err)
	}
	file, err := os.Open(filepath.Join(dir, "day12/input-test-day12"))
	if err != nil {
		fmt.Println(err)
	}

	defer file.Close()

	var lines [][]string

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		text := scanner.Text()
		arr := strings.Split(text, " ")
		for _, val := range arr {
			fmt.Println(val)
			newArr := strings.Fields(val)
			lines = append(lines, newArr)
		}
	}
	if err := scanner.Err(); err != nil {
		fmt.Println("error reading lines", err)
	}
	fmt.Println(lines)
}
