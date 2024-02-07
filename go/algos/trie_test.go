package algos

import "testing"

func TestTrie(t *testing.T) {
	trie := NewTrie()
	trie.SeedTrieNumbers()

	// Table of test cases
	words := []struct {
		word       string
		isWord     bool // true if the word should be found, false if not
		startsWith bool // true if the word should be a prefix, false if not
	}{
		{"apple", true, true},
		{"app", true, true},
		{"banana", true, true},
		{"ban", false, true}, // "ban" is not inserted as a word, but is a prefix of "banana"
		{"cat", true, true},
		{"dog", true, true},
		{"fish", false, false}, // neither a word nor a prefix in the trie
		{"one", true, true},
		{"two", true, true},
	}

	// Insert words into the trie
	for _, w := range words {
		if w.isWord {
			trie.Insert(w.word)
		}
	}

	// Test Search method
	for _, w := range words {
		got := trie.Search(w.word)
		if got != w.isWord {
			t.Errorf("Search(%q) = %v; want %v", w.word, got, w.isWord)
		}
	}

	// Test startsWith method
	for _, w := range words {
		got := trie.StartsWith(w.word)
		if got != w.startsWith {
			t.Errorf("Starts with (%q) = %v; want %v", w.word, got, w.startsWith)
		}
	}
}
