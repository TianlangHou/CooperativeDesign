var express = require('express');
var path = require('path');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('news', function(data){
    console.log(data);
    socket.broadcast.emit('news', data);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
}); 

