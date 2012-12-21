(function () {
    'use strict';

    var moduleName = function (_, Backbone, log) {
        var logPrefix = "model/clientModel",
			ConnectionModel = Backbone.Model.extend({
				defaults: {
					type: 'unknown',
					userAgent: ''
				}
			});
        return ConnectionModel;
    };
    //sets up for require to be able to use file in browser and commonjs to use it on serevr
    if (typeof define === "function" && define.amd) {
        define(['underscore', 'backbone', 'log'], moduleName);
    } else if (module && typeof module.exports !== 'undefined') {
        module.exports = moduleName(require('underscore')._, require('backbone'), require('../../log/log'));
    }

}());