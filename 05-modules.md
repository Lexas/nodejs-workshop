# Modules

The module convention used by Node is called CommonJS. Modules don't pollute the global scope, this way there's no name collisions. Also, they are loaded only once in the lifetime of the process, and mintain their state among consuming scripts. Even those that are external modules too.

require() is synchronous for readability and the 'js' extention is implicit, you only have to specify it if you're importing other kind of file. The dependencies are looked for first in the node directory, as core modules, then within the node_modules folders, upwards, in the same directory branch. In order to include dependencies out of this chain, you specify the relative path.

The `exports` value of a module is an empty object ({}) and can't be reassigned, you can only set more properties, which would be exported. However `module.exports` can be reassigned, and also represents the value which will be imported, exports is an alias for module.exports.

If you're going to distribute a module, make sure to either have an index.js file or a "main" property set in the package.json file (a path relative to the package.json), which will be used as the entrypoint of the library.
 
