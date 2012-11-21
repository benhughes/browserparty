define([
	'underscore',
	'backbone',
	'models/clientModel/clientModel',
	'pubSub/pubSub',
	'log'
], function (_, Backbone, ClientModel, pubSub, log) {
	var logPrefix = "collections/connections/connections",
		ConnectionCollection = Backbone.Collection.extend({
			model: ClientModel,
			initialize: function () {
				log(logPrefix, "initalising...");
				this.setUpListeners();
			},
			setUpListeners: function () {
				log(logPrefix, "setting up listeners");
				_.bindAll(this, 'updateReceived');
				pubSub.subscribe('server#connectonsUpdate', this.updateReceived);
			},
			updateReceived: function (updateData) {
				log(logPrefix, 'update recieved', updateData);
				log(logPrefix, this.add([updateData]));
			}
		});
	return ConnectionCollection;
});