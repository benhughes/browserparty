(function () {
    'use strict';

    var moduleName = function (_, Backbone, log) {
        var logPrefix = "model/clientModel",
			ConnectionModel = Backbone.Model.extend({
				defaults: {
					type: 'unknown',
					userAgent: ''
				},
                initialize: function () {
                    log(logPrefix, "initialising");
                    _.bindAll(this, 'defineType');
                    this.defineType();
                    this.on("change:userAgent", this.defineType);
                },
                defineType: function () {
                    var userAgent = this.get('userAgent'),
                        newType= 'unknown',
                        typeSettings = [
                            {
                                name: "Chrome Browser",
                                test: function (passedUserAgent) {
                                    return passedUserAgent.toLowerCase().indexOf('chrome') > -1;
                                }
                            },
                            {
                                name: "Safari Browser",
                                test: function (passedUserAgent) {
                                    return passedUserAgent.toLowerCase().indexOf('chrome') === -1 && passedUserAgent.toLowerCase().indexOf('safari') > -1;;
                                }
                            }
                        ];
                    log(logPrefix, 'userAgent changed');


                    for (var i = 0; i < typeSettings.length; i++) {
                        if (typeSettings[i].test(userAgent)) {
                            newType = typeSettings[i].name;
                        }
                    }
                    this.set('type', newType);
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