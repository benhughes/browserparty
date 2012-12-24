(function () {
    'use strict';

    var eventModel = function (_, Backbone, log) {
        var logPrefix = "model/event",
            EventModel = Backbone.Model.extend({
                defaults: {
                    type: 'event',
                    text: ''
                },
                initialize: function () {
                    log(logPrefix, "initialising");
                }
            });
        return EventModel;
    };
    //sets up for require to be able to use file in browser and commonjs to use it on serevr
    if (typeof define === "function" && define.amd) {
        define(['underscore', 'backbone', 'log'], eventModel);
    } else if (module && typeof module.exports !== 'undefined') {
        module.exports = eventModel(require('underscore')._, require('backbone'), require('../../log/log'));
    }

}());