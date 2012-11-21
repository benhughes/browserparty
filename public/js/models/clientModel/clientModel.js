define([
	'underscore', // lib/underscore/underscore
	'backbone',    // lib/backbone/backbone
	'log'
], function (_, Backbone, log) {
	var ConnectionModel = Backbone.Model.extend({
		defaults: {
			type: 'unknown',
			userAgent: ''
		}
	});	// Above we have passed in jQuery, Underscore and Backbone
	// They will not be accessible in the global scope
	return ConnectionModel;
	// What we return here will be used by other modules
});