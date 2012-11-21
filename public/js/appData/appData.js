define([
	// These are path alias that we configured in our bootstrap
	'underscore', // lib/underscore/underscore
	'collections/connections/connections',
	'models/clientModel/clientModel',
	'log'
], function (_, ConnectionCollection, ClientModel, log) {
	var logPrefix = "appData",
		connections = new ConnectionCollection(),
		clientData = new ClientModel();
	log(logPrefix, 'Setting up app data');

	return {
		connections: connections,
		clientData: clientData
	};
	// What we return here will be used by other modules
});