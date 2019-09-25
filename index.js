!(function(){
	const solver = require('./solver.js');
	solver.setAllowed("eat");
	solver.setUnsolved("---");
	solver.findWords();
	console.log("Matches: ", solver.matches.length);
	console.log("Matches: ", solver.matches);
})();
