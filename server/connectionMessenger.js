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
			_.bindAll(this, 'newConnection', 'collectionAdded');
			pubSub.subscribe('server#clientUpdate', this.newConnection);
			appData.connections.bind('add', this.collectionAdded);

		},
		newConnection: function (data) {
			log(logPrefix, 'recieving new connection', data);
			appData.connections.add(data);
		},
		collectionAdded: function () {
			log(logPrefix, 'new connection added sending data to browsers');
			socketListener.socketEmit('connectonsUpdate', appData.connections.toJSON());

		}
	};
}());

connectionMessenger.initialise();

module.exports = connectionMessenger;

