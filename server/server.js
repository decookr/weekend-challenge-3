var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//add routes here if desired var routename = require('./routes/routename');

var port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// add app.use('/routenamehere', routenamehere); if using routes

app.listen(port, function(){
    console.log('server is listening on port', port);; 
});