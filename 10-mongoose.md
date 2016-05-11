# Mongoose

[Mongoose](http://mongoosejs.com/) is an ODM that abstracts the functionality of the mongo-db driver and helps us create Schemas for each collection.

```
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/example');

var Schema = mongoose.Schema;

var Example = new Schema({
	project: String,
	description: String
});

mongoose.model('example', Example);
```

Let's make a schema for a post following the previous example:

```
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Post = new Schema({
	title: String,
	content: String
});

module.exports = mongoose.model('Post', Post);
```

Now we can import this module to the consumer scripts. Here's how we would create a new blog post from an endpoint:

```
var express = require('express');
var Post = require('./models/post.js');

module.exports = function(){

	var router = express.Router();
	var route = router.route;

	route('/posts')
		.get(function(req, res){
			res.render('blog-read');
		})
		.post( createPost );

	route('/posts/:post')
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
	Post.findAll()
	.then(function( posts ){
		res.render( { globals:  posts });
	});
}

```

One more thing, when you start the mongoose connection, you have to wait untill it's open to start receiveing requests, it's also convenient to add an error handler. This goes in the main app script and is called only once.

```
var db = require('mongoose');
db.connect('mongodb://localhost/test');

db.on('error', functin( error ){ console.error('connection error: %s', error)});

db.once('open', function() {
 	app.listen(3000, function(){ console.log(' There Ya Go! '); }); 
});
```





