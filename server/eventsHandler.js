var eventsHandler = (function () {
    'use strict';
    var pubSub = require('../public/js/pubSub/pubSub'),
        log = require('../public/js/log/log'),
        appData = require('./appData'),
        _ = require('underscore')._,
        socketListener = require('./socketListener'),
        logPrefix = 'connectionMessenger';

    return {
        initialise: function () {
            log(logPrefix, 'initialising...');
            this.setUpListeners();

        },
        setUpListeners: function () {
            log(logPrefix, 'setting up listeners');
            _.bindAll(this, 'newConnection', 'collectionAdded', 'handleDisconnection');
            pubSub.subscribe('server#clientUpdate', this.newConnection);
            pubSub.subscribe('server#disconnect', this.handleDisconnection);
            appData.connections.bind('add', this.collectionAdded);

        },
        newConnection: function (data, socket) {
            log(logPrefix, 'receiving new connection', data);
            var eventData = {
                type: 'connection',
                text: "New connection from " + socket.id
            };
            appData.events.add(eventData);
        },
        collectionAdded: function () {
            log(logPrefix, 'new connection added sending data to browsers');
            this.sendCurrentEvents();
        },
        sendCurrentEvents: function () {
            log(logPrefix, 'sending current events data to all connections');
            socketListener.socketEmit('eventsUpdate', appData.events.toJSON());
        },
        handleDisconnection: function (data, socket) {
            log(logPrefix, 'handling socket disconnection for', socket.id);
            var eventData = {
                type: 'disconnection',
                text: socket.id + ' has disconnected'
            };
            appData.events.add(eventData);
            this.sendCurrentEvents();
        }
    };
}());

eventsHandler.initialise();

module.exports = eventsHandler;

