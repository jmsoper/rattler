var express = require('express'); // Express contains some boilerplate to for routing and such
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.use("/styles",  express.static(__dirname + '/public/index.css'));
app.use("/js", express.static(__dirname + '/public/bundle.js'));
app.use("/styles/images/square.png", express.static(__dirname + '/public/styles/images/square.png'));

// Serve the index page
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// Listen on port 5000
app.set('port', (process.env.PORT || 5000));
http.listen(app.get('port'), function(){
  console.log('listening on port', app.get('port'));
});

var players = {};

io.on('connection', function(socket){
    console.log("New client has connected with id:", socket.id);
    socket.on('new-player',function(state_data){ // Listen for new-player event on this client
      console.log("New player has state:",state_data);
      players[socket.id] = state_data;
      io.emit('update-players',players);
    });
    socket.on('invite-player',function(player_data){ // Listen for new-player event on this client
      io.emit('receive-invite', player_data);
    });
    socket.on('disconnect', function(){
      delete players[socket.id];
    })
});
