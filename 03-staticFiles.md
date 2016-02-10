# Static Files

Serve a basic html, css and JS for the frontent of a tick-tack-toe.

This is how the usual application file structure looks like:
```
node_modules
lib
public
	js
	css
```
node_modules is where we keep our npm dependencies.

## Static server

```
var http = require('http');
var fs = require('fs');
var path = require('path'); 
var mime = require('mime'); //npm!

var cache = {};

function sendFile(response, filePath, fileContents){
	response.writeHead( 200, {'Content-Type': mime.lookup(path.basename(filePath))})
	response.end(fileContents)
}

function serveStatic(response, cache, absPath){
	fs.readFile(absPath, function(err, data){
		sendFile(response, absPath, data);
	})

}

var server = http.createServer(function(req, res){
	if (request.url == '/') {
		filePath = 'public/index.html';
	}
	else {
		filePath = 'public' + req.url;
	}
	var relPath = './' + filePath;
	serveStatic(res, cache, relPath);
})

```

Don't forget to listen for requests

```
server.listen(3000, function(){
	console.log('server listening on port %s', 3000);
});
```

We will be caching files, remember every request shares the same memory space.

```
if (cache[absPath]){
	sendFile(response, absPath, cache[absPath]); 
} 
else {
	cache[absPath] = data;
}
```

