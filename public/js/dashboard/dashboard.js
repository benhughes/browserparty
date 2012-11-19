define([
	// These are path alias that we configured in our bootstrap
	'underscore', // lib/underscore/underscore
	'log',
	'socketListener/socketListener',
	'views/dashboard/dashboard'
], function (_, log, socketListener, DashboardView) {
	var logPrefix = "dashboard/dashboard",
		Dashboard = (function () {
			var dashboardView;

			return {
				init: function () {
					var dashboardView = new DashboardView();
					dashboardView.render();
				}
			};

		}());
	// Above we have passed in jQuery, Underscore and Backbone
	// They will not be accessible in the global scope
	return Dashboard;
	// What we return here will be used by other modules
});