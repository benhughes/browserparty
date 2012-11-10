define([
	// These are path alias that we configured in our bootstrap
	'jquery',     // lib/jquery/jquery-1.8.2.min
	'log'
], function($, log){
	var logPrefix = "",
        list = [],
		callbacks = jQuery.Callbacks();
	return {
		subscribe: function (id, func) {
            if (typeof func !== "function" || typeof id !== "string"){
                return;
            }          
            log(logPrefix, "subscribing ", func, "to ", id);
            if(!list || !list[id]){
                list[id] = {id: id, methods: []};
            }
            list[id].methods.push(func);
            log(list);         
        },
		publish: function (id) {
            var methods,
                args = Array.prototype.slice.call(arguments);

            args.reverse().pop(); //get rid of the id from the args array
            args.reverse();

            if(list && list[id]){
                methods = list[id].methods;

                for(var i=0, len = methods.length; i<len; i++){
                    methods[i].apply(methods[i], args);
                }
                
            }
        },
        remove: function (id, func) {

        },
        has: function (id, func) {
            return (typeof list[id] !== "undefined" && ($.inArray(func, list[id].methods) > -1));
        },
        clearAll: function () {
            list = [];
        }
	};
});

/*

var topics = {};

jQuery.Topic = function( id ) {
    var callbacks,
        method,
        topic = id && topics[ id ];
    if ( !topic ) {
        callbacks = jQuery.Callbacks();
        topic = {
            publish: callbacks.fire,
            subscribe: callbacks.add,
            unsubscribe: callbacks.remove
        };
        if ( id ) {
            topics[ id ] = topic;
        }
    }
    return topic;
};
This can then be used by parts of your application to publish and subscribe to events of interest quite easily:

// Subscribers
$.Topic( "mailArrived" ).subscribe( fn1 );
$.Topic( "mailArrived" ).subscribe( fn2 );
$.Topic( "mailSent" ).subscribe( fn1 );

// Publisher
$.Topic( "mailArrived" ).publish( "hello world!" );
$.Topic( "mailSent" ).publish( "woo! mail!" );

// Here, "hello world!" gets pushed to fn1 and fn2
// when the "mailArrived" notification is published
// with "woo! mail!" also being pushed to fn1 when
// the "mailSent" notification is published. 


//output:
//hello world!
//fn2 says: hello world!
//woo! mail!


*/