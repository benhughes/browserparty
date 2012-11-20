define([
	'collections/connections/connections',
	'pubSub/pubSub'
],
	function (ConnectionCollection, pubSub) {
		var connectionCollection;
		beforeEach(function () {
			connectionCollection = new ConnectionCollection();

		});

		describe('Module :: collections/connections', function () {
			describe('.setUpListeners', function () {
				it('should suscribe updateReceived to pubSub id server#browserUpdate', function () {
					expect(pubSub.has('server#browserUpdate', connectionCollection.updateReceived)).toBe(true);
				});
			});
			describe('.updateReceived', function () {
				it('when called should add data to the collection', function () {
					var testData = {id: "blahblahblahblah12345"};
					connectionCollection.updateReceived(testData);
					debugger;
					expect(connectionCollection.models[0].id).toBe(testData.id);
				});
			});
		});
	}
	);

