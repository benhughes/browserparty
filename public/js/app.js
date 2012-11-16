// Filename: app.js
define([
  'underscore',
  'backbone',
  'router', // Request router.js
  'log'
], function (_, Backbone, Router, log) {
  var logPrefix = "js/app",
    init = function () {
      log(logPrefix, 'Initialising app.js');
      // Pass in our Router module and call it's initialize function
      Router.initialize();
    };

  return {
    init: init
  };
});