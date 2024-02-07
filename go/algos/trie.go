package algos

import "fmt"

type TrieNode struct {
	Children [26]*TrieNode
	IsEnd    bool
}

type Trie struct {
	Root *TrieNode
}

func NewTrie() *Trie {
	return &Trie{Root: &TrieNode{
		Children: [26]*TrieNode{},
		IsEnd:    false,
	}}
}

func (n *Trie) Insert(word string) {
	cur := n.Root
	for i := range word {
		idx := word[i] - 'a'
		if cur.Children[idx] == nil {
			cur.Children[idx] = &TrieNode{
				Children: [26]*TrieNode{},
				IsEnd:    false,
			}
		}
		cur = cur.Children[idx]
	}
	cur.IsEnd = true
}

func (n *Trie) Search(word string) bool {
	cur := n.Root
	for i := range word {
		idx := word[i] - 'a'
		if cur.Children[idx] == nil {
			return false
		}
		cur = cur.Children[idx]
	}
	return cur.IsEnd
}

func (n *Trie) StartsWith(word string) bool {
	cur := n.Root
	for i := range word {
		fmt.Print(string(word) + " ")
		idx := word[i] - 'a'
		if cur.Children[idx] == nil {
			return false
		}
		cur = cur.Children[idx]
	}
	return true
}

func (t *Trie) SeedTrieNumbers() {
	t.Insert("one")
	t.Insert("two")
	t.Insert("three")
	t.Insert("four")
	t.Insert("five")
	t.Insert("six")
	t.Insert("seven")
	t.Insert("eight")
	t.Insert("nine")
}
