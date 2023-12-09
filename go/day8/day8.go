package day8

import "os"

func CheckErr(err error) {
	if err != nil {
		panic(err)
	}
}

func HauntedWaistland() (string, error) {
	file, err := os.ReadFile("input-day8")
	CheckErr(err)

	return string(file), nil
}

type BinaryNode struct {
	Value string
	Left  string
	Right string
}

type BinaryTree struct {
	Head *BinaryNode
}

func (b BinaryTree) Constructor() BinaryTree {
	return BinaryTree{}
}

func (b BinaryTree) AddNode(node *BinaryNode) {

}

func (b BinaryTree) Search(node *BinaryNode) bool {

}
