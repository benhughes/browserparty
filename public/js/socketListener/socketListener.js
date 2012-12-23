define([
	// These are path alias that we configured in our bootstrap
	'socket',
	'underscore',
	'pubSub/pubSub',
	'log'
], function (socket, _, pubSub, log) {
	var logPrefix = "socketListener/socketListener",
		SocketListener = (function () {
			var iosocket,
				isConnected = false,
				events = {
					'message' : 'server#message',
					'clientUpdate' : 'server#clientUpdate',
					'disconnect' : 'server#disconnect',
					'connectionsUpdate' : 'server#connectionsUpdate'
				};
			return {
				addEvent: function (id, publishId) {
					events[id] = publishId;
				},
				init: function () {
					log(logPrefix, 'initialising socketListener');
					iosocket = socket.connect();
					_.bindAll(this, 'onConnect');
					iosocket.on('connect', this.onConnect);
				},
				onConnect: function () {
					log(logPrefix, 'socket.io connected');
					this.setUpListeners();
					isConnected = true;
					pubSub.publish('server#connect');
				},
				setUpListeners: function () {
					_.each(events, function (element, index, list) {
						this.setSocketListener(index);
					}, this);
				},
				setSocketListener: function (eventType) {
					log(logPrefix, 'Setting up socketio to listen on', eventType);
					iosocket.on(eventType, function (data) {
						log(logPrefix, 'recieved', eventType, ":", data);
						pubSub.publish(events[eventType], data);
					});
				},
				socketEmit: function (id, data) {
					log(logPrefix, 'Sending message to server with id ', id, data);
					iosocket.emit(id, data);
				}
			};

		}()),
		socketListener = SocketListener;

	socketListener.init();


	return socketListener;
});