require.config({
  baseUrl: '/js/',
  paths: {
    'jquery': 'lib/jquery/jquery-1.8.2.min',
    'underscore': 'lib/underscore/underscore',
    'backbone': 'lib/backbone/backbone',
    'socket': '../socket.io/socket.io',
    'text': 'lib/require/plugins/text',
    'log': 'log/log',
    //Jasmine
    'jasmine': '../unit-tests/jasmine-1.2.0/jasmine',
    'jasmine-html': '../unit-tests/jasmine-1.2.0/jasmine-html'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    }
  }
});

require(['underscore', 'jquery', 'jasmine-html'], function (_, $, jasmine) {
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;
  var htmlReporter = new jasmine.HtmlReporter();
  jasmineEnv.addReporter(htmlReporter);
  jasmineEnv.specFilter = function (spec) {
    return htmlReporter.specFilter(spec);
  };
  var specs = [];
  specs.push('../unit-tests/tests/pubSub');
  $(function () {
    require(specs, function () {
      jasmineEnv.execute();
    });
  });
});