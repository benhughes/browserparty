
var socketListener = function () {
	var io = require('socket.io').listen(server),
	    _ = require('underscore')._;


	return {
		initialise: function () {

		}
	}

}

module.exports = socketListener;

// io.sockets.on('connection', function (socket) {
//     console.log('A socket connected!', socket.id);
//     socket.on('message', function (msg) {
//         console.log('Message Received: ', msg);
//         socket.broadcast.emit('message', msg);
//     });
//     socket.emit('clientUpdate', {
//         id: socket.id
//     });
//     socket.on('clientUpdate', function (data) {
//         console.log('Client Update recieved', data);
//         socket.emit('clientUpdate', data);
//         socket.broadcast.emit('connectonsUpdate', _.extend(data, {id: socket.id}));
//     });
//     socket.on('test', function (msg) {
//         console.log('Message Received: ', msg);
//         socket.broadcast.emit('message', msg.message);
//     });
//     socket.on('browserInfo', function (info) {
//         socket.broadcast.emit('message', info.userAgent);
//     });
// });
