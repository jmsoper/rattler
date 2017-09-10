/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var gameState = __webpack_require__(1);
	var { generateBoard, rollDice } = __webpack_require__(2);
	var { addWord, removeItem, countWords } = __webpack_require__(3);
	var { acceptPlayer } = __webpack_require__(4);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
	  collectedSquares: [],
	  collectedString: '',
	  allWords: [],
	  board: document.getElementsByClassName('board')[0],
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	function acceptPlayer(state){
	  var node = document.createElement("DIV");
	  var span = document.createElement("SPAN");
	  var spanText = document.createTextNode(" invite " + state.name + " to play?");
	  span.appendChild(spanText);
	  span.classList.add("invite");
	  var textnode = document.createTextNode(state.name);
	  node.classList.add('listed-player');
	  node.appendChild(textnode);
	  node.appendChild(span);
	  document.getElementById("online-players").appendChild(node);
	}

	module.exports = {
	  acceptPlayer: acceptPlayer,
	}


/***/ }
/******/ ]);