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


router.post('/', function (req,res){
    //Attempt to connect to database
    pool.connect(function(errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            //There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!
            //Now, we're going to GET things from the DB
            //use ES6 backtick ` to select multi lines below****
            client.query(`INSERT INTO todo_list (item, completed)
            VALUES ($1, $2);`, [req.body.item, req.body.completed], function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    //Query failed.  Did you test it in Postico?
                    //Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else{
                    res.sendStatus(201); //201 is status 'created'
                }
            });
        }
    });
})

router.delete('/:id', function (req,res){
    var listItemToRemove = req.params.id;
    //Attempt to connect to database
    pool.connect(function(errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            //There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!
            //Now, we're going to GET things from the DB
            //use ES6 backtick ` to select multi lines below****
            client.query(`DELETE FROM todo_list WHERE id=$1;`, [listItemToRemove], function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    //Query failed.  Did you test it in Postico?
                    //Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else{
                    res.sendStatus(200);
                }
            });
        }
    });
})

router.put('/:id', function (req,res){
    var shoeIdToSave = req.params.id;
    var shoeNameToSave = req.body.name;
    //Attempt to connect to database
    pool.connect(function(errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            //There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!
            //Now, we're going to GET things from the DB
            //use ES6 backtick ` to select multi lines below****
            client.query(`UPDATE shoes SET "name" = $1 WHERE "id" = $2;`, [shoeNameToSave, shoeIdToSave], function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    //Query failed.  Did you test it in Postico?
                    //Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else{
                    res.sendStatus(200);
                }
            });
        }
    });
})





module.exports = router;