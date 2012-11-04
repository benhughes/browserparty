// Filename: views/project/list
define([
  'jquery',
  'underscore',
  'backbone',
  'log',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!dashboard/templates/dashboard.html'
], function($, _, Backbone, log, dashboardTemplate){
  var logPrefix = "js/dashboard/views/dashboard",
    ProjectListView = Backbone.View.extend({
      el: $('#container'),
      render: function(){
        log(logPrefix, 'Rendering dashboard')
        // Using Underscore we can compile our template with data
        var data = {};
        var compiledTemplate = _.template( dashboardTemplate, data );
        // Append our compiled template to this Views "el"
        this.$el.append( compiledTemplate );
      }
    });
  // Our module now returns our view
  return ProjectListView;
});