package main

import (
	"fmt"
	"time"
)

func main() {

	startTime := time.Now()
	//	fmt.Printf("day1-1 answer is: %v\n", Trebuchet())
	duration := time.Since(startTime)
	fmt.Printf("day1-1 took %v to complete\n", duration)
}
