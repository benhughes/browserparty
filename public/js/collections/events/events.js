(function () {
    'use strict';

    var events = function (_, Backbone, log, pubSub, EventModel) {
        var logPrefix = "collections/events",
            EventsCollection = Backbone.Collection.extend({
                model: EventModel,
                initialize: function () {
                    log(logPrefix, "initalising...");
                    this.setUpListeners();
                },
                setUpListeners: function () {
                    log(logPrefix, "setting up listeners");
                    _.bindAll(this, 'updateReceived');
                    pubSub.subscribe('server#eventsUpdate', this.updateReceived);
                },
                updateReceived: function (updateData) {
                    log(logPrefix, 'update recieved', updateData);
                    log(logPrefix, this.reset(updateData, {silent: false}));
                }
            });


        return EventsCollection;
    };
    //sets up for require to be able to use file in browser and commonjs to use it on serevr
    if (typeof define === "function" && define.amd) {
        define(['underscore', 'backbone', 'log', 'pubSub/pubSub', 'models/event/event'], events);
    } else if (module && typeof module.exports !== 'undefined') {
        module.exports = events(require('underscore')._, require('backbone'), require('../../log/log'), require('../../pubSub/pubSub'), require('../../models/event/event'));
    }

}());