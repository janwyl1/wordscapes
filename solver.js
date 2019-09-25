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
    module.exports = {
        wordList: require('./words_dictionary.json'),
        matches: [],
        unsolved: "d-f--lt",
        allowedLetters: "default",
        // update allowed string
        setAllowed: function(newStr) {
            if (typeof newStr === "string") {
                this.allowedLetters = this.replaceSpecialChars(newStr);
                return true;
            }
            return false;
        },
        // update unsolved string
        setUnsolved: function(newStr) {
            if (typeof newStr === "string") {
                this.unsolved = this.replaceSpecialChars(newStr);
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
            this.matches = [];
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
            return this.matches;
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
        // replace any special characters with -
        replaceSpecialChars: function(str) {
            const newStr = str.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'-');
            return newStr;
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
})();