// Filename: views/project/list
define([
  'jquery',
  'underscore',
  'backbone',
  'log',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!/templates/dashboard.html',
  //'views/connectionModule/connectionModule'
], function ($, _, Backbone, log, dashboardTemplate) {
  var logPrefix = "js/views/dashboard",
    ProjectListView = Backbone.View.extend({
      el: $('#container'),
      modules: [
        {
          id: "connections",
          viewLoc: "views/connectionModule/connectionModule"
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
        log('here');
        moduleView = new ModuleView();

        this.$el.append(moduleView.render());

      }
    });
  // Our module now returns our view
  return ProjectListView;
});