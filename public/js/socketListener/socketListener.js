define([
	// These are path alias that we configured in our bootstrap
	'socket',
	'underscore',
	'pubsub/pubsub',
	'log'
], function(socket, _, pubSub, log){
	var logPrefix = "socketListener/socketListener",
		SocketListener = function () {
			var iosocket,
				messageRecievedPrefix = "recieved",
				events = {
					'message' : 'socketio#message'
				};
			return{
				init: function () {
					log(logPrefix, 'initialising socketListener')
					iosocket = io.connect();
					_.bindAll(this, 'onConnect')
					iosocket.on('connect', this.onConnect);
				},
				onConnect: function () {
					log(logPrefix, 'socket.io connected');
					this.setUpListeners();
					iosocket.emit('message', 'hi there');
				},
				setUpListeners: function () {
					for (var i in events){
						log(logPrefix, 'Setting up socketio to listen on', i);
						iosocket.on(i, function (data) {
							log(logPrefix, 'recieved', i, ":", data);
							pubSub.publish(events[i], data);
						});
					};
				},
				run: function (func) {
					if (this[func]) {
						this[func]();
					};
				},
				onMessage: function (data) {
					

				}

			}

		}(),
		socketListener = SocketListener;

	socketListener.init();


	return socketListener;
});