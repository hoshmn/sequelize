'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

var Page = models.Page;
var Users = models.Users;


router.get('/:pageName', function(req, res, next){
	var urlName = req.params.pageName;
	console.log(urlName);
	//res.redirect('/');
	Page.findOne({where: {urlTitle: urlName}})
	.then(function(result){
		res.json(result);
	})
	.catch(function(err){
		console.error(err);
	});
});

router.post('/', function(req, res, next){

	var page = Page.build({
    title: req.body.pageTitle,
    content: req.body.Content,
    status: req.body.status
  	});

  	page.save()
	.then(function(result){
		res.json(result);
	});


});


router.get('/add', function(req, res, next){


	res.render('addpage.html');

});


module.exports = router;
