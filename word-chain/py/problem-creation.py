import nltk
from nltk.corpus import brown
from collections import defaultdict, deque
import random

# Download the necessary NLTK data
nltk.download('brown')
nltk.download('punkt')

# Extract word pairs from the Brown corpus
def extract_word_pairs(corpus):
    word_pairs = defaultdict(int)
    for sentence in corpus.sents():
        for i in range(len(sentence) - 1):
            word1 = sentence[i].lower()
            word2 = sentence[i + 1].lower()
            word_pairs[(word1, word2)] += 1
    return word_pairs

# Create a graph from word pairs with weights
def create_graph(word_pairs):
    graph = defaultdict(list)
    for (word1, word2), weight in word_pairs.items():
        graph[word1].append((word2, weight))
    return graph

# Find a word chain of a specified length using BFS with optimizations and weights
def find_word_chain(start_word, length, graph):
    queue = deque([[start_word]])
    visited = set()
    
    while queue:
        path = queue.popleft()
        
        if len(path) == length:
            return path
        
        word = path[-1]
        if len(word) <= 2:
            continue
        if ("'" or "-" or "," or "." or "`" or ";" or ":") in word:
            continue
        if word in ["the", "be", "and", "of", "a", "in", "to", "have", "it", "I", "that", "for", "you", "he", "with", "on", "do", "say", "this", "they", "at", "but", "we", "his", "from", "not", "by", "she", "or", "as", "what", "go", "their", "can", "who", "get", "if", "would", "her", "all", "my", "make", "about", "know", "will", "as", "up", "one", "time", "there", "year", "so", "think", "when", "which", "them", "some", "me", "people", "take", "out", "into", "just", "see", "him", "your", "come", "could", "now", "than", "like", "other", "how", "then", "its", "our", "two", "more", "these", "want", "way", "look", "first", "also", "new", "because", "day", "use", "no", "man", "find", "here", "thing", "give", "many", "well"]:
            continue
        if word in visited:
            continue
        visited.add(word)
        
        neighbors = graph[word]
        
        # Sort neighbors by weight (frequency) and select the top ones
        neighbors.sort(key=lambda x: x[1], reverse=True)  # Sort by weight in descending order
        neighbors = neighbors[:20]  # Limit the number of neighbors to explore
        
        for neighbor, _ in neighbors:
            new_path = list(path)
            new_path.append(neighbor)
            queue.append(new_path)
    
    return None

# Load the Brown corpus and extract word pairs
word_pairs = extract_word_pairs(brown)
graph = create_graph(word_pairs)

# Parameters
start_word = 'moon'
chain_length = 2+1  # add one to length

# Find a word chain
word_chain = find_word_chain(start_word, chain_length, graph)

if word_chain:
    print("Word Chain:", ' -> '.join(word_chain[0:-1]))
else:
    print("No chain found.")