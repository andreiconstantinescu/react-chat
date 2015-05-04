var express = require('express');
var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

var join = require('path').join;

var port = process.env.PORT || 3000;

server.listen(port);
console.log("Server listening on port: " + port);

app.use(express.static(join(__dirname, 'public')));

// On each connected user, pass the socket to './chat.js'
io.on('connection', require('./chat.js'));
