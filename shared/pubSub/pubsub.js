(function () {

  var pubSub = function (_, log) {
  	var logPrefix = "pubSub/pubSub",
      list = [];

    return {
  		subscribe: function (id, func) {
        //don't perform this function if
        // 1: the function passed is not a function
        // 2: the id passed is not a string or is an empty string
        // 3: if the function has already assigned o to this ID 
        if (typeof func !== "function" || (id === '' || typeof id !== "string") || this.has(id, func)) {
          return;
        }
        log(logPrefix, "subscribing ", func, "to ", id);
        if (!list || !list[id]) {
          list[id] = {id: id, methods: []};
        }
        list[id].methods.push(func);
      },
  		publish: function () {
        var methods,
          i,
          len,
          args = Array.prototype.slice.call(arguments),
          id = args.splice(0, 1); //get rid of the id from the args array
        log(logPrefix, "publishing", id, "with the args", args);
        if (list && list[id]) {
          log(logPrefix, "functions are suscribed to", id, "attempting to call those functions");
          methods = list[id].methods;
          len = methods.length;

          for (i = 0; i < len; i++) {
            methods[i].apply(methods[i], args);
          }
        } else {
          log(logPrefix, "no functions are suscribed to", id);
        }
      },
      remove: function (id, func) {

      },
      has: function (id, func) {
        return (typeof list[id] !== "undefined" && (_.indexOf(list[id].methods, func) > -1));
      },
      clearAll: function () {
        list = [];
      }
  	};
  }
    //sets up for require to be able to use file in browser and commonjs to use it on serevr
  if ( typeof define === "function" && define.amd ) {
    define( ['underscore', 'log'], pubSub);
  }else if (module && typeof module.exports !== 'undefined') {
    module.exports = pubSub(require('underscore')._, require('../log/log'));
  }

})();