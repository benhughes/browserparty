define([
	// These are path alias that we configured in our bootstrap
	'jquery',     // lib/jquery/jquery-1.8.2.min
	'underscore', // lib/underscore/underscore
	'backbone',    // lib/backbone/backbone
	'appData/appData',
	'log',
	'pubSub',
	'socketListener/socketListener'
], function ($, _, Backbone, appData, log, pubSub, socketListener) {
	var logPrefix = "clientData/clientData",
		clientData = (function () {
			return {
				initialise: function () {
					log(logPrefix, "initialising...");
					this.setUpListeners();
				},
				setUpListeners: function () {
					_.bindAll(this, 'serverConnected', 'clientUpdateRecieved');
					pubSub.subscribe('server#connect', this.serverConnected);
					pubSub.subscribe('server#clientUpdate', this.clientUpdateRecieved);
				},
				serverConnected: function () {
					log(logPrefix, "Server connected sending details");
					socketListener.socketEmit('clientUpdate', this.browserDetails());
				},
				browserDetails: function () {
					return {
						userAgent: navigator.userAgent
					};
				},
				clientUpdateRecieved: function (data) {
					log(logPrefix, "client update recieved ", data);
					appData.clientData.set(data);
					log(logPrefix, "client model updated", appData.clientData);
				}
			};
		}());
	clientData.initialise();

	return clientData;
	// What we return here will be used by other modules
});