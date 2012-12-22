
var SingleSocketListener = function () {
    var _ = require('underscore')._,
        log = require('../public/js/log/log'),
        pubSub = require('../public/js/pubSub/pubSub'),
        logPrefix = 'singleSocketListener',
        socket,
        events = require('../shared/sharedMessages.json');



    return {
        initialise: function (passedSocket) {
            if (!passedSocket || !_.isObject(passedSocket)) {
                log(logPrefix, 'passedSocket is not an object it is ' + typeof passedSocket + ' throwing error');
                throw new Error('Passed Server is not an object');
            }
            socket = passedSocket;
            log(logPrefix, 'initialising singleSocketlistener');
            log(logPrefix, 'registered events are ', events);
            this.setUpListeners();
        },
        setUpListeners: function () {
            //set up disconnect listener
            log(logPrefix, "setting up disconnect server for ", socket.id);
            _.bindAll(this, 'socketDisconnected');
            socket.on('disconnect', this.socketDisconnected);

            //setting up listeners for all shared messages
            _.each(events, function (element, index, list) {
                this.setSocketListener(index);
            }, this);
        },
        setSocketListener: function (eventType) {
            log(logPrefix, 'Setting up socketio to listen on', eventType);
            socket.on(eventType, function (data) {
                log(logPrefix, 'recieved', eventType, ":", data);
                pubSub.publish(events[eventType], data, socket);
            });
        },
        socketDisconnected: function (data) {
            log(logPrefix, 'Socket', socket.id, 'disconnection detected');
            pubSub.publish('server#disconnect', data, socket);

        }
    };

};

module.exports = SingleSocketListener;

// io.sockets.on('connection', function (socket) {
//     console.log('A socket connected!', socket.id);
//     socket.on('message', function (msg) {
//         console.log('Message Received: ', msg);
//         socket.broadcast.emit('message', msg);
//     });
//     socket.emit('clientUpdate', {
//         id: socket.id
//     });
//     socket.on('clientUpdate', function (data) {
//         console.log('Client Update recieved', data);
//         socket.emit('clientUpdate', data);
//         socket.broadcast.emit('connectonsUpdate', _.extend(data, {id: socket.id}));
//     });
//     socket.on('test', function (msg) {
//         console.log('Message Received: ', msg);
//         socket.broadcast.emit('message', msg.message);
//     });
//     socket.on('browserInfo', function (info) {
//         socket.broadcast.emit('message', info.userAgent);
//     });
// });
