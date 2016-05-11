
var express = require('express');
var Post = require('../models/post.js');

module.exports = function(){

	var router = express.Router();

	router.route('/posts')
		.get( getPosts )
		.post( createPost );

	router.route('/posts/:post')
		.get( getPosts );

	return router;

};

function createPost(req, res){
	var post = Post.create({
		title: req.body.title,
		content: req.body.content
	})
	.then(function(){
		res.redirect('/posts/' + post.title);
	})
}

function getPosts(req, res){
	Post.find()
	.then(function( posts ){
		res.render('blog-read', { posts: posts} );
	});
}

