define([
	'jquery',
	'pubsub/pubsub',
	'pubsub/pubsub'

], function ($, pubsub, pubsub2) {

	describe('Module :: pubsub', function () {
		var flag = false;
		beforeEach(function () {

		});
		afterEach(function () {
			pubsub.clearAll();
		});

		describe('pubsub is an object', function () {
			it('Should be an object', function () {
				expect(typeof pubsub).toBe('object');
			});
		});

		describe('pubsub.subscribe', function () {

			it('should add event related to the id', function () {
				var testFunction = function () {
						return "I'm a test";
					};
				pubsub.subscribe('test', testFunction);

				expect(pubsub.has('test', testFunction)).toBe(true);

			});
			it('should not add anything other then a function', function () {
				var testString = "I'm a test string",
					testObject = {object: "test"},
					testArray = ['test', 'array'];

				pubsub.subscribe('test', testString);
				expect(pubsub.has('test', testString)).toBe(false);

				pubsub.subscribe('test', testObject);
				expect(pubsub.has('test', testObject)).toBe(false);

				pubsub.subscribe('test', testArray);
				expect(pubsub.has('test', testArray)).toBe(false);

			});
			it('should not add anything if a string was not passed as the id', function () {
				var testID = [],
					testFunction = function () {
						return "testing testing 123";
					};
				pubsub.subscribe(testID, testFunction);
				expect(pubsub.has(testID, testFunction)).toBe(false);
			});
			it('should not add anything if an empty string was passed as the id', function () {
				var testID = "",
					testFunction = function () {
						return "testing testing 123";
					};
				pubsub.subscribe(testID, testFunction);
				expect(pubsub.has(testID, testFunction)).toBe(false);
			});
			it('Should add more then one event for a single id', function () {
				var testFunction = function () {
						return "I'm a test";
					},
					testFunction2 = function () {
						return "I'm a second test";
					};
				pubsub.subscribe('test', testFunction);
				pubsub.subscribe('test', testFunction2);

				expect(pubsub.has('test', testFunction)).toBe(true);
				expect(pubsub.has('test', testFunction2)).toBe(true);
			});
			it('Should not add the same function to the same id more than once', function () {
				var testFunction = {
					one: function () {
						return "I'm a test";
					}
				};

				spyOn(testFunction, 'one').andCallThrough();

				pubsub.subscribe('subscribeTest', testFunction.one);
				pubsub.subscribe('subscribeTest', testFunction.one);

				pubsub.publish('subscribeTest', "test");

				expect(testFunction.one.callCount).toBe(1);
			});

		});
		describe('pubsub.has', function () {
			it('should return return true when passed a function that has already been added to the same id', function () {
				var testFunction = function () {
						return "I'm a test";
					};
				pubsub.subscribe('hasTest', testFunction);
				expect(pubsub.has('hasTest', testFunction)).toBe(true);
			});
			it('should return return false when passed a function that has already been added to a different id', function () {
				var testFunction = function () {
						return "I'm a test";
					};
				pubsub.subscribe('hasTest', testFunction);
				expect(pubsub.has('hasTest2', testFunction)).toBe(false);
			});
			it('should return return false when there the function has not been added', function () {
				var testFunction = function () {
						return "I'm a test";
					};
				expect(pubsub.has('hasTest2', testFunction)).toBe(false);
			});

		});
		describe('pubsub.clearAll', function () {
			it('should clear every function suscribed', function () {
				var testFunction = function () {
						return "I'm a test";
					},
					testFunction2 = function () {
						return "I'm a second test";
					};
				pubsub.subscribe('clearAllTest', testFunction);
				pubsub.subscribe('clearAllTest', testFunction2);

				pubsub.clearAll();

				expect(pubsub.has('test', testFunction)).toBe(false);
				expect(pubsub.has('test', testFunction2)).toBe(false);
			});
		});
		describe('pubsub.publish', function () {
			it('should call functions that have been registered with the passed id', function () {
				var testFunction = {
					one: function () {
						return "I'm a test";
					},
					two: function () {
						return "I'm a second test";
					},
					three: function () {
						return "I'm a third test";
					}
				};

				spyOn(testFunction, 'one').andCallThrough();
				spyOn(testFunction, 'two').andCallThrough();
				spyOn(testFunction, 'three').andCallThrough();

				pubsub.subscribe('publishTest', testFunction.one);
				pubsub.subscribe('publishTest', testFunction.two);
				pubsub.subscribe('publishTest', testFunction.three);

				pubsub.publish('publishTest');

				expect(testFunction.one).toHaveBeenCalled();
				expect(testFunction.two).toHaveBeenCalled();
				expect(testFunction.three).toHaveBeenCalled();
			});
			it('should not call functions that have been registered with a different id', function () {
				var testFunction = {
					one: function () {
						return "I'm a test";
					},
					two: function () {
						return "I'm a second test";
					},
					three: function () {
						return "I'm a third test";
					}
				};

				spyOn(testFunction, 'one').andCallThrough();
				spyOn(testFunction, 'two').andCallThrough();
				spyOn(testFunction, 'three').andCallThrough();

				pubsub.subscribe('publishTest2', testFunction.one);
				pubsub.subscribe('publishTest2', testFunction.two);
				pubsub.subscribe('publishTest2', testFunction.three);

				pubsub.publish('publishTest');

				expect(testFunction.one).not.toHaveBeenCalled();
				expect(testFunction.two).not.toHaveBeenCalled();
				expect(testFunction.three).not.toHaveBeenCalled();
			});
			it('should pass the arguments to the function', function () {
				var testFunction = {
						one: function (x, y, z) {
							return [x, y, z];
						}
					},
					passedArgs = [2, 4, 5, 8];


				spyOn(testFunction, 'one').andCallThrough();

				pubsub.subscribe('publishTest', testFunction.one);

				pubsub.publish('publishTest', passedArgs[0], passedArgs[1], passedArgs[2], passedArgs[3]);

				expect(testFunction.one.argsForCall[0][0]).toBe(passedArgs[0]);
				expect(testFunction.one.argsForCall[0][1]).toBe(passedArgs[1]);
				expect(testFunction.one.argsForCall[0][2]).toBe(passedArgs[2]);
				expect(testFunction.one.argsForCall[0][3]).toBe(passedArgs[3]);
			});
			it('should publish functions over two instances of pubsub', function () {
				var testFunction = {
						one: function () {
							return "pubsub test 1";
						},
						two: function () {
							return "pubsub test 2";
						}
					},
					flag1 = false,
					flag2 = false,
					pubSubOne,
					punSubTwo;


				spyOn(testFunction, 'one').andCallThrough();
				spyOn(testFunction, 'two').andCallThrough();

				//pubsub2 is going to register the functions
				pubsub2.subscribe('publishTest', testFunction.one);
				pubsub2.subscribe('publishTest', testFunction.two);

				//pubsub is going to call them
				pubsub.publish('publishTest');


				expect(testFunction.one).toHaveBeenCalled();
				expect(testFunction.two).toHaveBeenCalled();


			});
		});
	});
});

