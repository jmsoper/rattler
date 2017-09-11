var gamePlayState = {
  opponentSelected: false,
  opponent: null,
  gameStarted: false,
  gameEnded: false,
  clientIsWinner: false,
  hasInvitation: false,
}

function selectOpponent(opponent){
  gamePlayState.opponentSelected = true;
  gamePlayState.opponent = opponent;
}

function fetchOpponent(){
  return gamePlayState.opponent;
}

function startGame(){
  gamePlayState.gameStarted = false;
}

function isGameStarted(){
  return gamePlayState.gameStarted;
}

function isClientWinner(){
  return gamePlayState.clientIsWinner;
}

function isGameOver(){
  return gamePlayState.gameEnded;
}

function isOpponentSelected(){
  return gamePlayState.opponentSelected;
}


module.exports = {
  collectedSquares: [],
  collectedString: '',
  allWords: [],
  board: document.getElementsByClassName('board')[0],
  selectOpponent: selectOpponent,
  startGame: startGame,
  isGameOver: isGameOver,
  isGameStarted: isGameStarted,
  isClientWinner: isClientWinner,
  fetchOpponent: fetchOpponent,
};


//is an opponent selected?

//is the game started?

//is the timer running?

//who has the higher number of points?
