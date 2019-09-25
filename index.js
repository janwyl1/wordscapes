(function(){
	const solver = require('./solver.js');
	solver.setAllowed("eat");
	solver.setUnsolved("---");
	solver.findWords();
	console.log("", solver.matches.length, " matches: ", solver.matches);
})();
