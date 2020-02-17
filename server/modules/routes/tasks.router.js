//requires
const express = require('express');
const router = express.Router();
const pool = require('../pool');
//routes
//get
router.get('/', (req,res)=>{
    console.log('in /tasks GET');
    //run this query on 'pool' db to get all tasks
    let query = 'SELECT * FROM tasks ORDER BY "id" ASC';
    pool.query(query).then((results)=>{
        res.send(results.rows);
    }).catch( (err)=>{
        console.log(err);
        res.sendStatus(500);
    })//end query
})//end GET
    router.get('/view-oldest', (req, res) => {
        console.log('in /tasks/view-oldest GET');
        //run this query on 'pool' db to get all tasks
        let query = 'SELECT * FROM tasks ORDER BY "id" ASC';
        pool.query(query).then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })//end query
    })//end /view-oldest GET
    router.get('/view-newest', (req, res) => {
        console.log('in /tasks/view-newest GET');
        //run this query on 'pool' db to get all tasks
        let query = 'SELECT * FROM tasks ORDER BY "id" DESC';
        pool.query(query).then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })//end query
    })//end /view-new GET
    router.get('/view-priority', (req, res) => {
        console.log('in /tasks/view-priority GET');
        //run this query on 'pool' db to get all tasks
        let query = 'SELECT * FROM tasks ORDER BY "priority_level" ASC';
        pool.query(query).then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })//end query
    })//end /view-priority GET
    router.get('/view-category', (req, res) => {
    console.log('in /tasks/view-category GET');
    //run this query on 'pool' db to get all tasks
    let query = 'SELECT * FROM tasks ORDER BY "category" ASC';
    pool.query(query).then((results) => {
        res.send(results.rows);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })//end query
    })//end /view-category GET
//post
router.post('/', (req, res) => {
    console.log('in /tasks POST with ', req.body);
    //run this query on 'pool' db to get all tasks
    let query = 'INSERT INTO tasks ("description", "category", "priority_level") VALUES ($1, $2, $3)';
    pool.query(query, [req.body.description, req.body.category, req.body.priority_level]).then((results) => {
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