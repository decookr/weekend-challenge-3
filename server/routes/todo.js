var express = require('express');
var router = express.Router();

var pool = require('../modules/pool');


// begin GET todo
router.get('/', function(req,res){
    //Attempt to connect to database
    pool.connect(function(errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            //There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!
            //Now, we're going to GET things from the DB
            client.query('SELECT * FROM todo_list ORDER BY id;', function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    //Query failed.  Did you test it in Postico?
                    //Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else{
                    res.send(result.rows);
                }
            });
        }
    });
});//end GET todo








module.exports = router;