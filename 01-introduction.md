# Introduction to nodejs

Node uses an event-driven, non-blocking I/O model that makes it suitable for IO intensive operations. It's built upon V8, Google Chrome's JS engine. In theory, it has better performance because instead of generating bytecode to execute with an interpreter, it straight compiles into machine code.

## JS in the browser

Both Node and browsers have Asynchronous I/O. Most browsers are single-threaded. When and I/O operation happens, it does out of the [event loop](https://developer.mozilla.org/en/docs/Web/JavaScript/EventLoop) and then an event is emitted and handled by a function (often called callback), hence it doesn't block script execution.
	
## JS in the server

For many applications, synchronous I/O is fine and easy to follow. But the process is mantaining a state, doing nothing until the I/O is completed. Some server setups also use one thread per connection but then a thread maintains its own working memory.

In the case of NodeJS, each request represents an I/O operation.

## DIRTy applications

Or *Data Intensive Real Time*.

Since I/O operations are very lightweight in Node, it can proxy data from one pipe to another very quickly. Hence it can handle many requests with a small memory footprint (maintaining threads takes memory).

Node includes a core set of modules for network and file I/O (which are not present on a browser). The core is intentionally low-level, just the building blocks of an I/O-based application. There are libraries to abstract the most common problems.


