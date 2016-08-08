'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

var Page = models.Page;
var Users = models.Users;


router.get('/', function(req, res, next){
	res.redirect('/');
});

router.post('/', function(req, res, next){

	var page = Page.build({
    title: req.body.pageTitle,
    urlTitle: req.body.pageTitle,
    content: req.body.Content,
    status: req.body.status
  	});

  	page.save()
	.then(function(){
		res.redirect('/');
	});


});

router.get('/add', function(req, res, next){


	res.render('addpage.html');

});


module.exports = router;
