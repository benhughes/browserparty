define([
	// These are path alias that we configured in our bootstrap
	'jquery',     // lib/jquery/jquery-1.8.2.min
	'underscore', // lib/underscore/underscore
	'backbone',    // lib/backbone/backbone
	'log',
	'collections/connections',
	'pubsub/pubsub',
	'text!/templates/connectionList.html'
], function ($, _, Backbone, log, ConnectionCollection, pubSub, connectionListTemplate) {

	var logPrefix = "views/connectionModule/connectionModule",
		ConnectionModuleView = Backbone.View.extend({
			render: function () {
				var compiledTemplate = _.template(connectionListTemplate, {connections: this.collection.models});

				log(logPrefix, 'Rendering');
				this.$el.append(compiledTemplate);

				return this.$el;
			},
			initialize: function () {
				this.collection = new ConnectionCollection();
				this.setListeners();
			},
			setListeners: function () {
				_.bindAll(this, 'add');
				pubSub.subscribe('server#browserUpdate', this.add);
			},
			add: function (data) {
				this.collection.add(data);
				this.render();
			}
		});
	// Above we have passed in jQuery, Underscore and Backbone
	// They will not be accessible in the global scope
	return ConnectionModuleView;
	// What we return here will be used by other modules
});