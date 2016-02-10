# Async Logic

There are son conventions regarding handling asynchronous logic. One of them is passing an error and a result to the callbacks, in that order `(err, res)`.
 
It's a good practice to not nest callbacks, but define named functions to be called, specially if it's going to be called often. 

## The events core module

```
var Emmitter = require('events').EventEmitter;
var emmitter = new EventEmmitter();

emmitter.on('action', function() { console.log('Done!') })

emmitter.emit('action');
```

Note that a listener can be "named" by any value, even an object!

## FileWatcher

```
var fs = require('fs');
var events = require('events');
var util = require('util');
var watchDir = './watch';
var processDir = './done';

function Watcher(dir, processedDir){
	this.watchDir = dir;
	this.processedDir = processedDir;
}

util.inherits(Watcher, event.EventEmmitter) ;
// same as doing Watcher.prototype = new.EventEmitter();

Watcher.prototype.watch = function(){
	var watcher = this;
	fs.readdir(this.watchDir, function(err, files){
		if(err){
			throw err
		}
		for(var index in files){
			watcher.emit('process', files[index]);
		}
	})
}

Watcher.prototype.start = function(){
	var watcher = this;
	fs.watchFile(watchDir, function(){
		watcher.watch();
	})
}

var watcher = new Watcher(watchDir, processedDir);

watcher.on('process', function(file){
	var watchFile = this.watchDir + '/' + file;
	var processedFile = this.processedDir +'/' + file.toLowerCase();
	fs.rename(watchFile, processedFile, function(err){
		if (err){
			throw err;
		}
	})
})

watcher.start();
```

The Node process can't exit as long as there are still async functions running

