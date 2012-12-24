var appData = (function () {
	var ConnectionCollection = require('../public/js/collections/connections/connections'),
		EventsCollection = require('../public/js/collections/events/events'),
        log = require('../public/js/log/log'),
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
