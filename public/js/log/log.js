define(function(){
	var history = []; 
	return function(){
			history = history || [];   // store logs to an array for reference
			history.push(arguments);
			if(console){
			    var log = Function.prototype.bind.call(console.log, console);
				log.apply(console, arguments);
			}
		} 
	
});

