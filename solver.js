(function() {
    "use strict";

    /* Wordscapes Solver: 
     To beat my friends at Wordscapes - a terrible mobile game.

     Player receives a set of starting letters. Attempts to fill in the blanks using the letters provided.

      User can enter allowed letters and (if applicable) their current positions to receive a list of possible solutions. e.g. 
        Allowed letters: eat
        e-t returns 'eat'
        --- returns 'aet', 'ate', 'eat', 'eta', 'tae', 'tea'
    */

    // const wordList = require('./words_dictionary.json');
    // console.log("wordlist top: ", wordList);
    module.exports = {
        wordList: require('./words_dictionary.json'),
        matches: [],
        allowedLetters: "eeslvs",
        unsolved: "-----s",
        // update allowed string
        setAllowed: function(newStr) {
            if (typeof newStr === "string") {
                this.allowedLetters = newStr;
                return true;
            }
            return false;
        },
        // update unsolved string
        setUnsolved: function(newStr) {
            if (typeof newStr === "string") {
                this.unsolved = newStr;
                return true;
            }
            return false;
        },
        // generate a random word
        randomWord: function() {
            const randNum = Math.floor(Math.random() * Math.floor((this.wordList.words.length)));
            return this.wordList.words[randNum];
        },
        // find words
        findWords: function() {
            console.log("wordlist: ", this.wordList);
            for (let i = 0; i < this.wordList.words.length; i++) {
                let matchedWord = this.wordList.words[i];
                let possible = this.checkWord(this.unsolved, matchedWord);
                if (possible) {
                    let mapped = this.mapStr(matchedWord);
                    let matched = this.checkLetters(mapped);
                    if (matched) {
                        this.matches.push(matchedWord);
                    }
                }
            }
        },
        // check that word contains allowed letters
        checkLetters: function(map, allowedMapped) {
            let minIndex = 0;
            for (let letter in map) {
                let index = this.allowedLetters.indexOf(letter);
                let count = (this.allowedLetters.match(new RegExp(letter, "g")) || []).length; // regex to count numnber of characters in a string - https://stackoverflow.com/questions/881085/count-the-number-of-occurrences-of-a-character-in-a-string-in-javascript
                let countMap = map[letter].length;
                if (index === -1 || countMap > count) {
                    return false;
                }
            }
            return true;
        },
        // check if length matches + check if word can fill available space
        checkWord: function(unsolved, word) {
            if (unsolved.length !== word.length) {
                return false;
            }
            for (let i = 0; i < unsolved.length; i++) {
                if (unsolved[i] !== "-" && unsolved[i] !== word[i]) {
                    return false;
                }
            }
            return true;
        },
        // create an object map from a string
        mapStr: function(str) {
            let map = {};
            for (let i = 0; i < str.length; i++) {
                let letter = str[i];
                if (map[letter]) {
                    map[letter].push(i);
                } else {
                    map[letter] = [i];
                }
            }
            return map;
        }
    };

    // exports.allowed = Solver.setAllowed;
    // exports.unsolved = Solver.setUnsolved;
    // exports.findWords = Solver.findWords;
    // console.log("random: ", solver.randomWord());
    // solver.setAllowed("rwenni");
    // solver.setUnsolved("i-n--");
    // solver.findWords();
    // solver.promptUser();
    // console.log("Matches: ", solver.matches.length);
    // console.log("Matches: ", solver.matches);
    // module.exports.Solver = Solver;
})();

