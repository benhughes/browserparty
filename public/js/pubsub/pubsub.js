define([
	// These are path alias that we configured in our bootstrap
	'jquery',     // lib/jquery/jquery-1.8.2.min
	'log'
], function($, log){
	var logPrefix = "pubsub/pubsub",
        list = [];

    return {
		subscribe: function (id, func) {
            //don't perform this function if
            // 1: the function passed is not a function
            // 2: the id passed is not a string or is an empty string
            // 3: if the function has already assigned o to this ID 
            if (typeof func !== "function" || (id === '' || typeof id !== "string") || this.has(id, func)){
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
            log(logPrefix, "publishing", id, "with the args", args);
            if(list && list[id]){
                log(logPrefix, "functions are suscribed to", id, "attempting to call those functions");
                methods = list[id].methods;

                for(var i=0, len = methods.length; i<len; i++){
                    methods[i].apply(methods[i], args);
                }                
            }else{
                log(logPrefix, "no functions are suscribed to", id);
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