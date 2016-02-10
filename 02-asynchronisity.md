# Asynchronisity

```
var fs = require('fs');

fs.readFile('./resource.json', function (err, data){
	console.log(data);
});
```

## HTTP Server Example

In node, your application is the server.

```
var http = require('http');
http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(3000);

console.log('listening on port 3000');
```

## Event listener

```
var http = require('http');
var server = http.createServer();

server.on('request', respond);

function respond(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}

server.listen(3000);
console.log('server running at http://localhost:3000');
```

## Streaming a file
```
var http = require('http');
var fs = require('fs');

http.createServer().listen(3000);

function respond(req, res){
	res.writeHead(200, {'Content-Type': 'image/png'});
	fs.createReadStream('./image.png').pipe(res);
}

console.log('Server running at http://localhost:3000');
```

