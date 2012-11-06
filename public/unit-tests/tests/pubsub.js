describe('Module :: pubsub', function () {
	var flag = false,
		pubsub = "";

	beforeEach(function () {
		var that = this;
		require(['pubsub/pubsub'], function(_pubsub) {
			console.log(_pubsub);
			pubsub = _pubsub;
			flag = true;
		});

		waitsFor(function() {
	      return flag;
	    });
	})
	afterEach(function(){

	})

	describe('pubsub is an object', function(){
		console.log(pubsub)
		it('Should be an object', function(){
			expect(typeof pubsub).toBe('object');
		})
	})
		
})	