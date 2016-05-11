# HTTP Server

- res.setHeader('field', val);
- res.getHeader('field');
- res.removeHeader('field');
- res.write()
- res.end()
- Node flushes all the headers that have been set after the first write on the response body. After that, you can't make changes.
- learn curl for fucks sake
```
var http = require('http');
var server = http.createServer(function(req, res){
	req.setEncoding('utf8'); //default is binary
	req.on('data', function(chunk){
		console.log('parsed', chunk);
	})
	req.on('end', function(){
		console.log('done parsing!!!');
		res.end();
	});
});
```

## File server

```
var http = require('http');
var parse = require('url');
var path = require('path');
var fs = require('fs');

var root = __dirname;

var server = http.createServer(function(req, res){
	var url = parse(req.url);
	var absPath = path.join(root, url.pathname);
	var stream = fs.createReadStream(absPath);
	stream.on('data', function(chunk){
		res.write(chunk);
	});
	stream.on('end', function(){
		res.end();
	});
})
// unsafe because the user can go to upper directories.

server.listen(3000);
```

Any ReadableStream can be piped into any WritableStream. http.req is a ReadableStream

var serveer = http.createServer(function(req, res){
	var url = parse(req.url);
	var absPath = path.join(root, url.pathname);
	var stream = fs.createReadStream(absPath);
	stream.pipe(res);
})


