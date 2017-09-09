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

$('.board').on('mousedown', '.square', function(e){
  var squareId = e.currentTarget.attributes.id.nodeValue;
  var square = document.getElementById(squareId);
  square.classList.add("selected-square");
  var letter = this.firstChild.innerHTML;
  if (!collectedSquares.includes(square.attributes.id.nodeValue)){
    collectedSquares.push(square.attributes.id.nodeValue);
    collectedString += letter;
  }
});

$('.board').on('mouseover', '.square', function(e){
  if (e.buttons === 1){
    var squareId = e.currentTarget.attributes.id.nodeValue;
    var square = document.getElementById(squareId);
    square.classList.add("selected-square");
    var letter = this.firstChild.innerHTML;
    if (!collectedSquares.includes(square.attributes.id.nodeValue)){
      collectedSquares.push(square.attributes.id.nodeValue);
      collectedString += letter;
    }
    }
});

$(document).on('mouseup', function(e){
  var squares = document.getElementsByClassName('selected-square');
  var squareLength = squares.length;
  for (var i = 0; i < squareLength; i++){
    squares[0].classList.remove('selected-square');
  }
  if (collectedString.length > 1 && !allWords.includes(collectedString)){
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
