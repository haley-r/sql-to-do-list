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
router.delete('/:id', (req, res) => {
    console.log('in /tasks/id DELETE with ', req.params.id);
    //run this query on 'pool' db to delete selected task
    let query = 'DELETE FROM tasks WHERE "id" = $1';
    pool.query(query, [req.params.id]).then((results) => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })//end query
})//end DELETE
//put
router.put('/:id', (req, res) => {
    console.log('in /tasks/id PUT with ', req.params.id);
    //make query to run on db to update completed status
    let query = `UPDATE tasks SET "completed" = true WHERE "id"=$1;`;
    pool.query(query, [req.params.id]).then((results)=>{
        res.sendStatus(200);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })//end query
})//end PUT
//exports
module.exports = router;