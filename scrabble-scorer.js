// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");


const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const simplePointStructure = {
   1: ['A', 'B', "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
}

const vowelPointStructure = {
   1: ['B', "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z", "Y"],
   3: ['A', "E", "I", "O", "U",]
}
function oldScrabbleScorer(word){
	word = word.toUpperCase();
	let letterPoints = "";
   let totalPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         totalPoints += Number(pointValue);
		 }
 
	  }
	}
	return letterPoints + "Total Score for " + word + " is equal to " + totalPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   let word = input.question("No really, enter a word: ");
   return word;
};



let simpleScorer = function(word){
   
      word = word.toUpperCase();
      let letterPoints = "";
      let totalPoints = 0;
    
      for (let i = 0; i < word.length; i++) {
    
        for (const pointValue in simplePointStructure) {
    
          if (simplePointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
            totalPoints += Number(pointValue);
          }
    
        }
      }
      return totalPoints;
    
};

let vowelBonusScorer = function(word){

      word = word.toUpperCase();
      let letterPoints = "";
      let totalPoints = 0;
    
      for (let i = 0; i < word.length; i++) {
    
        for (const pointValue in vowelPointStructure) {
    
          if (vowelPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
            totalPoints += Number(pointValue);
          }
    
        }
      }
      return totalPoints;

};

// let scrabble = {
//    description: "The traditional scoring algorithm.",
//    name: "Scrabble",
//    scorerFunction: oldScrabbleScorer
// }
// let simpleScore = {
//    name: "Simple Score",
//    description: "Each letter is worth 1 point",
//    scorerFunction: simpleScorer
// }
// let bonusVowels = {
//    name: "Bonus Vowels",
//    description: "Vowels are 3 pts, consonants are 1 pt.",
//    scorerFunction: vowelBonusScorer
// }
let scrabbleScorer = function(word){
   word = word.toLowerCase();
   console.log(word);
   let letterPoints = "";
   let totalPoints = 0;
   let newPointStructure = transform(oldPointStructure);
 
   for (let i = 0; i < word.length; i++) {
 
     for (const letter in transform(oldPointStructure)) {
       if (letter === word[i]) {
         letterPoints += `Points for '${word[i]}': ${newPointStructure[letter][0]}\n`
         totalPoints += newPointStructure[letter];
       }
 
     }
   }
   
   return totalPoints;
};
const scoringAlgorithms = [
   simpleScore = {
      name: "Simple Score",
      description: "Each letter is worth 1 point",
      scorerFunction: simpleScorer
   },
   bonusVowels = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
   }, 
   scrabble = {
      description: "The traditional scoring algorithm.",
      name: "Scrabble",
      scorerFunction: scrabbleScorer
   },
]

function scorerPrompt() {
   let choice = input.question("Which scoring algorithm would you like to use? \n Please enter 0 for Simple Scrabble Scorer - Simple One Point Character\n Please enter 1 for Vowel Bonus Scorer - Vowels are worth 3 points \n Please enter 2 for Traditional Scrabble Scorer - Uses scrabble point system\n");
   if (choice == 0)
   {
      return simpleScore;
   }
   else if (choice == 1)
   {
      return bonusVowels;
   }
   else if (choice == 2)
   {
      return scrabble;
   }
   else
   {
      return "Please enter a 0, a 1, or a 2 for your scrabble scoring choice."
   }
}

function transform(oldPointStructure) {
   let newPointStructure = {};
   let letter;
   
   for (n in oldPointStructure){
      for ( let i = 0; i < oldPointStructure[n].length; i++)
      {
         letter = oldPointStructure[n][i];
         letter = letter.toLowerCase();
         newPointStructure[letter] = Number(n);
      }
   }
   return newPointStructure;
   
   
};
let newPointStructure = transform(oldPointStructure);



function runProgram() {
   let word = initialPrompt();
   let choice = scorerPrompt();
   console.log(choice.scorerFunction(word));
   
   
   
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
