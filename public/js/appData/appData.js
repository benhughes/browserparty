define([
	// These are path alias that we configured in our bootstrap
	'underscore', // lib/underscore/underscore
    '/shared/collections/connections/connections.js',
    '/shared/collections/events/events.js',
	'/shared/models/clientModel/clientModel.js',
	'log'
], function (_, ConnectionCollection, EventCollection, ClientModel, log) {
	var logPrefix = "appData",
		connections = new ConnectionCollection(),
		clientData = new ClientModel(),
        events = new EventCollection();
	log(logPrefix, 'Setting up app data');

	return {
		connections: connections,
		clientData: clientData,
        events: events
	};
	// What we return here will be used by other modules
});