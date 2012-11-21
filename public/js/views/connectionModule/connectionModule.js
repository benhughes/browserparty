define([
	// These are path alias that we configured in our bootstrap
	'jquery',     // lib/jquery/jquery-1.8.2.min
	'underscore', // lib/underscore/underscore
	'backbone',    // lib/backbone/backbone
	'log',
	'appData/appData',
	'pubSub/pubSub',
	'text!/templates/connectionModule/connectionList.html'
], function ($, _, Backbone, log, appData, pubSub, connectionListTemplate) {

	var logPrefix = "views/connectionModule/connectionModule",
		ConnectionModuleView = Backbone.View.extend({
			render: function () {
				var compiledTemplate = _.template(connectionListTemplate, {connections: this.collection.models});

				log(logPrefix, 'Rendering');
				this.$el.html(compiledTemplate);

				return this.$el;
			},
			initialize: function () {
				this.collection = appData.connections;
				this.setListeners();
			},
			setListeners: function () {
				_.bindAll(this, 'addConnection');
				this.collection.bind('add', this.addConnection);
			},
			addConnection: function (data) {
				log(logPrefix, "connection has been added to the connectionCollection", data);
				this.render();
			}
		});
	// Above we have passed in jQuery, Underscore and Backbone
	// They will not be accessible in the global scope
	return ConnectionModuleView;
	// What we return here will be used by other modules
});