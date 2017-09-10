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
