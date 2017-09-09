var express = require('express'); // Express contains some boilerplate to for routing and such
var app = express();
var http = require('http').Server(app);
var path = require('path');

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
  console.log('listening on port',app.get('port'));
});
