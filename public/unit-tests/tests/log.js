define(['log'],
	function (log) {

		describe('Module :: log', function () {
			it('should call console log', function () {
				spyOn(console, 'log');
				log('Test', 'again');
				expect(console.log).toHaveBeenCalled();
			});
			it('should pass args to console.log while editing the first arg and adding a separator afterward', function () {
				var test1 = "js",
					test2 = "something",
					test3 = "nothing";

				spyOn(console, 'log');
				log(test1, test2, test3);
				expect(console.log.argsForCall[console.log.argsForCall.length - 1][0]).not.toBe(test1);
				expect(console.log.argsForCall[console.log.argsForCall.length - 1][1]).not.toBe(test2);
				expect(console.log.argsForCall[console.log.argsForCall.length - 1][2]).toBe(test2);
				expect(console.log.argsForCall[console.log.argsForCall.length - 1][3]).toBe(test3);
				expect(console.log.argsForCall[console.log.argsForCall.length - 1].length > 3).toBe(true);
			});
			it('should change the first arg to a string', function () {
				var test1 = "js",
					test2 = "something",
					test3 = "nothing";

				spyOn(console, 'log');
				log(['array'], test1, test2, test3);
				expect(typeof console.log.argsForCall[console.log.argsForCall.length - 1][0]).toBe('string');
				log({"object": "test"}, test1, test2, test3);
				expect(typeof console.log.argsForCall[console.log.argsForCall.length - 1][0]).toBe('string');
				log(1234, test1, test2, test3);
				expect(typeof console.log.argsForCall[console.log.argsForCall.length - 1][0]).toBe('string');

			});
		});
	}
	);

