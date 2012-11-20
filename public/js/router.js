define([
  'underscore',
  'backbone',
  'log',
  'dashboard/dashboard'
], function (_, Backbone, log, Dashboard) {
  var logPrefix = "router",
    AppRouter = Backbone.Router.extend({
      routes: {
        // Define some URL routes
        'dashboard': 'dashboard',
        '': 'dashboard',

        // Default
        '*actions': 'defaultAction'
      },
      dashboard: function () {
        log(logPrefix, "Navigating router to dashboard");

        Dashboard.init();
      },
      initialize: function () {
        log(logPrefix, "initializing Router");
        Backbone.history.start();

      }
    });
  return AppRouter;
});