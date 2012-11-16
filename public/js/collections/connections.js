define([
	'underscore',
	'backbone',
	'models/connections'
], function (_, Backbone, ConnectionModel) {
  var ProjectCollection = Backbone.Collection.extend({
    model: ConnectionModel
  });
  return ProjectCollection;
});