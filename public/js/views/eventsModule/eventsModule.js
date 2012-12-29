define([
	// These are path alias that we configured in our bootstrap
	'jquery',     // lib/jquery/jquery-1.8.2.min
	'underscore', // lib/underscore/underscore
	'backbone',    // lib/backbone/backbone
	'log',
	'appData/appData',
	'pubSub/pubSub',
	'text!/templates/eventsModule/eventsModule.html'
], function ($, _, Backbone, log, appData, pubSub, eventsViewer) {

	var logPrefix = "views/eventsModule",
		EventsModuleView = Backbone.View.extend({
			className: 'eventsModule module',
			render: function () {
				var compiledTemplate = _.template(eventsViewer, {events: this.collection.models});

				log(logPrefix, 'Rendering');
				this.$el.html(compiledTemplate);

				return this.$el;
			},
			initialize: function () {
				this.collection = appData.events;
				this.setListeners();
			},
			setListeners: function () {
				_.bindAll(this, 'addEvent');
				this.collection.bind('reset', this.addEvent);
			},
			addEvent: function (data) {
				log(logPrefix, "a new event has been added", data);
				this.render();
			}
		});
	// Above we have passed in jQuery, Underscore and Backbone
	// They will not be accessible in the global scope
	return EventsModuleView;
	// What we return here will be used by other modules
});