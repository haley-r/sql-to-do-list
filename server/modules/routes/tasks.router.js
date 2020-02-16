//requires
const express = require('express');
const router = express.Router();
const pool = require('../pool');
//routes
//get
router.get('/', (req,res)=>{
    console.log('in /tasks GET');
    //run this query on 'pool' db to get all tasks
    let query = 'SELECT * FROM tasks';
    pool.query(query).then((results)=>{
        res.send(results.rows);
    }).catch( (err)=>{
        console.log(err);
        res.sendStatus(500);
    })//end query
})//end GET
//post
router.post('/', (req, res) => {
    console.log('in /tasks POST with ', req.body);
    //run this query on 'pool' db to get all tasks
    let query = 'INSERT INTO tasks ("description") VALUES ($1)';
    pool.query(query, [req.body.description]).then((results) => {
        res.sendStatus(201);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })//end query
})//end POST
//delete
//put
//exports
module.exports = router;