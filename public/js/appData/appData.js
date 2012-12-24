define([
	// These are path alias that we configured in our bootstrap
	'underscore', // lib/underscore/underscore
    'collections/connections/connections',
    'collections/events/events',
	'models/clientModel/clientModel',
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