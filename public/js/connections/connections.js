define([
	// These are path alias that we configured in our bootstrap
	'jquery',     // lib/jquery/jquery-1.8.2.min
	'underscore', // lib/underscore/underscore
	'backbone',    // lib/backbone/backbone
	'log'
], function ($, _, Backbone, log) {
	var logPrefix = "connection/connections",
		Connections = function () {
			var models = {},
				collections = {},
				views = {};

			return {};
		}();
	// Above we have passed in jQuery, Underscore and Backbone
	// They will not be accessible in the global scope
	return {};
	// What we return here will be used by other modules
});