
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use('/', express.static(__dirname +'/public'));
app.use(require('./routes')());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', function( error ){ console.error('connection error: %s', error)});

db.once('open', function() {
 	app.listen(3000, function(){ console.log(' There Ya Go! '); }); 
});

