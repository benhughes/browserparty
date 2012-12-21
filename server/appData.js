var appData = (function () {
	var ConnectionCollection = require('../public/js/collections/connections/connections'),
		log = require('../public/js/log/log'),
		connectionCollection = new ConnectionCollection,
		logPrefix = "appData";

	log(logPrefix, 'setting up appData');


	return {
		connections: connectionCollection
	}
}());

module.exports = appData;
