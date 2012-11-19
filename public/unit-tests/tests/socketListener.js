define([
	'socket',
	'underscore',
	'jquery',
	'socketListener/socketListener'
], function (socket, _, $, socketListener) {

	describe('Module :: socketListener', function () {
		describe('.init', function () {
			it('should run when module is first run and set onConnect to be fired on connect', function () {
				var socketTest = socket.connect();
				expect(typeof socketTest.$events.connect).toBe('function');
				expect(socketTest.$events.connect).toBe(socketListener.onConnect);
			});
		});
		describe('.onConnect', function () {
			it('should run setUpListeners', function () {
				spyOn(socketListener, 'setUpListeners');
				socketListener.onConnect();
				expect(socketListener.setUpListeners).toHaveBeenCalled();
			});
		});
		describe('.setUpListeners', function () {
			it('should pass the index for each event to setSocketListener', function () {
				spyOn(socketListener, 'setSocketListener');
				socketListener.addEvent('test', 'testMessage');
				socketListener.setUpListeners();
				expect(socketListener.setSocketListener).toHaveBeenCalled();
				expect(socketListener.setSocketListener.argsForCall[socketListener.setSocketListener.argsForCall.length - 1][0]).toBe('test');
			});
		});
		describe('.setSocketListener', function () {
			it('should register an event with socket', function () {
				var socketTest = socket.connect();
				expect(typeof socketTest.$events.test2).toBe('undefined');
				socketListener.setSocketListener('test2');
				expect(typeof socketTest.$events.test2).toBe('function');
			});
		});
	});
});

