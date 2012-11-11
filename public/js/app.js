// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'router', // Request router.js
  'socketListener/socketListener',
  'log'
], function($, _, Backbone, Router, socketListener, log){
  var logPrefix = "js/app",
    init = function(){
    log(logPrefix, 'Initialising app.js')
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  }

  return {
    init: init
  };
});