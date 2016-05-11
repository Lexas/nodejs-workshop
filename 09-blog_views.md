# Setting up views for the blog

The public folder in here contains the view of a basic blog application, but some parts are meant to be dynamic, we're going to setup an express application that can parse a [pug](http://jade-lang.com/) template for those views.

This is the basic express application:

```
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.listen(3000, function(){
	console.log('There ya go!');
});
```

But we don't have the routes yet, let's learn a cool trick: Express also provides a Route object which can be appended to any application as a middleware, this comes with the benefit that you can have a separated module for your routes, plus some syntactic sugar.

```
var express = require('express');

module.exports = function(){

	var router = express.Router();
	var route = router.route;

	route('/posts')
		.get(function(req, res){
			res.render('blog-read');
		});

	route('/posts/:post')
		.get(function(){
			res.render('entry-read');
		});

	return router;

};
```

## Pug 

Pug (aka Jade) is a popular template engine with a lot of syntactic sugar, it uses identation as a way to nest elements, can use CSS selectors to define nodes and much more. To get more information, refer to the [jade sintax reference](http://jade-lang.com/reference/).

Here's what the blog page would look like in Pug:

```
doctype html

html
	head
		meta(charset="utf-8")
		title My Express Blog - Read
	body
		nav: ul
			li:a(href="/blog") Blog
			li:a(href="/write") Write
			li:a(href="/login") login
	article
		header: h1 Title 1
		p	lorem ipsum
```

But the main layout and navigation bar will be the same among all the pages, fortunately, Pug can separat this script into reusable pieces:

layout.jade
```
doctype html

html
	head
		meta(charset="utf-8")
		title #{title || 'My Express Blog'}
	body
		nav: ul
			li:a(href="/blog") Blog
			li:a(href="/write") Write
			li:a(href="/login") login
	block content
```

blog-read.jade
```
extends ./layout.jade

block content
	article
		header: h1 Title 1
		p	lorem ipsum

```
