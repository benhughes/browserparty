(function () {

	require.config({
		paths: {
			'jquery': 'lib/jquery/jquery-1.8.2.min',
			'underscore': 'lib/underscore/underscore',
			'backbone': 'lib/backbone/backbone',
			'socket': '../socket.io/socket.io',
			'text': 'lib/require/plugins/text',
			'log': '/shared/log/log',
			'pubSub': '/shared/pubSub/pubSub'
		},
		shim: {
			underscore: {
				exports: '_'
			},
			backbone: {
				deps: ["underscore", "jquery"],
				exports: "Backbone"
			},
			socket: {
				exports: "io"
			}
		}
	});

	require(
		['app'],
		function (app) {
			app.init();
		}
	);

}());