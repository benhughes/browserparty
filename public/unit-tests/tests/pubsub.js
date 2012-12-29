define([
	'jquery',
	'pubSub',
	'pubSub'

], function ($, pubSub, pubSub2) {

	describe('Module :: pubSub', function () {
		var flag = false;
		beforeEach(function () {

		});
		afterEach(function () {
			pubSub.clearAll();
		});

		describe('pubSub is an object', function () {
			it('Should be an object', function () {
				expect(typeof pubSub).toBe('object');
			});
		});

		describe('pubSub.subscribe', function () {

			it('should add event related to the id', function () {
				var testFunction = function () {
						return "I'm a test";
					};
				pubSub.subscribe('test', testFunction);

				expect(pubSub.has('test', testFunction)).toBe(true);

			});
			it('should not add anything other then a function', function () {
				var testString = "I'm a test string",
					testObject = {object: "test"},
					testArray = ['test', 'array'];

				pubSub.subscribe('test', testString);
				expect(pubSub.has('test', testString)).toBe(false);

				pubSub.subscribe('test', testObject);
				expect(pubSub.has('test', testObject)).toBe(false);

				pubSub.subscribe('test', testArray);
				expect(pubSub.has('test', testArray)).toBe(false);

			});
			it('should not add anything if a string was not passed as the id', function () {
				var testID = [],
					testFunction = function () {
						return "testing testing 123";
					};
				pubSub.subscribe(testID, testFunction);
				expect(pubSub.has(testID, testFunction)).toBe(false);
			});
			it('should not add anything if an empty string was passed as the id', function () {
				var testID = "",
					testFunction = function () {
						return "testing testing 123";
					};
				pubSub.subscribe(testID, testFunction);
				expect(pubSub.has(testID, testFunction)).toBe(false);
			});
			it('Should add more then one event for a single id', function () {
				var testFunction = function () {
						return "I'm a test";
					},
					testFunction2 = function () {
						return "I'm a second test";
					};
				pubSub.subscribe('test', testFunction);
				pubSub.subscribe('test', testFunction2);

				expect(pubSub.has('test', testFunction)).toBe(true);
				expect(pubSub.has('test', testFunction2)).toBe(true);
			});
			it('Should not add the same function to the same id more than once', function () {
				var testFunction = {
					one: function () {
						return "I'm a test";
					}
				};

				spyOn(testFunction, 'one').andCallThrough();

				pubSub.subscribe('subscribeTest', testFunction.one);
				pubSub.subscribe('subscribeTest', testFunction.one);

				pubSub.publish('subscribeTest', "test");

				expect(testFunction.one.callCount).toBe(1);
			});

		});
		describe('pubSub.has', function () {
			it('should return return true when passed a function that has already been added to the same id', function () {
				var testFunction = function () {
						return "I'm a test";
					};
				pubSub.subscribe('hasTest', testFunction);
				expect(pubSub.has('hasTest', testFunction)).toBe(true);
			});
			it('should return return false when passed a function that has already been added to a different id', function () {
				var testFunction = function () {
						return "I'm a test";
					};
				pubSub.subscribe('hasTest', testFunction);
				expect(pubSub.has('hasTest2', testFunction)).toBe(false);
			});
			it('should return return false when there the function has not been added', function () {
				var testFunction = function () {
						return "I'm a test";
					};
				expect(pubSub.has('hasTest2', testFunction)).toBe(false);
			});

		});
		describe('pubSub.clearAll', function () {
			it('should clear every function suscribed', function () {
				var testFunction = function () {
						return "I'm a test";
					},
					testFunction2 = function () {
						return "I'm a second test";
					};
				pubSub.subscribe('clearAllTest', testFunction);
				pubSub.subscribe('clearAllTest', testFunction2);

				pubSub.clearAll();

				expect(pubSub.has('test', testFunction)).toBe(false);
				expect(pubSub.has('test', testFunction2)).toBe(false);
			});
		});
		describe('pubSub.publish', function () {
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

				pubSub.subscribe('publishTest', testFunction.one);
				pubSub.subscribe('publishTest', testFunction.two);
				pubSub.subscribe('publishTest', testFunction.three);

				pubSub.publish('publishTest');

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

				pubSub.subscribe('publishTest2', testFunction.one);
				pubSub.subscribe('publishTest2', testFunction.two);
				pubSub.subscribe('publishTest2', testFunction.three);

				pubSub.publish('publishTest');

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

				pubSub.subscribe('publishTest', testFunction.one);

				pubSub.publish('publishTest', passedArgs[0], passedArgs[1], passedArgs[2], passedArgs[3]);

				expect(testFunction.one.argsForCall[0][0]).toBe(passedArgs[0]);
				expect(testFunction.one.argsForCall[0][1]).toBe(passedArgs[1]);
				expect(testFunction.one.argsForCall[0][2]).toBe(passedArgs[2]);
				expect(testFunction.one.argsForCall[0][3]).toBe(passedArgs[3]);
			});
			it('should publish functions over two instances of pubSub', function () {
				var testFunction = {
						one: function () {
							return "pubSub test 1";
						},
						two: function () {
							return "pubSub test 2";
						}
					},
					flag1 = false,
					flag2 = false,
					pubSubOne,
					punSubTwo;


				spyOn(testFunction, 'one').andCallThrough();
				spyOn(testFunction, 'two').andCallThrough();

				//pubSub2 is going to register the functions
				pubSub2.subscribe('publishTest', testFunction.one);
				pubSub2.subscribe('publishTest', testFunction.two);

				//pubSub is going to call them
				pubSub.publish('publishTest');


				expect(testFunction.one).toHaveBeenCalled();
				expect(testFunction.two).toHaveBeenCalled();


			});
		});
	});
});

