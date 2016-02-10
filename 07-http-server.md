
- the request headers are interpreted before the callback executes, while the request body is not parsed until the callback has been fired.
- res.setHeader('field', val);
- res.getHeader('field');
- res.removeHeader('field');
- how to get the request headers?
- res.write()
- res.end()
- Node flushes all the headers that have been set after the first write on the response body. After that, you can't make changes.
- res.statusCode can be set before writes.
- learn curl for fucks sake

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

- setting content-length could speed up responses, the body can be  constructer ahead of time in memory, so Node disables its chunked encoding. 
- Buffer.byteLength('asdfasdf');
- Core modules: url, fs, util, path, http, querystring

- make a file server:

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

server.listen(3000);

// unsafe because the user can go to upper directories.

Any ReadableStream can be piped into any WritableStream. http.req is a ReadableStream

var serveer = http.createServer(function(req, res){
	var url = parse(req.url);
	var absPath = path.join(root, url.pathname);
	var stream = fs.createReadStream(absPath);
	stream.pipe(res);
})


