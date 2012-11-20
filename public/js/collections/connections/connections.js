define([
	'underscore',
	'backbone',
	'models/connections/connections',
	'pubSub/pubSub',
	'log'
], function (_, Backbone, ConnectionModel, pubSub, log) {
	var logPrefix = "collections/connections/connections",
		ConnectionCollection = Backbone.Collection.extend({
			model: ConnectionModel,
			initialize: function () {
				log(logPrefix, "initalising...");
				this.setUpListeners();
			},
			setUpListeners: function () {
				log(logPrefix, "setting up listeners");
				_.bindAll(this, 'updateReceived');
				pubSub.subscribe('server#browserUpdate', this.updateReceived);
			},
			updateReceived: function (updateData) {
				log(logPrefix, 'update recieved', updateData);
				this.add(updateData);
			}
		});
	return ConnectionCollection;
});