(function () {
	'use strict';

	var Connections = function (_, Backbone, log, pubSub, ClientModel) {
		var logPrefix = "collections/connection",
			ConnectionCollection = Backbone.Collection.extend({
				model: ClientModel,
				initialize: function () {
					log(logPrefix, "initalising...");
					this.setUpListeners();
				},
				setUpListeners: function () {
					log(logPrefix, "setting up listeners");
					_.bindAll(this, 'updateReceived');
					pubSub.subscribe('server#connectionsUpdate', this.updateReceived);
				},
				updateReceived: function (updateData) {
					log(logPrefix, 'update recieved', updateData);
					log(logPrefix, this.reset(updateData, {silent: false}));
				}
			});


		return ConnectionCollection;
	};
	//sets up for require to be able to use file in browser and commonjs to use it on serevr
	if (typeof define === "function" && define.amd) {
		define(['underscore', 'backbone', 'log', 'pubSub', '/shared/models/clientModel/clientModel.js'], Connections);
	} else if (module && typeof module.exports !== 'undefined') {
		module.exports = Connections(require('underscore')._, require('backbone'), require('../../log/log'), require('../../pubSub/pubSub'), require('../../models/clientModel/clientModel'));
	}

}());