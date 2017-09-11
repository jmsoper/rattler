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
socket.on('connect', function(){
  socket.emit('new-player',{name: name, playerSocket: socket.id});
})
var other_players = {};

socket.on('update-players',function(players_data){
  var players_found = {};

  for (var id in players_data){
    if (other_players[id] == undefined && id != socket.id) {
      var data = players_data[id];
      var p = acceptPlayer(data);
      other_players[id] = p;
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

socket.on('receive-invite', function(data){
  if (data.opponent.socket == socket.id){
    console.log("it's for me!!!");
  } else {
    console.log("I got an invitation, but it's not for me.");
  }
});


$(document).on('click', '.invite', function(){
  var listedPlayer = $(this).parent().children()[0];
  var opponent = { name: listedPlayer.innerHTML,
                   socket: listedPlayer.id }
  var invitor = { name: name, socket: socket.id};
  socket.emit('invite-player',{opponent: opponent, invitor: invitor});
});

$('.scoreboard-header').text(name);

var { allWords,
  collectedString,
  collectedSquares,
  selectOpponent,
  startGame,
  isGameStarted,
  isOpponentSelected,
  isGameOver,
  fetchOpponent,
  selectOpponent,
} = gameState;

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
