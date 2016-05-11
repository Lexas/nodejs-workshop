# Getting Started with Express

Express is a framework that helps us build HTTP servers that run on Node.js. It also provides ways to integrate common functionality easily. 

The express module exposes a constructor function which returns an "application" object which is your http server. This is how an express app starts:

```
var express = require('express');
var app = express();

app.listen(3000, function(){
	console.log('There ya go!');
});
```

Instead of a callback, express needs to be given route handlers as follows:

```
app.get('/', function( req, res ){
	res.send('Hello Nearsoft!');
});
```

Besides of the routes, you can give middlewares to be executed before matching a route:
```
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
```
*Note:* Order Matters

## Static

Express also exposes a static server that can be applied as a middleware. The constructor receives the directory in which to look for public files: 

```
app.use(express.static('public'));
```

## Views

The view engine allows us to dinamically generate html on the backend, it is configured using the app.set() call. A variety of template engines can be attached to express, it only needs to return the parser function which gets the template and local variables. When the App is set with a view engine, it can use the res.render() call in order to pass the given template name to the parser function.

```
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
```

