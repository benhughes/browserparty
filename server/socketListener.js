
var socketListener = (function () {
	var io = require('socket.io'),
		_ = require('underscore')._,
		log = require('../shared/log/log'),
		pubSub = require('../shared/pubSub/pubSub'),
        SingleSocketListener = require('./singleSocketListener'),
		logPrefix = 'socketListener',
		events = require('../shared/sharedMessages.json');



	return {
		initialise: function (server) {
			if (!server || !_.isObject(server)) {
				log(logPrefix, 'server is not an object it is ' + typeof server + ' throwing error');
				throw new Error('Passed Server is not an object');
			}
			log(logPrefix, 'initialising socketlistener');
			log(logPrefix, 'registered events are ', events);

			io = io.listen(server);
			_.bindAll(this, 'onConnect');
			io.sockets.on('connection', this.onConnect);
		},
		onConnect: function (socket) {
			log(logPrefix, 'Socket Connected', socket.id);
            var singleSocketListener = new SingleSocketListener();
            //initialise single socket listerner with passed socket
            singleSocketListener.initialise(socket);

			//this.setUpListeners(socket);
			//pubSub.publish('server#connect');

		},
		setUpListeners: function (socket) {
			_.each(events, function (element, index, list) {
				this.setSocketListener(index, socket);
			}, this);
		},
		setSocketListener: function (eventType, socket) {
			log(logPrefix, 'Setting up socketio to listen on', eventType);
			socket.on(eventType, function (data) {
				log(logPrefix, 'recieved', eventType, ":", data);
				pubSub.publish(events[eventType], data);
			});
		},
		socketEmit: function (id, data) {
			log(logPrefix, 'sending ', data, 'to connections with id ', id);
			io.sockets.emit(id, data);
		}

	};

}());

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
