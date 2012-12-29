var appData = (function () {
	var ConnectionCollection = require('../shared/collections/connections/connections'),
		EventsCollection = require('../shared/collections/events/events'),
        log = require('../shared/log/log'),
		connectionCollection = new ConnectionCollection,
        eventsCollection = new EventsCollection(),
		logPrefix = "appData";

	log(logPrefix, 'setting up appData');


	return {
		connections: connectionCollection,
        events: eventsCollection
	}
}());

module.exports = appData;
