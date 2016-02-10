# Web Sockets

Nodejs can have different types of servers on the same app. One example is to have a Web Sockets server that can function as a chat. Socket.io is a library that abstracts most of the implementation of the protocol, so we will drop it on our project. 

## The server

This is an internal module, include it on your server

```
var socketio = require('socket.io');
var io;
var counter = 1;
var users = [];

exports.listen = function(server){
	io = socketio(server);

	io.on('connection', function(socket){
		socket.on('add', function(user){
			socket.username = user;
			users.push(user);
			socket.emit('hello', users);
			socket.broadcast.emit('joined', {
				username: socket.username
			});
		});
	});
};

```

## The client 

```
var socket = io();

$('#join').on('click', function(){
	socket.emit('add', $('#username').val() );
});

socket.on('joined', function(data){
	appendUser(data.username);
});

socket.on('hello', function(data){
	var len = data.length;
	var i = 0;
	for(i; i < len; i++){
		appendUser(users[i]);
	}
});

function appendUser(user){
	$('#users').append('<li>'+ data.username +'</li>')	
}
```

## The HTML

```
<!DOCKTYPE html>
<html>
<head>
<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Socket tests</title>
	<script src="/socket.io/socket.io.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"> </script>
	<script src="/public/js/client.js"> </script>
</head>
<body>
	<span class="input-${8{:username}}">
		<label for="username">username</label>
		<input type="text" name="username" value="" id="username">
		<button id="join"> Join! </button>
	</span>
	<ul id="users">
	</ul>
</body>
</html>
```

