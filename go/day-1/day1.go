package day1

import (
	"os"
	"regexp"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func SumCalibration() {
	path := "input-day-1-1"
	data, err := os.ReadFile(path)
	check(err)

	strData := string(data)
}

func GetTens(line string) {
	pattern := regexp.MustCompile("[0-9]")
	var tens string

	for i := 0; i < len(line); i++ {
		res, err := pattern.MatchString(line[i])
		check(err)
		if res != nil {
			tens = res
		}
	}
}
