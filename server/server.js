var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require( 'path' );
var port = process.env.PORT || 5000;
var todoRoute = require('./routes/todo.js');
console.log('todoRoute found');
app.use(bodyParser.urlencoded({extended: true}));

app.use('/todo', todoRoute);
// Serve back static files by default
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, '/public/', file));
});

// Start listening for requests on a specific port
app.listen(port, function(){
  console.log('listening on port', port);
});
