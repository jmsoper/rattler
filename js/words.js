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
