define([
	// These are path alias that we configured in our bootstrap
	'underscore', // lib/underscore/underscore
	'collections/connections/connections',
	'log'
], function (_, ConnectionCollection, log) {
	var logPrefix = "appData";
	log(logPrefix, 'Setting up app data');
	return {
		connections: new ConnectionCollection()
	};
	// What we return here will be used by other modules
});