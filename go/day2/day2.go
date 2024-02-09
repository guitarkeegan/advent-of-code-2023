package day2

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"unicode"
)

func CubeConundrum(r, g, b int) int {
	colorConditions := NewColors(r, g, b)
	ch := make(chan string)
	sumChan := make(chan int)
	go getInput(ch)
	go processV1(ch, colorConditions, sumChan)
	return sumTotal(sumChan)
}

func sumTotal(ch chan int) int {
	total := 0
	for n := range ch {
		total += n
	}
	return total
}

// will use for both the condition and the validator
type Colors struct {
	// maybe could be int8
	R int
	G int
	B int
}

func NewColors(r, g, b int) *Colors {
	return &Colors{
		R: r,
		G: g,
		B: b,
	}
}

type Validator struct {
	Id  int
	Bag Colors
}

func NewValidator(id int, bag Colors) *Validator {
	return &Validator{
		Id:  id,
		Bag: bag,
	}
}

func (v *Validator) Validate(r, g, b int) bool {
	if r >= v.Bag.R && g >= v.Bag.G && b >= v.Bag.B {
		return true
	}
	return false
}

func (c *Colors) Reset() {
	c.R = 0
	c.G = 0
	c.B = 0
}

func (v *Validator) AddColor(char rune, curNum string) {

	if string(char) == "r" {
		num, err := strconv.Atoi(curNum)
		if err != nil {
			fmt.Printf("curNum: %v", err)
			panic("curNum was not a number")
		}
		v.Bag.R = num
	} else if string(char) == "g" {
		num, err := strconv.Atoi(curNum)
		if err != nil {
			fmt.Printf("curNum: %v", err)
			panic("curNum was not a number")
		}
		v.Bag.G = num
	} else {
		num, err := strconv.Atoi(curNum)
		if err != nil {
			fmt.Printf("curNum: %v", err)
			panic("curNum was not a number")
		}
		v.Bag.B = num
	}
}

func cleanLine(line string, colIdx int) string {
	line = strings.ReplaceAll(line[colIdx+2:], ",", "")
	line = strings.ReplaceAll(line, "ed", "")
	line = strings.ReplaceAll(line, "lue", "")
	line = strings.ReplaceAll(line, "reen", "")
	return line
}

func processV1(ch chan string, conditions *Colors, sumChan chan int) {
	curColors := NewValidator(0, *NewColors(0, 0, 0))
	for line := range ch {
		// get the id value
		colIdx := strings.Index(line, ":")
		id, err := strconv.Atoi(line[5:colIdx])
		if err != nil {
			panic("couldn't get id!")
		}
		curColors.Id = id
		// add colors to validator
		cleanedLine := cleanLine(line, colIdx)
		passed := true
		curNum := ""
		for _, char := range cleanedLine {
			if unicode.IsNumber(char) {
				curNum += string(char)
				continue
			}
			if unicode.IsLetter(char) {
				curColors.AddColor(char, curNum)
				ok := curColors.Validate(conditions.R, conditions.G, conditions.B)
				if !ok {
					fmt.Println(id)
					curNum = ""
					passed = false
					curColors.Bag.Reset()
					break
				}
				curNum = ""
				continue
			}
			if string(char) == ";" {
				curNum = ""
				curColors.Bag.Reset()
			}
		}
		if passed {
			ok := curColors.Validate(conditions.R, conditions.G, conditions.B)
			if ok {
				sumChan <- id
			}
		}
	}
	close(sumChan)
}

func getInput(ch chan string) {
	file, err := os.Open("inputs/day2")
	if err != nil {
		fmt.Printf("couldn't get file")
	}

	defer file.Close()

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		ch <- scanner.Text()
	}
	close(ch)
}
