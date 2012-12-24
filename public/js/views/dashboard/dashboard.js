// Filename: views/project/list
define([
  'jquery',
  'underscore',
  'backbone',
  'log',
  'text!/templates/dashboard/dashboard.html',
  'collections/connections/connections'
], function ($, _, Backbone, log, dashboardTemplate) {
  var logPrefix = "views/dashboard/dashboard",
    Dashboard = Backbone.View.extend({
      el: $('#container'),
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

        // Append our compiled template to this Views "el"
        this.$el.append(compiledTemplate);
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
        this.$el.append(moduleView.render());

      }
    });
  // Our module now returns our view
  return Dashboard;
});