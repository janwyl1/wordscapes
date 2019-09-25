const express = require('express');
const solver = require('./solver.js');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; 

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.get('/', (req, res, next) => { 
	res.render('form');
});

app.post('/', (req, res) => {
	solver.setAllowed(req.body.inptAllowed.toLowerCase());
	solver.setUnsolved(req.body.inptUnsolved.toLowerCase());
	const results = solver.findWords();
	res.render('results', { results: results});
});

app.listen(port, () => console.log(`Listening on port ${port}!`));