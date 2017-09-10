var gameState = require('./game-state.js');
var { generateBoard, rollDice } = require('./dice.js');
var { addWord, removeItem, countWords } = require('./words.js');
var { acceptPlayer } = require('./player.js');

//strip all of these items down into functions which are more decoupled and *take in arguments*
//all data should come from (and go back to) one place
//all functions should reach up and down correctly.

generateBoard();

var socket = io();

var name = prompt("Set your player name:");

socket.emit('new-player',{name: name});

var other_players = {};

socket.on('update-players',function(players_data){
  var players_found = {};

  for (var id in players_data){
    if (other_players[id] == undefined && id != socket.id) {
      var data = players_data[id];
      var p = acceptPlayer(data);
      other_players[id] = p;
      console.log("created new player!");
    }
    players_found[id] = true;
  }
  for(var id in other_players){
        if(!players_found[id]){
            other_players[id].destroy();
            delete other_players[id];
        }
    }
});

$('.scoreboard-header').text(name);

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
