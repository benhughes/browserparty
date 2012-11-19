define(function () {
	var history = [];
	return function () {
		var args = Array.prototype.slice.call(arguments);
		args.splice(1, 0, "--");
		args[0] = "[" + args[0] + "]";
		history = history || [];   // store logs to an array for reference
		history.push(args);

		if (console) {
			var log = Function.prototype.bind.call(console.log, console);
			log.apply(console, args);
		}
	};
});

