
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , _ = require('underscore')._
  , backbone = require('backbone');

var app = express(),
  server = http.createServer(app)
  io = require('socket.io').listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

app.listen();
 
io.sockets.on('connection', function (socket) {
    console.log('A socket connected!', socket.id);
    socket.on('message', function (msg) {
        console.log('Message Received: ', msg);
        socket.broadcast.emit('message', msg);
    });
    socket.emit('browserUpdate', {
      id: socket.id

    })
    socket.on('test', function (msg) {
        console.log('Message Received: ', msg);
        socket.broadcast.emit('message', msg.message);
    });
    socket.on('browserInfo', function(info){
      socket.broadcast.emit('message', info.userAgent);
    })
});

// socketio.listen(app).on('connection', function (socket) {
//     socket.on('message', function (msg) {
//         console.log('Message Received: ', msg);
//         socket.broadcast.emit('message', msg);
//     });
// });