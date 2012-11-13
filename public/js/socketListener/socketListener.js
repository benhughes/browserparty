define([
	// These are path alias that we configured in our bootstrap
	'socket',
	'underscore',
	'pubsub/pubsub',
	'log'
], function (socket, _, pubSub, log) {
	var logPrefix = "socketListener/socketListener",
		SocketListener = (function () {
			var iosocket,
				events = {
					'message' : 'server#message',
					'browserUpdate' : 'server#browserUpdate',
					'disconnect' : 'server#disconnect'
				};
			return {
				init: function () {
					log(logPrefix, 'initialising socketListener');
					iosocket = io.connect();
					_.bindAll(this, 'onConnect');
					iosocket.on('connect', this.onConnect);
				},
				onConnect: function () {
					log(logPrefix, 'socket.io connected');
					this.setUpListeners();
					iosocket.emit('message', 'hi there');
				},
				setUpListeners: function () {
					var i;
					for (i in events) {
						if (events.hasOwnProperty(i)) {
							this.setSocketListener(i);
						}
					}
				},
				setSocketListener: function (eventType) {
					log(logPrefix, 'Setting up socketio to listen on', eventType);
					iosocket.on(eventType, function (data) {
						log(logPrefix, 'recieved', eventType, ":", data);
						pubSub.publish(events[eventType], data);
					});
				}
			};

		}()),
		socketListener = SocketListener;

	socketListener.init();


	return socketListener;
});