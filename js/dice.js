
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
