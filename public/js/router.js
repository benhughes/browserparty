define([
  'jquery',
  'underscore',
  'backbone',
  'log',
  'dashboard/views/dashboard',
], function($, _, Backbone, log, Dashboardview){
  var logPrefix = "js/router",
    AppRouter = Backbone.Router.extend({
      routes: {
        // Define some URL routes
        'dashboard': 'dashboard',
        '': 'dashboard',

        // Default
        '*actions': 'defaultAction'
      },
      dashboard: function(){
        log(logPrefix, "Navigating router to dashboard");

        // Call render on the module we loaded in via the dependency array
        // 'dashboard/views/dashboard'
        var projectListView = new Dashboardview();
        projectListView.render();

      }
    }),
    initialize = function(){
      log(logPrefix, "initializing Router");
      var app_router = new AppRouter;
      log(logPrefix, "initializing Router", app_router);
      app_router.on('dashboard', function(){
        log(logPrefix, "Navigating router to dashboard");

        // Call render on the module we loaded in via the dependency array
        // 'dashboard/views/dashboard'
        var projectListView = new Dashboardview();
        projectListView.render();
      });

      app_router.on('defaultAction', function(actions){
        log(logPrefix, "Navigating router to defualt");
        // We have no matching route, lets just log what the URL was
        console.log('No route:', actions);
      });
      Backbone.history.start();
    };
  return {
    initialize: initialize
  };
});