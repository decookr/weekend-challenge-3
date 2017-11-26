var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var todo = require('./routes/todo');

var port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.use('/todo', todo);

app.listen(port, function(){
    console.log('server is listening on port', port);
});