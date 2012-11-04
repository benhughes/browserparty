define(['underscore', 'backbone', 'jquery', 'socket'], function(_, backbone, $, socket) {
  
	var iosocket = io.connect()
		init = function(){


			iosocket.on('connect', function () {
		       	var browserInfo = {
		      		userAgent: navigator.userAgent
		       	}
		       	iosocket.emit('browserInfo', browserInfo)
		       	iosocket.emit('test', {message: "this is a test"})
		        console.log('connected');
		 
		        iosocket.on('message', function(message) {
		            console.log(message);
		        });
		        iosocket.on('test', function(message) {
		            console.log(message);
		        });
		        iosocket.on('disconnect', function() {
		            console.log('disconnected');
		        });
	    	});
		}



  return {
    init: init
  };
});