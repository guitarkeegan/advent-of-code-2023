package gears

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
)

func HotSprings() {
	getInput()
}

func getInput() {
	dir, err := os.Getwd()
	if err != nil {
		fmt.Println(err)
	}
	println("dir is: ", dir)
	file, err := os.Open(filepath.Join(dir, "day12/input-test-day12"))
	if err != nil {
		fmt.Println(err)
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		fmt.Println("error reading lines", err)
	}
}
