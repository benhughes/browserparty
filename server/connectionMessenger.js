/* this class looks out for new connections and makes the change to the connection collection */

var connectionMessenger = (function () {
	'use strict';
	var pubSub = require('../public/js/pubSub/pubSub'),
		log = require('../public/js/log/log'),
		appData = require('./appData'),
		_ = require('underscore')._,
		socketListener = require('./socketListener'),
        logPrefix = 'connectionMessenger';

	return {
		initialise: function () {
			log(logPrefix, 'initialising...');
			this.setUpListeners();

		},
		setUpListeners: function () {
			log(logPrefix, 'setting up listeners');
			_.bindAll(this, 'newConnection', 'collectionAdded', 'handleDisconnection');
            pubSub.subscribe('server#clientUpdate', this.newConnection);
            pubSub.subscribe('server#disconnect', this.handleDisconnection);
            appData.connections.bind('add', this.collectionAdded);

		},
		newConnection: function (data, socket) {
			log(logPrefix, 'recieving new connection', data);
            data.id = socket.id;
			appData.connections.add(data);
		},
		collectionAdded: function () {
			log(logPrefix, 'new connection added sending data to browsers');
            this.sendCurrentConnections();
		},
        sendCurrentConnections: function () {
            log(logPrefix, 'sending current connections data to all connections');
            socketListener.socketEmit('connectionsUpdate', appData.connections.toJSON());
        },
        handleDisconnection: function (data, socket) {
            log(logPrefix, 'handling socket disconnection for', socket.id);
            appData.connections.remove(socket.id);
            this.sendCurrentConnections();

        }
	};
}());

connectionMessenger.initialise();

module.exports = connectionMessenger;

