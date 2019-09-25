## Wordscapes Solver

Beat your friends at [Wordscapes](https://apps.apple.com/us/app/wordscapes/id1207472156)

### About

Similar to a crossword puzzle, the player receives a set of 6 letters and attempts to fill in the blank words using the letters provided.

Solve the puzzle, one word at a time, by entering the missing word and the available letters. For example:

- solve word: c-t
- using letters: catery

**or:**

- solve word: c..t
- using letters: cynta

**or:**

- solve word: -----
- using letters: htraes

It will search approx. 400k words to find potential solutions.

### index.js 
Contains a basic example.

### app.js 
Contains an Express application with a form and route handler.

### solver.js 
Contains the logic for solving the puzzle. It takes a brute force approach, looping over each word in the dictionary to find potential matches.