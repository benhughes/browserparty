// Filename: views/project/list
define([
	'jquery',
	'underscore',
	'backbone',
	'log',
	'text!/templates/dashboard/dashboard.html',
	'/shared/collections/connections/connections.js'
], function ($, _, Backbone, log, dashboardTemplate) {
	var logPrefix = "views/dashboard/dashboard",
		Dashboard = Backbone.View.extend({
			className: 'dashboard',
			modules: [
				{
					id: "connections",
					viewLoc: "views/connectionModule/connectionModule"
				},
				{
					id: "events",
					viewLoc: "views/eventsModule/eventsModule"
				}
			],
			render: function () {
				var data = {},
					compiledTemplate = _.template(dashboardTemplate, data);

				this.el.innerHTML = compiledTemplate;
				$('#container').html(this.el);
				this.renderModules();
			},
			renderModules: function () {
				_.each(this.modules, function (module) {
					log(logPrefix, 'Rendering module', module.id);

					_.bindAll(this, 'moduleRender');

					require([module.viewLoc], this.moduleRender);
				}, this);
			},
			moduleRender: function (ModuleView) {
				moduleView = new ModuleView();
				log('---', this.el)
				$(this.el).append(moduleView.render());

			}
		});
	// Our module now returns our view
	return Dashboard;
});