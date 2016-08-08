var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var models = require('./models');
var router = require('./routes/wiki');


// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));

app.use('/wiki', router);


models.User.sync({ force: true })
.then(function(){
	return models.Page.sync({ force: false })
})
.then(function(){
	app.listen(3001, function(){
		console.log('server listening to 3001');
	});
});

  
