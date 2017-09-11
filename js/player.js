function acceptPlayer(state){
  var inviteSpan = createEl({
     elementType: "SPAN",
     elementText: " invite " + state.name + " to play?",
     elementId: false,
     elementClass: "invite" });

  var nameSpan = createEl({
     elementType: "SPAN",
     elementText: state.name,
     elementId: state.playerSocket,
     elementClass: "listed-player--name" });

  var listedPlayer = createEl({
     elementType: "DIV",
     elementText: false,
     elementClass: "listed-player",
     elementId: false });
  listedPlayer.appendChild(nameSpan);
  listedPlayer.appendChild(inviteSpan);
  document.getElementById("online-players").appendChild(listedPlayer);
}

function createEl(data){
  var { elementType,
    elementId,
    elementText,
    elementClass
  } = data;
  var node = document.createElement(elementType);
  var innerText = elementText && document.createTextNode(elementText);
  elementText && node.appendChild(innerText);
  elementClass && node.classList.add(elementClass);
  if (elementId) {
    node.id = elementId;
  }
  return node;
}

module.exports = {
  acceptPlayer: acceptPlayer,
}
