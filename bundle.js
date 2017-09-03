(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

function generateBoard(){
  var numberOfSquares = 16;
  var board = document.getElementsByClassName('board')[0];
  for (var i = 0; i < numberOfSquares; i++){
    var squareNode = document.createElement("DIV");
    squareNode.className = 'square';
    squareNode.id = ('square-' + i);
    squareNode.innerHTML = '<span class="square-letter"></span>';
    board.appendChild(squareNode);
  }
}

function rollDice(){
  var dice = [
    ['R', 'I', 'F', 'O', 'B', 'X'],
    ['I', 'F', 'E', 'H', 'E', 'Y'],
    ['D', 'E', 'N', 'O', 'W', 'S'],
    ['U', 'T', 'O', 'K', 'N', 'D'],
    ['H', 'M', 'S', 'R', 'A', 'O'],
    ['L', 'U', 'P', 'E', 'T', 'S'],
    ['A', 'C', 'I', 'T', 'O', 'A'],
    ['Y', 'L', 'G', 'K', 'U', 'E'],
    ['Qu', 'B', 'M', 'J', 'O', 'A'],
    ['E', 'H', 'I', 'S', 'P', 'N'],
    ['V', 'E', 'T', 'I', 'G', 'N'],
    ['B', 'A', 'L', 'I', 'Y', 'T'],
    ['E', 'Z', 'A', 'V', 'N', 'D'],
    ['R', 'A', 'L', 'E', 'S', 'C'],
    ['U', 'W', 'I', 'L', 'R', 'G'],
    ['P', 'A', 'C', 'E', 'M', 'D']
  ];

  var settledDice = [];
  var finishedBoard = [];

  for (var i = 0; i < dice.length; i++){
    var givenDie = dice[Math.floor(Math.random()*dice.length)];
    while (settledDice.includes(givenDie)){
      givenDie = dice[Math.floor(Math.random()*dice.length)];
    }
    settledDice.push(givenDie);
  }

  for (var i = 0; i < settledDice.length; i++){
    var die = settledDice[i];
    var givenLetter = die[Math.floor(Math.random()*die.length)];
    finishedBoard.push(givenLetter);
  }

  var squares = document.getElementsByClassName('square-letter');

  for (var i = 0; i < squares.length; i++){
    var square = squares[i];
    square.innerHTML = finishedBoard[i];
  }
}

module.exports = { generateBoard: generateBoard, rollDice: rollDice }

},{}],2:[function(require,module,exports){
module.exports = {
  collectedSquares: [],
  collectedString: '',
  allWords: [],
  board: document.getElementsByClassName('board')[0],
};

},{}],3:[function(require,module,exports){
var gameState = require('./game-state.js');
var { generateBoard, rollDice } = require('./dice.js');
var { addWord, removeItem, countWords } = require('./words.js');

//strip all of these items down into functions which are more decoupled and *take in arguments*
//all data should come from (and go back to) one place
//all functions should reach up and down correctly.

generateBoard();

var { allWords, collectedString, collectedSquares } = gameState;

function restartGame (){
  clearBoard();
  $('.wordlist').children().remove();
  $('.score').text('');
  rollDice();

}

function clearBoard (){
  collectedString = '';
  allWords = [];
}

var startButton = document.getElementById('start-button');
startButton.addEventListener("click", restartGame);

$(document).on('click', '.delete-word', function(e){
  var word = $(this).parent().children()[0].innerHTML;
  removeItem(allWords, word);
  $(this).parent().remove();
});

$('.board').on('mouseover', '.square', function(e){
  if (e.buttons === 1){
      var square = e.currentTarget;
      var letter = this.firstChild.innerHTML;
      if (!collectedSquares.includes(square.id)){
        collectedSquares.push(square.id);
        collectedString += letter;
      }
    }
});

$('.board').on('mouseup', function(e){
  if (collectedString.length > 0 && !allWords.includes(collectedString)){
    addWord(collectedString, allWords);
    collectedSquares = [];
    collectedString = '';
  }
});

function endGame() {
  countWords(allWords);
  clearBoard();
}

$('#end-game').on('click', endGame);

},{"./dice.js":1,"./game-state.js":2,"./words.js":4}],4:[function(require,module,exports){
function addWord(word, arr) {
  var wordList = $('.wordlist');
  arr.push(word);
  var wordObject = '<div><span class="word">' + word + '</span><span class="delete-word">X</span></div>';
  wordList.append(wordObject);
}

function removeItem(arr, val) {
  var idx = arr.length;
  while (idx--){
    if (arr[idx] && arr[idx] === val) {
      arr.splice(idx, 1);
    }
  }
  return arr;
}

function countWords(allWords){
  var counter = 0;
  for (var i = 0; i < allWords.length; i++){
    counter += allWords[i].length;
  }
  $('.score').text(counter);
}

module.exports = {
  addWord: addWord,
  removeItem: removeItem,
  countWords: countWords,
}

},{}]},{},[3]);
