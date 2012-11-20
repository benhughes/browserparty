// Filename: app.js
define([
  'underscore',
  'backbone',
  'router', // Request router.js
  'log'
], function (_, Backbone, Router, log) {
  var logPrefix = "app",
    init = function () {
      var router = new Router();
      log(logPrefix, 'Initialising app.js');
    };

  return {
    init: init
  };
});